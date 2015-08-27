var express = require('express');
var router = express.Router();

var vcapServices = process.env['VCAP_SERVICES'];
console.log(vcapServices);
var vcap = JSON.parse(vcapServices);
console.dir(vcap);
var twillioCreds = vcap['user-provided'][0]['credentials']
console.dir(twillioCreds);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* POST sms message. */
router.post('/sms', function (req, res, next) {
    console.log(req.body.text)
    // Twilio Credentials
    var accountSid = twillioCreds.accountSID;
    var authToken = twillioCreds.authToken;

//require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: "5038162515",
        from: "+17206192515",
        body: req.body.text,
    }, function(err, message) {
        console.log(message.sid);
    });
    res.redirect('/');
});

module.exports = router;
