# NPCI iOS PhoneGap plugin
Work with PhoneGap 2.9.*

## How To Use

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {        
            window.NpciIosPlugin.say( 
                function(result) {
                    alert("result = " + result);
                },
                function() {
                    alert("error");
                }
            );
        }