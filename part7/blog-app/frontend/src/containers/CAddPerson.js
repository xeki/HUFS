import {connect} from 'react-redux'
import personActions from '../redux/actions/personsActions'
import AddPerson from '../components/AddPerson'

const mapStateToProps = (state) => ({
  status: state.operation.status
})

const mapDispatchToProps = (dispatch) => ({
  addPerson: (person) => dispatch(personActions.createPerson(person))
})

const CAddPerson = connect(mapStateToProps, mapDispatchToProps)(AddPerson)

export default CAddPerson
