// Right now I am taking the "express" module and importing
// to the project as well as storing the reference to that import 
// in a variable. That variable and instance of 'express" are written
// a bit differently than we're used to, but console.log(express) after
// we've declared it and you'll see it looks like a giant javascript object
// it KIND OF is, but it also operates as a function. 
//
var express = require('express');


// now I'm calling the function 'express()', remember its not
// enough to create a function - we need to call it. 
// 
//
var app = express();


// Ok So we've established that express is like a giant
// Javascript - Object / Function - Great! Lets call a
// more specific function in this object. 
// That function - "listen" takes in a parameter for
// the port on your Local Host you want to listen to.
//
var server = app.listen(3000);

//Lets direct express back to our public folder which contains
//all our front facing stuff.
app.use(express.static('public'));

console.log("my socket server is running")

//great lets now include socket.io
var socket = require("socket.io")

//and lets direct the function-object of socket to accept
// the parameter of the results of when we listen to
// port 3000
//
var io = socket(server)

//great, lets access a particular function in this large object which 
//allows us to do something once a new connection is made 
//to the server. When something is newly connected - we'll use a 
//callback function: we'll do something.
//
io.sockets.on('connection', newConnection);


function newConnection(socket){
    //console log when theres a new conection (to the server)
    console.log("new connection: " + socket.id)

    //when we (the server) gets a message titled 'mouse', lets do something
    socket.on('mouse', mouseMsg);

    //heres the function that fires when we (the server) gets that message. 
    function mouseMsg(data){
        // lets send that data out to every OTHER client
        socket.broadcast.emit('mouse', data)
        console.log(data)
    }
}