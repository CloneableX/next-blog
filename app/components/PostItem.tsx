import Link from "next/link";
import {formatDate} from "@/lib/formatDate";

type Props = {
  post: Post,
}

export const PostItem = ({post}: Props) => {
  const {id, title, date} = post
  const formattedDate = formatDate(date);

  return (
    <li className="mt-4 text-2xl">
      <Link href={`posts/${id}`} className="underline hover:text-black/70 dark:text-white/90 dark:hover:text-white">{title}</Link>
      <br/>
      <p className="text-sm mt-1">{formattedDate}</p>
    </li>
  )
}