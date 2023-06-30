const express = require("express");
const router = express.Router();
const students = require("../models/studentSchema");

router.post("/add",async(req,res)=>{
    
     const {name,rollNumber,attendance,marks} = req.body;
 
     try {
         
         const prestudent = await students.findOne({rollNumber:rollNumber});
        // console.log(prestudent);
 
         if(prestudent){
             res.status(422).json("This is student is already present");
         }else{
             const addstudent = new students({
                 name,rollNumber,attendance,marks
             });
 
             await addstudent.save();
             res.status(201).json(addstudent);
             //console.log(addstudent);
         }
 
     } catch (error) {
         res.status(422).json(error);
     }
});


// get all students data
router.get("/getStudentsData",async(req,res)=>{
     try {
         const studentsData = await students.find();
         res.status(201).json(studentsData);
        //  console.log(studentsData);
     } catch (error) {
         res.status(422).json(error);
     }
})

//get individual student data
router.get("/getStudent/:rollNumber",async(req,res)=>{
    try {
        //console.log(req.params);
        const {rollNumber} = req.params;

        const student = await students.find({rollNumber:rollNumber});
        //console.log(student);
        res.status(201).json(student)

    } catch (error) {
        res.status(422).json(error);
    }
})

//delete All
router.delete("/deleteAllStudents",async(req,res)=>{
    try {
        const newStudents = await students.remove({ })

        res.status(201).json(newStudents);
    

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete student
router.delete("/deleteStudent/:rollNumber",async(req,res)=>{
    try {
        const {rollNumber} = req.params;

        const deleteStudent = await students.deleteOne({rollNumber:rollNumber})
        res.status(201).json(deleteStudent);
    

    } catch (error) {
        res.status(422).json(error);
    }
})


// update student
router.put("/updateStudent/:rollNumber", async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const { name, rollNumber: rN, attendance, marks } = req.body;

    const student = await students.findOne({ rollNumber: rollNumber });
    student.name = name;
    student.rollNumber = rN;
    student.attendance = attendance;
    student.marks = marks;
    await student.save();

    res.status(201).json({ message: "updated successfully" });
  } catch (error) {
    res.status(422).json(error);
  }
});



module.exports = router;
