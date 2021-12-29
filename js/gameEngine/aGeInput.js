document.addEventListener('contextmenu', event => event.preventDefault());

let keyMap = {};

var lastKey = 0; //REMOVE LATER

function aGeInputInit() {
  window.addEventListener('keydown', (e) => { 
    if (keyMap[e.keyCode] == 2) return;
    keyMap[e.keyCode] = 1; 
    setTimeout(()=>_sKeySet(e.keyCode, 2), 1000 / gameRules.tick);
  });
  window.addEventListener('keyup', (e) => { 
    keyMap[e.keyCode] = -1; 
    setTimeout(()=>_sKeySet(e.keyCode, 0), 1000 / gameRules.tick);
  });

  window.addEventListener('mousedown', (e) => {
    mouseMap[e.button] = 1;
    setTimeout(()=>_sMouseSet(e.button, 2), 1000 / gameRules.tick);
  });

  window.addEventListener('mouseup', (e) => {
    mouseMap[e.button] = -1;
    setTimeout(()=>_sMouseSet(e.button, 0), 1000 / gameRules.tick);
  });
}

function _sKeySet(key, val) {
  keyMap[key] = val; 
}
function keyPressed(key) {
  return (keyMap[key] == 1); 
}
function keyCheck(key) {
  return (keyMap[key] == 2); 
}
function keyReleased(key) {
  return (keyMap[key] == -1); 
}

let mouseMap = {
  0: 0,
  1: 0,
  2: 0
}

const mouseLeft = 0;
const mouseMiddle = 1;
const mouseRight = 2;


function _sMouseSet(key, val) {
  mouseMap[key] = val; 
}
function mousePressed(key) {
  return (mouseMap[key] == 1); 
}
function mouseCheck(key) {
  return (mouseMap[key] == 2); 
}
function mouseReleased(key) {
  return (mouseMap[key] == -1); 
}

let mouseCoords = { x: 0, y: 0 }

$(document).mousemove(function(e) {
  mouseCoords.x = e.pageX;
  mouseCoords.y = e.pageY;
});

function mouseX() {
  if (engineCamera) {
    return Math.floor((mouseCoords.x + engineCamera.x) / engineCanvasScale.x);
  }
  return Math.floor(mouseCoords.x / engineCanvasScale.x);
}

function mouseY() {
  if (engineCamera) {
    return Math.floor((mouseCoords.y + engineCamera.y) / engineCanvasScale.y);
  }
  return Math.floor(mouseCoords.y / engineCanvasScale.y);
}

function mouseWindowX() {
  return mouseCoords.x;
}

function mouseWindowY() {
  return mouseCoords.y;
}



const keys = {
  q: 81, w: 87, e: 69, r: 82, t: 84, y: 89, u: 85, i: 73, o: 79, p: 80,
  a: 65, s: 83, d: 68, f: 70, g: 71, h: 72, j: 74, k: 75, l: 76, 
  z: 90, x: 88, c: 67, v: 86, b: 66, n: 78, m: 77, 
  1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, 0: 47, 
  num1: 97, num2: 98, num3: 99, num4: 100, num5: 101, num6: 102, num7: 103, num8: 104, num9: 105, num0: 96,
  esc: 27, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123,
  tilda: 192, tab: 9, caps: 20, shift: 16, control: 17, alt: 18, enter: 13, backspace: 8,
  left: 37, up: 38, right: 39, down: 40,
  minus: 189, equal: 187, backslash: 220,
  bracketleft: 219, bracketright: 221,
  semicolon: 186, quote: 222,
  comma: 188, period: 190, slash: 191,
  space: 32, delete: 46, insert: 45, home: 36, end: 35, pageup: 33, pagedown: 34,
  numlock: 144, numdivide: 111, nummultiply: 106, numsubtract: 109, numadd: 107, 
  context: 93, meta: 91
}