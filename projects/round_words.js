// here is p5js code
let width=600,height=600;
let center_x = width/2;
let center_y = height/2;
let r = 80;
let t = 0;
function setup() {
    createCanvas(width, height);
}

function draw() {
    background(205);
    // Your drawing code here
    t = t+0.1;
    let nx = center_x+r*cos(t);
    let ny = center_y+r*sin(t);

    text('Alfabet',nx,ny);
}