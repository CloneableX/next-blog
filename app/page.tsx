import {Posts} from "@/app/components/Posts";

// export const revalidate = 10
export const revalidate = 86400

const Home = () => {
  return (
    <main className="prose prose-xl dark:prose-invert p-6 mx-auto">
      <p className="my-12 text-2xl text-center sm:text-3xl">
        Hello and Welcome 👏&nbsp;
        <span className="whitespace-pre-line">I&apos;m <span className="font-bold">Cloneable!</span></span>
      </p>
      <Posts />
    </main>
  )
}

export default Home
