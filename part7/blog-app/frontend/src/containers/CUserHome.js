import {connect} from 'react-redux'
import UserHome from '../components/UserHome'
import * as authActions from '../redux/actions/authActions'
import * as blogActions from '../redux/actions/notesActions'

const mapStateToProps = ({auth, notes, operation}) => ({
  auth, notes, operation
})

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(authActions.logOutPerson()),
  getAllNotes: async () => dispatch(blogActions.getAllNotes())
})

const CUserHome = connect(mapStateToProps, mapDispatchToProps)(UserHome)

export default CUserHome
