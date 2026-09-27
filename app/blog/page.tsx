import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";
import { getBlogPosts, MEDIUM_RSS_REVALIDATE_SECONDS } from "@/lib/medium-blog";

export const metadata: Metadata = siteContent.metadata.pages.blog;
export const revalidate = MEDIUM_RSS_REVALIDATE_SECONDS;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const { blogPage } = siteContent;
  const posts = await getBlogPosts();

  return (
    <main className="content-page wrap blog-page">
      <h1 className="sr-only">{blogPage.heading}</h1>
      {posts.length ? posts.map((post) => (
        <Link className="blog-card-link" href={`/blog/${post.slug}`} key={post.guid}>
          <article className={`blog-card${post.image ? "" : " blog-card--no-image"}`}>
            {post.image && (
              <ImageSlot
                src={post.image}
                alt=""
                placeholderLabel=""
                className="blog-card-image"
              />
            )}
            <div className="blog-card-copy">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              {post.author && <span className="blog-card-author">{blogPage.byLabel} {post.author}</span>}
            </div>
          </article>
        </Link>
      )) : (
        <p className="blog-empty" role="status">{blogPage.unavailableMessage}</p>
      )}
    </main>
  );
}
