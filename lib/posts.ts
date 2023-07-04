import {compileMDX} from "next-mdx-remote/rsc";

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
  const res = await fetch(`https://api.github.com/repos/CloneableX/next-test-blogposts/contents/${name}`, {
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
