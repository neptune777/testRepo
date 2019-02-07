const mongoose = require('mongoose')
let Schema = mongoose.Schema;

const url = require('./db-config')

mongoose.connect(url)

let pers = new Schema({ name: String, number: String, id:String });
let Person = mongoose.model('Person',pers);




Person.format = 
pers.statics.format = function(person) {

   console.log("No niin",person)
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
  };



 


module.exports = Person