const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    primarycontactnumber: { type: String, index: { unique: true } },
    firstname: String,
    lastname: String,
    title: String,
    company: String,
    jobtitle: String,
    othercontactnumbers: [String],
    primaryemailaddress: String,
    emailaddresses: [String],
    groups: [String]
});

const ContactModel = mongoose.model('ContactModel', contactSchema);

module.exports = ContactModel;