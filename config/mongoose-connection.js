const mongoose = require("mongoose");
const config = require('config');

const dbgr = require('debug')('development:mongoose');

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)  // yeh sirf local server se  connect hoga hamare laptop ke mongodb se -- ab sahi hai
.then(function(){
    dbgr("connected");  // $env DEBUG=development:* or DEBUG=
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
