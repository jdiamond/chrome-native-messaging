(function() {

    var application = 'com.my_company.my_application';
    var port = null;

    document.getElementById('connect').addEventListener('click', function() {
        log('chrome.runtime.connectNative')

        port = chrome.runtime.connectNative(application);

        port.onMessage.addListener(log);

        port.onDisconnect.addListener(function(e) {
            log('unexpected disconnect');

            port = null;
        });
    });

    document.getElementById('disconnect').addEventListener('click', function() {
        log('port.disconnect');
        port.disconnect(); // this doesn't seem to trigger the onDisconnect event
        port = null;
    });

    var examples = {
        ping: { ping: 'pong' },
        readdir: { readdir: '/' },
        subscribe: { subscribe: 'time' },
        unsubscribe: { unsubscribe: 'time' }
    };

    Array.prototype.slice.call(document.querySelectorAll('[data-example]')).forEach(function(example) {
        example.addEventListener('click', function() {
            document.getElementById('msg').value = JSON.stringify(examples[example.dataset.example]);
        });
    });

    document.getElementById('send').addEventListener('click', function() {
        var json = document.getElementById('msg').value;
        var msg;

        try {
            msg = JSON.parse(json);
        } catch (err) {
            return log('invalid JSON: ' + json);
        }

        if (port) {
            log('port.postMessage');
            port.postMessage(msg);
        } else {
            log('chrome.runtime.sendNativeMessage');
            chrome.runtime.sendNativeMessage(application, msg, log);
        }
    });

    document.getElementById('clear').addEventListener('click', function() {
        document.getElementById('log').innerHTML = '';
    });

    function log(msg) {
        console.log(msg);

        var e = document.createElement('pre');
        e.appendChild(document.createTextNode(typeof msg === 'object' ? JSON.stringify(msg) : msg));
        document.getElementById('log').appendChild(e);
    }

})();
