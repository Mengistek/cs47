const express = require('express');
const app = express.Router();
var path = require("path");
let myData = {};
let pickedFlavor;

app.use("/postQuantity", function (req, res, next) {
    console.log(parseInt(req.body.quantity))
    console.log(!parseInt(req.body.quantity) || parseInt(req.body.quantity) <= 0)
    if (!parseInt(req.body.quantity) || parseInt(req.body.quantity) <= 0)
        next("Select Quantity")
    else
        next();
})

app.use("/postFlavor", function (req, res, next) {
    if (!req.body.flavor)
        next("Select atleast one flavor")
    else
        next();
})
function landingPage(req, res, next) {
    console.log(" HEEEE ")
    res.sendFile(path.join(__dirname, 'index.html'))
}
function quantity(req, res, next) {
    res.sendFile(path.join(__dirname, 'quantity.html'))
}
function thankYou(req, res, next) {
    res.send(myData)
}
app.get('/', landingPage)

app.get('/selectQuantity', quantity)
app.get('/thankyou', thankYou);
app.post('/postQuantity', function (req, res, next) {
    if (Array.isArray(pickedFlavor))
        for (let flavor of pickedFlavor) {
            if (myData[flavor])
                myData[flavor] += parseInt(req.body.quantity);
            else
                myData[flavor] = parseInt(req.body.quantity);
        }
    else {
        if (myData[pickedFlavor])
            myData[pickedFlavor] += parseInt(req.body.quantity);
        else
            myData[pickedFlavor] = parseInt(req.body.quantity);
    }
    res.redirect('/thankyou')
})
app.post('/postFlavor', function (req, res, next) {
    console.log(req.body.flavor)
    pickedFlavor = req.body.flavor;
    res.redirect('/selectQuantity')
})

module.exports=app;