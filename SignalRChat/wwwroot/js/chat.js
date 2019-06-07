"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// this is a test method by me
connection.on("SenderMessage", function (user, meesage) {

    var sender = "<div class='d-flex justify-content-end mb-4'> " +
        "<div class='msg_cotainer_send'>" +
           message +
                    "<span class='msg_time_send'>8:55 AM, Today</span>" +
        "</div>" +
        "<div class='img_cont_msg'>" +
            "<img src='https://randomuser.me/api/portraits/women/89.jpg' class='rounded-circle user_img_msg'>" +
                "</div>" +
        "</div>";

    document.getElementById("chatMessages").innerHTML = sender;
});

connection.on("ReceiveMessage", function (user, message) {
    var time = "3pm";
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "<div class='d-flex justify-content-start mb-4'>" +
                "<div class='img_cont_msg'>"  + 
                   " <img src='https://randomuser.me/api/portraits/men/55.jpg' class='rounded-circle user_img_msg'>" +
                "</div>" +
                "<div class='msg_cotainer'>" +
                 message +
                    "<span class='msg_time'>" + time +", Today</span>" +
                "</div>" +
            "</div>";


    //document.getElementById("messagesList").appendChild(li);
    document.getElementById("chatMessages").innerHTML = encodedMsg;

});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});