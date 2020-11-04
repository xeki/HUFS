import {filter} from 'lodash'
export const getNotesByPersonId = (notes, id) => {
  return filter(notes.notes, note => note.user.id === id)
}