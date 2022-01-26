const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json({limit:'2mb'}));
app.use(express.urlencoded({extended: true, limit:'2mb'}));
app.use(cors());
app.use("/server", require('./routes/router'))

if(process.env.NODE_ENV == "production") {
    app.use(express.static("./client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
mongoose.connect(
    process.env.URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}  
)
.then(() => app.listen(port, console.log("application listening on port " + port + " 👍")))
.catch((err) => console.log('DB connection failure ❌', err))









