const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 450;
let y = 225;
let radius = 20;
let gravitySpeed = 0;
let color = "green";

let horizontalmomentum = 0;
let verticalmomentum = -6;

let resistence = 0.0005 * radius ;

let gravityToggle = true;
let upPressed = false;
let wUpPressed = false;
let downPressed = false;
let sDownPressed = false;
let leftPressed = false;
let aLeftPressed = false;
let rightPressed = false;
let dRightPressed = false;
let anykeypressed = false;
let sizeUp = false;
let sizeDown = false;

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function drawGame() {
  requestAnimationFrame(drawGame);
  clearScreen();
  inputs();  
  gravity();
  airResistance();
  movement();
  boundryCheck();
  writevariables();
  drawGreenBlob();
}

function airResistance(){
    if (verticalmomentum < 0.01 && verticalmomentum > -0.01) {
        verticalmomentum = 0;}
    else if (verticalmomentum > 0)
      verticalmomentum -= resistence
    else
      verticalmomentum += resistence

    if (horizontalmomentum < 0.01 && horizontalmomentum > -0.01) {
        horizontalmomentum = 0;}
    else if (horizontalmomentum > 0 ) 
        horizontalmomentum -= resistence
    else
      horizontalmomentum += resistence
}

function writevariables(){
    document.getElementById("horizontal").innerHTML = horizontalmomentum;
    document.getElementById("vertical").innerHTML = verticalmomentum; 
}

function gravity(){
//  if (y > canvas.height - radius -( radius / 100 * 6.5) && verticalmomentum < 1.3 && verticalmomentum > -1.3 && anykeypressed == false){
  if (gravityToggle && y <= canvas.height - radius && anykeypressed == false) {
    verticalmomentum += 0.015 * radius;
  }
}

function boundryCheck(){
    //down
    if (y >= canvas.height - radius){
      y = canvas.height - radius;
      verticalmomentum *= -0.75;
      if (anykeypressed == false && verticalmomentum *-1 < radius/100 * 6.5){
        verticalmomentum = 0;
      }
    }
    
    //up
    if(y <= radius) {
        y = radius;
        verticalmomentum *= -0.75;
        
        if (anykeypressed == false && verticalmomentum < radius/100 * 6.5){
          verticalmomentum = 0;
        }
      }

   

    //left
    if(x <= radius) {
      x = radius;
      horizontalmomentum *= -0.75; 
      
      if (anykeypressed == false && horizontalmomentum < radius/100 * 6.5){
        horizontalmomentum = 0;
      }
    }

    //right
    if (x >= canvas.width - radius){
      x = canvas.width - radius;
      horizontalmomentum *= -0.75;  
      
      if (anykeypressed == false && horizontalmomentum *-1< radius/100 * 6.5){
        horizontalmomentum = 0;
      }    
    }
        
}

function movement(){
    //up & down
    y += verticalmomentum;

    //left & right
    x += horizontalmomentum;
}

function inputs() {
  //up
  if (upPressed){
    verticalmomentum -= radius * 0.025;
    
  }
  //down
  if (downPressed) {
    verticalmomentum += radius * 0.025;
  }
  //left
  if (leftPressed){
    horizontalmomentum -= radius * 0.025;
  }
  //right
  if (rightPressed){
    horizontalmomentum += radius * 0.025;
  }
//////////////////////////
  //up
  if (wUpPressed){
    verticalmomentum -= radius * 0.05;
    
  }
  //down
  if (sDownPressed) {
    verticalmomentum += radius * 0.05;
  }
  //left
  if (aLeftPressed){
    horizontalmomentum -= radius * 0.05;
  }
  //right
  if (dRightPressed){
    horizontalmomentum += radius * 0.05;
  }
//////////////////////
  if (sizeUp){
    radius += 2;
  }
  if (sizeDown){
    radius -= 2;
  }

}

function drawGreenBlob() {

  if (radius < 0 )
    radius = 1;
  
  else if (radius > 50) {
    radius = 50; }


    ctx.fillStyle = "green"
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    upPressed = true;
  }

  //down
  if (event.keyCode == 40) {
    downPressed = true;
  }

  //left
  if (event.keyCode == 37) {
    leftPressed = true;
  }
  //right
  if (event.keyCode == 39) {
    rightPressed = true;
  }
//

//
  //up W
  if (event.keyCode == 87) {
    wUpPressed = true;
  }

  //down S
  if (event.keyCode == 83) {
    sDownPressed = true;
  }

  //left A
  if (event.keyCode == 65) {
    aLeftPressed = true;
  }
  //right D
  if (event.keyCode == 68) {
    dRightPressed = true;
  }
//

//
  //bigger
  if (event.keyCode == 190) {
    sizeUp = true;
  }
  //smaller
  if (event.keyCode == 188){
    sizeDown = true ;
  }

  if (event.keyCode == 71){
    if (gravityToggle)
      gravityToggle = false
    else 
      gravityToggle = true
  }
  
}

function keyUp(event) {
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    upPressed = false;
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    downPressed = false;
  }

  //left
  if (event.keyCode == 37 || event.keyCode == 65) {
    leftPressed = false;
  }
  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    rightPressed = false;
  }
  
    //up W
    if (event.keyCode == 87) {
      wUpPressed = false;
    }
  
    //down S
    if (event.keyCode == 83) {
      sDownPressed = false;
    }
  
    //left A
    if (event.keyCode == 65) {
      aLeftPressed = false;
    }
    //right D
    if (event.keyCode == 68) {
      dRightPressed = false;
    }
  //

  //bigger
  if (event.keyCode == 190) {
    sizeUp = false;
  }
  //smaller
  if (event.keyCode == 188){
    sizeDown = false ;
  }
}

drawGame();