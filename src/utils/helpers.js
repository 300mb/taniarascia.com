export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    topic: post.node.frontmatter.topic,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter.thumbnail.childImageSharp.fixed,
    }),
  }))
}

export function getCategoriesFromPosts(posts) {
  return posts.reduce((acc, post) => {
    return [...new Set([...acc, ...(post.categories || [])])]
  }, [])
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export function appendComments(commentBox) {
  const commentScript = document.createElement('script')
  const theme = 'github-dark'

  commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'taniarascia/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('id', 'utterances')
  commentScript.setAttribute('theme', theme)
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (commentBox && commentBox.current) {
    commentBox.current.appendChild(commentScript)
  } else {
    console.log(`Error adding utterances comments on: ${commentBox}`)
  }
}
