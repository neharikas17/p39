

//Runner
var runner, runnerImage;

//Ground
var ground, groundImage;
var invisibleGround;

//Obstacle
var obstacleImage, obstacleGroup;

//Cloud
var cloudGroup, cloudImage;

//GameOver + Restart
var gameOver, gameOverImage;
var restart, restartImage;

//Background
var backgroundImage;

//GameState
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  //Runner
  runnerImage = loadImage('images/runner.png');

  //Ground
  groundImage = loadImage('images/background.jpg');

  //Obstacle
  obstacleImage = loadImage('images/obstacle.png');

  //Cloud
  cloudImage = loadImage('images/cloud.png');
  
  //GameOver + Restart
  gameOverImage = loadImage('images/GameOver.png');
  restartImage = loadImage("images/Restart.png");

  //Background
  backgroundImage = loadImage('images/sky.jpg');
}

function setup() {
  createCanvas(600, 200);

  //Runner
  runner = createSprite(300,190,20,50);
  runner.addImage('Image', runnerImage);
  runner.scale = 0.15;

  //Ground
  ground = createSprite(200,200,400,20);
  ground.addImage('Image', groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,192,400,10);
  invisibleGround.visible = false;

  //Obstacle
  obstacleGroup = new Group();

  //Cloud
  cloudGroup = new Group();

  //GameOver + Restart
  gameOver = createSprite(300,50);
  gameOver.addImage('Image', gameOverImage);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  restart = createSprite(300,110);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  restart.visible = false;
}

function draw() {
  background(backgroundImage);
  
  //GameState PLAY
  if(gameState === PLAY){
    //Runner
    runner.velocityY = runner.velocityY + 0.8;
    runner.collide(invisibleGround);

    if(keyDown("space") && runner.y >= 159) {
      runner.velocityY = -12;
    }

    //Ground
    ground.velocityX = -4;
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //Obstacle
    spawnObstacles();

    //Cloud
    spawnClouds();

    if(obstacleGroup.isTouching(runner)){
      gameState = END;
    }
  }

  //GameState END
  else if(gameState === END){

    //Runner
    runner.velocityY = 0;

    //Ground
    ground.velocityX = 0;

    //Obstacle
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    //Cloud
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);

    //GameOver + Restart
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(0,100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -5;
    cloud.lifetime = 200;

    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0){
    //Obstacle
    var obstacle = createSprite(random(600,650),165,10,10);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);  
    obstacle.scale = 0.1;
    obstacle.setCollider('rectangle',0,0,50,50)
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  //Obstacle
  obstacleGroup.destroyEach();

  //Cloud
  cloudGroup.destroyEach();

  //GameOver + Restart
  gameOver.visible = false;
  restart.visible = false;

  //GameState
  gameState = PLAY;
}