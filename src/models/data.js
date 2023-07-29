const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name :{
        type:String
    },
    email :{
        type:String
    },
    phone:{
        type:Number
    },
    password :{
        type:String
    },
    text:{
        type:String
    },
    dob:{
        type:Number
    },
    confirm:{
        type:String
    }

})
userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    this.confirm = await bcrypt.hash(this.confirm,12)
})

const Collection = new mongoose.model("Collection",userSchema)
module.exports = Collection

