var stickman, path, post
var stickImg, postImg;
var gameState = "PLAY";
var postGroup;


function preload(){
  stickImg = loadAnimation("steek.png","steeek.png");
  stickGon = loadAnimation("steeek.png");
  postImg = loadImage("postgg.png");
}

function setup() {

    createCanvas(1400,700);


    stickman = createSprite(200,600)
    stickman.addAnimation("stick",stickImg); 
    
    ground = createSprite(700,680,5000,50);
    

    stickman.debug = false;
    stickman.setCollider("circle",0,0,100,)



    post = createSprite(1500,570,50,200);
    post.addAnimation("post",postImg);



    postGroup = createGroup();


    score = 0
}

function draw() {
 background("cyan")

 fill("blue");
 textSize(30);
 text("Score: "+ score, 1150,50);

 


 

 if (gameState === "PLAY"){

    stickman.changeAnimation("stick", stickImg);

    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")&& stickman.y >= 100) {
        stickman.velocityY = -20;
    }

    if(keyDown("up")&& stickman.y >= 100) {
      stickman.velocityY = -20;
      
    }

      spawnposts();

      
      if(postGroup.isTouching(stickman)){
        gameState = "END";
      
    }

 }else if(gameState === "END"){
 fill("red") 
 text("Space to Restart!!!",650,350);

 stickman.changeAnimation("ded", stickGon);

 stickman.velocityY = 0

 postGroup.setLifetimeEach(-1);
 postGroup.setVelocityXEach(0);

 if(keyDown("space")) {
    reset();
  }
 }



 stickman.velocityY = stickman.velocityY+1

 stickman.collide(ground);
 drawSprites();
}

function reset()
{
  gameState = "PLAY";
  postGroup.destroyEach();
  score = 0
}


function spawnposts(){
    if (frameCount % 200 === 0){
        post = createSprite(1500,595,50,200);
        post.addAnimation("post",postImg);
        post.velocityX = -(10 + score/100);

          
       post.scale = 0.7;
       post.lifetime = 300;

       post.debug = false;
       post.setCollider("rectangle",0,0,80,130)
      
      //add each obstacle to the group
       postGroup.add(post);
    }
   }