require('dotenv').config();
const express = require('express');
const router = express.Router();
const clientId = process.env.CLIENT_ID;
redirect_url = process.env.RED_URL;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Google Authentication',
    google_client_id: clientId,
    red_url:redirect_url
  });
});

module.exports = router;
