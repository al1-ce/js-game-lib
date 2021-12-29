let pawnHandler = {};

class Pawn {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cBox = undefined;

    let name = this.constructor.name;
    if (!pawnHandler[name]) {
      pawnHandler[name] = [];
    }
    pawnHandler[name].push(this);
  }

  collision(x, y, objName) {
    this.cBox.setPos(x, y);
    let result = 0;
    if (objName instanceof Pawn){
      this.cBox.collision(objName.cBox);
    } else if (Array.isArray(objName)) {
      for (let type of objName) {
        let objArr = pawnHandler[type];
        for (let obj of objArr) {
          if (this.cBox.collision(obj.cBox)) { result = 1; break; }
        }
      }
    } else {
      let objArr = pawnHandler[objName];
      for (let obj of objArr) {
        if (this.cBox.collision(obj.cBox)) { result = 1; break; }
      }
    }
    this.cBox.setPos(this.x, this.y);
    return result;
  }
  step() {}
  draw() { //might use it as post-step
    if (this.cBox) { this.cBox.setPos(this.x, this.y); }
  }

  drawCollisionMask() {
    if (this.cBox) {
      drawSetAlpha(0.2);
      this.cBox.draw();
      drawSetAlpha(1);
    }
  }
}

class CollisionModel {
  constructor(x, y, offsetX = 0, offsetY = 0) {
    this.oX = offsetX;
    this.oY = offsetY;
    this.x = x + this.oX;
    this.y = y + this.oY;
    this.model = '';
  }

  setPos(x, y) {
    this.x = x + this.oX;
    this.y = y + this.oY;
  }

  collision(obj) {
    if (this == obj) return;
    if (this.model == obj.model) {
      switch (this.model) {
        case 'rect': return this.collisionRect(this, obj);
        case 'circle': return this.collisionRect(this, obj);
      }
    } else {
      let rect, circle;
      if (this.model == 'rect') {rect = this; circle = obj;} else {rect = obj; circle = this;}
      return this.collisionRectCircle(rect, circle);
    }
  }

  collisionRectCircle(rect, circle) {
    // Find the closest point to the circle within the rectangle
    let closestX = clamp(circle.x, rect.x, rect.x + rect.w);
    let closestY = clamp(circle.y, rect.y, rect.y + rect.h);
    // Calculate the distance between the circle's center and this closest point
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
    // If the distance is less than the circle's radius, an intersection occurs
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (circle.r * circle.r);
  }

  collisionRect(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    );
  }

  collisionCircle(circle1, circle2) {
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < circle1.r + circle2.r);
  }

  draw() {}
}

class CollisionRect extends CollisionModel {
  constructor(x, y, w, h, offsetX = 0, offsetY = 0) {
    super(x, y, offsetX, offsetY);
    this.w = w;
    this.h = h;
    this.model = 'rect';
  }
  draw() {
    super.draw();
    drawRect(this.x, this.y, this.w, this.h, '#f00', '#f00');
  }
}
class CollisionCircle extends CollisionModel {
  constructor(x, y, r, offsetX = 0, offsetY = 0) {
    super(x, y, offsetX, offsetY);
    this.r = r;
    this.model = 'circle';
  }
  draw() {
    super.draw();
    drawCircle(this.x, this.y, this.r, '#f00', '#f00');
  }
}

function collisionPoint(x, y, obj) {
  let point = new CollisionCircle(x, y, 1);
  return _agcustcoll(point, x, y, obj);
}

function collisionCircle(x, y, r, obj) {
  let circle = new CollisionCircle(x, y, r);
  return _agcustcoll(circle, x, y, obj);
}

function collisionRect(x, y, w, h, obj) {
  let rect = new CollisionRect(x, y, w, h);
  return _agcustcoll(rect, x, y, obj);
}

function _agcustcoll(obj, x, y, tarName) {
  obj.setPos(x, y);
  let result = 0;
  if (tarName instanceof Pawn){
    obj.collision(tarName.cBox);
  } else if (Array.isArray(tarName)) {
    for (let type of tarName) {
      let objArr = pawnHandler[type];
      for (let objCol of objArr) {
        if (obj.collision(objCol)) { result = 1; break; }
      }
    }
  } else {
    let objArr = pawnHandler[tarName];
    for (let objCol of objArr) {
      if (obj.collision(objCol)) { result = 1; break; }
    }
  }
  return result;
  
}