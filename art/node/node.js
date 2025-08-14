let nodes = [];
let edges = [];
let num_nodes = 30;
let node_radius = 30;

let width = 600;
let height = 600;

function setup() {
    createCanvas(width, height);

    for(let i = 0;i < num_nodes;i++){
        let x = random(node_radius, width - node_radius);
        let y = random(node_radius, height - node_radius);
        let color = random(255);
        nodes.push({x: x, y: y, color: color});
    }
}

function draw(){
    background(255);
    for(let i = 0;i<num_nodes;i++){
        strokeWeight(2);
        fill(nodes[i].color);
        circle(nodes[i].x,nodes[i].y,node_radius*2, node_radius*2);
    }

    for(let i=0;i<num_nodes-1;i++){
        for(let j=i+1;j<num_nodes;j++){
            let d = dist(nodes[i].x,nodes[i].y, nodes[j].x, nodes[j].y);
            if(d < node_radius * 3){
                stroke(0, 100);
                strokeWeight(2);
                line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            }
        }
    }

    for(let i=0;i<num_nodes;i++){
        let node = nodes[i];
        let x = (node.x + noise(frameCount * 0.1 + i*10)) % width;
        let y = (node.y +  noise(frameCount * 0.1 + i*20)) % height;
        let cx = constrain(x, 0, width);
        let cy = constrain(y, 0, height);

        node.x = cx;
        node.y = cy;

        nodes[i].x = cx;
        nodes[i].y = cy;
    }

}