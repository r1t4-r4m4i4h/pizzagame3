var END=0;
var PLAY=1;
var gameState=PLAY;
function preload(){
groundImage=loadImage("ground2.png");
pizzaslice=loadImage("pizzaslice.png");
chef=loadImage("stickman.png");
cheese=loadImage("cheese.png");
olive=loadImage("olive.png");
pepper=loadImage("pepper.png");
spinach=loadImage("spinach.png");
tomato=loadImage("tomato.png");
reset=loadImage("resetbutton.png");
gameover=loadImage("gameoverbutton.png");
}

function setup() {
 createCanvas(1200,400);
baker=createSprite(100,350,20,20);
baker.addImage(chef);
baker.scale=0.2;
ground=createSprite(600,380,1200,30);
ground.addImage(groundImage);
toppingsGroup= new Group();
slicesGroup= new Group();
baker.debug=true;
baker.setCollider("circle",0,20,100);
}

function draw() {
 background("pink");
if(gameState===PLAY){
    if(keyDown("space")){
        baker.velocityY=-15;
    }

    ground.velocityX=-5;
    baker.velocityY=baker.velocityY+0.8;
    if (ground.x < 0){
        ground.x = ground.width/2;
     }

     spawnToppings();
     spawnSlices();
if(toppingsGroup.isTouching(baker)){
    gameState=END;
 }
}
else if(gameState===END){
    baker.velocityY=0;
    toppingsGroup.setVelocityEach(0);
    slicesGroup.setVelocityEach(0);
    ground.velocityX=0;
    toppingsGroup.setLifetimeEach(-231);
    slicesGroup.setLifetimeEach(-1839);
}
 baker.collide(ground);
drawSprites();
}
function spawnToppings(){
    if (frameCount % 100 === 0){
        var toppings = createSprite(displayWidth,360,10,40);
        toppings.velocityX = -5;
        
         //generate random obstacles
         var rand = Math.round(random(1,5));
         switch(rand) {
           case 1: toppings.addImage(tomato);
           toppings.scale=0.1;
                   break;
           case 2: toppings.addImage(olive);
           toppings.scale = 0.1;
                   break;
           case 3: toppings.addImage(cheese);
           toppings.scale = 0.2;
                   break;
           case 4: toppings.addImage(pepper);
           toppings.scale = 0.2;
                   break;
           case 5: toppings.addImage(spinach);
           toppings.scale = 0.2;
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         toppings.lifetime = 400;
        
        //add each obstacle to the group
         toppingsGroup.add(toppings);
      }
}
function spawnSlices(){
    if (frameCount % 125 === 0){
        var slices = createSprite(displayWidth,150,10,40);
        slices.addImage(pizzaslice);
        slices.scale=0.2;
        slices.velocityX = -5; 
        slices.y=Math.round(random(150,300));
slices.lifetime=400;
slicesGroup.add(slices);
}
}