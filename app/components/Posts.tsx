import {getSortedPosts} from "@/lib/getSortedPosts";
import {PostItem} from "@/app/components/PostItem";

export const Posts = () => {
  const posts = getSortedPosts();

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