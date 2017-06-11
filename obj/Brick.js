/** @author Kael Kirk */
function Brick(x, y) {
  this.x = x;
  this.y = y;

  this.img = brick_pic;

  this.width = width / 10;
  this.height = height / 5;
}

Brick.prototype.draw = function() {
  var yOff = 0;
  
  while ((this.y+yOff) * this.height < height) {
  	push();
  	if (yOff > 0) {
  	  tint(200, 50, 10);
  	} else {
  	  tint(50, 200, 10);
  	}
    image(this.img, this.x * this.width, (this.y + yOff) * this.height, this.width, this.height);
    pop();
    yOff++;
  }
}