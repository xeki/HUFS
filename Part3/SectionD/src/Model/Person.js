const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGO_DB_URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true
    },
    number: {
      type: String,
      minlength: 8,
      required: true
    }
  },
  {
    toJSON: {
      transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
      }
    }
  }
)

personSchema.plugin(mongooseUniqueValidator)

const Person = mongoose.model('Person', personSchema)

module.exports = Person
