import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts, getComments, sendComment } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import type PostType from '../../interfaces/post'
import CommentSection from '../../components/comment'
import React, { useState } from 'react'
import CommentType from '../../interfaces/comment'
import { useSession } from 'next-auth/react'

type Props = {
  post: PostType
  morePosts: PostType[]
  comments: CommentType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview, comments }: Props) {
  const router = useRouter()
  const session = useSession()
  const [text, setText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        body: JSON.stringify({ "comment": "text", "author": session.data.user.name, "blog_id": post.bid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <meta property="og:image" content={post.picture} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.picture}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.body} />
              <CommentSection text={text} setText={setText} onSubmit={onSubmit}/>
              <br/>
              {comments.map((comment) => {
                return(
                  <>
                    <div>
                      <div>{comment.author} {comment.date.slice(0, 10)}</div>
                      <div>{comment.content}</div>
                    </div>
                  </>
                )
              })}
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}


type Params = {
  params: {
    slug: string
  }
}



export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'body',
    'picture',
    'bid',
  ])
  const content = post.body
  const comments = await getComments(post.bid)
  let key = 0
  const commentsWithKey = comments.map((comment) => {
    key += 1
    return {...comment, key: key}
  })
  return {
    props: {
      post: {
        ...post,
        content,
      },
      comments: comments,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
