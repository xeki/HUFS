const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => {
    likes += blog.likes
    return likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return {}
  const blogsCopy = blogs.slice()
  blogsCopy.sort((blogA, blogB) => blogB.likes - blogA.likes)
  const {author, title, likes} = blogsCopy[0]
  return ({author, title, likes})
}

const groupBlogsByAuthor = (blogs) => {
  return blogs.reduce((acc, blog) => {
    if (acc[blog.author]) {
      acc[blog.author].blogsCount += 1
      acc[blog.author].likes += blog.likes
    } else {
      acc[blog.author] = {blogsCount: 1, likes: blog.likes}
    }
    return acc
  }, {})
}

const getHighestNumberOfBlogsAuthor = (blogsObj) => {
  let topAuthor = {name: '', blogsCount: 0}
  Object.entries(blogsObj).forEach(([authorName, obj]) => {
    if (obj.blogsCount > topAuthor.blogsCount) {
      topAuthor.name = authorName
      topAuthor.blogsCount = obj.blogsCount
    }
  })
  return topAuthor
}

const getMostLikedAuthor = (blogsObj) => {
  let topAuthor = {name: '', likes: 0}
  Object.entries(blogsObj).forEach(([authorName, obj]) => {
    if (obj.likes > topAuthor.likes) {
      topAuthor.name = authorName
      topAuthor.likes = obj.likes
    }
  })
  return topAuthor
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return {}
  const authorsObj = groupBlogsByAuthor(blogs)
  return getHighestNumberOfBlogsAuthor(authorsObj)
}

const mostLikedAuthor = (blogs) => {
  const authorsObj = groupBlogsByAuthor(blogs)
  return getMostLikedAuthor(authorsObj)
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedAuthor
}