/** @author Kael Kirk */
function Book(x, y, t) {
  
  this.img = book_pic;
  this.t = t;

  this.collected = false;

  this.width = width / 20;
  this.height = height / 10;

  // In relation to map
  this.x = x;
  this.y = y;

  // In relation to canvas
  this.absX =  x * bricks[0].width;
  this.absY = y * bricks[0].height;
}

Book.prototype.draw = function() {

  image(this.img, this.absX, this.absY, this.width, this.height);
}

Book.prototype.checkCollision = function(m) {
  var x = m.pos.x - m.width / 2; 	// Middle of Margaret's body
  var y = m.pos.y; 					// Margaret's top
  

  var d = dist(x, y, this.absX, this.absY);
  if (d < 75) {
  	/* Grabbed book */

    var t = new Popup(this.t);
    t.popup();
  	this.collected = true;
  }
}