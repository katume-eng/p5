let PARAM = {
  seed: 20251026,
  cup_height: 620,
  cup_width_top: 160,
  cup_width_bottom: 100,
  cup_thickness: 6,
  cup_curve: 0.3,
  stroke_alpha: 40,
  stroke_weight: 4,
  noise_scale: 0.05,
  draw_speed: 1.5
};

let points = [];
let t = 0;
let topEllipse = [];
let innerLip = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  randomSeed(PARAM.seed);
  noiseSeed(PARAM.seed);
  background('#ece7db');
  
  generateCupPoints();
  stroke(0, PARAM.stroke_alpha);
  strokeWeight(PARAM.stroke_weight);
}

function draw() {
  translate(width / 2, height * 0.7);
  
  for (let i = 0; i < PARAM.draw_speed; i++) {
    if (t < points.length - 1) {
      let p1 = points[t];
      let p2 = points[t + 1];
      line(p1.x, p1.y, p2.x, p2.y);
      t++;
    } else if (t === points.length - 1) {
      // 上口を描く
      drawTopEllipse();
      t++;
    }
  }
}

function generateCupPoints() {
  let h = PARAM.cup_height;
  let wTop = PARAM.cup_width_top / 2;
  let wBottom = PARAM.cup_width_bottom / 2;
  let curve = PARAM.cup_curve;
  
  // 左側輪郭
  let left = [];
  for (let y = 0; y <= h; y += 2) {
    let r = lerp(wTop, wBottom, pow(y / h, 1 + curve));
    let nx = noise(y * PARAM.noise_scale) * 10 - 5;
    left.push(createVector(-r + nx, -y));
  }
  // 右側輪郭（対称）
  let right = [];
  for (let y = h; y >= 0; y -= 2) {
    let r = lerp(wTop, wBottom, pow(y / h, 1 + curve));
    let nx = noise(y * PARAM.noise_scale + 50) * 10 - 5;
    right.push(createVector(r + nx, -y));
  }
  
  // 底楕円
  let bottom = [];
  for (let a = 0; a <= PI; a += 0.1) {
    let x = cos(a) * wBottom;
    let y = sin(a) * 8 - h;
    bottom.push(createVector(x, y));
  }

  // 上口（外側楕円）
  topEllipse = [];
  for (let a = PI; a <= TWO_PI; a += 0.05) {
    let x = cos(a) * wTop;
    let y = sin(a) * 8;
    topEllipse.push(createVector(x, y));
  }

  // 内側の縁（内楕円）
  innerLip = [];
  let innerTop = wTop - PARAM.cup_thickness;
  for (let a = 0; a <= PI; a += 0.05) {
    let x = cos(a) * innerTop;
    let y = sin(a) * 6;
    innerLip.push(createVector(x, y));
  }

  points = left.concat(bottom).concat(right);
}

function drawTopEllipse() {
  // 上口外側
  beginShape();
  for (let p of topEllipse) vertex(p.x, p.y);
  endShape();

  // 内側（縁の内側）
  beginShape();
  for (let p of innerLip) vertex(p.x, p.y);
  endShape();
}

function keyPressed() {
  if (key === 's') saveCanvas('cup_sketch', 'png');
}
