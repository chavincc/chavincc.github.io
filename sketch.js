var W;
var H;
var mainChar;
var dir = 1; //clockwise
var ballCount = 0;
var img;
var imgBorder;
let obstacles = [];
var maxSpeed = 2.25;
var maxSpeedIncreased = 0.25;
var sec = 0;
var msec = 0;
var gameStage = 0; //0=mainMenu 1=gameOn 2=gameEnded
var released = true;
var firebaseDb;
var nameInput;
var highScore = 0;

function preload() {
  img = loadImage('images/mike.png');
}

function keyPressed() {
  if (gameStage == 1) {
    if (dir == 1) dir = -1;
    else if (dir == -1) dir = 1;
  } else if (gameStage == 2) {
    resetGame();
  } else if (gameStage == 3) {
    // TODO: main menu click function
  }
}

function mouseReleased() {
  released = true;
  return false;
}

function mousePressed() {
  if (!released) {
    return;
  }
  released = false;
  //action
  keyPressed();
}

function menu() {}

function setup() {
  var config = {
    apiKey: 'AIzaSyC8bF4OGOvtHHxZj0G_QYZZ08ebeDtyzbk',
    authDomain: 'the-mike-game.firebaseapp.com',
    databaseURL: 'https://the-mike-game.firebaseio.com',
    projectId: 'the-mike-game',
    storageBucket: 'the-mike-game.appspot.com',
    messagingSenderId: '527097926733',
  };
  firebase.initializeApp(config);
  firebaseDb = firebase.database();

  W = displayWidth;
  H = displayHeight;
  imgBorder = W * 0.1;
  createCanvas(W, H);
  frameRate(100);
  textSize(20);
  setInterval(timed, 10);
  setInterval(newBall, 2500);
  resetGame();
}

function resetGame() {
  gameStage = 1;
  obstacles.length = 0;
  mainChar = new Mike(W, H);
  mainChar.calculate();
  sec = 0;
  msec = 0;
  ballCount = 0;
  maxSpeed = 2.5;
  newBall();
  loop();
}

function timed() {
  if (msec + 1 >= 100) {
    sec = sec + 1;
    msec = 0;
  } else {
    msec = msec + 1;
  }
}

function newBall() {
  var b = new BadBall();
  obstacles.push(b);
  ballCount++;
  maxSpeed = maxSpeed + maxSpeedIncreased;
}

function endGame() {
  if (sec + msec / 100 > highScore) {
    highScore = sec + msec / 100;
  }
  fill(250, 138, 134);
  ellipse(W / 2, H * 0.4, W * 0.02);
  fill(255, 0, 17);
  gameStage = 2;
  textAlign(CENTER);
  text('YOU KILL MIKE', W / 2, H * 0.4);
  fill(0);
  text('press anywhere to restart', W / 2, H * 0.47);
  noLoop();
}

function draw() {
  background(255);
  fill(250, 138, 134);
  noStroke();
  ellipse(W / 2, H * 0.4, W * 0.95);
  fill(255);
  ellipse(W / 2, H * 0.4, W * 0.02);
  for (var i = 0; i < ballCount; i++) {
    if (mainChar.intersect(obstacles[i])) {
      endGame();
    }
  }
  mainChar.move();
  mainChar.show();
  for (var i = 0; i < ballCount; i++) {
    obstacles[i].move();
  }
  for (var i = 0; i < ballCount; i++) {
    obstacles[i].show();
  }
  fill(30, 30, 30);
  rect(0, H * 0.8, W, H * 0.2);
  textAlign(CENTER);
  fill(255);
  text('" happy birthday shit head "', W * 0.5, H * 0.86);
  textAlign(LEFT);
  text('- Barack Obama', W * 0.5, H * 0.93);
  fill(0);
  text('balls : ' + ballCount, W * 0.6, H * 0.07);
  text('time : ' + sec + '.' + msec, W * 0.6, H * 0.12);
  text('highscore : ' + highScore, W * 0.1, H * 0.7);
}

function Mike(W, H) {
  this.xCen = W / 2;
  this.yCen = H * 0.4;
  this.angle = PI * 0.75;
  this.angularSpeed = 0.03;
  this.tunnelR = W * 0.45;
  this.mainR = W * 0.18;
  this.x = 0;
  this.y = 0;

  this.show = function () {
    //ellipse(this.x, this.y, this.mainR, this.mainR);
    imageMode(CENTER);
    image(img, this.x, this.y, this.mainR, this.mainR);
  };

  this.move = function () {
    this.angle += this.angularSpeed * dir;
    this.calculate();
  };

  this.autopilot = function () {
    for (var i = 0; i < ballCount; i++) {
      if (this.near(obstacles[i])) {
        keyPressed();
      }
    }
  };

  this.calculate = function () {
    this.x = this.xCen + this.tunnelR * cos(this.angle);
    this.y = this.yCen + this.tunnelR * sin(this.angle);
  };

  this.near = function (other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.mainR + other.r - imgBorder + 20) {
      return true;
    }
    return false;
  };

  this.intersect = function (other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.mainR + other.r - imgBorder) {
      return true;
    }
    return false;
  };
}

function BadBall() {
  this.x = W * 0.5;
  this.y = H * 0.4;
  this.MS = maxSpeed;
  this.xSpeed = random(-maxSpeed, maxSpeed);
  this.ySpeed = random(-maxSpeed, maxSpeed);
  this.r = W * 0.02;

  this.move = function () {
    if (this.x <= 0 || this.x >= W) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y <= 0 || this.y >= H * 0.8) {
      this.ySpeed = -this.ySpeed;
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  };

  this.show = function () {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  };
}
