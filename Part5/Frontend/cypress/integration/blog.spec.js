const users = [{
  userName: 'ayele123',
  name: 'ayele chane',
  password: 'pass'
},{
  userName: 'tesema123',
  name: 'Tesema mebratu',
  password: 'logged'
}]
function createUser(userIndex){
  cy.request('POST','http://localhost:3000/api/users', users[userIndex])
}
function signInUser(userIndex) {
  cy.get('#show-button').click()
  cy.get('#userName').type(users[userIndex].userName)
  cy.get('#password').type(users[userIndex].password)
  cy.get('#loginButton').click()
}
function createBlog(blogNumber){
  const randomText = `new title ${Math.floor(Math.random()*10000)}`
  cy.get('#show-button').click()
  cy.get('#title').type(randomText)
  cy.get('#author').type(`new author ${blogNumber}`)
  cy.get('#url').type(`new url ${blogNumber}`)
  cy.get('#createBlogButton').click()
  return randomText
}
function likeABlog() {
  cy.get('.blog').last().within(() => {
    cy.get('#viewDetail').click()
    cy.get('#toggleDetails').click()
    cy.get('#like-button').click()
  })
}
describe('Blogs', function () {

  before(function(){
    cy.request('GET', 'http://localhost:3000/api/testing/reset')
    createUser(0)
    cy.visit('http://localhost:3001')
  })
  it('it opens front page', function () {
    cy.contains('Show')
  })

  it('it successfully login user', function () {
    cy.get('#show-button').click()
    cy.get('#userName').type('ayele123')
    cy.get('#password').type('pass')
    cy.get('#loginButton').click()
    cy.contains('Logged in user:')
    cy.contains('Log out').click()
    cy.contains('Show')
  })

  it('it fails to login with wrong credentials', function () {
    cy.get('#show-button').click()
    cy.get('#userName').type('ayele123')
    cy.get('#password').type('pass11')
    cy.get('#loginButton').click()
    cy.get('#message').should('contain','Authentication failed')
    cy.get('#show-button')
  })

  describe('when logged in', function() {
    before(function() {
      cy.get('#show-button').click()
      cy.get('#userName').type('ayele123')
      cy.get('#password').type('pass')
      cy.get('#loginButton').click()
    })

    it('creates new blog', function() {
      const randomText = createBlog(1)
      cy.contains(randomText)
    })

    it('creates another blog', function() {
      const randomText = createBlog(2)
      cy.contains(randomText)
      cy.get('.blog').should('have.length',2)
    })

    it('likes a blog', function() {
      likeABlog()
      cy.get('.blog').first().within(() => {
        cy.get('#viewDetail').click()
        cy.get('#toggleDetails').click()
        cy.get('#likes').contains('1')
      })
    })

    it('deletes a blog', function() {
      cy.get('.blog').should('have.length',2)
      cy.get('.blog').last().within(() => {
        cy.get('#viewDetail').click()
      })
      cy.get('#deletBlog').click()
      cy.get('.blog').should('have.length',1)
    })

    it('doesnot allow blog deletion for unauthorized user', function(){
      cy.get('#logoutButton').click()
      createUser(1)
      signInUser(1)
      cy.get('.blog').should('have.length',1)
      cy.get('#viewDetail').click()
      cy.get('#deletBlog').should('not.exist',true)
    })

    it('sorts blogs by the number of likes', function() {
      let len
      const likes = []
      createBlog(3)
      createBlog(4)
      likeABlog()
      cy.get('.blog').its('length').then(l => {len = l})
      for(let i = 0; i < len; i++) {
        cy.get('.blog').eq(i).get('#viewDetail').click()
        cy.get('#toggleDetails').click()
        cy.get('#likes').then(n => {likes.push(n.text())})
        cy.get('#toggleDetails').click()
        cy.get('#viewDetail').click()
      }
      const sortedLikes = likes.sort((a,b) => a-b)
      const sorted = likes.every((ele,i) => ele === sortedLikes[i])
      expect(sorted).to.eq(true)
    })
  })
})