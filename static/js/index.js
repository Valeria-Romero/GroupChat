console.log("Connection!");

let socket = io( 'http://localhost:8080');

var userName = prompt("Please enter your name:","");


$('.form').on('submit', function(event){
    event.preventDefault();
    let message = $('#message').val();

    let messageInfo ={
        name: userName,
        message: message
    }
    socket.emit('msgInfo', messageInfo);
});

socket.on('display', function(messageInfo){
    let message = `<p>${messageInfo.name} :  ${messageInfo.message}</p>`;
    $('#chatbox' ).append(message);
});

socket.on('oldMsg', function(oldMsgs){
    for(let i=0; i<oldMsgs.length; i++){
        let message = `<p>${oldMsgs[i].name} :  ${oldMsgs[i].message}</p>`;
        $('#chatbox').append(message);
    }
});