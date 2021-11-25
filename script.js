"use strict";
let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;
let paddle1Y = 50;
let paddle2Y = 250;
const paddleHeight = 100;
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");
function calculateMousePosition(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}
window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");
  let framePerSecond = 30;
  setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / framePerSecond);
document.addEventListener("click", function (e) {
    paddle1Y = paddle1Y;
    if (e.target > e.target) {
      paddle1Y--;
    } else {
      paddle1Y++;
    }
  });
  canvas.addEventListener("mousemove", function (e) {
    let mousePos = calculateMousePosition(e);
    paddle1Y = mousePos.y - paddleHeight / 2;
  });
};

function paddlePC() {
  let paddle2YCenter = paddle2Y + paddleHeight / 2;

  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 5;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 5;
  }
}
setInterval(paddlePC, 30);

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight && ballX === 50) {
    ballSpeedX = -ballSpeedX;
    let deltaY = ballY - (paddle1Y + paddleHeight / 2);
    ballSpeedY = deltaY * 0.35;
    let ball = new Audio("ball.mp3");
    ball.play();
  }
  if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight && ballX === 750) {
    ballSpeedX = -ballSpeedX;
    let deltaY = ballY - (paddle2Y + paddleHeight / 2);
    ballSpeedY = deltaY * 0.35;
    let ball = new Audio("ball.mp3");
    ball.play();
  }
  if (ballX > canvas.width) {
    ballReset();
    score1.textContent = Number(score1.textContent) + 1;
  }
  if (ballX < 0) {
    ballReset();
    score2.textContent = Number(score2.textContent) + 1;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  //   ballY += ballSpeedY;
}
function drawEverything() {
  rectangle(0, 0, canvas.width, canvas.height, "black");
  rectangle(40, paddle1Y, 10, paddleHeight, "white");
  circle(ballX, ballY, 10, "lightgreen");
  rectangle(400, 0, 5, 600, "white");
  rectangle(750, paddle2Y, 10, paddleHeight, "white");
}
function rectangle(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}
function circle(x, y, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
function ballReset() {
  ballSpeedX = 10;
  ballSpeedY = 4;
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
