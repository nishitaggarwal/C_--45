
var paddle
var BrickGroup

var FORM = 0
var PLAY = 1
var END = 2
var gameState = FORM

var score = 0
///backgrounds
var bg1,bg2,bg3,bg4
var bg5,bg6,bg7
/// Bricks 
var b1,b2
var b3,b4,b5,b6




var ball,Ball
var backgroundImg

function preload(){
// for backgrounds
bg1 = loadImage("Images/CrossHill.bg.png")
bg2 = loadImage("Images/HalloweenImage.jpg")
bg3 = loadImage("Images/HalloweenImage2.jpg")
bg4 = loadImage("Images/happy-halloween.jpg")
bg5 = loadImage("Images/MoonBg.jpg")
bg6 = loadImage("Images/spacebg.jpg")
bg7 = loadImage("Images/WarImage.jpg")
bg8 = loadImage("Images/spaceImg.jpg")
// For Bricks

b1 = loadImage("Images/DARKBLACKBRICK.png")
b2 = loadImage("Images/OrangishBrick.png")
b3 = loadImage("Images/RED.BRICK.png")
b4 = loadImage("Images/stickIMG.png")
b5 = loadImage("Images/WhiteBrick.png")
b6 =  loadImage("Images/Yellowbrick.png")

// for paddle 
p1 = loadImage("Images/PADDLE1.png")
p2 = loadImage("Images/PADDLE2.png")

////remaing
Restart = loadImage("Images/restartButton.png")
Play =  loadImage("Images/playButton.png")
Ball = loadImage("Images/SilverBall.png")
Ufo = loadImage("Images/UFO.png")
GameOver = loadImage("Images/gameOver.png")
Back = loadImage("images/BackGroundChange.png")
}

function setup() {

createCanvas(1200,550);

backgroundImg = createSprite(150,200,40,50)
backgroundImg.addImage("back",Back)
backgroundImg.scale = 0.4
backgroundImg.visible = false;


BrickGroup = new Group();

///////////////
ball  = createSprite(700,440,10,10)
ball.addImage("Balls",Ball)

ball.scale = 0.140;
ball.visible = false;
//ball.setCollider("circle",0,0,ball.width,ball.height) 
///////////////////////////
paddle = createSprite(700,480,20,20)

var Paadle = Math.round(random(1,2))
switch(Paadle) {
        case 1: paddle.addImage(p1);
                break;
        case 2: paddle.addImage(p2);
                break;
       
        default: break;
      }
paddle.scale = 0.3
paddle.visible = false;
///////////////////

gameOver = createSprite(600,270,30,30)
gameOver.addImage("game",GameOver)
gameOver.scale = 0.8;

play = createSprite(600,270,40,30)
play.addImage("play",Play)
play.visible = false;
play.scale = 0.3


restart = createSprite(600,310,30,30)
restart.addImage("restart",Restart)
restart.scale = 0.2;
restart.visible = false;
gameOver.visible = false;



ufo1 = createSprite(400,250,20,20)
ufo1.addImage("ufo1",Ufo)

ufo2 = createSprite(600,200,20,20)
ufo2.addImage("ufo2",Ufo)

ufo3 = createSprite(800,250,20,20)
ufo3.addImage("ufo2",Ufo)

ufo4 = createSprite(800,150,20,20)
ufo4.addImage("ufo2",Ufo)

ufo1.visible = false;
ufo2.visible = false;
ufo3.visible = false;
ufo4.visible = false;

ufo1.scale = 0.2;
ufo2.scale = 0.2;
ufo3.scale = 0.2;
ufo4.scale = 0.2;


ball.velocityX = -2
ball.velocityY = -5;
}

function draw() {


  background(bg8); 
 
if(gameState === 0) {

play.visible = true;
backgroundImg.visible = true;

 if(mousePressedOver(play)){
 gameState = 1
 }

 ufo1.visible = true;
 ufo2.visible = true;
 ufo3.visible = true;
 ufo4.visible = true;
 

}

else if(gameState === 1){

 play.visible = false;
ufo1.visible = false;
ufo2.visible = false;
ufo3.visible = false;
ufo4.visible = false;
backgroundImg.visible = false;



spawnBricks();


paddle.visible = true;
ball.visible = true;

edges = createEdgeSprites();

ball.bounceOff(edges[0]);
ball.bounceOff(edges[1]);
ball.bounceOff(edges[2]);

ball.bounceOff(paddle);
        

//
paddle.x = World.mouseX;

if(BrickGroup.bounceOff(ball)){

score = score + 1
        
}



if(ball.y > 550){

gameState = 2

}


}
else if(gameState === 2){

        BrickGroup.setVelocityXEach(0);
        BrickGroup.setLifetimeEach(-1)

        gameOver.visible = true;
        restart.visible = true;

if(mousePressedOver(restart)){
reset();
}

}

 


 if(mousePressedOver(backgroundImg) ) {

    bg = createSprite(600,270,1200,550)

    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: bg.addImage(bg1);
              break;
      case 2: bg.addImage(bg2);
              break;
      case 3: bg.addImage(bg3);
              break;
      case 4: bg.addImage(bg4);
              break;
      case 5: bg.addImage(bg5);
              break;
      case 6: bg.addImage(bg6);
              break;
      case 7: bg.addImage(bg7);
              break;
      default: break;
    }
    play.depth = bg.depth + 1
    backgroundImg.depth = bg.depth + 1
    ball.depth = bg.depth + 1
   paddle.depth= bg.depth + 1
restart.depth =  bg.depth + 1
gameOver.depth =  bg.depth + 1
 }
 
  drawSprites();
textSize(20)
text("Score::" + score,700,50)

}


function spawnBricks(){
if(frameCount % 110 === 0){
       
var brick = createSprite(1200,random(50,310),30,10)
brick.velocityX = -3;

var Bricks = Math.round(random(1,6));
switch(Bricks) {
        case 1: brick.addImage(b1);
                break;
        case 2: brick.addImage(b2);
                break;
        case 3: brick.addImage(b3);
                break;
        case 4: brick.addImage(b4);
                break;
        case 5: brick.addImage(b5);
                break;
        case 6: brick.addImage(b6);
                break;
       
        default: break;
      }

   brick.scale = 0.5;
   brick.lifetime = 450;
                
  BrickGroup.add(brick);
  

}

}
function reset(){

gameState = 0 ;
ball.x = 700;
ball.y = 440;

gameOver.visible = false;
restart.visible = false;
    
BrickGroup.destroyEach();

play.visible = true;


score = 0;

}



