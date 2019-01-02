var W = 600;
var H = 700;
var mainChar;
var dir = 1;//clockwise
var ballCount = 0;
var img;
var imgBorder = 40;
let obstacles = [];
var maxSpeed = 2.5;
var maxSpeedIncreased = 0.5;
var sec = 0;
var msec = 0;
var autoSteer = 0;//off
var release = true;
var resetButton;

function preload() {
  img = loadImage('images/mike.png');
}

function keyPressed() {
  if (dir == 1) dir = -1;
  else if (dir == -1) dir = 1;
}

var released = true;

function mouseReleased(){
	released = true;
	return false;
}

function mousePressed(){
	if(!released){
		return;
	}
	released = false;
  keyPressed();
}

function setup() {
  createCanvas(W+100, H);
	mainChar = new Mike(W, H, PI);
	mainChar.calculate();
  textSize(28);
  setInterval(timed, 10);
  setInterval(newBall, 1500);
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

function draw() {
  // background(250,128,114);
  background(255);
  fill(250, 138, 134);
  noStroke();
  ellipse(W/2, H/2, H*0.25 + 300, H*0.25 + 300);
  for (var i = 0; i<ballCount; i++) {
    if (mainChar.intersect(obstacles[i])) {
      fill(255, 0, 17);
      text('YOU KILL MIKE', 200, 350);
      noLoop();
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
  text('balls : ' + (ballCount), 450, 670);
  text('time : ' + sec + '.' + msec, 450, 600);
  text('you : SUCK', 450, 635);
  text("\"Visit chavincc github fam.\"", 30, 40);
  text("-Barack Obama", 320, 80);
}

function Mike(W, H, pi) {
  this.xCen = W/2;
  this.yCen = H/2;
  this.angle = pi*0.75;
  this.angularSpeed = 0.03;
  this.tunnelR = H*0.25;
  this.mainR = 70;
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
    if (d < this.mainR + other.r - imgBorder + 15) {
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
  this.x = W/2;
  this.y = H/2;
  this.MS = maxSpeed;
  this.xSpeed = random(-maxSpeed, maxSpeed);
  this.ySpeed = random(-maxSpeed, maxSpeed);
  this.r = 10;

  this.move = function() {
    if (this.x <= 0 || this.x >= W+90) {
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
