var W;
var H;
var mainChar;
var dir = 1;//clockwise
var ballCount = 0;
var img;
var imgBorder;
let obstacles = [];
var maxSpeed = 2.5;
var maxSpeedIncreased = 0.5;
var sec = 0;
var msec = 0;
var autoSteer = 0;//off
var gameOn = true;
var released = true;

function preload() {
  img = loadImage('images/mike.png');
}

function keyPressed() {
  if (gameOn) {
    if (dir == 1) dir = -1;
    else if (dir == -1) dir = 1;
  }
  else {
    resetGame();
  }
}

function mouseReleased(){
	released = true;
	return false;
}

function mousePressed(){
	if(!released){
		return;
	}
	released = false;
  //action
  keyPressed();
}

function setup() {
  W = displayWidth;
  H = displayHeight;
  imgBorder = W*0.1;
  createCanvas(W, H);
  frameRate(100);
  textSize(20);
  setInterval(timed, 10);
  setInterval(newBall, 1500);
  resetGame();
}

function resetGame() {
  gameOn = true;
  obstacles = [];
  mainChar = new Mike(W, H);
  mainChar.calculate();
  sec = 0;
  msec = 0;
  ballCount = 0;
  maxSpeed = 2.5;
  loop();
}

function timed() {
  if (msec + 1 >= 100) {
    sec = sec+1;
    msec = 0;
  }
  else {
    msec = msec+1;
  }
}

function newBall() {
  var b = new BadBall();
  obstacles.push(b);
  ballCount++;
  maxSpeed = maxSpeed + maxSpeedIncreased;
}

function endGame() {
  fill(250, 138, 134);
  ellipse(W/2, H/2, H*0.012);
  fill(255, 0, 17);
  gameOn = false;
  textAlign(CENTER);
  text('YOU KILL MIKE', W/2, H/2);
  fill(0);
  text('press anywhere to restart', W/2, H*0.57);
  noLoop();
}

function draw() {
  background(255);
  fill(250, 138, 134);
  noStroke();
  ellipse(W/2, H/2, W*0.95);
  fill(255);
  ellipse(W/2, H/2, H*0.012);
  for (var i = 0; i<ballCount; i++) {
    if (mainChar.intersect(obstacles[i])) {
      endGame();
    }
  }
	mainChar.move();
  mainChar.show();
  for (var i = 0; i<ballCount; i++) {
    obstacles[i].move();
  }
  for (var i = 0; i<ballCount; i++) {
    obstacles[i].show();
  }
  fill(0)
  textAlign(LEFT);
  text("\"Visit chavincc github fam.\"", W*0.07, H*0.07);
  text("-Barack Obama", W*0.5, H*0.12);
  text('balls : ' + (ballCount), W*0.6, H*0.82);
  text('time : ' + sec + '.' + msec, W*0.6, H*0.92);
  text('you : SUCK', W*0.6, H*0.87);
}

function Mike(W, H) {
  this.xCen = W/2;
  this.yCen = H/2;
  this.angle = PI*0.75;
  this.angularSpeed = 0.03;
  this.tunnelR = W*0.45;
  this.mainR = W*0.18;
  this.x = 0;
  this.y = 0;

  this.show = function() {
    //ellipse(this.x, this.y, this.mainR, this.mainR);
    imageMode(CENTER)
    image(img,this.x,this.y, this.mainR, this.mainR);
  }

  this.move = function() {
    this.angle += this.angularSpeed*dir;
    this.calculate();
    if (autoSteer > 0) {
      for (var i = 0; i<ballCount; i++) {
        if (this.near(obstacles[i])) {
          this.move();
        }
      }
    }
	}

  this.calculate = function() {
    this.x = this.xCen + this.tunnelR*cos(this.angle);
    this.y = this.yCen + this.tunnelR*sin(this.angle);
  }

  this.near = function(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.mainR + other.r - imgBorder + 10) {
      return true;
    }
    return false;
  }

  this.intersect = function(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.mainR + other.r - imgBorder) {
      return true;
    }
    return false;
  }
}

function BadBall() {
  this.x = W*0.5;
  this.y = H*0.5;
  this.MS = maxSpeed;
  this.xSpeed = random(-maxSpeed, maxSpeed);
  this.ySpeed = random(-maxSpeed, maxSpeed);
  this.r = H*0.012;

  this.move = function() {
    if (this.x <= 0 || this.x >= W) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y <= 0 || this.y >= H) {
      this.ySpeed = -this.ySpeed;
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }

  this.show = function() {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }

}
