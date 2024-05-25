const express = require('express');
const app = express();
var path = require("path");
var router = require("./routes")

app.listen(80, () => {
    console.log('Your Server is running on 80');
})
//Read the parameters from post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/img', express.static(path.join(__dirname, '../../images')));


app.use(router);
app.use(function (req, res, next) {
    res.send("404");
})

app.use(function (error, req, res, next) {
    res.send(error);
})