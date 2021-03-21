const express=require("express");
const router=express.Router()
const mongoose=require("mongoose")
const student=require('../models/student')
const college=require("../models/college")


router.get('/studentstate',async (req,res)=>{
    
    college.aggregate([
        {$group:{
            _id:'$state',
            count:{$sum:'$numberStudents'}
        }
    }]).then(data=>{
        data=data.map(item=>{return [item._id,item.count]})
        return res.json(data);
    }).catch(err=>{
        return res.json({err:err});
    })    
        
})

router.get('/studentcourse',async (req,res)=>{
    student.aggregate([
        {$group:{
            _id:'$branch',
            count:{$sum:1}
        }
    }]).then(data=>{
        data=data.map(item=>{return [item._id,item.count]})
        return res.json(data);
    }).catch(err=>{
        return res.json({err:err});
    })    
})

router.get('/student/id/:id',(req,res)=>{
    student.findOne({id:req.params.id})
    .populate("collegeid")
    .then(data=>{
            return res.json(data);
    }).catch(err=>{
        return res.json({err:err})
    })
})

router.get('/student/clg/:id',(req,res)=>{
    college.findOne({id:req.params.id})
    .then(clgid=>{
        student.find({collegeid:clgid._id})
        .populate("collegeid")
        .then(data=>{
                return res.json(data);
        }).catch(err=>{
            return res.json({err:err})
        })
    }).catch(err=>{
        return res.json({err:err})
    })
    
})

router.post('/student/state',(req,res)=>{
    const query=req.body.query
    student.find()
    .populate("collegeid")
    .then(data=>{
        data=data.filter(item=>item.collegeid.state==query)
        return res.json(data);
    }).catch(err=>res.json({err:err}));
})
router.post('/student/course',(req,res)=>{
    const query=req.body.query
    student.find({branch:query})
    .populate("collegeid")
    .then(data=>{
        return res.json(data);
    }).catch(err=>res.json({err:err}));
})


module.exports=router