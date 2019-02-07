
import React from 'react';
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import ListStyle from './components/ListStyle'
import Notification from './components/Notification'
import axios from 'axios'
import personService from './services/persons'

//import './components/index.css'


// 
// Nimi:Matti Kinnunen
// OpNro:268351
//



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filteredPersons: [
        {
          id: '',
          name: '',
          number: ''
        }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      deletedName: '',
      deletedNumber: '',
      notification: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.addValues = this.addValues.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }



  componentDidMount() {

    console.log('will mount')
    personService
      .getAll()
      .then(response => {
      //  console.log('response', Object.values(response.data))
      //  response.data.map(res => console.log('res',res))
        let modified = response.data.map(res => res)
     //   modified.map(res => console.log('modified',res))
        
        this.setState({ persons: modified })
      })



  }

  addValues = (event) => {



    let copy = this.state.persons.map(person => person.name);
    let name = this.state.newName;



    if (!copy.includes(name)) {

      let numero = this.state.newNumber;

      const persObject = { name: name, number: numero }


      personService
        .create(persObject)
        .then(response => {

          console.log("response", response.data)

          this.setState({
            persons: this.state.persons.concat(response.data),
            notification: "lisättiin " + persObject.name

          })
        }).then(x => {
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })

    } else {

      const message = name + " on jo luettelossa, korvataanko vanha numero uudella?"
      let result = window.confirm(message);

      if (result) {
        console.log("event.target.name ", this.state.newName)
        var obj = this.state.persons.find(function (obj) { return obj.name === name; });
        let numero = this.state.newNumber;
        const persObject = { id: obj.id, name: name, number: numero }

        personService
          .update(obj.id, persObject)
          .then(response => {

            this.componentDidMount()
            this.setState({

              notification: "päivitettiin " + persObject.name

            })
          }).then(x => {
            setTimeout(() => {
              this.setState({ notification: null })
            }, 5000)
          }).catch(error => {
            this.componentDidMount()
            console.log('Could not update, object not found. A new object added to server instead')
            personService
              .create(persObject)
              .then(response => {

                this.setState({
                  persons: this.state.persons.concat(response.data),
                  notification: "lisättiin " + persObject.name

                })
              }).then(x => {
                setTimeout(() => {
                  this.setState({ notification: null })
                }, 5000)
              })


          })
      } else {
        return;
      }




    }
    event.preventDefault()
  }

  deletePerson = (event) => {
    event.preventDefault()


    let obj = this.state.persons.find(function (obj) { return obj.id === event.target.id; });
    console.log('obj', typeof event.target.id)
    const message = "poistetaanko " + obj.name
    let result = window.confirm(message);



    if (result) {

      personService
        .deletoi(event.target.id)
        .then(response => {
          let ob = Object.values(response.data)

          this.componentDidMount()

          this.setState({

            notification: "poistettiin " + obj.name,
            deletedName: obj.name

          })

        }).then(x => {
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })
    }


  }

  handleNumberChange = (event) => {

    this.setState({ newNumber: event.target.value })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }



  render() {

    if (this.state.filter === '') {
      return (
        <div>
          <h2>Puhelinluettelo</h2>

          <Notification message={this.state.notification} />

          <div> rajaa näytettäviä:
            <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
          </div>
          <h2>Lisää uusi</h2>
          <form onSubmit={this.addValues}>


            <div> nimi:
            <input
                value={this.state.newName}
                onChange={this.handleNameChange}
              />
            </div>

            <div> numero:
            <input
                value={this.state.newNumber}
                onChange={this.handleNumberChange}
              />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          <ul style={ListStyle}>
            {this.state.persons.map(person => <p key={person.id}><li ><Person id={person.id} name={person.name} number={person.number} delete={"true"} />  <button id={person.id} name={person.name} onClick={this.deletePerson}>poista</button> </li></p>)}
          </ul>
        </div>
      )
    } else {

      let c = this.state.persons.map(person => person)
      let names = this.state.persons.filter(x => x.name.toLowerCase().includes(this.state.filter.toLowerCase()))

      console.log("names ", c)
      console.log("filterednames ", names)


      return (
        <div>
          <h2>Puhelinluettelo</h2>

          <Notification message={this.state.notification} />

          <div> rajaa näytettäviä:
              <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
          </div>
          <h2>Lisää uusi</h2>
          <form onSubmit={this.addValues}>


            <div> nimi:
              <input
                value={this.state.newName}
                onChange={this.handleNameChange}
              />
            </div>

            <div> numero:
              <input
                value={this.state.newNumber}
                onChange={this.handleNumberChange}
              />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          <FilterForm nimet={names} delete={"true"} delMethod={this.deletePerson} />
        </div>
      )
    }
  }


}


export default App
