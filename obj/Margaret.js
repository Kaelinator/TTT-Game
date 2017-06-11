/** @author Kael Kirk */
var threshold = 10;

function Margaret(x, y) {

  this.img = margaret_sheet;

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector();

  this.sprite = splitSheet(this.img);
  this.scl = 10;
  this.width = width / 25;
  this.height = height / 10;

  this.inAir = true;
  this.grounded = true;

  this.freeLeft = true;
  this.freeRight = true;

  this.frame = 0;
  this.l = 0;

  this.g = 0.5;
}

Margaret.prototype.applyForce = function(n) {
  this.acc.add(n);
};

Margaret.prototype.update = function() {

  if (!this.grounded) {
  	// Gravity
  	this.acc.add(0, this.g);
  	this.g += 0.1;
  } else {
  	this.g = 0.3;
  	this.vel = createVector(this.vel.x, 0);
  }

  this.grounded = false;

  this.vel.mult(0.8);
  this.vel.add(this.acc);
  this.pos.add(this.vel);

  this.acc.mult(0);

  if (this.pos.y > height) {
  	// Game over
  	gameOver();
  }

  this.freeLeft = true;
  this.freeRight = true;
};

Margaret.prototype.checkCollision = function(bricks) {

  var yh = this.pos.y + this.height; 	// Margaret foot
  var m = this.vel.mag(); 				// Margaret's velocity
  var x = this.pos.x; 					// Margaret's left side
  var xw = x + this.width;				// Margaret's right side

  for (var i = 0; i < bricks.length; i++) {

    /* Vertical */
    var byh = bricks[i].y * bricks[i].height; 	// Brick's top
    var bxw = bricks[i].x * bricks[i].width;    // Brick's left side
    var bxww = bxw + bricks[i].width;           // Brick's right side

    if (yh >= byh - m) {
      if ((x >= bxw && x <= bxww) || (xw >= bxw && xw <= bxww)) {
      	if (Math.abs(yh - byh) < (m === 0) ? 0.1 : m)
 	      this.grounded = true;
 	    }
    }

    /* Horizonal */
    if (yh > byh + 20) {

      // Left side
      if (x <= bxww && x >= bxw) {
        this.freeLeft = false;
        this.vel = createVector(0, this.vel.y);
      }

      // Right side
      if (xw <= bxww && xw >= bxw) {
        this.freeRight = false;
        this.vel = createVector(0, this.vel.y);
      }
    }
  }

};

Margaret.prototype.draw = function() {

  if (this.vel.x > 0.1) {
    image(this.sprite[this.l % 4+1], this.pos.x, this.pos.y, this.width, this.height);
  } else if (this.vel.x < -0.1) {
    image(this.sprite[this.l % 4+5], this.pos.x, this.pos.y, this.width, this.height);
  } else {
    image(this.sprite[0], this.pos.x, this.pos.y, this.width, this.height);
  }
  this.frame++;

  if (this.frame % 10 === 0)
  	this.l++;
};

function splitSheet(img) {

  var sheet = [];
  for (var sp = 0; sp < 9; sp++) {
  	sheet.push(img.get(sp * 110, 0, 110, 160));
  }

  return sheet;
}
