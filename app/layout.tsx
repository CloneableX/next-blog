import './globals.css'
import {Navbar} from "@/app/components/Navbar";
import {ProfilePic} from "@/app/components/ProfilePic";

export const metadata = {
  title: "Cloneable's Blog",
  description: 'Created by Cloneable',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Navbar />
        <ProfilePic />
        <main className="prose prose-xl prose-slate dark:prose-invert px-4 md:p-6 mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
