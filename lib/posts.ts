import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import remarkHtml from "remark-html";

const postDirPath = path.join(process.cwd(), '/blogposts');

async function buildPost(fileName: string, includeContent = false) {
  const fileContent = fs.readFileSync(path.join(postDirPath, fileName));
  const matterResult = matter(fileContent);
  let post = {
    id: fileName.replace(/\.md$/, ''),
    title: matterResult.data.title,
    date: matterResult.data.date
  } as Post

  if (includeContent) {
    const contentHtml = await remark().use(remarkHtml).process(matterResult.content)
    post.contentHtml = contentHtml.toString()
  }

  return post;
}

export const getSortedPosts = async (): Promise<Post[]> => {
  const fileNames = fs.readdirSync(postDirPath);
  const posts = await Promise.all(fileNames.map(fileName => buildPost(fileName)))

  return posts.sort((post, otherPost) => post.date < otherPost.date ? 1 : -1)
}

export const getPost = async (postId: string) => {
  const fileName = `${postId}.md`;

  const isFileExists = fs.existsSync(path.join(postDirPath, fileName));
  if (!isFileExists) throw new Error('post does not exists.')
  return buildPost(fileName, true)
}