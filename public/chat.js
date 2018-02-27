
var messages = [];
var sendButton = document.getElementById("send-message");
var field = document.getElementById("message-field");
var content = document.getElementById("chat-content");
var usersContent = document.getElementById("users-content");
var modal = document.getElementById('modal');
var nameField = document.getElementById('name-input');
var name = "";
var saveBtn = document.getElementById('save-name-btn');

window.onload = function() {
    var socket = io.connect('http://'+window.location.host);
    modal.style.display = "block"

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html +='<div class="list-group-item list-group-item-action flex-column align-items-start active"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+messages[i].username+'</h5> <small>time</small> </div><p class="mb-1">'+ messages[i].message+'</p></div>';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('onUsersChanged', function(users){
        if(users){
            var html = '';
            for(var i=0; i<users.length; i++) {
                html +='<li class="list-group-item d-flex justify-content-between align-items-center">'+users[i]+'</li>';
            }
            usersContent.innerHTML = html;
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text, username: name });
        field.value = "";
    };

    field.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            sendButton.click();
        }
    });

    saveBtn.onclick = function() {
        if(nameField.value == "") {
            alert("Please enter a name");
        } else {
            name = nameField.value;
            modal.style.display = "none"
            socket.emit("clientInfo", {username: name});
        }
        
    }

    nameField.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            saveBtn.click();
        }
    });

//code snippet to prevent the page from refreshing when enter is pressed
    $(function() {
        $("form").submit(function() { return false; });
    });

}

