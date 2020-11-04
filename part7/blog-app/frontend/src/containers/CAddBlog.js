import {connect} from 'react-redux'
import AddBlog from '../components/AddBlog'
import { addNote } from '../redux/actions/notesActions'

const mapStateToProps = ({auth}) => ({auth})

const CAddBlog = connect(mapStateToProps, {addNote})(AddBlog)

export default CAddBlog
