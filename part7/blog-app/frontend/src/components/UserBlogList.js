import React from 'react'
import {isEmpty, map} from 'lodash'
import {Link} from 'react-router-dom'
import './Users.css'

const UserBlogList = (props) => {
  if (isEmpty(props.notesStat)) {
    return <p>Fetching data in progress, please wait ....</p>
  }
  return (<div>
    <h2>Users</h2>
    {!isEmpty(props.notesStat) && (
      <div className='user-stat-container'>
        <div className='user-stat-row'>
          <p className='user-stat-name'><strong>Name</strong></p>
          <p className='user-stat-blogs'><strong>Blogs</strong></p>
        </div>
        {map(props.notesStat,(user, name) =>
          (<div className='user-stat-row' key={name} id={user.userId}>
            <p className='user-stat-name'>
              <Link to={{
                pathname:`/user/${user.userId}`,
                name: user.name
              }}>
                {name}
              </Link></p>
            <p className='user-stat-blogs'>{user.blogsCount}</p>
          </div>)
          )}
      </div>
      )}
  </div>)
}

export default UserBlogList
