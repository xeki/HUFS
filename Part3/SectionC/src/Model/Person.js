const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGO_DB_URL;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = mongoose.Schema(
  {
    name: String, 
    number: String
  },
  {
    toJSON: {
      transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
      }
    }
  }
);

const Person = mongoose.model('Person', personSchema);

module.exports = Person
