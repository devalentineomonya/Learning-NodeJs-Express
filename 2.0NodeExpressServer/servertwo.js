const { urlencoded } = require('express');

const app = require('express')();
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

app.get("/", (req, res) => {
    console.log("Welcome to my api");
})


app.get("/customer", (req, res) => {
    res.json(customersList)
})



app.post("/customer", (req, res) => {
    console.log(`This user submitted ${req.body}`);
    res.send(req.body)
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

app.listen(port, () => {
    console.log(`Node App running on port ${port}`);
})     