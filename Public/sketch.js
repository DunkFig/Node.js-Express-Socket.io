let socket

function setup() {
  createCanvas(windowWidth, windowHeight);
  //as the client lets connect to the same server
  socket = io.connect('http://localhost:3000')
  
  //when there is a socket message with the title 'mouse',
  //then fire this function.
  socket.on('mouse', incomingDrawing)

  background(random(0, 255), random(0, 255), random(0, 255))
}

function mouseDragged() {
  noStroke()
  fill(255)
  ellipse(mouseX, mouseY, 50, 50)

  let data = {
    x: mouseX,
    y: mouseY
  };
  socket.emit('mouse', data);
}

function incomingDrawing(data){
  noStroke()
  fill(237, 200, 66)
  ellipse(data.x, data.y, 50, 50)

  document.getElementById('hello').append('x: ' + data.x + ' ' + 'y: ' +  data.y + ' ')
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}