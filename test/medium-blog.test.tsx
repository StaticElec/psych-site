import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("server-only", () => ({}));

import BlogPage from "@/app/blog/page";
import ArticlePage from "@/app/blog/[slug]/page";
import mediumPostsSnapshot from "@/content/medium-posts.snapshot.json";
import {
  getBlogPosts,
  MEDIUM_RSS_REVALIDATE_SECONDS,
  MEDIUM_RSS_URL,
} from "@/lib/medium-blog";

const fallbackPost = mediumPostsSnapshot[0];

const validFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <item>
      <title>A useful live post</title>
      <link>https://medium.com/@yburmistrova/a-useful-live-post-abcdef123456?source=rss</link>
      <guid>https://medium.com/p/abcdef123456</guid>
      <dc:creator>Yana Romanov</dc:creator>
      <pubDate>Fri, 26 Sep 2026 12:00:00 GMT</pubDate>
      <category>psychology</category>
      <description><![CDATA[<p>A sufficiently detailed description for the generated excerpt.</p>]]></description>
      <content:encoded><![CDATA[<p>A useful article body.</p><script>alert("unsafe")</script>]]></content:encoded>
    </item>
  </channel>
</rss>`;

function mockFetch(...results: Array<Response | Error>) {
  let callIndex = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation(() => {
      const result = results[Math.min(callIndex, results.length - 1)];
      callIndex += 1;
      return result instanceof Error ? Promise.reject(result) : Promise.resolve(result.clone());
    }),
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("getBlogPosts", () => {
  it("returns parsed and sanitized posts from a successful feed", async () => {
    mockFetch(new Response(validFeed, { status: 200 }));
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");

    const posts = await getBlogPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      title: "A useful live post",
      slug: "a-useful-live-post-abcdef123456",
      author: "Yana Romanov",
      originalUrl: "https://medium.com/@yburmistrova/a-useful-live-post-abcdef123456",
      categories: ["psychology"],
    });
    expect(posts[0].content).not.toContain("script");
    expect(timeoutSpy).toHaveBeenCalledWith(10_000);
    expect(fetch).toHaveBeenCalledWith(
      MEDIUM_RSS_URL,
      expect.objectContaining({
        signal: expect.any(AbortSignal),
        next: { revalidate: MEDIUM_RSS_REVALIDATE_SECONDS },
      }),
    );
  });

  it("uses the snapshot for a non-2xx response", async () => {
    mockFetch(new Response("upstream error", { status: 503 }));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(getBlogPosts()).resolves.toEqual(mediumPostsSnapshot);
    expect(console.error).toHaveBeenCalledWith(
      "Live Medium RSS feeds failed; serving the last-known-good blog snapshot.",
      expect.any(Error),
    );
  });

  it("retries through Medium's profile feed when the primary feed is blocked", async () => {
    mockFetch(
      new Response("blocked", { status: 403 }),
      new Response(validFeed, { status: 200 }),
    );

    const posts = await getBlogPosts();

    expect(posts[0].title).toBe("A useful live post");
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      "https://yburmistrova.medium.com/feed",
      expect.objectContaining({
        headers: expect.objectContaining({
          "User-Agent": expect.stringContaining("YanaRomanovBlog"),
        }),
      }),
    );
  });

  it("uses the snapshot when the request is rejected or times out", async () => {
    mockFetch(new DOMException("The operation timed out", "TimeoutError"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(getBlogPosts()).resolves.toEqual(mediumPostsSnapshot);
  });

  it("uses the snapshot when valid XML contains no usable posts", async () => {
    mockFetch(new Response("<rss><channel><item><title>Incomplete</title></item></channel></rss>"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(getBlogPosts()).resolves.toEqual(mediumPostsSnapshot);
    expect(console.error).toHaveBeenCalledWith(
      "Live Medium RSS feeds failed; serving the last-known-good blog snapshot.",
      expect.objectContaining({ message: "Medium RSS contained no usable posts" }),
    );
  });
});

describe("blog routes", () => {
  it("renders the fallback article on the blog index instead of the unavailable message", async () => {
    mockFetch(new TypeError("network unavailable"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const html = renderToStaticMarkup(await BlogPage());

    expect(html).toContain("Hope. What is Hope? And why is Hope important?");
    expect(html).toContain(`/blog/${fallbackPost.slug}`);
    expect(html).not.toContain("The blog is temporarily unavailable");
  });

  it("resolves the fallback slug through the article route", async () => {
    mockFetch(new TypeError("network unavailable"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const page = await ArticlePage({ params: Promise.resolve({ slug: fallbackPost.slug }) });
    const html = renderToStaticMarkup(page);

    expect(html).toContain("Hope. What is Hope? And why is Hope important?");
    expect(html).toContain("The full article remains available on");
    expect(html).toContain(fallbackPost.originalUrl);
  });
});
