const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv').config();
const FormDataModel = require('./schema/Formdatamodel');
const app = express();
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
 console.log('Connected to MongoDB');
});
// Multer setup for file upload
const fs = require('fs');
// Multer setup for file upload
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
 const dir = path.join(__dirname, 'uploads');
 fs.mkdirSync(dir, { recursive: true }); // This will create the directory if it doesn't exist
 cb(null, dir);
 },
 filename: (req, file, cb) => {
 cb(null, file.originalname);
 },
 });

const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname, 'view')));
app.get('/', async (req, res) => {
 res.sendFile(path.join(___dirname, 'views', 'index.html'));
});
// Form submission route
app.post('/submit-form', upload.fields([{ name: 'photo', maxCount: 1 }, {
    name: 'file', maxCount: 1 }]), async (req, res) => {// Process form data and save to MongoDB
        const { name, email, message } = req.body;
        const photo = req.files['photo'][0].path;
        const file = req.files['file'][0].path;
        try {
        const formData = new FormDataModel({ name, email, message, photo, file
       });
        await formData.save();
        res.send('Form submitted successfully');
        } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting form');
        }
       });
       app.get('/fetch-data', async (req, res) => {
        try {
        const data = await FormDataModel.find({});
        res.json(data);
        } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
        }
        });
       
       app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
       }); 