song="";
score_right_wrist=0;
score_left_wrist=0;

left_wrist_x=0;
left_wrist_y=0;

right_wrist_x=0;
right_wrist_y=0;


function preload(){
song=loadSound("music.mp3");

}
function setup(){
canvas=createCanvas(500,400);
video=createCapture(VIDEO);
canvas.center();
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);



}
function draw(){
image(video,0,0,500,400);
fill("pink");
stroke("black");


if(score_right_wrist > 0){
    circle(right_wrist_x,right_wrist_y,20);
if(right_wrist_y>0 && right_wrist_y<100){
document.getElementById("speed").innerHTML="0.5x";
song.rate(0.5);
}
if(right_wrist_y>100 && right_wrist_y<200){
    document.getElementById("speed").innerHTML="1";
    song.rate(1);
}
if(right_wrist_y>200 && right_wrist_y<300){
    document.getElementById("speed").innerHTML="1.5";
    song.rate(1.5);
}
if(right_wrist_y>300 && right_wrist_y<400){
    document.getElementById("speed").innerHTML="2";
    song.rate(2);
}
if(right_wrist_y>400){
    document.getElementById("speed").innerHTML="2.5";
    song.rate(2.5);
}
if(left_wrist_y>0){
 circle(left_wrist_x,left_wrist_y,20);
 number_left_wrist_y= Number(left_wrist_y);
 remove_decimals= Math.floor(number_left_wrist_y);
 volume=remove_decimals/400;
 document.getElementById("volume").innerHTML=volume;
 song.setVolume(volume);
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded(){
    console.log("posenet is loaded");
}
function gotPoses(result){
    console.log(result)
if(result.length > 0){
console.log(result);
score_right_wrist=result[0].pose.keypoints[10].score;
score_left_wrist=result[0].pose.keypoints[9].score;

right_wrist_x=result[0].pose.rightWrist.x;
right_wrist_y=result[0].pose.rightWrist.y;

left_wrist_x=result[0].pose.leftWrist.x;
left_wrist_y=result[0].pose.leftWrist.y;



}




}