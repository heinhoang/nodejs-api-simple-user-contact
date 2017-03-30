const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const express = require('express');
const router = express.Router();

const contacts = require('../../controllers/contacts');

/* GET contacts listing. */
router.get('/', function(req, res) {
  let queries = url.parse(req.url, true).query;
  if(Object.keys(queries).length === 0) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(contacts.list()));
  } else {
    res.setHeader('content-type', 'application/json');
    console.log(queries);
    res.end(JSON.stringify(contacts.query_by_arg(queries.arg, queries.value)));
  }
});

// get contact by primary phone number
router.get('/:number', function(req, res) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.query(req.params.number)));
});

module.exports = router;
