const app = require('express')();

app.get("/",(req, res) => {
    console.log("Loogging");  
})
const port = process.env.PORT_NUMBER || 3000

app.listen(port, ()=>{
    console.log(`Node App running on port ${port}`);
})     