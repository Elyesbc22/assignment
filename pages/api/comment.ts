import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'
import { sendComment } from '../../lib/api'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    sendComment(req.body.comment, req.body.author, req.body.blog_id)
    res.status(200).json({ message: 'Hello from Next.js!' })
  }
}