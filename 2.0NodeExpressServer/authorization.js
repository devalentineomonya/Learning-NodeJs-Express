const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT_NUMBER || 3000;
const connection = process.env.CONNECTION_STRING || 'mongssodb://localhost:27017/testCollection'



app.get("/",(req, res)=>{
    res.send("Welcome to our node application")
})



const start = async () => {
    try {
        await mongoose.connect(connection)
        app.listen(port, () => {
            console.log("App running on port " + port)
        })
    } catch (e) {
        console.log(e.message)
    }
}



start()
