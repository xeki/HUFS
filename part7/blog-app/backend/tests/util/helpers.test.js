require('jest')
const helpers = require('../../src/util/list_helper')
const blogs = [
  {_id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0},
  {_id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0},
  {_id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0},
  {_id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0},
  {_id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0},
  {_id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0}
]
describe('Total likes ', () => {
  test('woks when there is no blog', () => {
    const total = helpers.totalLikes([])
    expect(total).toBe(0)
  })

  test('works when there is only one blog', () => {
    const total = helpers.totalLikes([blogs[0]])
    expect(total).toBe(7)
  })
  test('works properly when there are multiple blogs', () => {
    const total = helpers.totalLikes(blogs)
    expect(total).toBe(36)
  })
})

describe('Favorite blogs', () => {
  test('no favorite blog when blogs is empty', () => {
    const favorite = helpers.favoriteBlog([])
    expect(favorite.author).toBe(undefined)
  })

  test('Finds favorite blog when there is only one blog', () => {
    const favorite = helpers.favoriteBlog([blogs[0]])
    const {author, title, likes} = blogs[0]
    expect(favorite).toEqual({author, title, likes})
  })

  test('Finds favorite blog when there are multiple blogs', () => {
    const favorite = helpers.favoriteBlog(blogs)
    const {author, title, likes} = blogs[2]
    expect(favorite).toEqual({author, title, likes})
  })
})

describe('Most blogs', () => {
  test('get author with most blogs', () => {
    const topAuthor = {name: 'Robert C. Martin', blogsCount: 3}
    const {name, blogsCount} = helpers.mostBlogs(blogs)
    expect({name, blogsCount}).toEqual(topAuthor)
  })
})

describe('Most liked author', () => {
  test('verify it works properly', () => {
    const likedAuthor = {name: 'Edsger W. Dijkstra', likes: 17}
    const {name, likes} = helpers.mostLikedAuthor(blogs)
    expect({name, likes}).toEqual(likedAuthor)
  })
})
