function submit() {
    var file = document.getElementById("file").files[0];
    if (file) {
        var owner = document.getElementById("owner").value;
        if(owner == "") {
            window.alert("Please enter an owner name to continue.");
        } else {
            var reader = new FileReader();
            reader.onload = function (event) {
                var hash = sha1(event.target.result);
                $.get("/submit?hash=" + hash + "&owner=" + owner, function(data){
                    if(data == "Error") {
                        $("#message").text("An error occured.");
                    } else {
                        $("#message").html("Transcation hash: "+ data);
                    }
                });
            };
        }
        reader.readAsArrayBuffer(file);
    } else {
        window.alert("Please select a file.");
    }
}

function getInfo() {

    console.log('In getInfo()');
    var file = document.getElementById("file").files[0];
    if(file) {
        console.log('In getInfo(): File found');
        var reader = new FileReader();
        console.log('In getInfo(): File read');
        reader.onload = function(event) {
            var hash = sha1(event.target.result);
            console.log("Get Info: Hash Created");
            $.get("/getInfo?hash="+ hash, function(data){
                console.log("/getInfo?hash="+hash);
                if(data[0] == 0 && data[1] == ""){
                    $("#message").html("File not found.");
                } else {
                    $("#message").html("Timestamp:" +data[0]+ " Owner: "+ data[1]);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        window.alert("Please select a file.");
    }
}

var socket = io("http://localhost:8080");
socket.on("connect", function(){
    socket.on("message", function(msg) {
            if($("#events_list").value() == "No Transaction Found") {
                console.log("In #events_list");
                $("#events_list").html("<li>Transaction Hash: " + msg.transcationHash + " Owner: " + msg.args.owner + " File Hash: "+ msg.args.fileHash+ "</li>");
            } else {
                console.log("In else condition");
                $("#events_list").prepend("<li>Transaction Hash: " + msg.transcationHash + " Owner: " + msg.args.owner + " File Hash: "+ msg.args.fileHash+ "</li>");
            }
        });
});


function alterSubmit() {

    var file = document.getElementById("file").files[0];
    if (file) {
        $("#para").html("File selected.");
        var owner = document.getElementById("owner").value;
        if(owner == "") {
            window.alert("Please enter an owner name to continue.");
        } else {
            var reader = new FileReader();
            reader.onload = function (event) {
                var hash = sha1(event.target.result);
                $.get("/submit?hash=" + hash + "&owner=" + owner, function(data){
                    console.log("/getInfo?hash="+ hash);
                    if(data == "Error") {
                        $("#message").text("An error occured.");
                    } else {
                        $("#message").html("Transcation hash: "+ data);
                        $("#events_list").prepend("<li>Owner: " + owner + " <br>File Hash: "+ hash + "</li>");
                    }
                });
            };
        }
        reader.readAsArrayBuffer(file);
    } else {
        window.alert("Please select a file.");
    }
}

function alterGetInfo() {
    console.log('In getInfo()');
    var file = document.getElementById("file").files[0];
    if(file) {
        console.log('In getInfo(): File found');
        var reader = new FileReader();
        reader.onload = function(event) {
            var hash = sha1(event.target.result);
            $.get("/getInfo?hash="+ hash, function(data){
                console.log("/getInfo?hash="+ hash);
                if(data[0] == 0 && data[1] == ""){
                    $("#message").html("File not found.");
                } else {
                    $("#message").html("Timestamp:" +data[0]+ " Owner: "+ data[1]);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        window.alert("Please select a file.");
    }
}
