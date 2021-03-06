
var ansi = require('./ansi'),
  themes = require('./themes');


exports.tokenize = function (str) {
  for (var key in ansi) {
    var open = ansi[key][0],
      close = ansi[key][1];

    str = str.replace(
      new RegExp('\\'+open, 'g'),
      '<~'+key+'~>'
    );
    str = str.replace(
      new RegExp('\\'+close, 'g'),
      '<~off~>'
    );
  }

  return str
    .replace(new RegExp('','g'), '')
    .replace(new RegExp('\\[0m','g'), '<~off~>')
    .replace(/(?:\<~off~\>){2,}/g, '<~off~>')
    .trim();
}

exports.detokenize = function (str) {
  str = this.tokenize(str);

  var arr = str.split('<~'), result = [], tmp = [];

  for (var i=0; i < arr.length; i++) {
    if (!arr[i]) continue;

    var part = arr[i].split('~>');
    tmp.push(part[0]);

    if (part.length > 0 && part[1]) {
      result.push({keys:tmp, str:part[1]});
      tmp = [];
    }
  }

  return result;
}

exports.css = function (keys, theme) {
  theme = theme||'default';

  var result = [];
  for (var i=0; i < keys.length; i++) {
    result.push(themes[theme][keys[i]]);
  }

  return result.join(' ');
}

exports.stringify = function (data) {
  var result = [];
  for (var i=0; i < data.length; i++) {
    result.push('%c'+data[i].str);
  }
  return result.join('');
}

exports.parse = function (str, theme) {
  var data = this.detokenize(this.tokenize(str));

  var args = [];
  for (var i=0; i < data.length; i++) {
    args.push(this.css(data[i].keys, theme));
  }
  args.splice(0,0,this.stringify(data));

  return args;
}
