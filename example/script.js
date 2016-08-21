
// show the dev tools by default
require('nw.gui').Window.get().showDevTools().resizeTo(800, 1000);


var aw = require('../lib');

var spawn = require('child_process').spawn,
  child = spawn('node', ['spawn.js']);


child.stdout.on('data', function (e) {
  var str = e.toString().trim();
  console.log(str);
  console.log.apply(console, aw.parse(str));
});

child.stderr.on('data', function (e) {
  var str = e.toString().trim();
  console.log(str);
});
