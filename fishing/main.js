// fishing/main.js
// This is the main entry point for the fishing intaraction
let color = "lightblue";
let fish = [];
let num_fish = 30;



function setup() {
    createCanvas(600,600);
    frameRate(5);

    // Initialize fish array with random positions
    for(let i=0; i<num_fish; i++){
        fish.push({
            x: random(600),
            y: random(600),
            size: random(30, 50), // Random size for each fish
            speed: random(0.1), // Random speed for each fish
            r: random(100,255), // Random red component for color
            g: random(100,255), // Random green component for color
            b: random(100,255) // Random blue component for color
        });
    }
}

function draw() {
    background(color);
    // Your drawing code here

    fill(0);
    textSize(32);
    text("Fishing", 10, 30);

    let x = mouseX;
    let y = mouseY;

    for(let i=0;i<num_fish;i++){
        let f= fish[i];
        // Move fish towards the mouse position
        if (dist(f.x, f.y, x, y) < 600) {
            f.x += (x - f.x) * f.speed; // Move towards mouse
            f.y += (y - f.y) * f.speed; // Move towards mouse
        }
        if(dist(f.x, f.y, x, y) < 75) {
            // If the fish reaches the mouse position, reset its position
            f.x = random(600);
            f.y = random(600);
        }
    }

    textSize(40);
    text("🎣",mouseX,mouseY);

    for(let i=0; i<num_fish; i++){
        let f = fish[i];
        a_fish(f.x, f.y, f.size,f.r, f.g, f.b);
    }

}

function a_fish(x, y, size,r,g,b){
    push();
    translate(x, y);
    // 体
    fill(r,g,b);
    noStroke();
    ellipse(0, 0, size*2, size); // 横長の楕円

    // 尾びれ（三角形）
    fill(r,g,b);
    triangle(-size, 0, -size-10, -size/3, -size-10, size/3);

    pop();
}