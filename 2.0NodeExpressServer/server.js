// import express from 'express';

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.post("/login", (req, res)=>{
    res.send("Logged in successfully")
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
