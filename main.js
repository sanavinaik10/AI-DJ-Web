song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
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
}
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
     console.log(result);
     leftWristX = result[0].pose.leftWrist.x;
     leftWristY = result[0].pose.leftWrist.y;
     rightWristX = result[0].pose.rightWrist.x;
     rightWristY = result[0].pose.rightWrist.y;
     console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
     console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}