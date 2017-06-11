/** @author Kael Kirk */
function Popup(t) {
  this.t = t;
}

Popup.prototype.popup = function() {
  
  // Rounded box
  fill(248, 255, 214);
  stroke(244, 241, 65);
  strokeWeight(5);
  rect(marg.pos.x - wo2/2, height / 8, wo2, height / 2, 20, 20, 20, 20);

  textFont(fonts[1]);

  textAlign(LEFT);
  fill(100, 100, 100);
  stroke(255);
  noStroke();
  textSize(20);
  text(this.t, marg.pos.x - wo2/2 + 20, height / 8 + 20, wo2 - 20, ho2 - 20);

  textFont(fonts[0]);
  textAlign(RIGHT);
  textSize(60);
  stroke(10, 110, 130);
  fill(16, 64, 96);
  strokeWeight(5);
  text("Enter to continue", (marg.pos.x - wo2/2) + wo2, height / 8 + ho2);

  noLoop();
}

function pausedPopup() {

  fill(248, 255, 214);
  stroke(244, 241, 65);
  strokeWeight(5);
  rect(marg.pos.x - wo2/2, height / 8, wo2, height / 2, 20, 20, 20, 20);

  textFont(fonts[1]);

  textAlign(LEFT);
  fill(100, 100, 100);
  stroke(255);
  noStroke();
  textSize(60);
  text("Paused", marg.pos.x - wo2/2 + 20, height / 8 + 20, wo2 - 20, ho2 - 20);

  textFont(fonts[0]);
  textAlign(RIGHT);
  textSize(90);
  stroke(10, 110, 130);
  fill(16, 64, 96);
  strokeWeight(5);
  text("ESC to resume", (marg.pos.x - wo2/2) + wo2, height / 8 + ho2);
}

function gameOverPopup() {
  fill(248, 255, 214);
  stroke(244, 241, 65);
  strokeWeight(5);
  rect(marg.pos.x - wo2/2, height / 8, wo2, height / 2, 20, 20, 20, 20);

  textFont(fonts[0]);

  textAlign(LEFT);
  fill(191, 11, 11);
  stroke(255);
  noStroke();
  textSize(90);
  text("Game Over!", marg.pos.x - wo2/2 + 20, height / 8 + 20, wo2 - 20, ho2 - 20);

  textAlign(RIGHT);
  textSize(60);
  stroke(10, 110, 130);
  fill(16, 64, 96);
  strokeWeight(5);
  text("F5 to restart", (marg.pos.x - wo2/2) + wo2, height / 8 + ho2);
}

function gameWonPopup() {
  fill(248, 255, 214);
  stroke(244, 241, 65);
  strokeWeight(5);
  rect(marg.pos.x - wo2/2, height / 8, wo2, height / 2, 20, 20, 20, 20);

  textFont(fonts[0]);

  textAlign(LEFT);
  fill(244, 232, 66);
  stroke(255,215,0);
  noStroke();
  textSize(90);
  text("You win!", marg.pos.x - wo2/2 + 20, height / 8 + 20, wo2 - 20, ho2 - 20);

  textAlign(RIGHT);
  textSize(60);
  stroke(10, 110, 130);
  fill(16, 64, 96);
  strokeWeight(5);
  text("Thanks for playing!", (marg.pos.x - wo2/2) + wo2, height / 8 + ho2);
}