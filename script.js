let playZone = document.querySelector(".grid1");
let currentSnake = [2, 1, 0];
let interval = 1000;
let intervalid = 0;
let width = 10;
let scores=0;
let direction = 1;
let speed = 0.9;
let up = document.querySelector(".up");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let down = document.querySelector(".down");
let squares;

document.addEventListener("DOMContentLoaded", function () {
  console.log("element ADDED");

  document.addEventListener("keyup", (e) => {
    control(e);
  });
  createboard();
  startGame();
  //document.querySelector(".restart").addEventListener("click", replay);
});
createboard = () => {
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    playZone.appendChild(div);
    console.log("div numebr" + i + "is added");
  }
};
startGame = () => {
  let squares = document.querySelectorAll(".grid1 div");
  currentSnake.forEach((index) => {
    squares[index].classList.add("snake");
  });
  randomApple(squares);

  intervalid = setInterval(() => {
    if (checkHit(squares)) {
      moveSnake();
    } else {
      return;
    }
  }, interval);
};

moveSnake = () => {
  
if(checkHit())  { squares = document.querySelectorAll(".grid1 div");
  console.log(squares[currentSnake[0]+direction]);
  let item = currentSnake.pop();
  currentSnake.unshift((((currentSnake[0] + direction)>=width**2)||((currentSnake[0]+direction)<0))?currentSnake[0]:currentSnake[0]+direction);
  console.log(currentSnake[0]); //error
  squares[currentSnake[0]].classList.add("snake");
  if (eatApple(squares)) {
    squares[item].classList.remove("snake");
  } else {
    currentSnake.push(item);
    interval = interval * speed;
    intervalid = setInterval(moveSnake, interval);
  }
  console.log("RUN..." + currentSnake);}
};
function control(e) {
  if( (e.keyCode === 39) &&(direction!=-1)) {
    direction = 1;
  } else if ((e.keyCode === 38)&&(direction!=width)) {
    direction = -width;
  } else if( (e.keyCode === 37)&&(direction!=1)){
    direction = -1;
  } else if ((e.keyCode === 40)&&(direction!=-width)) {
    direction = +width;
  }
  return;
}
replay = () => {
  createboard();
  startGame();
  return;
};
changeDirection = (dir) => {
  if(dir==-direction){
    return;
  }
  if ((dir == "up")&&(direction!=width)) {
    direction = -width;
    return;
  } else if ((dir == "down") &&(direction!=-width)){
    direction = width;
    return;
  }
  else if(dir<=1){
    direction = dir;
  }
  else 
  return;
};
//selfHit=()=>{
//if(squares[currentSnake[0]+direction].classList.contains('snake'));
//}
checkHit = () => {
  if (
       (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width)
    //(currentSnake[0] % width >= width - 1 && direction === 1) ||
    //(currentSnake[0] % width <= 0 && direction === -1) ||
    //(currentSnake[0] + width >= width ** 2 && direction === width) ||
    //(currentSnake[0] < width && direction === -width)
  ) {
    console.log("hitted");
    return clearInterval(intervalid);
  } else {
    return 1;
  }
};

randomApple = (squares) => {
  let appleindex=0;
  do{
    squares[appleindex].classList.remove('apple'); 
  appleindex = Math.floor(Math.random() * (width * width));
  squares[appleindex].classList.add("apple");
  }while(squares[appleindex].classList.contains('snake'));
  return;
};

eatApple = (squares) => {
  
  if (squares[currentSnake[0]].classList.contains("apple")) {
    scores++;
    document.getElementById('scores').innerHTML="Scores: "+scores;
    squares[currentSnake[0]].classList.remove("apple");
    squares[currentSnake[0]].classList.add("snake");
    
    randomApple(squares);
    clearInterval(intervalid);
    return 0;
  } else return 1;
};
