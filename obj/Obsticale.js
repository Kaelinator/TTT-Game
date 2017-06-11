/** @author Kael Kirk */
function Obsticale(x, y, t) {
  
  this.img = obsticale_pic;
  this.t = t;

  this.width = width / 20;
  this.height = height / 10;

  // In relation to map
  this.x = x;
  this.y = y;

  // In relation to canvas
  this.absX = x * bricks[0].width;
  this.absY = y * bricks[0].height;

  this.hitBoxX = this.absX - this.width / 2; 
  this.hitBoxY = this.absY - this.height / 2;
}

Obsticale.prototype.draw = function() {

  image(this.img, this.absX, this.absY, this.width, this.height);
}

Obsticale.prototype.checkCollision = function(m) {
  var x = m.pos.x - m.width / 2; 	// Middle of Margaret's body
  var y = m.pos.y; 					// Margaret's top
  

  var d = dist(x, y, this.hitBoxX, this.hitBoxY);
  if (d < 20) {
  	/* Slipped */

    gameOver();
  }
}