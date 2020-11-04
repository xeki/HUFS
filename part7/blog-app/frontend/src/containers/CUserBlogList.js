import UserBlogList from '../components/UserBlogList'
import {connect} from 'react-redux'

const mapStateProps = ({notes, auth}) => ({
  notesStat: notes.notesStat,
  user: auth.user
})

const CUserBlogList = connect(mapStateProps, {})(UserBlogList)

export default CUserBlogList
