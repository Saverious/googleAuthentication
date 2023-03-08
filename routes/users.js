require('dotenv').config();
const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const clientId = process.env.CLIENT_ID;
const client = new OAuth2Client(clientId);
const User = require('../models/userModel');

router.post('/', function(req, res) {
  const csrf_body = req.body.g_csrf_token;
  const csrf_cookie = req.cookies.g_csrf_token;
  const token = req.body.credential;
  
  if(csrf_cookie && csrf_body && csrf_cookie===csrf_body){
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: clientId,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      const user = new User({
        _id:userid,
        name:payload.given_name,
        email:payload.email,
        avatar:payload.picture
      });

      await user.save().then(()=>{
        req.session.user = userid;
        req.session.save();
      });
    }

    verify()
    .then(res.send('<h3>Respond with a resource</h3>'))
    .catch(console.error);
  }else{
    res.send('error getting csrf tokens');
  }
});

module.exports = router;
