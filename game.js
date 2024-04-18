const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// At the beginning of your JavaScript file, add:
const trajectoryDistanceElement = document.getElementById("trajectoryDistance");
const powerElement = document.getElementById("power");
const cannon = {
  x: 50,
  y: canvas.height - 30,
  width: 30,
  height: 30,
  angle: Math.PI / 4,
  power: 0
};

const target = {
  x: canvas.width - 50,
  y: canvas.height - 50,
  radius: 20
};

const obstacle = {
  x: 200,
  y: canvas.height - 50,
  width: 50,
  height: 20
};

const cannonImg = new Image();
cannonImg.src = 'cannon.png';

const targetImg = new Image();
targetImg.src = 'target.png';

function drawCannon() {
  ctx.save();
  ctx.translate(cannon.x, cannon.y);
  ctx.rotate(cannon.angle);
  ctx.drawImage(cannonImg, -cannon.width / 2, -cannon.height / 2, cannon.width, cannon.height);
  ctx.restore();
}

function drawTarget() {
  ctx.drawImage(targetImg, target.x - target.radius, target.y - target.radius, target.radius * 2, target.radius * 2);
  // Calculate distance
  const distance = Math.sqrt((trajectoryPoints[trajectoryPoints.length - 1].x - cannon.x) ** 2 + (trajectoryPoints[trajectoryPoints.length - 1].y - cannon.y) ** 2);
  
  // Update HTML elements
  trajectoryDistanceElement.textContent = distance.toFixed(2);
  powerElement.textContent = cannon.power.toFixed(2);
}
function drawObstacle() {
  ctx.fillRect(obstacle.x, obstacle.y - obstacle.height, obstacle.width, obstacle.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCannon();
  drawTarget();
  drawObstacle();
}

let trajectoryPoints = []; // 将轨迹点定义在全局范围内

canvas.addEventListener("mousemove", function(event) {
  trajectoryPoints = []; // 清除之前的轨迹点
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const dx = mouseX - cannon.x;
  const dy = mouseY - cannon.y;
  cannon.angle = Math.atan2(dy, dx);
  drawTrajectory();
});

function drawTrajectory() {
  let ball = {
    x: cannon.x,
    y: cannon.y,
    dx: cannon.power * Math.cos(cannon.angle),
    dy: cannon.power * Math.sin(cannon.angle),
    gravity: 0.2,
    friction: 0.99
  };

  while (ball.y < canvas.height) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dy += ball.gravity;
    ball.dx *= ball.friction;
    if (ball.x < 0 || ball.x > canvas.width || ball.y < 0 || ball.y > canvas.height) {
      break;
    }
    trajectoryPoints.push({ x: ball.x, y: ball.y });
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
  draw(); // 重新绘制炮台、目标和障碍物

  // 绘制最新的一条轨迹
  ctx.beginPath();
  ctx.moveTo(trajectoryPoints[0].x, trajectoryPoints[0].y);
  for (let i = 1; i < trajectoryPoints.length; i++) {
    ctx.lineTo(trajectoryPoints[i].x, trajectoryPoints[i].y);
  }
  ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();
}




canvas.addEventListener("click", function() {
  let ball = {
    x: cannon.x,
    y: cannon.y,
    radius: 5,
    dx: cannon.power * Math.cos(cannon.angle),
    dy: cannon.power * Math.sin(cannon.angle),
    gravity: 0.2,
    friction: 0.99
  };

  function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dy += ball.gravity;
    ball.dx *= ball.friction;

    // 如果炮弹落到地面，停止更新并清除计时器
    if (ball.y + ball.radius > canvas.height) {
      clearInterval(interval);
      return;
    }

    // 碰到边界时的处理
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      clearInterval(interval);
      return;
    }

    // 碰到障碍物时的处理
    if (
      ball.x + ball.radius > obstacle.x &&
      ball.x - ball.radius < obstacle.x + obstacle.width &&
      ball.y + ball.radius > obstacle.y - obstacle.height
    ) {
      clearInterval(interval);
      return;
    }

    const dx = ball.x - target.x;
    const dy = ball.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ball.radius + target.radius) {
      alert("Hit the target!");
      clearInterval(interval);

      // 提升目标和障碍物的高度
      target.y -= 20;
      obstacle.y -= 20;

      draw(); // 重新绘制目标和障碍物
    }
  }

  let isCharging = false;
  let chargeStartTime;
  let chargeEndTime;

// Inside the canvas mouse event listeners:
canvas.addEventListener("mousedown", function() {
  isCharging = true;
  chargeStartTime = Date.now();
  updatePower(); // Call updatePower when mouse is pressed down
});

canvas.addEventListener("mouseup", function() {
  if (isCharging) {
    isCharging = false;
    chargeEndTime = Date.now();
    const chargeTime = chargeEndTime - chargeStartTime;
    cannon.power = chargeTime / 30; // Adjust this calculation as needed
    updatePower(); // Call updatePower when mouse is released
  }
});

function updatePower() {
  currentPowerElement.textContent = cannon.power.toFixed(2);
}

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  let interval = setInterval(function() {
    update();
    draw();
    drawBall();
  }, 30);
});