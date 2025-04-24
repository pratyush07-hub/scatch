const mongoose = require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/scatch")  // yeh sirf local server se  connect hoga hamare laptop ke mongodb se
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;
