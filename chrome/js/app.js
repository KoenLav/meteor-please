PrintDriver = {
    devices: [],
    supportedDevices: [
        {
            name:   'Epson TM-T20',
            info:   { vendorId: 1208, productId: 3587 },
            format: { font: 'test', width: 'test' }
        },
        {
            name:   'Epson TM-T20II',
            info:   { vendorId: 1208, productId: 3605},
            format: { font: 'test', width: 'test' }
        },
        {
            name:   'Epson TM-U220',
            info:   { vendorId: 1208, productId: 514},
            format: { font: 'test', width: 'test' }
        }
    ]
}

NetworkPrint = {
    firstIp:    100,
    lastIp:     200,
    subnet:     '192.168.192.',
    port:       9100,

    findDevices: function() {
        for (var endIp = NetworkPrint.firstIp; endIp < NetworkPrint.lastIp; endIp++) {
            NetworkPrint.openDevice(NetworkPrint.subnet + endIp)
        }
    },

    openDevice: function(ip) {
        if(chrome.sockets && chrome.sockets.tcp) {
            chrome.sockets.tcp.create({}, function(socket) {
                chrome.sockets.tcp.connect(socket.socketId, ip, NetworkPrint.port, function(res) {
                    if (chrome.runtime.lastError !== "undefined") { // Don't use typeof!
                        if (res >= 0) {
                            PrintDriver.devices.push({
                                connection: 'network',
                                handle:     socket.socketId,
                                format:     null,
                                name:       null
                            })

                            console.log("Network printer found at", ip)
                        }
                        else {
                            NetworkPrint.closeDevice(socket.socketId)

                            console.log("No printer found at", ip, res)
                        }
                    }
                    else {
                        throw chrome.runtime.lastError.message;
                    }
                });
            });
        }
        else {
            console.warn("chrome.sockets(.tcp) is undefined");
        }
    },

    closeDevice: function (handle) {
        chrome.sockets.tcp.close(handle, function () {
            console.log("Closed device.");
        });
    },

    printJob: function(id, buffer, callback){
        chrome.sockets.tcp.send(printer.handle, buffer, callback)
    }
}

UsbPrint = {
    port:       0,
    endpoint:   0x01,

    findDevices: function () {
        for (var i in PrintDriver.supportedDevices) {
            var device = PrintDriver.supportedDevices[i];

            (function(device) {
                if (chrome.permissions && chrome.usb) {
                    chrome.permissions.getAll(function (p) {
                        if (p.permissions.indexOf('usb') >= 0) {
                            // Find the openDevice
                            chrome.usb.findDevices(device.info, function (devices) {
                                if (typeof(devices) !== "undefined" && devices.length > 0) {
                                    // For every device of this type found
                                    for (var i = 0; i < devices.length; i++) {
                                        var deviceHandle = devices[i];

                                        UsbPrint.openDevice(deviceHandle);
                                    }

                                } else {
                                    console.warn("Device not found!");
                                }
                            });
                        }
                        else {
                            console.warn("No USB permissions.");
                        }
                    });
                }
            })(device)
        }
    },

    openDevice: function(deviceHandle) {
        // Reset the openDevice
        chrome.usb.resetDevice(deviceHandle, function () {
            // Perform some error checking to make sure we reset the openDevice
            if (chrome.runtime.lastError !== "undefined") { // Don't use typeof!
                // Claim the interface using the port we specified
                chrome.usb.claimInterface(deviceHandle, UsbPrint.port, function (a) {
                    // Perform some error checking to make sure we claimed the deviceHandle
                    if (chrome.runtime.lastError !== "undefined") { // Don't use typeof!
                        PrintDriver.devices.push({
                            connection: 'usb',
                            handle:     deviceHandle,
                            format:     device.format,
                            name:       device.name
                        })

                        console.log("USB printer found!")
                    } else {
                        throw chrome.runtime.lastError.message;
                    }
                })
            } else {
                throw chrome.runtime.lastError.message;
            }
        });
    },

    closeDevice: function (handle) {
        chrome.usb.releaseInterface(handle, UsbPrint.port, function () {
            chrome.usb.closeDevice(handle, function () {
                console.log("Closed USB printer");
            });
        });
    },

    printJob: function (printer, buffer, callback) {
        var transferInfo = {
            "direction":    "out",
            "endpoint":     UsbPrint.endpoint,
            "data":         buffer
        };

        chrome.usb.bulkTransfer(printer.handle, transferInfo, callback);
    }
}