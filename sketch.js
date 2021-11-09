var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);



  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
}

function draw() {
  background(200);

  spookySound.loop()

  if(gameState==="play"){
  
  if(tower.y > 400){
      tower.y = 300
    }
  spawnDoors()

  if(keyDown("space")){
    ghost.velocityY=-10
  }
  ghost.velocityY+=0.5
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+2 
  }

  if(keyDown("left_arrow")){
    ghost.x=ghost.x-2 
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }

  if(invisibleBlockGroup.isTouching(ghost)||(ghost.y>600)){
    ghost.destroy() 
    gameState="end"
  }
    drawSprites()
}
if(gameState==="end"){
  stroke("yellow")
  fill("yellow")
  textSize(40)
  text("Game Over",230,260)
}
}

function spawnDoors(){
if(frameCount%240===0){
  door = createSprite(200, -50)
  door.velocityY = 1
  door.addImage(doorImg)
  door.x = Math.round(random(100,500))
  doorsGroup.add(door)
  door.lifetime = 600
  door.depth = ghost.depth
  ghost.depth = ghost.depth+1

  climber = createSprite(200, 20)
  climber.velocityY = 1
  climber.addImage(climberImg)
  climber.x = door.x
  climbersGroup.add(door)
  climber.lifetime = 600

  invisibleBlock = createSprite(200, 20)
  invisibleBlock.velocityY = 1
  invisibleBlock.x = door.x
  invisibleBlockGroup.add(door)
  invisibleBlock.lifetime = 600
  invisibleBlock.debug = true
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
}
}
