"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message, profilePhoto) {

    var myUsername = document.getElementById("userInput").value;
    var time = "3pm";

    // filter html tags from the message for security reasons
    message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    var receiver = "<div class='d-flex justify-content-start mb-4'>" +
        "<div class='img_cont_msg'>" +
        " <img src='" + profilePhoto + "' class='rounded-circle user_img_msg'>" +
        "</div>" +
        "<div class='msg_cotainer'>" +
        message +
        "<span class='msg_time'>" + time + ", Today</span>" +
        "</div>" +
        "</div>";

    var sender = "<div class='d-flex justify-content-end mb-4'> " +
        "<div class='msg_cotainer_send'>" +
        message +
        "<span class='msg_time_send'>8:55 AM, Today</span>" +
        "</div>" +
        "<div class='img_cont_msg'>" +
        "<img src='" + profilePhoto + "' class='rounded-circle user_img_msg'>" +
        "</div>" +
        "</div>";


    // create elements to add to the dom

    if (user !== myUsername) {
        //document.getElementById("messagesList").appendChild(li);
        // document.getElementById("chatMessages").innerHTML = receiver;
        document.getElementById("chatMessages").insertAdjacentHTML("beforeend", receiver);
    }
    else {
        // document.getElementById("chatMessages").innerHTML = sender;
        document.getElementById("chatMessages").insertAdjacentHTML("beforeend", sender);
    }

});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var profilePhoto = document.getElementById("profilePhotoUrl").value;
    connection.invoke("SendMessage", user, message, profilePhoto).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("messageInput").innerHTML = "";
    $("#messageInput").value = "";
    event.preventDefault();

    // clear the input filed
    

});