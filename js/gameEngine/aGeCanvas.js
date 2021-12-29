class Canvas {
  constructor (w, h) {
    let c = $(`<canvas width="${w}" height="${h}" style="display: none;"></canvas>`);
    $('body').append(c);
    this.canvasJQ = c;
    this.canvas = c[0];
    this.ctx = this.canvas.getContext('2d');
    this.w = w;
    this.h = h;
  }

  fill (color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.closePath();
  }

  rect (x, y, w, h, colorOut, colorIn) {
    this.ctx.strokeStyle = colorOut;
    if (colorIn) {
      this.ctx.fillStyle = colorIn;
      this.ctx.fillRect(x, y, w, h);
    }
    this.ctx.strokeRect(x, y, w, h);
    this.ctx.closePath();
  }

  line (x, y, xto, yto, color) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(xto, yto);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  circle (x, y, r, colorOut, colorIn) {
    this.ctx.strokeStyle = colorOut;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    if (colorIn) {
      this.ctx.fillStyle = colorIn;
      this.ctx.fill();
    }
    this.ctx.stroke();
  }

  text (x, y, text, font = 'Consolas', size = '15px', fill = 1, color = '#000000', align = 'left', valign = 'middle') {
    this.ctx.font = size + ' ' + font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = valign;
    if (fill) {
      this.ctx.fillText(text, x, y);
    } else {
      this.ctx.strokeText(text, x, y);
    }
  }

  image (img, x, y, xsc = 1, ysc = 1, rot = 0, a = 1) {
    if (typeof img == 'undefined') return;
    img.draw(this.ctx, x, y, xsc, ysc, rot, a);
  }

  drawCanvas(c, x, y) {
    this.ctx.drawImage(c.canvas, x, y);
  }
  
  drawSetAlpha(a) {
    this.ctx.globalAlpha = a;
  }
  
  drawGetAlpha() {
    return this.ctx.globalAlpha;
  }

  drawSetBlend(b) {
    this.ctx.globalCompositeOperation = b;
  }

  hide() {
    this.canvas.style.display = 'none';
  }

  show() {
    this.canvas.style.display = 'initial';
  }

  translate(x, y) {
    this.ctx.translate(x, y);
  }

  reset() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSetAlpha(1);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  destroy() {
    c.remove();
  }

  setScale(x, y) {
    this.ctx.scale(x, y);
  }
}

const drawblendMode = {
  normal: 'source-over',
  src_in: 'source-in',
  src_out: 'source-out',
  src_atop: 'source-atop',
  dest_over: 'destination-over',
  dest_in: 'destination-in',
  dest_out: 'destination-out',
  dest_atop: 'destination-atop',
  lighter: 'lighter',
  copy: 'copy',
  xor: 'xor',
  multiply: 'multiply',
  screen: 'screen',
  overlay: 'overlay',
  darken: 'darken',
  lighten: 'lighten',
  col_dodge: 'color-dodge',
  col_burn: 'color-burn',
  hard_light: 'hard-light',
  soft_light: 'soft-light',
  difference: 'difference',
  exclusion: 'exclusion',
  hue: 'hue',
  saturation: 'saturation',
  color: 'color',
  luminosity: 'luminosity'
}