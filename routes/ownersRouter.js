const express = require('express');
const router = express.Router();

router.get("/", function (req, res){
    res.send("hey its's working");
})

module.exports = router;