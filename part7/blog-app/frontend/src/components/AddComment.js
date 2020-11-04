import React, {useState} from 'react'
import {Button} from '@material-ui/core'

const AddComment = (props) => {
  const [comment, setComment] = useState("")
  const addComment = async () => {
    if (comment.trim() !== "") {
      await props.addComment(props.id, comment)
      setComment('')
    }
  }
  return (<div>
    <div>
      <input type="text" placeholder="comment ... " name="comment" value={comment} onChange={({target}) => setComment(target.value)} />
      <Button variant='contained' color='primary' name="add_comment" onClick={addComment}>Add comment</Button>
    </div>
  </div>)
}

export default AddComment
