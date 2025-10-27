let font;

function preload(){
    font = loadFont("fonts/Roboto-VariableFont_wdth,wght.ttf");

}




let width=1000, height=1000;
function setup() {
    createCanvas(width,height);
}

function draw() {
    background(205);
    textFont(font);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("hello p5.js!", width / 2, height / 2);
    // Your drawing code here
}