document.getElementById('send').onclick = function() {
    var msg = document.getElementById('msg').value;

    msg = JSON.parse(msg);

    var application = 'com.my_company.my_application';
    var connect = true;

    if (connect) {
        var port = chrome.runtime.connectNative(application);

        port.onMessage.addListener(log);

        port.onDisconnect.addListener(function() {
            log({ event: 'disconnect' });
        });

        port.postMessage(msg);
    } else {
        chrome.runtime.sendNativeMessage(application, msg, log);
    }

    function log(msg) {
        console.log(msg);
        document.getElementById('response').innerText += JSON.stringify(msg) + '\n';
    }
};
