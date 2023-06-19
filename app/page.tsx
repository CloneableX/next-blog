import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <main className="p-6 mx-auto">
      <p className="my-12 text-2xl text-center sm:text-3xl">
        Hello and Welcome 👏&nbsp;
        <span className="whitespace-pre-line">Hello, I&apos;m <span className="font-bold">Cloneable!</span></span>
      </p>
    </main>
  )
}

export default Home
