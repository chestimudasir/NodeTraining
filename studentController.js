const express = require('express');
const app = express();
const Student = require('C:/Users/hp/express/model/Student');

exports.addStudent = async (req, res)=>{

    const student = new Student({
        name: req.body.name,
        school: req.body.school,
        subject: req.body.subject
    });
    try{
        const savedStudent = await student.save();
        res.send({student: student._id});
    } catch(error){
        res.status(400).send(error);
    }

}
exports.getAverageOfAllStudents = async(req, res) =>{
    Student.aggregate([
        {
            $project:{
                _id: 0,
                name: 1,
                school: 1,
                'avg_marks_quaterly':{
                    $avg: "$subject.quaterly"
                },
                'avg_marks_yearly':{
                    $avg: "$subject.yearly"
                }
            },
            
        }, 
    ]).exec((err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}
exports.getAverageOfSubject = async(req, res)=>{
    Student.aggregate([
        {
            $unwind: "$subject"
        },
        {
            $group:{
                _id: "$subject.sub",
                avg_quaterly: {$avg:"$subject.quaterly"},
                avg_yearly: {$avg: "$subject.yearly"}
            }
        }
    ]).exec((err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}
exports.bestSchoolInEachSubject = async(req, res) =>{
    Student.aggregate([
        {
            $unwind: "$subject"
            
        },
        {
            $group: {
                _id: {
                    sub: "$subject.sub", school: "$school"
                },
                avg_quaterly: {$avg: "$subject.quaterly"},
                avg_yearly:{$avg: "$subject.yearly"}
            }
        },
        {
            $sort:{
                avg_yearly: -1,
            }
        }
        
        
        
        
    ]).exec((err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}
exports.bestStudentInEachSubject = async (req, res)=>{
    Student.aggregate([
        {
            $match:{'subject.sub': req.query.sub_name}
        },
        {
            $project:{
                _id: 1,
                subMarks:{
                    $filter:{
                        input:"$sub",
                        as:"requiredSub",
                        cond:{$eq: ['$$requiredSub.sub', req.query.name]}
                        
                    }
                },
                name:1,
                school: 1,
            }
        },
        {
            $project:{
                _id: 1,
                subMarks:{
                    $cond:{
                        if:{$eq:[req.query.result_type, 'yearly']},
                        then:{
                            $arrayElemAt:["$subMarks.yearly" ,0]
                        },
                        else:{
                            $arrayElemAt: ["$subMarks.quaterly", 0]
                        }
                    }
                },
                name:1,
                school:1
            }
        }, 
        {$sort:{"subMarks": -1}},
        {$limit:10}
    ]).exec((err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
}
exports.bestSchool = async(req, res)=>{
    Student.aggregate([
        {
            $project:{
                school:1,
                avgMarks:{
                    $cond:{
                        if:{$eq :[req.query.type, 'yearly']},
                        then: {$avg: "$subject.yearly"},
                        else: {$avg: "$subject.quaterly"}
                    }
                }
            }
        },
        {
            $group:{
                _id:"school",
                avg:{$avg: "$avgMarks"}
            }
        },
        {
            $sort:{avg: -1}
        },
        {
            $limit: 1
        }
    ]).exec((err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
}