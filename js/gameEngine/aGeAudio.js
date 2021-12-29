class GameAudio {
  constructor (srcMp3, srcOgg, loop = 0) {
    this.srcMp3 = srcMp3;
    this.srcOgg = srcOgg;
    this.loop = loop;

    let audio;
    if (loop) {
      audio = $('<audio loop></audio>');
    } else {
      audio = $('<audio></audio>');
    }
    let mp3 = $(`<source src="${srcMp3}" type="audio/mpeg">`);
    let ogg = $(`<source src="${srcOgg}" type="audio/ogg">`);
    audio.append(mp3);
    audio.append(ogg);
    $('body').append(audio);
    this.audio = audio[0]; 
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  getTime() {
    return  this.audio.currentTime;
  }

  setTime(p) {
    this.audio.currentTime = Math.min(p, this.audio.duration);
  }

  getLength() {
    return this.audio.duration;
  }

  setVolume(v) {

  }
}