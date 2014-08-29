
require('colors');
var express = require('express'),
    logger = require('morgan');
var request = require('request');


var app = express()
    .use(logger('dev'));

app.get('/', function (req, res) {
    console.log('Hello World'.rainbow);
    res.end();
});

app.listen(3000, function () {
    console.log(
        'Test'.red,
        'app'.yellowBG,
        'listening'.underline,
        'on'.italic,
        'port'.strikethrough,
        '3000'.green.bold
    );
});


console.log('spawn'.bold.red.greenBG);

console.log('str1'.red + 'str2'.blueBG + 'str3'.red + 'str4'.bold.green + 'str5');

request.get('http://localhost:3000', function (err, res, body) {
    console.log('DONE!'.zebra);
});
