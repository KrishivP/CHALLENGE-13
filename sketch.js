var trex, trexVY, trexY, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");  
}

function setup() {

  createCanvas(600,200);
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100));
  //console.log(rand);

}

function draw() {
  //set background color
  background(180);
  
  //console.log(frameCount);
  //console.log(trex.y);
  
  
  
  // jump when the space key is pressed
  if(keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  //gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //creating infinite ground
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  spawnTrexClouds()
  
  drawSprites();
}

//function to spawn the clouds
function spawnTrexClouds(){
  if (frameCount%60 === 0) {
    //cloud
    cloud = createSprite(600,100,40,10);
    cloud.velocityX = -3;
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(20, 100));

    //trex
    trexVY = trex.velocityY;
    trexY = trex.y
    trex.remove();
    trex = createSprite(50,trexY,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    trex.velocityY = trexVY;
  }  
}
