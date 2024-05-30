const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
// const cors = require('cors');

dotenv.config()

mongoose.set('strictQuery', false)
const CustomerModel = require('./src/models/customer')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const customersList = [

    {
        id: '1',
        name: 'Customer1',
        city: 'San Francisco',
    },
    {
        id: '2',
        name: 'Customer2',
        city: 'London'
    },
    {
        id: '3',
        name: 'Customer3',
        city: 'Nairobi'
    },
    {
        id: '4',
        name: 'Customer4',
        city: 'Paris'
    }
]
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    console.log("Welcome to my api");
    res.send("<h2>Welcome to my api</h2>")
})

const customer = new CustomerModel({
    name: 'Customer5',
    city: 'Nairobi'
})

// customer.save( )
app.get("/models", async (req, res) => {
    const models = await mongoose.connection.db.listCollections().toArray()
    res.send(models)
})

app.get("/customer", async (req, res) => {
    try {
        const result = await CustomerModel.find()
        res.send(result)

    } catch (error) {
        res.status(500).json({ message: `Server responded with error ${error.message}` })
    }
})



app.post("/customer", async (req, res) => {
    try {
        const newCustomer = new CustomerModel(res.body)
        await newCustomer.save()
        res.status(201).send(`${res.body.name} Added to db successfully`);
    } catch (error) {
        res.status(400).send(`Server responded with error ${error.message}`)

    }
})


app.get("/customer/:id", async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id)
        if (!customer) {
            res.status(404).json({ message: "Customer not found" })
            return
        }
        res.status(200)
        res.send(customer)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})


app.put("/customer/:id", async (req, res) => {
    try {
        const customerId = req.params.id
        await CustomerModel.replaceOne({ _id: customerId }, req.body)
        res.send(`Updated user with id : ${req.params.id}`)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete("/customer/:id", async (req, res) => {
    try {
        const customerId = req.params.id
        await CustomerModel.deleteOne({ _id: customerId })
        res.send(`Deleted user with id : ${req.params.id}`)
    } catch (error) {
        res.send(error.message)
    }
})



const port = process.env.PORT_NUMBER || 3000
const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/customers'

const start = async () => {
    try {
        await mongoose.connect(connectionString);
        app.listen(port, () => {
            console.log(`Node App running on port ${port}`);
        })

    } catch (error) {
        console.log(error.message);
    }
}

start()






