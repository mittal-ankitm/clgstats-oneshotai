const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    collegeid:{
        type:ObjectId,ref:"college"
    },
    skills:[{ 
        type:String,
        required:true
    }]
})

module.exports=mongoose.model("student",studentSchema);
