const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Error: Mandatory arguments missing')
  process.exit(0)
}

const pw = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://xezu:${pw}@usercluster-j46tg.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const contactSchema = mongoose.Schema({name: String, number: String})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({name, number})

const saveContact = () => {
  contact.save().then(r => {
    console.log('added ', r.name, ' number ', r.number, ' to phonebook')
    mongoose.connection.close()
  })
}

const fetchContacts = () => {
  console.log('Phone book:')
  Contact.find({}).then(results => {
    results.forEach(r => {
      console.log(r.name, r.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  fetchContacts()
} else if (process.argv.length === 5) {
  saveContact()
}