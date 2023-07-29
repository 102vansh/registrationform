const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const Collection = require("../models/data")
mongoose.connect("mongodb://127.0.0.1:27017/formdetails" ,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => {
    console.log("connection succeful")
}).catch((e) => {
    console.log(e)
})