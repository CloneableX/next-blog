import * as fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getSortedPosts = (): Post[] => {
  const postDirPath = path.join(process.cwd(), '/blogposts');
  const fileNames = fs.readdirSync(postDirPath);
  const posts = fileNames.map(fileName => {
    const fileContent = fs.readFileSync(path.join(postDirPath, fileName));
    const matterResult = matter(fileContent);
    return {
      id: fileName,
      title: matterResult.data.title,
      date: matterResult.data.date
    } as Post
  });

  return posts.sort((post, otherPost) => post.date < otherPost.date ? 1 : -1)
}