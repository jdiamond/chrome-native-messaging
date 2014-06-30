chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('main.html', {
        bounds: {
            width: 640,
            height: 480
        }
    });
});
