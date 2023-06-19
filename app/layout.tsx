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
      <body>
        <Navbar />
        <ProfilePic />
        {children}
      </body>
    </html>
  )
}
