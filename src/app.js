const express = require("express")
const bodyparser = require("body-parser")
const bcrypt = require('bcryptjs')
const path = require("path")
const app = express()
const port = process.env.PORT || 5000
const Collection = require("./models/data")
require("./db/conn")

const staticpath = path.join(__dirname,"../public")
const tempelatepath = path.join(__dirname,"../tempelates/views")
app.set("view engine","hbs")
app.set("views",tempelatepath)
app.use(express.static(staticpath))
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())


const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/formdetails" ,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => {
    console.log("connection succeful")
}).catch((e) => {
    console.log(e)
})
const hashedpassword = async(password) =>{
    const hashkey = await bcrypt.hash(password,12)
    return hashkey
}

app.get("/login",(req,res)=>{
res.render("login")
})
app.post("/login",async(req,res)=>{
    let usermail = req.body.email
    let userpassword = req.body.password
   // console.log(usermail)
   // console.log(userpassword)
    let mykey =  await hashedpassword(userpassword)
    console.log(mykey)
    let userdata = await Collection.findOne({email:usermail})
    if(userdata != null){
       // res.send('Email exist')
    

    const reqdata = await bcrypt.compare(userpassword,userdata.password)
    console.log(reqdata)

    if(reqdata == true){
        res.send('succesfully logged in')
    }
    else{
        res.send('incorrect password')
    }
     } else{
        res.send('email dosent exit')
    }
    
})

app.get("/register",(req,res)=>{
    res.render("register")
    })
    app.post("/register", (req,res)=>{
       /* console.log(req.body.fullname)
        console.log(req.body.email)
        console.log(req.body.phone)
        console.log(req.body.password)*/

        let userdata = new Collection(req.body)
        console.log(userdata)
        if (userdata.password == userdata.confirm) {
        userdata.save()
        res.send("register succesfully")
        }
        else{
            res.send("password do not match")
        }
    })

app.listen(port,(req,res) =>{
    console.log(`sever is connecting at ${port}`)
})