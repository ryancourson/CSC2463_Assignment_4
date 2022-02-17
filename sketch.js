let character = [];
let bugs;
let count = 10;
let score = 0;
let startTime;
let gameState = 'wait';
let displaySplat = false;
let deadX, deadY;

function preload(){
  spriteSheet = loadImage("beetle_fire.png");
  bugSplatter = loadImage("BugSplatter.png");
  // spriteSheet2 = loadImage("Green.png");
  // spriteSheet3 = loadImage("char3.png");
}

function setup() {
  createCanvas(1200,600);
  imageMode(CENTER);

  

  for (i = 0; i < count; i++){
    randVal = random([-1,1]);
    character[i] = new Character(
      spriteSheet, random(100,500), random(100,500), random(2,5), randVal, randVal);
  }

  

  
  

}

// function keyPressed(){

//   if(keyCode == RIGHT_ARROW){
//     for (i = 0; i < count; i++){
//         character[i].go(1);
//     }
//   }

//   else if(keyCode == LEFT_ARROW){
//     for (i = 0; i < count; i++){
//       character[i].go(-1);
//     }
//   }

// }

// function keyReleased(){
//   for (i = 0; i < count; i++){
//     character[i].stop();
// }
// }

function timer(){
  return int((millis() - startTime) / 1000);
}


function mousePressed(){
  for(i = 0; i < count; i++){
    
    character[i].inSight(i);
    
  }
}

function draw(){

  background(255,255,255);

  if(gameState == 'wait'){
    textSize(30);
    text("Click to start.", 600, 300);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
    }
  }

  else if(gameState == 'playing'){
    for (i = 0; i < count; i++){
      character[i].draw();
  }
  
  textSize(35);
  text("Score: " + score, 600 - 200, 50);
  let time = 30 - timer();
  text("Time: " + time, 10, 30);
  if(time <= 0){
    gameState = 'end';
  }
}

  else if(gameState == 'end'){
    text("Game Over", 600, 200);
    text("Click to restart", 600, 300);
    if(mouseIsPressed){
      startTime = millis();
      score = 0;
      gameState = 'playing';
    }
  }

  }

  

  
  



class Character{

  constructor(spriteSheet, x, y, speed, move, playerDirection){
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x
    this.y = y;
    this.speed = speed;
    this.move = move;
    this.playerDirection = playerDirection;
    this.spriteSize = 38;
    this.inSights = false;
    this.displaySplat = false;
  }

  draw(){

    push();
    translate(this.x, this.y);
    

    scale(this.playerDirection * 0.5, 0.5);

    if(this.move == 0){
      image(this.spriteSheet, 0, 0, 200, 200, 0, 0, this.spriteSize, this.spriteSize);
    }


    else{
      if(this.displaySplat == false){
        
        image(this.spriteSheet, 0, 0, 200, 200, this.spriteSize * (this.sx + 1), 80, this.spriteSize, this.spriteSize);
      }
      else{
        console.log("Display Splat");
        image(bugSplatter, this.x, this.y, 200,200);
        
      }
      
      
    }

    

    if(frameCount % 6 == 0){
      this.sx = (this.sx + 1) % 4;
    }
    

    
    this.x += (this.speed + (1.01 * score)) * this.move;

    if(this.x < 0 + 20){
      this.move = 1;
      this.playerDirection = 1;
    }

    else if (this.x > width - 20){
      this.move = -1;
      this.playerDirection = -1;
    }

    pop();
    }

    

    go(direction){
      this.move = direction;
      this.playerDirection = direction;
      this.sx = 3;
    }

    stop(){
      this.move = 0;
    }

    inSight(index){
      if(mouseX > this.x - 40 && mouseX < this.x + 40 &&
        mouseY > this.y - 40 && mouseY < this.y + 40){
          deadX = this.x;
          deadY = this.y;
          this.displaySplat = true;
          character.splice(index, 1, 
            new Character(this.spriteSheet, random(100,500), random(100,500), random(2,5), randVal, randVal));
          setTimeout(()=> {
            image(bugSplatter, deadX, deadY, 100,100);
          }, 1);
            
          
          score++;
      }
    }


}
