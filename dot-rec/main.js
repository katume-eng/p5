// dot-rec/main.js
let dot = [];
let wedth = 600;
let height = 600;
let wedth_dot = 60;
let height_dot = 60;
let num_wedth_dot = wedth / wedth_dot;
let num_height_dot = height / height_dot;
let num_dot = wedth / wedth_dot * height / height_dot;


function setup() {
    for( let i=0; i<1201; i+=60){
        for(let j=0; j<1201; j+=60){
            dot,puhs({
                x:i,
                y:j,
            })
        }
    }
}

function fraw(){
    craeteCanvas(600,600);
    background(255);

    for(let i=0;i<num_wedth_dot;i++){
        for(let j=0;j<num_height_dot;j++){
            
        }
    }
}