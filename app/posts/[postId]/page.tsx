import {getPost} from "@/lib/posts";
import {formatDate} from "@/lib/formatDate";
import Link from "next/link";
import {notFound} from "next/navigation";

type Props = {
  params: { postId: string }
}

export const generateMetadata = async ({params: {postId}}: Props) => {
  return getPost(postId)
    .then((post) => ({title: post.title}))
    .catch(() => ({title: 'Post Not Found'}))
}

const PostPage = async ({params: {postId}}: Props) => {
  const post = await getPost(postId)
    .then(post => post)
    .catch(() => notFound());
  const {title, date, contentHtml} = post
  const formattedDate = formatDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate mx-auto">
      <h2 className="text-3xl mt-4 mb-0">{title}</h2>
      <p className="mb-0">{formattedDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{__html: contentHtml!}}/>
        <p>
          <Link href="/">← Back to Home</Link>
        </p>
      </article>
    </main>
  )
}

export default PostPage
