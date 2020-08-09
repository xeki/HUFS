const notificationReducer = (state={message: ''}, action) => {
  switch(action.type) {
    case 'DISPLAY_NOTIFICATION':
      const {message, timer} = action.payload
      state.timer && clearTimeout(state.timer)
      return ({message, timer})
    case 'CLEAR_NOTIFICATION':
      return {message: ''}
    default:
      return state
  }
}

export default notificationReducer
