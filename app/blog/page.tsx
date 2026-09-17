import type { Metadata } from "next";
import { ImageSlot } from "@/components/image-slot";

export const metadata: Metadata = { title: "Blog" };

const posts = [1, 2, 3];
export default function BlogPage() {
  return <main className="content-page wrap blog-page"><h1 className="sr-only">Blog</h1>{posts.map((post) => <article className="blog-placeholder" key={post}><ImageSlot src={`/images/blog-${post}.jpg`} alt="" label={`Blog image ${post}`} /><div><time>Date</time><h2>Blog title</h2></div></article>)}</main>;
}
