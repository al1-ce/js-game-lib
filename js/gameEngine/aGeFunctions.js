
function drawFill(c) {
  targetCanvas.fill(c);
}
function drawRect(x, y, w, h, c1, c2) {
  if (c2) {
    targetCanvas.rect(x, y, w, h, c1, c2);
  } else {
    targetCanvas.rect(x, y, w, h, c1);
  }
}
function drawLine(x, y, xt, yt, c) {
  targetCanvas.line(x, y, xt, yt, c);
}
function drawCircle(x, y, r, c1, c2) {
  if (c2) {
    targetCanvas.circle(x, y, r, c1, c2);
  } else {
    targetCanvas.circle(x, y, r, c1);
  }
}
function drawText(x, y, text, font = 'Consolas', size = '15px', fill = 1, color = '#000000', align = 'left', valign = 'middle') {
  targetCanvas.text(x, y, text, font, size, fill, color, align, valign);
}
function drawImage(image, x, y, xsc = 1, ysc = 1, rot = 0, a = 1) {
  targetCanvas.image(image, x, y, xsc, ysc, rot, a);
}
function drawCanvas(canvas, x, y) {
  engineCanvas.reset();
  engineCanvas.drawCanvas(canvas, x, y);
  if (engineCamera) {
    engineCanvas.translate(-engineCamera.x, -engineCamera.y);
  }
}
function drawSetAlpha(a) {
  targetCanvas.drawSetAlpha(a);
}
function drawGetAlpha() {
  return targetCanvas.drawGetAlpha();
}

function drawSetBlend(b) {
  targetCanvas.drawSetBlend(b);
}


// other functions

function canvasCreate(w, h) {
  let canvas = new Canvas(w, h);
  canvasHandler.push(canvas);
  return canvas;
}

function canvasMainSet(w, h) {
  engineCanvasSize.w = w;
  engineCanvasSize.h = h;
  if (engineCanvas) {
    engineCanvas.destroy();
    engineCanvas = canvasCreate(engineCanvasSize.w, engineCanvasSize.h);
  }
}

function canvasSetTarget(c) {
  targetCanvas = c;
}

function canvasResetTarget() {
  targetCanvas.reset();
  targetCanvas = engineCanvas;
}

function canvasReset() {
  targetCanvas.reset();
}

function engineSetFPS(fps) {
  gameRules.tick = fps;
  aGeInputInit();
}

function createCamera(x, y) {
  engineCamera = new Camera(x, y);
  return engineCamera;
}

function canvasMainBackground(c) {
  gameRules.backgroundColor = c;
}

function canvasMainScale(x, y) {
  engineCanvasScale.x = x;
  engineCanvasScale.y = y;
}

function canvasSetScale(x, y) {
  targetCanvas.setScale(x, y);
}



function degToRad(deg) {
  let pi = Math.PI;
  return deg * (pi/180);
}

function radToDeg(rad) {
  let pi = Math.PI;
  return rad * (180/pi);
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function merge(x, y, amount) {
  return x + ((y - x) * amount);
}