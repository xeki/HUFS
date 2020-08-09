import React, {useEffect} from 'react'
import AddAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import {useDispatch} from 'react-redux'
import {initializeAnecdotes} from './actions'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Filter />
      <h2>create new</h2>
      <AddAnecdote />
      <AnecdoteList />
    </div>
  )
}

export default App