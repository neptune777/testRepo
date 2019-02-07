import React from 'react';

// 
// Nimi:Matti Kinnunen
// OpNro:268351
//




// Notification.js--------------------------------------------------------------------------------------------------------------

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
       <p>{message}</p>
      </div>
    )
  }


  export default Notification