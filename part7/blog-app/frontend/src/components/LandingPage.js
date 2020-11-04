import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = () => (
  <div>
    <div><Link to='/login'>To login page</Link></div>
    <div><Link to='/user/new'>To Add new person</Link></div>
  </div>
)

export default LandingPage
