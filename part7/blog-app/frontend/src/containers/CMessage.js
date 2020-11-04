import {connect} from 'react-redux'
import Message from '../components/Message'

const mapStateToProps = ({notification}) => ({message: notification.message})

const CMessage = connect(mapStateToProps, {})(Message)

export default CMessage
