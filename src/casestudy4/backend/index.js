const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/college', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('db connected');
}

const studentSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    fatherName: String,
    gender: String,
    branch: String,
    rollNo: String,
    motherName: String,
    phoneNumber: String,
    emailId: String,
    address: String,
    city: String,
    state: String,
    country: String,
    dateOfBirth: String,
    bloodGroup: String,
});

const Student = mongoose.model('Student', studentSchema);
const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/student-signup', async (req, res) => {
    const { username, password } = req.body;
    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    const student = new Student({ username, password });
    await student.save();
    res.json({ success: true, message: 'Student signed up successfully' });
});

server.post('/student-login', async (req, res) => {
    const { username, password } = req.body;
    const student = await Student.findOne({ username, password });
    if (student) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

server.get('/student-data', async (req, res) => {
    const { username } = req.query;
    const student = await Student.findOne({ username });
    res.json(student);
});

server.post('/student-registration', async (req, res) => {
    const {
        username, firstName, lastName, fatherName, gender, branch, rollNo,
        motherName, phoneNumber, emailId, address, city, state, country,
        dateOfBirth, bloodGroup
    } = req.body;

    let student = await Student.findOneAndUpdate(
        { username },
        {
            firstName, lastName, fatherName, gender, branch, rollNo,
            motherName, phoneNumber, emailId, address, city, state, country,
            dateOfBirth, bloodGroup
        },
        { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Registration data saved', data: student });
});

server.listen(8085, () => {
    console.log('server started');
});