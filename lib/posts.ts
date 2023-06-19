import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import remarkHtml from "remark-html";

const postDirPath = path.join(process.cwd(), '/blogposts');

export const getSortedPosts = (): Post[] => {
  const fileNames = fs.readdirSync(postDirPath);
  const posts = fileNames.map(fileName => {
    const fileContent = fs.readFileSync(path.join(postDirPath, fileName));
    const matterResult = matter(fileContent);
    return {
      id: fileName.replace(/\.md$/, ''),
      title: matterResult.data.title,
      date: matterResult.data.date
    } as Post
  });

  return posts.sort((post, otherPost) => post.date < otherPost.date ? 1 : -1)
}

export const getPost = async (postId: string) => {
  const fileContent = fs.readFileSync(path.join(postDirPath, `${postId}.md`));
  const matterResult = matter(fileContent);
  const contentHtml = await remark().use(remarkHtml).process(matterResult.content)

  return {
    id: postId,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml: contentHtml.toString()
  } as Post
}