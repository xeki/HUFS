import {connect} from 'react-redux'
import personActions from '../redux/actions/personsActions'
import UserOwnBlogs from '../components/UserOwnBlogs'
import * as blogActions from '../redux/actions/notesActions'

const mapStateToProps = ({auth, operation, notes}) => {
  return ({
    person: auth.user,
    status: operation.status,
    auth,
    blogs: notes
  })
}

const mapDispatchToProps = (dispatch) => ({
  getPersonById: async (id) => await dispatch(personActions.getPersonById(id)),
  updateNote: async (blog, authToken) => dispatch(blogActions.updateNote(blog, authToken)),
  deleteNote: async (id, authToken) => dispatch(blogActions.deleteNote(id, authToken)),
})

const CUserOwnBlogs = connect(mapStateToProps, mapDispatchToProps)(UserOwnBlogs)

export default CUserOwnBlogs
