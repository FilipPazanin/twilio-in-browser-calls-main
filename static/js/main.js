$(function () {
    var device;
    var hardcodedToken = "**********************"
    log("Using hardcoded token: " + hardcodedToken);

    // Setup Twilio.Device
    device = new Twilio.Device(hardcodedToken, {
        codecPreferences: ["opus", "pcmu"],
        fakeLocalDTMF: true,
        enableRingingState: true,
        debug: true,
    });

    device.on("ready", function (device) {
        log("Twilio.Device Ready!");
    });

    device.on("error", function (error) {
        log("Twilio.Device Error: " + error.message);
    });

    device.on("connect", function (conn) {
        log('Successfully established call !');
        $('#modal-call-in-progress').modal('show');
    });

    device.on("disconnect", function (conn) {
        log("Call ended.");
        $('.modal').modal('hide');
    });

    device.on("incoming", function (conn) {
        console.log(conn.parameters);
        log("Incoming connection from " + conn.parameters.From);
        $("#callerNumber").text(conn.parameters.From);
        $("#txtPhoneNumber").text(conn.parameters.From);

        $('#modal-incoming-call').modal('show');

        $('.btnReject').unbind('click').bind('click', function () {
            $('.modal').modal('hide');
            log("Rejected call ...");
            conn.reject();
        });

        $('.btnAcceptCall').unbind('click').bind('click', function () {
            $('.modal').modal('hide');
            log("Accepted call ...");
            conn.accept();
        });
    });

    // Bind button to make call
    $('#btnDial').bind('click', function () {
        $('#modal-dial').modal('hide');

        // get the phone number to connect the call to
        var params = {
            To: document.getElementById("phoneNumber").value
        };

        // output destination number
        $("#txtPhoneNumber").text(params.To);

        console.log("Calling " + params.To + "...");
        if (device) {
            var outgoingConnection = device.connect(params);
            outgoingConnection.on("ringing", function () {
                log("Ringing...");
            });
        }
    });

    // Bind button to hang up call
    $('.btnHangUp').bind('click', function () {
        $('.modal').modal('hide');
        log("Hanging up...");
        if (device) {
            device.disconnectAll();
        }
    });

    // Activity log
    function log(message) {
        var logDiv = document.getElementById("log");
        logDiv.innerHTML += "<p>&gt;&nbsp;" + message + "</p>";
        logDiv.scrollTop = logDiv.scrollHeight;
    }
});
