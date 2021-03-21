const mongoose=require("mongoose");
const collegeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    numberStudents:{
        type:Number,
        required:true
    },
    courses:[{
        type:String,
        required:true
    }]
})

module.exports=mongoose.model("college",collegeSchema);