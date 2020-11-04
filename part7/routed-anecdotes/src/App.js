import React, { useState } from 'react'
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from 'react-router-dom'
import {map} from 'lodash'
import {useField} from './hooks'
import './App.css'

const Menu = () => {
  return (
    <div className='link-container'>
      <Link to='/' className={'link-item'}>anecdotes</Link>
      <Link to='/create' className={'link-item'}>create new</Link>
      <Link to='/about' className={'link-item'}>about</Link>
    </div>
  )
}

const Anecdote = ({anecdote}) => (<p className='anecdote-detail' key={anecdote.id} >{anecdote.content}</p>)

const Error = ({message}) => <p style={{color: 'red', fontSize: '18px', margin: '10px'}}>{message}</p>

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    <DisplayNotification notification={notification} />
    <ul>
      {map(anecdotes, anecdote => <Link key={`link-${anecdote.id}`} to={`/anecdotes/${anecdote.id}`}><li key={anecdote.id} >{anecdote.content}</li> </Link>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div className='footer'>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const DisplayNotification = ({notification}) => notification && <p>{notification}</p>

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.basic.value,
      author: author.basic.value,
      info: info.basic.value,
      votes: 0
    }, history)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='form-label'> content </div>
          <div className='form-control'>
            <input name='content' {...content.basic} />
          </div>
        </div>
        <div className='form-container'>
          <div className='form-label'> author </div>
          <div className='form-control'>
            <input name='author' {...author.basic} />
          </div>
        </div>
        <div className='form-container'>
          <div className='form-label'> url for more info </div>
          <div className='form-control'>
            <input name='info' {...info.basic} />
          </div>
        </div>
        <div className='form-button-groups'>
          <button>create</button>
          <button type='button' onClick={() => {info.reset();author.reset();content.reset();}}>reset</button>
        </div>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState({
    1: {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    2: {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  })
  let timer
  const [notification, setNotification] = useState('')

  const addNew = (anecdote, history) => {
    const id = (Math.random() * 10000).toFixed(0)
    clearTimeout(timer)
    anecdote.id = id
    anecdotes[id] = anecdote
    setAnecdotes(anecdotes)
    setNotification(`A new anecdote ${anecdote.content} created`)
    history.push('/')
    timer = setTimeout(() => setNotification(''), 10000)
  }

  return (
    <div className='app-container'>
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
        <Switch>
          <Route path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/anecdotes/:id' component={({match})=> {
            //console.log('Props: ', match)
            const id = match && match.params && match.params.id
            const anecdote = id && anecdotes[id]
            const message = 'Cannot find anecdote by id'
            return anecdote ? <Anecdote anecdote={anecdote} /> : <Error message={message} />
          }} />
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;
