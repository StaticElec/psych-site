import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteContent } from "@/content/site-content";
import { getBlogPost, MEDIUM_RSS_REVALIDATE_SECONDS } from "@/lib/medium-blog";

export const revalidate = MEDIUM_RSS_REVALIDATE_SECONDS;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: siteContent.metadata.pages.blog.title };

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: post.originalUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.categories,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="content-page wrap article-page">
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <p className="article-byline">
            {siteContent.blogPage.byLabel} {post.author}
            <span aria-hidden="true"> · </span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </p>
        </header>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <footer className="article-footer">
          <a href={post.originalUrl} rel="noopener noreferrer">
            {siteContent.blogPage.originalArticleLabel}
          </a>
        </footer>
      </article>
    </main>
  );
}
