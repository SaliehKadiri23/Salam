const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/home", (req, res)=>{
    res.send("This Is the homepage mate");
})
app.get("/cow", (req, res)=>{
    res.send("This Is the cowpage mate");
})

app.listen(7000, () => {
    console.log("RUNNING ON PORT: 7000");
})