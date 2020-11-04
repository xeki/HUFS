import Login from '../components/LoginPage'
import {connect} from 'react-redux'
import { loginPerson} from '../redux/actions/authActions'

const mapStateToProps = ({auth}) => ({
  user: auth.user,
  authToken: auth.authToken
})

const CLogin = connect(mapStateToProps, { loginPerson})(Login)

export default CLogin
