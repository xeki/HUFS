const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog'
  }
},
{
  toJSON: {
    transform: (doc, returnedObj) => {
      returnedObj.id = returnedObj._id.toString()
      delete returnedObj._id
      delete returnedObj.__v
    }
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
