const mongoose = require('mongoose'); 
const customerSchema = new  mongoose.Schema({
    name: String,
    city: String,
   }) 
 
module.exports =  mongoose.model("Customer", customerSchema)