let xprev;
class Player extends Pawn {
  constructor(x, y) {
    super(x, y);
    this.sprIdle = [];
    this.sprWalk = [];
    this.sprIdle[0] = new GameSpriteSheet('src/sprPl.png', 32, 48, 0, 0, 32, 48, 0, 5);
    this.sprIdle[1] = new GameSpriteSheet('src/sprPl.png', 32, 48, 0, 48, 32, 48, 0, 5);
    this.sprWalk[0] = new GameSpriteSheet('src/sprPl.png', 32, 48, 0, 96, 32, 48, 0, 8);
    this.sprWalk[1] = new GameSpriteSheet('src/sprPl.png', 32, 48, 0, 144, 32, 48, 0, 8);

    this.spd = 0.5;
    this.dir = 1;
    this.walk = 0;
  }

  step() {
    super.step();
    this.sprIdle[0].step(0.03);
    this.sprIdle[1].step(0.03);

    this.move(keyCheck(keys.a), keyCheck(keys.d));
    this.walk = (keyCheck(keys.a) || keyCheck(keys.d));
    if (this.walk) {
      this.sprWalk[0].step(0.1);
      this.sprWalk[1].step(0.1);
    } else {
      this.sprWalk[0].setFrame(0);
      this.sprWalk[1].setFrame(0);
    }
  }

  draw() {
    super.draw();
    if (! this.walk) {
      drawImage(this.sprIdle[this.dir], this.x, this.y);
    } else {
      drawImage(this.sprWalk[this.dir], this.x, this.y);
    }
  }

  move(left, right) {
    let xprev = this.x;
    if (left) {
      this.x -= this.spd;
    }
    if (right) {
      this.x += this.spd;
    }

    if (xprev > this.x) {
      this.dir = 0;
    } else if (xprev < this.x) {
      this.dir = 1;
    }
  }
}