let width=600, height=600;
let r_point = 5;
let pointing = [];

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.alpha = 255;
        this.color = color(255,0,0);
        this.r = r_point;
    }

    display(){
        fill(this.color);
        noStroke();
        ellipse(this.x,this.y,this.r);
    }

    update(){
        this.alpha = this.alpha-5;
        this.color = color(255,0,0,this.alpha);
    }
}



function setup() {
    createCanvas(width,height);
}

function draw() {
    background(30);
    let x = mouseX, y = mouseY;
    let p = new Point(x,y);
    pointing.push(p);

    pointing.forEach(function(p){
        p.update();
        p.display();
    })
    
}