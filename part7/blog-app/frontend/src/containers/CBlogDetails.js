import {connect} from 'react-redux'
import BlogDetails from '../components/BlogDetails'
import * as blogActions from '../redux/actions/notesActions'

const mapStateToProps = ({auth, notes}, props) => {
  const blogId = props.match.params.id
  const blog = notes.notes[blogId]
  return ({blog, token: auth.authToken})
}

const mapDispatchToProps = (dispatch) => ({
  deleteBlog: (id, token) => dispatch(blogActions.deleteNote(id, token)),
  updateBlogLikes: (note, token) => dispatch(blogActions.updateNote(note, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)
