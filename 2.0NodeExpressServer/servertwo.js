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
    console.log("Loogging");
})


app.get("/customer", (req, res) => {
    res.json(customersList)
})


const port = process.env.PORT_NUMBER || 3000

app.listen(port, () => {
    console.log(`Node App running on port ${port}`);
})     