function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  pointLight(255, 255, 255, 200, -200, 200); // RGB, x, y, z

}

function draw() {
  background(255);
  orbitControl();

  push();
  fill(255, 0, 0);
  sphere(10); // 原点に赤い球を置く
  pop();

  let r = 100;           // 半径
  let h = 300;           // 高さ
  let detail = 40;       // 円周の分割数
  let layers = 20;       // 縦方向の分割数

  for (let j = 0; j < layers; j++) {
    let y1 = map(j, 0, layers, -h / 2, h / 2);
    let y2 = map(j + 1, 0, layers, -h / 2, h / 2);

    fill(random(100, 255), random(100, 255), random(100, 255));

    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i <= detail; i++) {
      let angle = TWO_PI * i / detail;
      let x = cos(angle);
      let z = sin(angle);

      // 法線ベクトル（外向き）
      normal(x, 0, z);

      // 上の円の点
      vertex(x * r, y1, z * r);

      // 下の円の点
      vertex(x * r, y2, z * r);
    }
    endShape();
  }
}
