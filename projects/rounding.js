let width=600,height=600;
let limit_l;

let block = [];//rounding
let size_block = 40;
let num_block = 200;

function make_pastel() {
    let r=random(0,255),g=random(0,255),b=random(0,255);
    return color((r+255)/2,(g+255)/2,(b+255)/2);
}

class Block{
    constructor(){
        this.l = random(20,200);
        this.r = size_block;
        this.color = make_pastel();
        this.angle = random(TWO_PI);
        this.speed = random(4)+0.001;
        this.angle_acc = random(-1,1)*0.03;
        this.phase = random([1,-1])*random(0.1,0.9);
    }

    display(){
        fill(this.color);
        stroke(100);
        strokeWeight(0.5)
        
        square(this.l*cos(this.angle),this.l*sin(this.angle),this.r,5);
    }

    update(ti){
        this.l = (this.l + this.speed);
        if(this.l > limit_l){
            this.l = random(20,limit_l-50);
        }
        this.r = size_block+sin(time*TWO_PI*this.phase)*size_block/2;
        this.angle += this.angle_acc;
    }
}

function setup() {
    createCanvas(width,height);
    let b = new Block();
    block.push(b);
    limit_l= sqrt((width/2)*(width/2) + (height/2)*(height/2));
    for (let i = 0; i < num_block; i++) {
        let b = new Block();
        block.push(b);
    }
}

function draw() {
    let ti = millis()/1000;
    background(255);
    // Your drawing code here

    translate(width/2,height/2);

    fill(255,0,0);
    noStroke()
    ellipse(0,0,10);

    block.forEach(function(b){
        b.update(ti);
        b.display();
    })
}