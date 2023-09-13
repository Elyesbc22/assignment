import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  author: string
  short_body: string
  body: string
  picture: string
  meta_title: string
  bid: number
}

export default PostType
