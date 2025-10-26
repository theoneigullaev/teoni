const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "./img/ground.png";

const foodImg = new Image();
foodImg.src = "./img/food.png";

let box = 32;
let score = 0;
let snake;
let food;
let dir;
let game;

function initGame() {
    score = 0;
    dir = null;
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };
    if(game) clearInterval(game);
    game = setInterval(drawGame, 100);
}

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && dir != "right") dir = "left";
    else if(event.keyCode == 38 && dir != "down") dir = "up";
    else if(event.keyCode == 39 && dir != "left") dir = "right";
    else if(event.keyCode == 40 && dir != "up") dir = "down";
}

function checkCollision(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x === arr[i].x && head.y === arr[i].y) return true;
    }
    return false;
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i === 0 ? "green" : "red";   
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if(dir === "left") snakeX -= box;
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    let newHead = { x: snakeX, y: snakeY };

    
    if(
    snakeX < 0 || snakeX >= box * 19 ||  // левая и правая граница
    snakeY < 0 || snakeY >= box * 19 ||  // верхняя и нижняя граница
    checkCollision(newHead, snake)
) {
    alert("Game Over! Score: " + score);
    initGame();
    return;
}


    snake.unshift(newHead);
}


initGame();
