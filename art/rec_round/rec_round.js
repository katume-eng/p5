// 長方形が回ってるのを作りたい

let rectangles = [];
let num_rectangles = 100;
let rec_x = 0;
let rec_y = 0;
let rec_w = 50;
let rec_h = 50;
let arg_x = 0;
let arg_y = 0;
let moveRange = 100;


function setup(){
    createCanvas(600,600);
    for(let i = 0; i < num_rectangles; i++){
        let angleX = random(0, Math.PI * 2);
        let angleY = random(0, Math.PI * 2);
        let radiusX = random(100, width/2 - 50);
        let radiusY = random(100, height/2 - 50);

        rectangles.push({
            arg_x: angleX,
            arg_y: angleY,
            x: radiusX * sin(angleX) + width / 2,
            y: radiusY * sin(angleY) + height / 2,
            w: random(rec_h),
            h: random(rec_w),
            color: [random(255), random(255), random(255)],
        });
    }
}

function draw(){
    background(255);

    for(let i=0;i<num_rectangles;i++){
        let rec = rectangles[i];
        rec.arg_x += 0.01*PI;

        rec.x = moveRange * sin(rec.arg_x) + width / 2;
    }    
    for(let i=0;i<num_rectangles;i++){
        let rec = rectangles[i];
        fill(rec.color);
        rect(rec.x,rec.y, rec.w, rec.h);
    }


}