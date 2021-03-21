const express=require("express");
const router=express.Router()
const mongoose=require("mongoose")
const student=require('../models/student')
const college=require("../models/college")


router.get('/collegestate',async (req,res)=>{
    college.aggregate([{
        $group:{
            _id:'$state',
            count:{$sum:1}
        }
    }]).then(data=>{
        data=data.map(item=>{return [item._id,item.count]})
        return res.json(data);
    }).catch(err=>{
        return res.json({err:err});
    })
        
})

router.get('/collegecourse',async (req,res)=>{
    college.aggregate([
        {$unwind:"$courses"},
        {$group:{
            _id:'$courses',
            count:{$sum:1}
        }
    }]).then(data=>{
        data=data.map(item=>{return [item._id,item.count]})
        return res.json(data);
    }).catch(err=>{
        return res.json({err:err});
    })    
})

router.post('/college/state',(req,res)=>{
    const query=req.body.query
    college.find({state:query})
    .then(data=>{
        return res.json(data);
    }).catch(err=>res.json({err:err}));
})
router.get('/college/list',(req,res)=>{
    college.find()
    .then(data=>{
        return res.json(data);
    }).catch(err=>res.json({err:err}));
})

router.post('/college/course',(req,res)=>{
    const query=req.body.query
    college.find({courses:query})
    .then(data=>{
        return res.json(data);
    }).catch(err=>res.json({err:err}));
})

router.get('/college/id/:id',(req,res)=>{
    college.findOne({id:req.params.id})
    .then(data=>{
        return res.json(data);
    }).catch(err=>{
        return res.json({err:err})
    })
})

router.get('/college/similar/:id',(req,res)=>{
    college.findOne({id:req.params.id})
    .then(data=>{
        college.find({$or:[{city:data.city},{state:data.state}]})
        .limit(5)
        .then(data=>{
            return res.json(data);
        }).catch(err=>res.json(err));
    }).catch(err=>{
        return res.json({err:err})
    })
})
router.post('/search',(req,res)=>{
    let userpattern=new RegExp("^"+req.body.query,"i")

        college.find({$or:[{name:{$regex:userpattern}},{id:{$regex:userpattern}}]})
        .limit(50)
        .then(clgdata=>{
            student.find({$or:[{name:{$regex:userpattern}},{id:{$regex:userpattern}}]})
            .limit(50)
            .then(studata=>{
                return res.json({clgdata:clgdata,studata:studata});
            }).catch(err=>res.json({err:err}));
            
        }).catch(err=>res.json({err:err}));

})

module.exports=router