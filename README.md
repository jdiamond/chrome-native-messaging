# Chrome Native Messaging for Node.js

Transform streams for native messaging for Chrome Apps.

More info here: https://developer.chrome.com/extensions/messaging#native-messaging

Go to Chrome Extensions page (chrome://extensions/) and "Load unpacked extension...". Look at the ID it received and put it in the host manifest.

Install the host manifest:

```
mkdir -p ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts
cp host/com.my_company.my_application.json ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts
```

Enable logging can help find problems finding the manifest (quit Chrome first):

```
open -a Google\ Chrome --args --enable-logging --v=1
```

View the log like this:

```
less ~/Library/Application\ Support/Google/Chrome/chrome_debug.log
```

More info: http://www.chromium.org/for-testers/enable-logging
