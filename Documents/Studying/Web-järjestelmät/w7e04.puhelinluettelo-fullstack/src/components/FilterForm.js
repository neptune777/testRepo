
import React from 'react'
import ListStyle from './ListStyle'
import Person from './Person'

// 
// Nimi:Matti Kinnunen
// OpNro:268351
//




// FilterForm.js--------------------------------------------------------------------------------------------------------------


const FilterForm = (props) => {
  console.log("Props ",props)
  
    return (
      <ul style={ListStyle}>
        {props.nimet.map(person => <p key={person.id}><li ><Person  name={person.name} number={person.number} delete={props.delete}/>  <button key={person.id} id={person.id} name={person.name}  onClick={props.delMethod}>poista</button> </li></p>)}
  
      </ul>
    )
  }

 




export default FilterForm
