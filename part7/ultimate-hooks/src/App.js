import React, { useState, useEffect } from 'react'
import actions from './redux/actions'
import { connect } from 'react-redux'
import {map} from 'lodash'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => setValue('')

  return {
    basic: {
       type,
      value,
      onChange
    },
    reset
  }
}

const useResource = (baseUrl, getAllRecords, record) => {
  useEffect(() => {
    const getAll = async (url, record) => {
      await getAllRecords(url, record)
    }
    getAll(baseUrl, record)
  }, [baseUrl,record, getAllRecords])
}
 
const App = (props) => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const {notes, persons} = props
 
  const notesUrl = 'http://localhost:3005/notes'
  const personsUrl = 'http://localhost:3005/persons' 
  useResource(notesUrl, props.getAllRecords, 'notes')
  useResource(personsUrl, props.getAllRecords, 'persons')

  const handleLike = (event, blog) => {
    event.preventDefault();
    props.updateRecord(blog.id, {...blog, likes: blog.likes + 1},notesUrl,'notes')
  }
  
  const handleDeleteNote = (e, id) => {
    e.preventDefault();
    props.deleteRecord(id, notesUrl, 'notes')
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    console.log('Creating note: ', content.basic.value )
    props.createRecord({ content: content.basic.value, likes: 0 }, notesUrl, 'notes')
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    props.createRecord({ name: name.basic.value, number: number.basic.value}, personsUrl, 'persons')
    name.reset()
    number.reset()
  }

  return (
      <div>
        <h2>notes</h2>
        <form onSubmit={handleNoteSubmit}>
          <input {...content.basic} />
          <button>create</button>
        </form>
        {map(notes, n => <div key={n.id}>
          {n.content}
          <button
            key={n.id}
            onClick={(e) =>handleLike(e,n)}
            style={{
              margin: '5px', 
              color: 'white', 
              backgroundColor: 'skyblue'
              }}>
               {n.likes} Like
          </button>
          <button 
            key={n.id}
            onClick={(e) => handleDeleteNote(e, n.id)}
            style={{
              backgroundColor: 'red', 
              color: 'white'
            }}>
              Delete
          </button>
        </div>)}

        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name.basic} /> <br/>
          number <input {...number.basic} />
          <button>create</button>
        </form>
        {map(persons, n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
  )
}

const mapStateToProps = ({notes, persons}) => ({notes, persons})

export default connect(mapStateToProps, {...actions})(App)
