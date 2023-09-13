import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <br/>
    </div>
  )
}

export default PostBody
