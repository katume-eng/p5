let song, fft;

function preload() {
  song = loadSound("recorded.wav");
}

function setup() {
  createCanvas(800, 400);
  fft = new p5.FFT();
}

function draw() {
  background(0);

  if (song.isPlaying()) {
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid  = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");


    fill(255,0,0,127);
    rect(0, height, width, -bass);

    fill(127,0,127,127);
    rect(0, height, width, -mid);

  } else {
    fill(0);
    textAlign(CENTER, CENTER);
    text("click to play", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!song.isPlaying()) {
    song.play();
  }
}
