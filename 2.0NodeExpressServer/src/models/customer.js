const mongoose = require('mongoose'); 
const customerSchema = new  mongoose.Schema({
    name: String,
    industry: String
}) 
 
module.exports =  mongoose.model("Customer", customerSchema)