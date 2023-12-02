let socket

function setup() {
  createCanvas(windowWidth, windowHeight);

  //as the client lets connect to the same server
  socket = io.connect('http://localhost:3000')
  
  //when there is an incoming socket message with the title 'mouse',
  //then fire this function.
  //This message will come from the server.
  socket.on('mouse', incomingDrawing)
  let thisColor = [random(0, 255), random(0, 255), random(0, 255)]
  background(thisColor)
}

function mouseDragged() {

  //This is the stuff we're doing in THIS CLIENT 
  //when the mouse is dragged
  noStroke()
  fill(255)
  ellipse(mouseX, mouseY, 50, 50)

  //This is the stuff we are sending out to the server.
  let data = {
    x: mouseX,
    y: mouseY
  };

  //We are emitting all of our data with the label "mouse"
  socket.emit('mouse', data);
}

// this function gets fired when this client gets
// a message from the server labeled "mouse"
// what do we want to do with that data?
function incomingDrawing(data){
  noStroke()
  fill(237, 200, 66)
  ellipse(data.x, data.y, 50, 50)

  document.getElementById('sectionAppender').append('x: ' + data.x + ' ' + 'y: ' +  data.y + ' ')
}

function windowResized() {
  background(thisColor)
  resizeCanvas(windowWidth, windowHeight);
}