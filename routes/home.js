var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    const userEmail = req.user.email;
    const userName = req.user.name;
    
    return res.status(200).json({ 
        message: `Welcome to home page, ${userName}`, 
        userEmail: userEmail 
    });
});


module.exports = router;
