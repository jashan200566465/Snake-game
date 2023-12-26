//game varibales and constants
let directions={x:0,y:0};
const foodSound=new Audio('food.wav');
const gameOver=new Audio('gameOver.wav');
const move=new Audio('move.mp3');
const bMusic=new Audio('music.mp3');
const scoreMsg=document.querySelector("#msg");
let lastPaintTime=0;
let speed=5;
let snakeArr=[
    {x:13,y:15}
];
food={
    x:6,y:7
};
let score=0;
//main function is a game loop this will keep running
function main(currenttime){
    //again call
    window.requestAnimationFrame(main); 
    if((currenttime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime=currenttime;
    //this function hjas all the logic of a game
    gameEngine();
}





 function gameEngine(){
    
    if(isCollide(snakeArr)){
        gameOver.play();
        bMusic.pause();
       directions =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        
        score = 0; 
    }
 //if you have  eaten  the food then increment the score and place the food at some other place in  board

 if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score=score+1;
    scoreMsg.innerHTML=`Score : ${score}`;
    snakeArr.unshift({x: snakeArr[0].x + directions.x, y: snakeArr[0].y + directions.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}



//moving the snake

for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}
//to move the head in order to move the body of a snake
snakeArr[0].x+=directions.x;
snakeArr[0].y+=directions.y;

    //display the snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        //in order to add more blocks in snake ,we have to craete an element and have to add it in a snake arr
snakeElement=document.createElement('div');
//basically gave a row number and column number
   snakeElement.style.gridRowStart=e.y;
   snakeElement.style.gridColumnStart=e.x;
   //now we append this block that is made with some value of x and y
   if(index===0){
   snakeElement.classList.add('head');}
   else{
    snakeElement.classList.add('snake');}
   board.appendChild(snakeElement);

    });

    //display the food
    foodElement=document.createElement('div');
    //basically gave a row number and column number
       foodElement.style.gridRowStart=food.y;
      foodElement.style.gridColumnStart=food.x;
       //now we append this block that is made with some value of x and y
       foodElement.classList.add('food');
       board.appendChild(foodElement);
 }






 function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



// bMusic.play();
//here the logic of the game will begin
window.requestAnimationFrame(main);
//input from keyboard
window.addEventListener('keydown', e =>{
    directions = {x: 0, y: 1} // Start the game
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            directions.x = 0;
            directions.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            directions.x = 0;
            directions.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            directions.x = -1;
           directions.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
           directions.x = 1;
            directions.y = 0;
            break;
        default:
            break;
    }

});