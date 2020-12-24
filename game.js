const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d"); 
//create the unit
const snakeBox=32;
const apple=new Image();
apple.src="images/apple.png";
const ground=new Image();
ground.src="images/ground.png";
let dead=new Audio();
let eat=new Audio();
let up=new Audio();
let down=new Audio();
let left=new Audio();
let right =new Audio();
dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
down.src="audio/down.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
//define snake
let snake=[];
snake[0]={
    x:9 *snakeBox,
    y:10 *snakeBox
};
//create the food
let food={x:Math.floor(Math.random()*17+1)*snakeBox,
y:Math.floor(Math.random()*15+3)*snakeBox};
//score
let score=0;
//control the snake
let dir="";
document.addEventListener("keydown",direction);
function direction(event){
 let key = event.keyCode;
if(key==37 && dir!="RIGHT"){
     dir="LEFT";
     left.play();
 }
 else if(key==38 && dir!="DOWN"){
     dir="UP";
     right.play();
 }
 else if(key==40 && dir!="UP"){
     dir="DOWN";
     down.play();
 }
else if(key==39 && dir!="LEFT"){
dir="RIGHT";
right.play();
 }
}
// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            document.getElementById("coll").innerHTML="game over";
        }
    }
    return false;
}


//draw
function draw()
{
    ctx.drawImage(ground,0,0);
    for(let i=0;i<snake.length;++i){
    ctx.fillStyle=i==0?"#4CAF50":"white";
    ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    ctx.strokeStyle="#E91E63";
    ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
}

ctx.drawImage(apple,food.x,food.y);
//old head position
let snakeX=snake[0].x;
let snakeY=snake[0].y;


if(dir=="LEFT")snakeX-=snakeBox;
if(dir=="RIGHT")snakeX+=snakeBox;
if(dir=="UP")snakeY-=snakeBox;
if(dir=="DOWN")snakeY+=snakeBox;
if(snakeX==food.x && snakeY==food.y){
    score++;
    eat.play();
    food={x:Math.floor(Math.random()*17+1)*snakeBox,
        y:Math.floor(Math.random()*15+3)*snakeBox};
        //score
}else{
//remove the tail
snake.pop();
}
//add head
let newHead={
    x:snakeX,
    y:snakeY
}
//game over
if(snakeX < snakeBox || snakeX > 17 * snakeBox || snakeY < 3*snakeBox || snakeY > 17*snakeBox || collision(newHead,snake)){
    clearInterval(game);
    dead.play();
}
snake.unshift(newHead);

ctx.fillStyle="white";
ctx.font="45px changa one";
ctx.fillText(score,2*snakeBox,1.6*snakeBox);
}
let game=setInterval(draw,100);