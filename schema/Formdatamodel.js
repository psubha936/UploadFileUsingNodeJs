const mongoose = require('mongoose');
const formDataSchema = new mongoose.Schema({
 name: String,
 email: String,
 message: String,
 photo: String,
 file: String,
});
const FormDataModel = mongoose.model('FormData', formDataSchema);
module.exports = FormDataModel; 