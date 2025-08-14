let width = 600;
let height = 600;

let skyColor = '#87CEEB';
let waterColor = '#1E90FF';
let groundColor = '#2c902cff';
let wallColor = '#9f5a29ff';
let watersplashColor = '#ffffffff';

let splashes = []; // スプラッシュの配列

function setup() {
  createCanvas(width, height);

  // スプラッシュを複数生成（例：10個）
  for (let i = 0; i < 10; i++) {
    let splashX = width / 2 + random(-100, 100);
    let splashY = 130;
    let splashSize = random(20, 50);
    let splashSpeed = random(2, 6);
    splashes.push({
      x: splashX,
      y: splashY,
      size: splashSize,
      speed: splashSpeed
    });
  }
}

function draw() {
  background(skyColor);

  // ground
  stroke(0);
  strokeWeight(1);
  fill(groundColor);
  rect(0, height - 100, width, 100);

  // wall
  stroke(0);
  strokeWeight(1);
  fill(wallColor);
  rect(0, 100, width, height - 200);

  // waterfall
  stroke(0);
  strokeWeight(1);
  fill(waterColor);
  rect(width / 2 - 100, 100, 200, width - 200);

  // splash effect
  for (let i = 0; i < splashes.length; i++) {
    drawSplash(splashes[i]);
  }
}

function drawSplash(splash) {
  stroke(watersplashColor);
  strokeWeight(5);
  line(splash.x, splash.y, splash.x, splash.y + splash.size);
  splash.y += splash.speed;

  // 落ちすぎないように制限
  splash.y %= height - 100;
  splash.y = max(splash.y, 130);
  if(splash.y + splash.size > height -100){
    splash.y = height;
  }
}
