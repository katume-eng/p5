// ============================
// 墨が生える木 / wabi-sabi style
//  - 交互作用なし。生成過程がゆっくり描かれる。
//  - 和紙の地（テクスチャ）上に、墨がしみるような線分。
//  - 完走すると静止。
// ============================

let paper;          // 和紙テクスチャ
let ink;            // 純粋な描画レイヤ（蓄積）
let w, h;
let tips = [];      // 先端たち（成長点）
let growing = true; // 成長フラグ

// パラメータ（必要ならここだけ調整）
const PARAM = {
  seed: 20251026,       // 乱数シード（固定で毎回似る）
  stepsPerFrame: 90,    // 1フレームで何ステップ進めるか（描画高速化）
  baseStep: 3.6,        // 先端が進むベース距離
  jitter: 0.22,         // 微妙な揺れ（ラジアン）
  branchChance: 0.07,   // 分岐確率
  branchAngle: 0.35,    // 分岐角度の基準
  thickStart: 20.0,      // 幹の太さ
  thickDecay: 0.992,    // 太さ減衰率（1に近いほどゆっくり）
  minThick: 0.35,       // 停止閾値
  bleed: 0.22,          // にじみの強さ（0〜1）
  poolChance: 0.1,      // 節でインク溜まり
  maxTips: 520,         // 成長点の最大数
  groundMargin: 60,     // 画面下の余白
  windScale: 0.0035,    // ノイズ風のスケール
  windStrength: 0.7,    // 風の強さ
  paperScale: 0.25    // 和紙ノイズのスケール
};

function setup(){
  randomSeed(PARAM.seed);
  noiseSeed(PARAM.seed);
  w = min(windowWidth, 900);
  h = min(windowHeight, 1200);
  const ratio = h / w; // 縦長を優先
  if(ratio < 1.2) h = w * 1.2;

  createCanvas(w, h);
  pixelDensity(2);

  paper = createGraphics(w, h);
  ink = createGraphics(w, h);
  ink.clear();
  generatePaper(paper);

  // 初期の幹の芽
  const rootX = width * 0.5 + random(-10, 10);
  const rootY = height - PARAM.groundMargin;
  tips.push(new Tip(rootX, rootY, -HALF_PI + random(-0.05, 0.05), PARAM.thickStart, 0));
  background('#ece7db');
}

function draw(){
  // 背景を先に
  image(paper, 0, 0);

  if(growing){
    for(let k=0; k<PARAM.stepsPerFrame; k++){
      stepGrowth();
      if(!growing) break;
    }
  }

  // インクを重ねる（少し乗算で紙になじませる）
  blendMode(BLEND);
  image(ink, 0, 0);

  // 完走後はもう描かない
  if(!growing){
    noLoop();
  }
}

function stepGrowth(){
  if(tips.length === 0){
    growing = false; return;
  }
  // 先端をスキャンしながら成長。新しい先端は別配列へ
  const nextTips = [];
  for(let i=0; i<tips.length; i++){
    const t = tips[i];

    // ノイズ風と微振動
    const nx = noise(t.x * PARAM.windScale, t.y * PARAM.windScale, t.life*0.01);
    const wind = (nx - 0.5) * TWO_PI * 0.02 * PARAM.windStrength;
    t.dir += random(-PARAM.jitter, PARAM.jitter) * 0.35 + wind;

    // 進行
    const step = PARAM.baseStep * map(t.thick, PARAM.minThick, PARAM.thickStart, 0.6, 1.4, true);
    const x2 = t.x + cos(t.dir) * step;
    const y2 = t.y + sin(t.dir) * step;

    // 描画：中心の濃い線 + にじみ（多重ストローク）
    drawInkSegment(t.x, t.y, x2, y2, t.thick);

    // 更新
    t.x = x2; t.y = y2; t.life++;
    t.thick *= PARAM.thickDecay;

    // たまに節のインク溜まり
    if(random() < PARAM.poolChance){
      drawPool(t.x, t.y, t.thick);
    }

    // 終了条件
    const outOfBounds = x2 < 20 || x2 > width-20 || y2 < 30;
    if(t.thick < PARAM.minThick || outOfBounds){
      continue;
    }

    // 分岐
    const canBranch = tips.length + nextTips.length < PARAM.maxTips;
    if(canBranch && random() < PARAM.branchChance * map(t.thick, PARAM.minThick, PARAM.thickStart, 0.6, 1.0, true)){
      const angle = PARAM.branchAngle * random(0.6, 1.4) * (random()<0.5?-1:1);
      const child = new Tip(t.x, t.y, t.dir + angle, t.thick * random(0.62, 0.78), t.depth+1);
      nextTips.push(child);
    }

    // 先端継続
    nextTips.push(t);
  }

  tips = nextTips;

  // すべて枯れたら終了
  if(tips.length === 0) growing = false;
}

function drawInkSegment(x1, y1, x2, y2, thick){
  ink.push();
  // 中心の濃い芯
  ink.stroke(0, 12); // 透明度控えめで積層させる
  ink.strokeWeight(thick);
  ink.strokeCap(ROUND);
  ink.line(x1, y1, x2, y2);

  // にじみ：太さに応じて薄いストロークを少し広げて重ねる
  const rings = 2 + floor(map(thick, 0, PARAM.thickStart, 1, 6, true));
  for(let r=1; r<=rings; r++){
    const a = 6 * PARAM.bleed / r; // 濃度
    ink.stroke(0, a);
    ink.strokeWeight(thick + r * (1.5 + PARAM.bleed*2));
    ink.line(x1, y1, x2, y2);
  }

  // 細いフェザー（毛羽立ち）
  const fe = constrain(1 + floor(thick*0.35), 1, 5);
  for(let i=0; i<fe; i++){
    if(random() < 0.4){
      const t = random();
      const px = lerp(x1, x2, t);
      const py = lerp(y1, y2, t);
      const ang = atan2(y2-y1, x2-x1) + (random()<0.5?1:-1)*random(0.7, 1.3);
      const len = random(2, 10) * PARAM.bleed * map(thick, 0, PARAM.thickStart, 0.4, 1.0, true);
      ink.stroke(0, 10);
      ink.strokeWeight(0.6);
      ink.line(px, py, px + cos(ang)*len, py + sin(ang)*len);
    }
  }
  ink.pop();
}

function drawPool(x, y, thick){
  ink.push();
  const r = thick * random(0.8, 1.6) + random(1, 4);
  for(let i=0; i<6; i++){
    const rr = r * random(0.7, 1.2) + i*0.2;
    ink.noStroke();
    ink.fill(0, 6 - i); // ごく薄く重ねる
    ink.circle(x + randomGaussian(0, 0.6), y + randomGaussian(0, 0.6), rr);
  }
  ink.pop();
}

class Tip{
  constructor(x, y, dir, thick, depth){
    this.x = x; this.y = y; this.dir = dir; this.thick = thick;
    this.depth = depth; this.life = 0;
  }
}

// 和紙生成：やや温かいベース + 粗いノイズ + 細い繊維
function generatePaper(g){
  g.push();
  g.background('#f3efe6');

  // 大域ノイズの雲
  g.noStroke();
  for(let y=0; y<g.height; y+=4){
    for(let x=0; x<g.width; x+=4){
      const n = noise(x*PARAM.paperScale, y*PARAM.paperScale)*0.9 + random(0.0, 0.06);
      const c = 243 + floor(n*10); // 明るさゆらぎ
      g.fill(c, c-2, c-6, 18);
      g.rect(x, y, 6, 6);
    }
  }

  // 細い繊維
  g.stroke(120, 12);
  g.strokeWeight(0.6);
  const fibers = 220;
  for(let i=0; i<fibers; i++){
    const x = random(-50, g.width+50);
    const y = random(-50, g.height+50);
    const len = random(40, 140);
    const ang = random(TWO_PI);
    g.push();
    g.translate(x, y);
    g.rotate(ang);
    for(let j=0; j<len; j++){
      const yy = j - len*0.5;
      const alpha = 10 * noise(j*0.07, i*0.13);
      g.stroke(100, alpha);
      g.point(j*0.8, yy*0.02 + noise(j*0.06, i)*1.0);
    }
    g.pop();
  }

  // 下部の薄い地平ライン（設置感）
  g.noStroke();
  for(let i=0; i<60; i++){
    g.fill(0, 2);
    g.rect(0, g.height - PARAM.groundMargin + i, g.width, 1);
  }

  g.pop();
}

function windowResized(){
  // サイズ変化時はリセット（作品は非インタラクティブなので再生成）
  resizeCanvas(1,1); // 一瞬縮めてから安全に再生成
  tips = []; growing = true;
  setup();
  loop();
}
