document.getElementById('send').onclick = function() {
    var msg = document.getElementById('msg').value;

    msg = JSON.parse(msg);

    chrome.runtime.sendNativeMessage('com.my_company.my_application', msg, function(res) {
        console.log(res);
        document.getElementById('response').innerText = JSON.stringify(res);
    });
};
