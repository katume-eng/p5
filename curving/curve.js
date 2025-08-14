let cruves = [];


function setup() {
    createCanvas(600,600);
    background(255);
}

function draw(){
    let x = 300;
    let y = 300;
    let r = 10;
    
    for(let i=0;i<20;i+=0.1){
        strokeWeight(5);
        x = r*exp(i*0.5)*cos(i);
        y = r*exp(i*0.5)*sin(i);
        point(x+300, y+300);

    }

}

class Curve {
    constructor(x,y,r,speed,arg,color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.arg = arg;
        this.color = color;
        this.time = 0;
    }

    update() {
        this.x = this.r * cos(this.arg*this.time*this.speed);
        this.y = this.r * sin(this.arg*this.time*this.speed);
        this.time += 0.01;
        this.time %= 6.28;
    }

    display() {
        stroke(this.color);
        strokeWeight(2);
        fill(255, 0, 0, 100);
        ellipse(this.x + width / 2, this.y + height / 2, 20, 20);
    }
}