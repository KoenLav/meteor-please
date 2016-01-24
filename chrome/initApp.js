// Fired on start
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id: "MrWinston",
        bounds: {
			width: 1024,
			height: 768
		}
    },
    function(window) {
        window.onClosed.addListener(function() {
            // Close interfaces & devices
            var handles = window.contentWindow.DB.printDriver.getHandles();
            for (handle in handles[0]) {
                chrome.usb.releaseInterface(handles[0][handle], handles[1], function(){
                    console.log("Released interface.");
                });
                chrome.usb.closeDevice(handles[0][handle], function(){
                    console.log("Closed openDevice.");
                });
            }
        });
    });
});

// Fired on (possibly accidental) restart
chrome.app.runtime.onRestarted.addListener(function() {
    chrome.app.window.create('index.html', {
        id: "MrWinston",
        bounds: {
			width: 1024,
			height: 768
		}
        //state: "fullscreen"
    },
    function(win) {
        win.contentWindow.addEventListener('load', function() {
            console.log("Restarted");
            // Re-initialize app here, if necessary
        });
    });
});

chrome.runtime.onSuspend.addListener(function() {
    console.log("Event page suspended.")
});