const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const express = require('express');
const router = express.Router();

const contacts = require('../controllers/contacts');

// Get groups listing
router.get('/', function(req, res) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.list_groups()));
});

// get members by group_name
router.get('/:name', function(req, res) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.get_members(req.params.name)));
});
module.exports = router;
