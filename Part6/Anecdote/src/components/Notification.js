import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    marginTop: '4px',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (notification.message ? <div style={style}>
      {notification.message}
    </div> : <div/>)
}

export default Notification