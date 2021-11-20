var express = require("express");
var app = express();

var server = app.listen(8080);

var io = require("socket.io")(server);

var oldMsgs = [];
// -------------------------------

app.use(express.static(__dirname +"/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// --------------------------------

io.on("connection", function(socket){
    console.log("Someone just connected");
    console.log(oldMsgs);
    socket.emit('oldMsg', oldMsgs);

    socket.on("msgInfo", function (messageInfo) {
        oldMsgs.push(messageInfo);
        io.sockets.emit('display', messageInfo);
    });
    
});

// --------------------------------

app.get("/", function(request, response){
    console.log("Home loaded");
    response.render("index");
});