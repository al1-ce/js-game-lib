class parInteract extends Pawn {}

class objKeyPad extends parInteract {
  constructor(x, y) {
    super(x, y);
    this.spr = new GameSpriteSheet('src/sprTile16x.png', 12, 7, 0, 0, 12, 7, 0, 1);
  }

  draw() {
    drawImage(this.spr, this.x, this.y);
  }
}

class objDoor extends parInteract {
  constructor(x, y) {
    super(x, y);
    this.spr = new GameSpriteSheet('src/sprTile64x.png', 31, 56, 0, 0, 31, 56, 0, 1);
  }

  draw() {
    drawImage(this.spr, this.x, this.y);
  }
}