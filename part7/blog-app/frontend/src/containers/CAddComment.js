import {connect} from 'react-redux'
import * as blogActions from '../redux/actions/notesActions'
import AddComment from '../components/AddComment'

const CAddComment = connect(null, {addComment: blogActions.addComment})(AddComment)

export default CAddComment
