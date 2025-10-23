let block = [];
let width=1000,height=1000;
let block_size = 20;
let num_block = width/block_size;
let time;

let tile = []

 
class Tile{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.monoc = random(50,200);//mono color
        this.color = this.monoc;
        this.size = block_size;
        this.colorR = random(150,255);
        this.colorG = random(150,255);
        this.colorB = random(150,255);
    }

    display(){
        noStroke();
        fill(this.colorR,this.colorG,this.colorB);
        square(this.x,this.y,this.size);
    }

    r_update(t){
        let phasex = this.x*0.03;
        let phasey = this.y*0.005;
        let multi = phasex*phasey*0.1;
        this.size = block_size*abs(sin((TWO_PI*t*0.7-multi-phasey)));
    }
}




function setup() {
    createCanvas(width,height);
    for(let i=0;i<width;i+=block_size){
        for(let j=0;j<height;j+=block_size){
            block.push([i,j]);
            let t = new Tile(i,j);
            tile.push(t);
        }
    }
    //console.log(tile);
}

function draw() {
    background(250);
    // Your drawing code here
    time = millis()/1000;

    tile.forEach(function(t){
        //console.log(t);
        t.r_update(time);
        t.display();
    })

}