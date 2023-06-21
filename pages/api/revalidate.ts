// copy process.cwd()/new-post.md to directory blogposts after running command 'npm run start'
// http://localhost:3000/api/revalidate?path=/&secret=HankCloneableLearnExample

import {NextApiRequest, NextApiResponse} from "next";

const handle = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.query.secret !== process.env.DATA_TOKEN_SECRET) {
    return response.status(401).json({message: 'Invalid Token'})
  }

  const path = request.query.path as string;
  await response.revalidate(path)
  return response.json({revalidated: true})
}

export default handle
