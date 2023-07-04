import {getPostsMeta} from "@/lib/posts";
import Link from "next/link";
import {PostItem} from "@/app/components/PostItem";

type Props = {
  params: {
    tag: string
  }
}

export const generateStaticParams = async () => {
  const metas = await getPostsMeta();
  if (!metas || metas.length === 0) return []

  const tags = new Set(metas.flatMap(meta => meta.tags));
  return Array.from(tags).map(tag => ({ tag }))
}

export const generateMetadata = ({params: {tag}}: Props) => {
  return { title: `Posts about ${tag}` }
}

const TagPage = async ({params: {tag}}: Props) => {
  const metas = await getPostsMeta();

  if (!metas || metas.length === 0) return <p className="mt-10 text-center">Sorry, no posts available.</p>

  const targetMetas = metas.filter(meta => meta.tags.includes(tag));
  if (targetMetas.length === 0) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for that keyword.</p>
        <Link href="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
      <section className="mt-6 mx-auto max-w-2xl">
        <ul className="w-full list-none p-0">
          {targetMetas.map(meta => (
            <PostItem key={meta.id} post={meta} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default TagPage
