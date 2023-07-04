import {getPostsMeta, getSortedPosts} from "@/lib/posts";
import {PostItem} from "@/app/components/PostItem";

export const Posts = async () => {
  const posts = await getPostsMeta();

  if (!posts || posts.length < 1) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>
  }

  return (
    <section className="mx-auto w-max-2xl">
      <h2 className="text-4xl font-bold">Blog</h2>
      <ul className="w-full">
        {posts.map((post) => (
          <PostItem key={post.id} post={post}/>
        ))}
      </ul>
    </section>
  )
}