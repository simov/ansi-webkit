
var should = require('should');
var aw = require('../lib')

var str = [
    {
        input: '[31mstr1[39m[44mstr2[49m[31mstr3[39m[32m[1mstr4[22m[39mstr5 ',
        tokenized: '<~red~>str1<~off~><~bg-blue~>str2<~off~><~red~>str3<~off~><~green~><~bold~>str4<~off~>str5',
        stringified: '%cstr1%cstr2%cstr3%cstr4%cstr5'
    }, {
        input: '[90mPOST /tbl/1 [32m200 [90m49.359 ms - 33137[0m ',
        tokenized: '<~grey~>POST /tbl/1 <~green~>200 <~grey~>49.359 ms - 33137<~off~>',
        stringified: '%cPOST /tbl/1 %c200 %c49.359 ms - 33137'
    }
];
var obj = [
    {
        parsed: [
            { keys: [ 'red' ], str: 'str1' },
            { keys: [ 'off', 'bg-blue' ], str: 'str2' },
            { keys: [ 'off', 'red' ], str: 'str3' },
            { keys: [ 'off', 'green', 'bold' ], str: 'str4' },
            { keys: [ 'off' ], str: 'str5' }
        ],
        args: [
            '%cstr1%cstr2%cstr3%cstr4%cstr5',
            'color: red;',
            'font-weight: normal; font-style: normal; text-decoration: none; background-color: none; color: black; background-color: blue;',
            'font-weight: normal; font-style: normal; text-decoration: none; background-color: none; color: black; color: red;',
            'font-weight: normal; font-style: normal; text-decoration: none; background-color: none; color: black; color: green; font-weight: bold;',
            'font-weight: normal; font-style: normal; text-decoration: none; background-color: none; color: black;'
        ]
    }, {
        parsed: [
            { keys: [ 'grey' ], str: 'POST /tbl/1 ' },
            { keys: [ 'green' ], str: '200 ' },
            { keys: [ 'grey' ], str: '49.359 ms - 33137' }
        ],
        args: [
            '%cPOST /tbl/1 %c200 %c49.359 ms - 33137',
            'color: grey;',
            'color: green;',
            'color: grey;'
        ]
    }
];

var log = false;


describe('tokenize', function () {
    it('tokenize', function () {
        for (var i=0; i < str.length; i++) {
            var result = aw.tokenize(str[i].input);
            log && console.log(result);
            result.should.equal(str[i].tokenized);
        }
    });
});

describe('detokenize', function () {
    it('detokenize', function () {
        for (var i=0; i < str.length; i++) {
            var result = aw.detokenize(str[i].input);
            log && console.log(result);
            should.deepEqual(result, obj[i].parsed);
        }
    });
});

describe('css', function () {
    it('css', function () {
        aw.css(['green','bold']).should.equal('color: green; font-weight: bold;')
    });
});

describe('stringify', function () {
    it('stringify', function () {
        for (var i=0; i < obj.length; i++) {
            var result = aw.stringify(obj[i].parsed);
            log && console.log(result);
            result.should.equal(str[i].stringified);
        }
    });
});

describe('parse', function () {
    it('parse', function () {
        for (var i=0; i < str.length; i++) {
            var result = aw.parse(str[i].input);
            log && console.log(result);
            should.deepEqual(result, obj[i].args);
        }
    });
});
