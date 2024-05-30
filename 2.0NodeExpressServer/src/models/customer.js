const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: String,
    orders: [
        {
            name: String,
            description: String,
            priceInCents: Number
        }
    ]
})

module.exports = mongoose.model("Customer", customerSchema)