//直方体がランダムに宙を舞う

let rectangles = [];
let num_rectangles = 100;
let rec_x = 0;
let rec_y = 0;
let rec_w = 50;
let rec_h = 50;

function setup() {
    createCanvas(400, 400);
    let rectangle ={
        x: rec_x,
        y: rec_y,
        w: rec_w,
        h: rec_h,
        color: [random(255), random(255), random(255)]
    }
    for(let i=0;i<num_rectangles;i++){
        rectangles.push({
            x: random(width),
            y: random(height),
            w: rec_w,
            h: rec_h,
            color: [random(255), random(255), random(255)]
        });
    }
}
function draw() {
    background(220);
    
    for(let i=0;i<num_rectangles;i++){
        let rec = rectangles[i];
        fill(rec.color);
        rect(rec.x, rec.y, rec.w, rec.h);
        
        // ランダムに移動
        rec.x += random(-2, 2);
        rec.y += random(-2, 2);
        
        // 画面外に出ないように制限
        rec.x = constrain(rec.x, 0, width - rec.w);
        rec.y = constrain(rec.y, 0, height - rec.h);
    }
    end();
}

// other functions

