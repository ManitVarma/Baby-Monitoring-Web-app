sound = "";
Objects = [];
var status = "";

function preload(){
    sound = loadSound("simple_man.mp3");
}

function setup(){
    canvas = createCanvas(650, 450);
    canvas.position(400,250);
    Video = createCapture(VIDEO);
    Video.size(650,450);
    Video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(Video,0,0,650,450);

    if(status != ""){
        r = random(255)
        g = random(255)
        b = random(255)

        objectDetector.detect(Video, gotResult);

        for(i = 0; i < Objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";           
            fill(r,g,b);
            percent = floor(Objects[i].confidence * 100);
            
            text(Objects[i].label + " " + percent + "%" , Objects[i].x + 10 , Objects[i].y + 20);
            noFill();
            stroke(r,g,b);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
            if(Objects[i].label == "person"){
                document.getElementById("detect").innerHTML = "Baby Detected";
                sound.stop();
            }
            else{
                document.getElementById("detect").innerHTML = "Baby not found";
                sound.play();
            }
        }

    
    if(Objects.length == 0){
        document.getElementById("detect").innerHTML = "Baby not found";
        sound.play();
    }

}
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);

    Objects = results;


}