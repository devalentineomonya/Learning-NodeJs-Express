const express = require('express')
const app = express();
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const CustomerModel = require('./src/models/customer')


// if(process.env.NODE_ENV !=== 'production'){
//     require('dotenv').config()
// }


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
// app.use(express.json());
// app.use(express.urlencoded({extended: true}))

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
        res.send(`Message: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
})



app.post("/customer", async (req, res) => {
    try {
        const newCustomer = new CustomerModel(res.body) 
        await newCustomer.save()
        res.status(201).send(`${res.body.name} Added to db successfully`);

    } catch (error) {
        res.status(500).send("Server responded with error 500")

    }
})


app.get("/customer/:id", (req, res) => {
    console.log(req.params)
    res.status(200)
    res.send(req.params)
})


app.put("/customer/:id", (req, res) => {
    res.send(`Updated user with id : ${req.params.id}`)
})

app.delete("/customer/:id", (req, res) => {
    res.send(`Deleted user with id : ${req.params.id}`)
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






