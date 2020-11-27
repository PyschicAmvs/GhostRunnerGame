var climberImage, doorImage, ghostJump, ghostStand, towerImage;
var ghost;
var climber, door;
var gameState;

function preload(){
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  ghostJump = loadImage("ghost-jumping.png");
  ghostStand = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  spookysound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  
  background1 = createSprite(300,300,600,1000);
  background1.addImage(towerImage);
  
  ghost = createSprite(300,500,10,10);
  ghost.addImage("ghost", ghostStand);
  ghost.scale = 0.3;
  
  climberGroup = new Group(); 
  doorGroup = new Group();
  gameState = "play";
  spookysound.play();
}

function draw(){
  background(0)
  if(gameState === "play"){
   
  if(keyDown("space")){
    ghost.velocityY = -8;
    
    ghost.changeImage("ghostjump", ghostJump)
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  background1.velocityY = -4;
  if(background1.y < 0){
    background1.y = background1.height/2;
  }
  
  if(keyDown("right")){
    ghost.velocityX = 4;
  }
   if(keyWentUp("right")){
    ghost.velocityX = 0;
  }
  if(keyDown("left")){
    ghost.velocityX = -4;
  }
   if(keyWentUp("left")){
    ghost.velocityX = 0;
  }
  
  if(ghost.y > 600 ){
    gameState = "end";
  }
  ghost.collide(climberGroup);
  spawnDoors();
  }
  
  drawSprites();
  if(gameState === "end"){
    background(0);
    background1.visible = false;
    ghost.visible=false;
    background1.velocityY = 0;
    stroke(20);
    fill("yellow");
    textSize(32);
    text("GAME OVER", 200,320);
    
  }
  
  
}


function spawnDoors(){
  if(frameCount%20  === 0 ) {
    door = createSprite(200,100,20,20);
    door.x = Math.round(random(100,500))
    door.addImage(doorImage);
    door.velocityY = 1;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    climber = createSprite(door.x, door.y + 70, 20,20);
    climber.addImage("climber", climberImage);
    climber.velocityY = 1;
    climberGroup.add(climber);
    climber.lifetime = 430;
    door.lifetime = 430;
  }
}

