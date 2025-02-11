require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const { studentRouter, teacherRouter, classRouter } = require('./routes');

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => res.send('Server is listening...'));

app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/classes', classRouter);

if (!module.parent) {
  app.listen(process.env.PORT || 4321, () => console.log('server running on port: ', process.env.PORT || 4321));
};

module.exports = app;
