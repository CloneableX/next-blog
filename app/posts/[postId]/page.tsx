import {getPostByName, getPostsMeta} from "@/lib/posts";
import {formatDate} from "@/lib/formatDate";
import Link from "next/link";
import {notFound} from "next/navigation";
import 'highlight.js/styles/github-dark.css'

type Props = {
  params: { postId: string }
}

export const generateStaticParams = async () => {
  const metas = await getPostsMeta();
  if (!metas || metas.length === 0) return []

  return metas.map(meta => ({ postId: meta.id }))
}

export const generateMetadata = async ({params: {postId}}: Props) => {
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) return { title: 'Post Not Found' }

  return { title: post.meta.title }
}

const PostPage = async ({params: {postId}}: Props) => {
  const post = await getPostByName(`${postId}.mdx`)

  if (!post) notFound()

  const {meta, content} = post
  const formattedDate = formatDate(meta.date);

  const tags = meta.tags.map((tag, index) => (
    <Link key={index} href={`tags/${tag}`}>{tag}</Link>
  ));

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mb-0 text-sm">{formattedDate}</p>
      <article>
        {content}
      </article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">
          {...tags}
        </div>
      </section>
      <p>
        <Link href="/" className="mb-10">← Back to Home</Link>
      </p>
    </>
  )
}

export default PostPage
