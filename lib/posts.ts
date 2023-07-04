import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import remarkHtml from "remark-html";
import {compileMDX} from "next-mdx-remote/rsc";

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

type FileTree = {
  tree: [
    {
      path: string
    }
  ]
}

type File = {
  content: string,
}

export const getPostByName = async (name: string): Promise<BlogPost | undefined> => {
  const res = await fetch(`https://api.github.com/repos/CloneableX/next-test-blogposts/contents/ccc.mdx`, {
    headers: {
      Accept: 'application/vnd.github.raw',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!res.ok) return undefined

  const rawMDX = await res.text();
  const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
    }
  });

  const id = name.replace(/\.mdx$/, '');
  return {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  }
}

export const getPostsMeta = async (): Promise<Meta[] | undefined> => {
  const res = await fetch('https://api.github.com/repos/CloneableX/next-test-blogposts/git/trees/master?recusive=1', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!res.ok) return undefined

  const fileTree: FileTree = await res.json();
  const fileNames = fileTree.tree.map(node => node.path).filter(path => path.endsWith('.mdx'));

  const postsMeta: Meta[] = [];

  for (const name of fileNames) {
    const post = await getPostByName(name);
    if (post) {
      const {meta} = post
      postsMeta.push(meta)
    }
  }

  return postsMeta.sort((meta, otherMeta) => meta.date < otherMeta.date ? 1 : -1)
}
