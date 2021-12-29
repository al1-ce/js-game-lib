let pl;
let back;
let light;
let doors = [];
let keypads = [];


function init() {
  canvasMainSet(1280, 720); //320x180
  canvasMainBackground('#eeeeee');
  canvasMainScale(4, 4);

  back = new GameSprite('src/back.png', 320, 180);
  light = new GameSprite('src/light.png', 80, 96);

  doors.push(new objDoor(85, 104));
  doors.push(new objDoor(204, 104));
  keypads.push(new objKeyPad(70, 128));
  keypads.push(new objKeyPad(189, 128));

  
  pl = new Player(40, 180-48-20);
}

function preStep() {}
function preDraw() {
  drawImage(back, 0, 0);
}

function step() {
}
function draw() {
  drawSetBlend(drawblendMode.lighten);
  drawImage(light, 0, 64);
  drawSetBlend(drawblendMode.normal);


  drawRect(0, 0, 320, 64, '#000', '#000');
  drawRect(0, 160, 320, 20, '#000', '#000');
  drawText(1, 20, 'x: ' + mouseX() + '\ny: ' + mouseY(), 'Consolas', '15px', 1, '#fff');

  if (collisionPoint(mouseX(), mouseY(), ['objKeyPad', 'objDoor'])) {
    drawText(mouseX(), mouseY(), 'GOT IT', 'Consolas', '15px', 1, '#fff');
  }
}