/** @author Kael Kirk */
function House(x, y, t) {
  
  this.img = house_pic;
  this.t = t;

  this.collected = false;

  this.width = width / 10;
  this.height = height / 5;

  // In relation to map
  this.x = x;
  this.y = y;

  // In relation to canvas
  this.absX =  x * bricks[0].width;
  this.absY = y * bricks[0].height + (bricks[0].height/2);

  this.hitbox = (this.height) / 2;
}

House.prototype.draw = function() {

  image(this.img, this.absX, this.absY, this.width, this.height);
}

House.prototype.checkCollision = function(m) {
  var x = m.pos.x - m.width / 2; 	// Middle of Margaret's body
  var y = m.pos.y; 					      // Margaret's top
  

  var d = dist(x, y, this.absX, this.absY);
  if (d < this.hitbox) {
  	/* reached house */

    var t = new Popup(this.t);
    t.popup();
  	this.collected = true;
    gameWon = true;
  }
}