const { Student } = require('../db');
const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// get one student
router.get('/:uuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.uuid });
  student?.assessments?.sort((a, b) => new Date(a.date) - new Date(b.date));
  res.send(student);
});

// add one student to the class
router.post('/', async (req, res) => {
  const student = await Student.create(req.body);
  await student.save();
  res.send(student);
});

// add one student timeline
router.post('/:uuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.uuid });
  student.assessments.push({ ...req.body, uuid: uuid() });
  await student.save();
  res.send(student);
});

// update one student timeline
router.patch('/:studentUuid/:timelineUuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.studentUuid });
  const timelineIndex = student.assessments.findIndex(
    (timeline) => timeline.uuid === req.params.timelineUuid
  );
  student.assessments[timelineIndex] = {
    ...req.body,
    uuid: req.params.timelineUuid,
  };
  await student.save();
  res.send(student);
});

// edit student profile
router.put('/:studentUuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.studentUuid });
  const { studentName, dob, gender, emergencyContact } = req.body;
  student.studentName = studentName;
  student.dob = dob;
  student.gender = gender;
  student.emergencyContact = emergencyContact;
  await student.save();
  res.send(student);
});

// delete one student from the class
router.delete('/:uuid', async (req, res) => {
  await Student.deleteOne({ uuid: req.params.uuid });
  res.sendStatus(200);
});



module.exports = router;
