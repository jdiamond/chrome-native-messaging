# Chrome Native Messaging for Node.js

Transform streams for writing Chrome App [native messaging][1] hosts in Node.js.

[1]: https://developer.chrome.com/extensions/messaging#native-messaging

## Install

```
npm i -S chrome-native-messaging
```

## API

The module exports `Input`, `Output`, and `Transform` transform streams.

`Input` streams transform bytes to objects.

`Output` streams transform objects to bytes.

Use `Transform` to easily create custom object-to-object transform streams.

```
var nativeMessage = require('chrome-native-messaging');

process.stdin
    .pipe(new nativeMessage.Input())
    .pipe(new nativeMessage.Transform(function(msg, push, done) {
        var reply = getReplyFor(msg); // Implemented elsewhere by you.
        push(reply);                  // Push as many replies as you like.
        done();                       // Call when done pushing replies.
    }))
    .pipe(new nativeMessage.Output())
    .pipe(process.stdout)
;
```

## Example

The `app` directory contains a sample Chrome App.

The `host` directory contains a native messaging host that you can send "readdir" messages to.

Go to the Chrome Extensions page (chrome://extensions/) and hit "Load unpacked extension...".
Select the `app` directory. Look at the ID it received and put it in the host manifest.

The `host` directory contains the manifest that must be copied to the correct directory
on OS X.

Install the host manifest:

```
sudo host/register.sh
```

On Windows (Run as Administrator):

```
host\register.bat
```

Open a new tab and hit Apps in the upper left. Launch the example app and
send yourself messages.

## Testing

Run `npm test` for the unit tests.

`json2msg.js` is a script that can convert lines of JSON into native messages.
Use it to send messages to your host to see how it responds.

Pipe the output of your host to `msg2json.js` to see what its output looks like.

```
./json2msg.js < test.json | ./host/my_host.js | ./msg2json.js
```

On Windows:

```
node json2msg.js < test.json | node host\my_host.js | node msg2json.js
```

## Logging

Enabling logging in Chrome can help find problems finding the manifest.

Quit Chrome first.

```
open -a Google\ Chrome --args --enable-logging --v=1
```

On Windows:

```
start chrome --enable-logging --v=1
```

View the log like this:

```
less ~/Library/Application\ Support/Google/Chrome/chrome_debug.log
```

On Windows:

```
type "C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\chrome_debug.log"
```

More info: http://www.chromium.org/for-testers/enable-logging
