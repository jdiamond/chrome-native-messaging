#!/usr/bin/env node

var test = require('tape');

var nativeMessaging = require('./index');

test('Input', function(t) {
    var buf = new Buffer(17);
    buf.writeUInt32LE(13, 0);
    buf.write('{"foo":"bar"}', 4);

    var input = new nativeMessaging.Input();

    input.end(buf);

    input.on('readable', function() {
        var obj = input.read();
        t.equal(obj.foo, 'bar');
        t.end();
    });
});

test('Output', function(t) {
    var output = new nativeMessaging.Output();

    output.end({ foo: 'bar' });

    output.on('readable', function() {
        var buf = output.read();
        t.equal(buf.readUInt32LE(0), 13);
        t.equal(buf.slice(4).toString(), '{"foo":"bar"}');
        t.end();
    });
});

test('Transform', function(t) {
    var transform = new nativeMessaging.Transform(function(msg, push, done) {
        push({ output: msg.input.toUpperCase() });
        done();
    });

    transform.end({ input: 'data' });

    transform.on('readable', function() {
        var obj = transform.read();
        t.equal(obj.output, 'data'.toUpperCase());
        t.end();
    });
});
