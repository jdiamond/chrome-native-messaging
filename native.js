var os = require('os');

// Use the native byte-order of the system; can't assume little or big-endianness.
// ref https://developer.chrome.com/extensions/nativeMessaging#native-messaging-host-protocol
var isBE = os.endianness() === 'BE';
var UInt32Native = {
    read: function(buf, offset) {
        return isBE ? buf.readUInt32BE(offset) : buf.readUInt32LE(offset);
    },
    write: function(buf, value, offset) {
        return isBE ? buf.writeUInt32BE(value, offset) : buf.writeUInt32LE(value, offset);
    }
};

exports.UInt32Native = UInt32Native;