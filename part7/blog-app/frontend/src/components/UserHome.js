import React, { useEffect } from 'react'
import {Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../App.css'
import CUserBlogList from '../containers/CUserBlogList'
import { LogOutForm } from './LogOut'
import CUserOwnBlogs from '../containers/CUserOwnBlogs'
import CBlogDetails from '../containers/CBlogDetails'

const UserHome = (props) => {
  const {operation, auth, logOut, getAllNotes} = props
  const {user} = auth

  useEffect(() => {
    async function getAll() {
      await getAllNotes()
    }
    user && getAll()
  }, [user, getAllNotes])

  const logOutUser = () => {
    localStorage.clear()
    logOut()
  }

  const renderPage = () => {
    if (!user) {
      return <Redirect to='/login' />
    } else {
      return <>
        <LogOutForm name={user.userName} logOutUser={logOutUser} />
        <Router>
          <Switch>
            <Route path='/user/list' exact component={CUserBlogList} />
            <Route path='/user/blog/:id' component={CBlogDetails} />
            <Route path='/user/:id' component={CUserOwnBlogs} />
            <Redirect to='/user/list' />
          </Switch>
        </Router>
      </>
    }
  }
  return (
    <div>
       {operation.status !== 'success' && <p id='message'>{operation.status}</p>}
        {renderPage()}
    </div>)
}

export default UserHome
