// include needed libs
/*
function includeJS(path) { $('head').append( $(`<script src="${path}" type="text/javascript"></script>`) ); }

includeJS('js/gameEngine/input.js');
includeJS('js/gameEngine/object.js');
includeJS('js/gameEngine/qmath.js');
includeJS('js/gameEngine/tools.js');
*/

// const

// variables
let engineHandler;
let engineCamera;
let engineCanvas;
let engineCanvasSize = {w: 800, h: 600};
let engineCanvasScale = {x: 1, y: 1};
let targetCanvas;
let canvasHandler = [];

let gameRules = {
  tick: 60,
  backgroundColor: '#ffffff'
}

class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}

$(document).ready( () => {
  engineInit();
  aGeInputInit();
  engineHandler = setInterval(engineHandle, 1000 / gameRules.tick);

  window.onfocus = () => {
    if (!engineHandler)
      engineHandler = setInterval(engineHandle, 1000 / gameRules.tick);
  }
  window.onblur = () => {
    clearInterval(engineHandler);
    engineHandler = 0;
  }
  window.onerror = (e) => {
    clearInterval(engineHandler);
    engineHandler = 0;
    let m = $(`<h4>${e}</h4>`);
    $('body').append( m );
  }
});
function engineInit() {
  init(); // user init
  engineCanvas = canvasCreate(engineCanvasSize.w, engineCanvasSize.h);
  engineCanvas.show();
  targetCanvas = engineCanvas;
}

function engineHandle() {
  canvasResetTarget();
  engineStep();
  engineDraw();
}


function engineStep() {
  preStep();

  for (let type in pawnHandler) {
    let obj = pawnHandler[type];
    for (let i = 0; i < obj.length; i ++) {
      obj[i].step();
    }
  }

  step(); // user step
}

function engineDraw() {
  for (let i of canvasHandler) {
    i.clear();
    i.ctx.imageSmoothingEnabled = false;
  }
  engineCanvas.fill(gameRules.backgroundColor);
  engineCanvas.setScale(engineCanvasScale.x, engineCanvasScale.y);
  if (engineCamera) {
    engineCanvas.translate(-engineCamera.x, -engineCamera.y);
  }
  preDraw();
  
  for (let type in pawnHandler) {
    let obj = pawnHandler[type];
    for (let i = 0; i < obj.length; i ++) {
      obj[i].draw();
    }
  }

  draw(); // user draw
  engineCanvas.reset();
  canvasResetTarget();
}