#!/usr/local/bin/node

// Best to use a direct path on the shebang line in case node isn't in the
// PATH when launched by Chrome.

var fs = require('fs');

var nativeMessage = require('../index');

process.stdin
    .pipe(new nativeMessage.Input())
    .pipe(new nativeMessage.Transform(function(msg, push, done) {
        // If it has a readdir property...
        if (msg && msg.readdir) {
            // ...reply with a message for each file in that directory.
            fs.readdir(msg.readdir, function(err, files) {
                if (err) {
                    push({ error: err.message || err });
                } else {
                    files.forEach(function(file) {
                        push({ file: file });
                    });
                }

                done();
            });
        } else {
            // Just echo the message:
            push(msg);

            done();
        }
    }))
    .pipe(new nativeMessage.Output())
    .pipe(process.stdout)
;
