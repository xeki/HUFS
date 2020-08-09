

const filterAnecdotesByVotes = (anecdotes) => anecdotes.sort((a,b)=> b.votes - a.votes)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_ANECDOTES': {
      return filterAnecdotesByVotes(action.payload)
    }
    case 'VOTE': {
      const votedIndex = state.findIndex(e => e.id === action.payload.id)
      const newState = state.slice()
      newState[votedIndex] = action.payload
      console.log('New state: ', newState)
      return filterAnecdotesByVotes(newState)
    }
    case 'CREATE': {
      const newState = [...state, action.payload]
      return filterAnecdotesByVotes(newState)
    }
    default:
      return state
  }
}

export default reducer