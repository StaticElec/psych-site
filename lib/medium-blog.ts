import "server-only";

import mediumPostsSnapshot from "@/content/medium-posts.snapshot.json";
import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";

export const MEDIUM_RSS_URL =
  process.env.MEDIUM_RSS_URL?.trim() ||
  "https://medium.com/feed/@yburmistrova";

export const MEDIUM_RSS_REVALIDATE_SECONDS = 60 * 60;

export type BlogPost = {
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  content: string;
  image?: string;
  originalUrl: string;
  guid: string;
  categories: string[];
};

const fallbackPosts: BlogPost[] = mediumPostsSnapshot;

type RssItem = {
  title?: unknown;
  link?: unknown;
  guid?: unknown;
  category?: unknown;
  "dc:creator"?: unknown;
  pubDate?: unknown;
  description?: unknown;
  "content:encoded"?: unknown;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  trimValues: true,
  isArray: (name) => name === "item" || name === "category",
});

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return asText(record["#text"] ?? record.__cdata ?? "");
  }
  return "";
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

function stableId(guid: string): string {
  const mediumId = guid.match(/([a-f0-9]{8,})\/?$/i)?.[1];
  if (mediumId) return mediumId.toLowerCase();

  let hash = 2166136261;
  for (const character of guid) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em", "a",
      "ul", "ol", "li", "blockquote", "figure", "figcaption", "img", "br", "hr",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          ...(attributes.href ? { href: attributes.href } : {}),
          ...(attributes.title ? { title: attributes.title } : {}),
          rel: "noopener noreferrer",
        },
      }),
      img: (_tagName, attributes) => ({
        tagName: "img",
        attribs: {
          ...(attributes.src ? { src: attributes.src } : {}),
          alt: attributes.alt || "",
          ...(attributes.title ? { title: attributes.title } : {}),
          loading: "lazy",
          decoding: "async",
        },
      }),
    },
    exclusiveFilter: (frame) =>
      frame.tag === "img" &&
      (!frame.attribs.src || frame.attribs.src.includes("medium.com/_/stat")),
  });
}

function toPlainText(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(description: string, content: string, limit = 230): string {
  const descriptionText = toPlainText(description);
  const text = descriptionText.length >= 40 ? descriptionText : toPlainText(content);
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/, "").trim()}…`;
}

function firstImage(html: string): string | undefined {
  const match = html.match(/<img\b[^>]*\bsrc=(?:"([^"]+)"|'([^']+)')[^>]*>/i);
  return match?.[1] || match?.[2] || undefined;
}

function normalizeItem(item: RssItem): BlogPost | null {
  const title = asText(item.title);
  const originalUrl = asText(item.link).replace(/\?source=.*$/, "");
  const guid = asText(item.guid) || originalUrl;
  const publishedDate = new Date(asText(item.pubDate));
  const rawContent = asText(item["content:encoded"]);

  if (!title || !originalUrl || !guid || !rawContent || Number.isNaN(publishedDate.getTime())) {
    return null;
  }

  const content = sanitizeArticleHtml(rawContent);
  const categories = (Array.isArray(item.category) ? item.category : [item.category])
    .map(asText)
    .filter(Boolean);
  const titleSlug = slugify(title) || "article";

  return {
    title,
    slug: `${titleSlug}-${stableId(guid)}`,
    author: asText(item["dc:creator"]) || "Yana Romanov",
    publishedAt: publishedDate.toISOString(),
    excerpt: makeExcerpt(asText(item.description), content),
    content,
    image: firstImage(content),
    originalUrl,
    guid,
    categories,
  };
}

export function parseMediumFeed(xml: string): BlogPost[] {
  const parsed = parser.parse(xml) as {
    rss?: { channel?: { item?: RssItem[] } };
  };
  const items = parsed.rss?.channel?.item ?? [];

  return items
    .map(normalizeItem)
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(MEDIUM_RSS_URL, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: MEDIUM_RSS_REVALIDATE_SECONDS },
    });

    if (!response.ok) throw new Error(`Medium RSS returned HTTP ${response.status}`);
    const posts = parseMediumFeed(await response.text());
    if (posts.length === 0) {
      throw new Error("Medium RSS contained no usable posts");
    }
    return posts;
  } catch (error) {
    console.error(
      "Live Medium RSS feed failed; serving the last-known-good blog snapshot.",
      error,
    );
    return fallbackPosts;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
