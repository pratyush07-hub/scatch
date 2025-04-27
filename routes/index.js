const express = require('express');
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const router = express.Router();

router.get("/", function (req, res){
    let error = req.flash("error");
    res.render("index.ejs", { error });
});

router.get("/shop", isLoggedin , async function (req, res){
    let products = await productModel.find();
    res.render("shop.ejs", { products });
});

module.exports = router;