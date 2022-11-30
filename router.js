var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.render(index.html);
});

router.get('/contact', function (req, res) {
    res.sendFile(__dirname+'/public/contact.html')
})

module.exports = router;