import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <main>
      <h2>Hello, I&apos;m <span>Cloneable!</span></h2>
    </main>
  )
}

export default Home
