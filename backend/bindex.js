const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const client = require('./configs/db');
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const app = express();

app.use(express.json());
app.use(cors()); 

const port = process.env.PORT || 8000;

client.connect((err) => {

    if(err) {
        console.log(err);
    }
    console.log("Connected to database!");
});

app.get('/',(req,res) => {
    res.status(200).send("server is up and running!!");
})

app.use('/auth',authRoutes);
app.use('/note',noteRoutes)


app.listen(port , () => {
    console.log(`server is running on port ${port}`);
});

