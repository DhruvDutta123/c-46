var ship,shipImg;
var enemy=[];
var enemy1,enemy2,enemy3;
var lasers=[];
var points=0;

function setup(){
  createCanvas(600,400);
  frameRate(10);
 

  ship=new Ship();
  //create bottom row of enemies
  var startX=80;
  var startY=80;
  for(var i=0;i < 6;i++){
  enemy[i]=new enemy(i * startX + 80,startY,enemy1,enemy2,5);
  }
  //create top row of enemies
  startY=40;
  var offSet = 0;
  for(var j=0;j < 12;j++){
    enemy[j]=new enemy(offSet* startX + 80,startY,enemy3,enemy4,10);
    offSet++
    }
}

function draw(){
  background(50); 
  ship.display();
  ship.move();
var edge = false; 
  for(var i = 0;i < enemy.length;i++){
    enemy[i].display();
    enemy[i].move();
    if(enemy[i].x > width || enemy[i].x < 0){
      edge = true
    }
      }
      if(edge){
        for(var k=0;k < enemy.length;k++){
          enemy[i].shiftDown();
    }
  }
  //displaying and moving the laser
  for(var ls = 0;ls < laser.length;ls++){
    lasers[ls].show();
    lasers[ls].move();

    //Colision detection
  for(var j = 0;j < enemy.length;j++){
    if(lasers[ls].hits(enemy[j])){
      lasers[ls].remove();
      points = points+enemy[j].pts;
      enemy.splice(j,1); //removing enemy from array
    }
  }//ending of enemy loop
  }//ending of laser loop 1.

  for(var lg = laser.lenghth-1;lg>=0;lg--){
    if(lasers[lg].toDelete){
      lasers.splice(lg,1);//removing lasers from array
    }
  }//end of laser loop 2.
  updateHUD();
  //check if game is over
  if(enemy.length<=0){
    gameOver();
  }
}

function keyPressed(){
if(keyCode===SPACE){
  var laser = new Laser(ship.x,ship.y)
  lasers.push(laser)
}
  if(keyCode===RIGHT_ARROW){
    ship.setDir(1);
  }
else if(keyCode===LEFT_ARROW){
  ship.setDir(-1);
}
}

function updateHUD(){
  fill("green");
  text("Score:"+points,10,20);
  text("Aliens remaining:"+aliens.length,75,20)
}

function gameOver(){
  background("black");
  textSize(50);
  textAlign(CENTER);
  text("SUPERB! You save the Earth",width/2,height/2);
  noLoop();
}

function keyRealeased(){
  ship.setDir(0);
}
