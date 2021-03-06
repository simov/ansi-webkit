
var express = require('express'),
  logger = require('morgan');
var request = require('request');
require('colors');
var c = require('cli-color');


var app = express()
  .use(logger('dev'));

app.get('/', function (req, res) {
  console.log('Hello World'.rainbow);
  res.end();
});

app.listen(3000, function () {
  // colors
  console.log(
    'Test'.red,
    'app'.yellowBG,
    'listening'.underline,
    'on'.italic,
    'port'.strikethrough,
    '3000'.green.bold
  );
  // cli-color
  console.log(
    c.red('Test'),
    c.bgYellow('app'),
    c.underline('listening'),
    c.italic('on'),
    c.strike('port'),
    c.green.bold('3000')
  );
});


// colors
console.log('spawn'.bold.red.greenBG);
console.log('str1'.red + 'str2'.blueBG + 'str3'.red + 'str4'.bold.green + 'str5');
// cli-color
console.log(c.bold.red.bgGreen('spawn'));
console.log(c.red('str1') + c.bgBlue('str2') + c.red('str3') + c.bold.green('str4') + 'str5');

request.get('http://localhost:3000', function (err, res, body) {
  console.log('DONE!'.italic);
  console.log(c.italic('DONE!'));
});
