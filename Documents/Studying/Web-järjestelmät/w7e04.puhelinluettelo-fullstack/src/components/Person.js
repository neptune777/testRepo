
import React from 'react';

// 
// Nimi:Matti Kinnunen
// OpNro:268351
//




// Person.js--------------------------------------------------------------------------------------------------------------


const Person = (props) => {

  //console.log('Person, id',props)

  if (props.delete === "true") {
    return (
      <span >{props.name} {props.number}</span>
    )
  } else {

    return (
      <p><li>{props.name} {props.number}</li></p>
    )

  }

}




export default Person
