var express = require('express');
var router = express.Router();


var dataInstance = require("./data");

var data = new dataInstance().getInstance();
router.use(express.json());

router.post('/',function(req,res){
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        if (data.checkPassword(username,password)){
            res.send(data.setSecret(username));
        }else{
            res.status(401).send();
        }
        
    }else{
        res.status(401).send();
    }

});

module.exports = router;