var messages = [];
var sendButton = document.getElementById("send-message");
var field = document.getElementById("message-field");
var content = document.getElementById("chat-content");
var usersContent = document.getElementById("users-content");
var modal = document.getElementById('modal');
var nameField = document.getElementById('name-input');
var name = "";
var saveBtn = document.getElementById('save-name-btn');
var voteBtn = document.getElementById('vote-btn');

window.onload = function() {
    var socket = io.connect('http://'+window.location.host);
    modal.style.display = "block"

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<div class="list-group-item m-1 p-1" style="background: #AAD5C9"><div class="d-flex w-100"><div class="circleBase type2" style="background: '+messages[i].color+'"></div><small><b>'+messages[i].username+'</b></small></div><p class="mb-1" style="margin-left: 30px">'+messages[i].message+'</p></div>'
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    socket.on('onUsersChanged', function(users){
        if(users){
            var html = '';
            for(var i=0; i<users.length; i++) {
                html +='<li class="d-flex"><div class="circleBase type2" style="background: '+users[i].color+'"></div>'+users[i].username+'</li>';
            }
            usersContent.innerHTML = html;
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text, username: name, color: color });
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
            color = Colors.random();
            socket.emit("clientInfo", {username: name, color: color});
        }
        
    }

    nameField.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            saveBtn.click();
        }
    });

    voteBtn.onclick = function() {
        notifyMe();
    }

//code snippet to prevent the page from refreshing when enter is pressed
    $(function() {
        $("form").submit(function() { return false; });
    });

    Colors = {};
    Colors.names = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        black: "#000000",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        white: "#ffffff",
        yellow: "#ffff00"
    };

    Colors.random = function() {
        var result;
        var count = 0;
        for (var prop in this.names)
            if (Math.random() < 1/++count)
               result = prop;
        return result;
    };

    function notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have alredy been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Voting is not implemented yet");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Voting is not implemented yet");
          }
        });
      }

      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
    }

}

