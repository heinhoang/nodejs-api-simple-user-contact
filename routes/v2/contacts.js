const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const express = require('express');
const router = express.Router();

const contactsModelTwo = require('../../models/contacts');
const contactsControllerTwo = require('../../controllers/v2/contacts');

// Create
router.put('/', function(req, res) {
    contactsControllerTwo.create(contactsModelTwo, req.body, res);
});
// Read
router.get('/', function(req, res) {
    contactsControllerTwo.list(contactsModelTwo, req, res);
});
// Update
router.post('/', function(req, res) {
    contactsControllerTwo.update(contactsModelTwo, req.body, res);
});

// Read end point
router.get('/:number', function(req, res) {
    contactsControllerTwo.getByNumber(contactsModelTwo, req.params.number, res);
});
// Delete end point
router.delete('/:number', function(req, res) {
    contactsControllerTwo.remove(contactsModelTwo, req.params.number, res);
});

module.exports = router;