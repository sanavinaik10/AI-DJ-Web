song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}
function draw(){
    image(video ,0 , 0, 600, 500);
    if(scoreleftwrist >= 0.2){
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristX,leftWristY,20);
        NumerLeftWristY = Number(leftWristY);
        removedecimals = floor(NumerLeftWristY);
        volume = removedecimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if(scorerightwrist >= 0.2){
        fill("#FF0000");
        stroke("#FF0000");
        circle(rightWristX,rightWristY,20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5); 
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1); 
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2); 
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5); 
        }
}   }
function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop_song(){
    song.stop();
}
function modelLoaded(){
    console.log("Model is loaded");
}
function gotPoses(result){
    if(result.length > 0){
     scoreleftwrist =  result[0].pose.keypoints[9].score;
     scorerightwrist =  result[0].pose.keypoints[10].score;
     console.log(result);
     leftWristX = result[0].pose.leftWrist.x;
     leftWristY = result[0].pose.leftWrist.y;
     rightWristX = result[0].pose.rightWrist.x;
     rightWristY = result[0].pose.rightWrist.y;
     console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
     console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}