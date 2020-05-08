const express = require('express');
const router = express.Router();
const studentController = require('C:/Users/hp/express/controller/studentController');


router.post('/add-student', studentController.addStudent);
router.get('/avg-marks-student', studentController.getAverageOfAllStudents);
router.get('/avg-marks-subject', studentController.getAverageOfSubject);
router.get('/best-school-subject', studentController.bestSchoolInEachSubject);
router.get('/best-student-subject',studentController.bestStudentInEachSubject);
router.get('/best-school',studentController.bestSchool);
module.exports = router;