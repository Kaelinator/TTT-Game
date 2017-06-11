/** @author Kael Kirk */
var dialog;

var wo2;
var ho2;

var marg;
var bricks = [];
var fonts = [];
var books = [];
var obsticales = [];

var playing = true;
var dead = false;
var gameWon = false;

var margaret_sheet;
var brick_pic;
var book_pic;
var obsticale_pic;
var house_pic;

var loadedX;
var length;

var jumps;

/* 
 * Preload
 */
function preload() {

  // Load spritesheet
  margaret_sheet = loadImage("img/margaret.png");
  brick_pic = loadImage("img/brick.png");
  book_pic = loadImage("img/book.png");
  obsticale_pic = loadImage("img/banana.png");
  house_pic = loadImage("img/house.png");

  // Load fonts
  fonts.push(loadFont("lib/3Dventure.ttf"));
  fonts.push(loadFont("lib/Fipps.otf"));
  fonts.push(loadFont("lib/PerfectDOS.ttf"));

  // Load dialog
  dialog = loadStrings("lib/dialog.txt");
}

/* 
 * Initialize
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  length = random(75, 150);

  wo2 = width / 2;
  ho2 = height / 2;

  marg = new Margaret(0, -ho2);

  // load first part of map
  for (var i = 0; i < 12; i++) {
  	var x = i;
  	var y = map(noise(x*0.2), 0, 1, 0, 4) + 1;
  	bricks.push(new Brick(x, y));
  	loadedX = x;
  }

  // create books
  var bookCount = 4;
  for (var i = 0; i < bookCount; i++) {
  	// Randomize x
  	var x = random(i * (length / bookCount), (i+1) * (length / bookCount));
  	var y = map(noise(x*0.2), 0, 1, 0, 4) + 0.25;
    var b = new Book(x, y, dialog[i+1]);
    books.push(b);
  }
  books.push(new House(length, map(noise(length*0.2), 0, 1, 0, 4)-0.5, dialog[bookCount+1])); 

  // create obsticales
  var obsticaleCount = random(length/10, length/5);
  for (var i = 0; i < obsticaleCount; i++) {
  	// Randomize x
  	var x = random(i * (length / obsticaleCount), (i+1) * (length / obsticaleCount));
  	var y = map(noise(x*0.2), 0, 1, 0, 4) + 0.6;
    var o = new Obsticale(x, y);
    obsticales.push(o);
  }

  jumps = 0;
}

/* 
 * Loop
 */
function draw() {
  
  background(66, 222, 244);

  loadMap();

  translate(wo2 - marg.pos.x, 0);

  updateBricks();
  updatePlayer();
  updateObsticales();
  updateBooks();

  textFont(fonts[2]);
  strokeWeight(2);
  textSize(40);
  stroke(255,215,0);
  fill(244, 232, 66);
  text("Score: " + (loadedX - 11), marg.pos.x - wo2/2, height - 40);

  if (!playing)
    pausedPopup();

  if (jumps > 0 && frameCount % 45 == 0) {
  	jumps -= 1;
  }

  // Display introductory text
  if (frameCount == 30) {
  	var t = new Popup(dialog[0]);
  	t.popup();
  }

  if (gameWon) {
  	noLoop();
    gameWonPopup();
    dead = true;
  }
}

/*
 *
 * Helpful functions
 *
 */

function handleKeys() {

  if (keyIsDown(RIGHT_ARROW)) {
  	// Right
  	if (marg.freeRight)
      marg.applyForce(createVector(2, 0));
  }

  if (keyIsDown(LEFT_ARROW)) {
    // Left
    if (marg.freeLeft)
      marg.applyForce(createVector(-2, 0));
  }

  if (keyIsDown(UP_ARROW)) {
    // Jump
    if (marg.grounded) {
  	  var f = (-30 + jumps);
      marg.applyForce(createVector(0, -30));
      jumps = (jumps > 29) ? 30 : jumps + 1;
    }
  }
}

function keyPressed() {
  switch (keyCode) {

    case ESCAPE:
      
      if (dead)
      	return;

      if (playing) 
      	noLoop();
      else
      	loop();

      playing = !playing;
    break;

    case ENTER:

      if (dead)
        return;

      if (!playing)
      	return;

      loop();
      break;

    default:
      return true; // prevent default behavior
  }
}

function gameOver() {
  noLoop();
  gameOverPopup();
  dead = true;
}

function loadMap() {
  var l = bricks.length;
  if ((bricks[l-1].x * bricks[l-1].width) - marg.pos.x < wo2) {
  	// load more bricks, unload others
  	bricks.shift();
  	loadedX++;
  	var y = 0;
  	if (loadedX < length)
      // Generate regularly
  	  y = map(noise(loadedX*0.2), 0, 1, 0, 4) + 1;
    else
  	  // End of the game
  	  y = map(noise(length*0.2), 0, 1, 0, 4) + 1;
  	bricks.push(new Brick(loadedX, y));
  }
}

function updatePlayer() {
  marg.checkCollision(bricks);
  handleKeys();

  marg.update();
  marg.draw();
}

function updateBricks() {
  for (var i = 0; i < bricks.length; i++) {
  	bricks[i].draw();
  }
}

function updateBooks() {

  for (var i = 0; i < books.length; i++) {
  	if (Math.abs(books[i].x - loadedX) <= 12 && !books[i].collected) {

  	  books[i].draw();
  	  books[i].checkCollision(marg);
  	}	
  }
}

function updateObsticales() {

  for (var i = 0; i < obsticales.length; i++) {
  	if (Math.abs(obsticales[i].x - loadedX) <= 12) {

  	  obsticales[i].draw();
  	  obsticales[i].checkCollision(marg);
  	}	
  }
}
