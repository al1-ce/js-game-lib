class GameSprite {
  constructor (src, w, h) {
    this.src = src;
    let srcCheck = $(`img[src="${src}"]`);
    if (srcCheck.length) {
      this.img = srcCheck[0];
    } else {
      let i = $(`<img src="${this.src}" style="display: none" />`);
      $('body').append(i);
      this.img = i[0];
    }
    this.w = w;
    this.h = h;
  }

  draw (ctx, x, y, xsc, ysc, rot, a) {
    let al = drawGetAlpha();
    drawSetAlpha(a);
    let xTr = -(this.w * xsc) / 2;
    let yTr = -(this.h * ysc) / 2;
    ctx.translate(x - xTr, y - yTr);
    ctx.rotate(degToRad(rot));

    ctx.drawImage(this.img,  xTr,  yTr, this.w * xsc, this.h * ysc);

    ctx.rotate(-degToRad(rot));
    ctx.translate( - (x - xTr), - (y - yTr));
    drawSetAlpha(al);
  }
}

class GameSpriteSheet extends GameSprite {
  constructor (src, w, h, xst, yst, frameW, frameH, spacing, frames) {
    super(src, w, h);
    this.frame = 0;
    this.xst = xst;
    this.yst = yst;
    this.frameW = frameW;
    this.frameH = frameH;
    this.spacing = spacing;
    this.frames = frames;
  }

  step (speed) {
    this.frame += speed;
    if (this.frame >= this.frames) {
      this.frame = 0;
    }
  }

  setFrame(frame) {
    this.frame = Math.min(frame, this.frames);
  }

  draw (ctx, x, y, xsc, ysc, rot, a) {
    let al = drawGetAlpha();
    drawSetAlpha(a);
    let xTr = -(this.w * xsc) / 2;
    let yTr = -(this.h * ysc) / 2;
    ctx.translate(x - xTr, y - yTr);
    ctx.rotate(degToRad(rot));

    let spacing = this.spacing * (this.frame + 1);
    let xpos = this.xst + (this.frameW * Math.floor(this.frame)) + spacing;
    ctx.drawImage(this.img, xpos, this.yst, this.frameW, this.frameH, xTr, yTr, this.w * xsc, this.h * ysc);

    ctx.rotate(-degToRad(rot));
    ctx.translate( - (x - xTr), - (y - yTr));
    drawSetAlpha(al);
  }
}