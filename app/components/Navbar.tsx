import Link from "next/link";
import {FaGithub, FaTwitter, FaYoutube} from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl flex flex-col justify-between mx-auto sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 sm:mb-0">
          <Link href="/" className="text-white/90 hover:text-white no-underline">Cloneable&apos;s Blog</Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
          <Link href="https://www.youtube.com/@DaveGrayTeachesCode" className="text-white/90 hover:text-white">
            <FaYoutube/>
          </Link>
          <Link href="https://github.com/gitdagray" className="text-white/90 hover:text-white">
            <FaGithub/>
          </Link>
          <Link href="https://twitter.com/yesdavidgray" className="text-white/90 hover:text-white">
            <FaTwitter />
          </Link>
        </div>
      </div>
    </nav>
  )
}