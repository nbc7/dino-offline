const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const gameInfo = document.querySelector('.game-info');
const gameScore = document.querySelector('.score');

let isJumping = false;
let isGameOver = false;
let position = 0;
let gravity = 0.9;
let score = 0;

function handleKeyDown(event) {
  if (event.keyCode == 32) {
    if (!isJumping && !isGameOver) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let count = 0;

  let upInterval = setInterval(() => {
    if (count == 15) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (count == 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          count--;
          if (position > 0) {
            position -= 5;
            position = position * gravity;
            if (position > 0) dino.style.bottom = position + 'px';
            else dino.style.bottom = 0 + 'px';
          }
        }
      }, 20);
    } else {
      // Subindo
      count++;
      if (position < 140) {
        position += 30;
        position = position * gravity;
        if (position < 140) dino.style.bottom = position + 'px';
        else dino.style.bottom = 140 + 'px';
      }
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = (Math.random() * 3500) + 500;

  if (!isGameOver) cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      background.style.animation = 'none';
      gameInfo.textContent = 'Game over';
    } else if (!isGameOver) {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  if (!isGameOver) setTimeout(createCactus, randomTime);
}

function handleScore() {
  let scoreCount = setInterval(() => {
    if (isGameOver) clearInterval(scoreCount);
    else {
      score++;
      gameScore.textContent = '00000'.substring(score.toString().length) + score;

      if (score % 700 == 0) {
        background.classList.add('night');
        background.classList.remove('day');

        setTimeout(() => {
          background.classList.add('day');
          background.classList.remove('night');
        }, 44 * 200);
      }
    }
  }, 44)
}

handleScore();
createCactus();
document.addEventListener('keydown', handleKeyDown);