let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

class Circle {
  constructor(x, y, dx, dy, circleRadious) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.circleRadious = circleRadious;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.circleRadious, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.fillStyle = "white";
    c.fill();
    c.stroke();
  }

  update() {
    this.draw();
    if (
      this.x + this.circleRadious >= canvas.width ||
      this.x - this.circleRadious <= 0
    ) {
      this.dx = -this.dx * 1.0;
    }
    if (
      this.y + this.circleRadious >= canvas.height ||
      this.y - this.circleRadious <= 0
    ) {
      this.dy = -this.dy * 1.0;
    }

    if (this.x - this.circleRadious < 0) {
      this.x = 0 + this.circleRadious;
    }

    if (this.x + this.circleRadious > canvas.width) {
      this.x = canvas.width - this.circleRadious;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}
class Player {
  constructor(x, y, dy, up, down) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.up = up;
    this.down = down;
    this.points = 0;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, 15, 75);
  }

  update() {
    this.y += this.dy;
    if (this.y > 325) {
      this.y = 325;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

  move(key) {
    switch (key) {
      case this.up:
        this.dy = -10;

        break;

      case this.down:
        this.dy = 10;
        break;
    }
  }

  stop(key) {
    if (key == this.up || key == this.down) {
      this.dy = 0;
    }
  }
}

const randomx = Math.round(Math.random()) * 2 - 1;
const randomy = Math.round(Math.random()) * 2 - 1;
const ball = new Circle(400, 200, randomx * 5, randomy * 5, 10);
const player1 = new Player(0, 0, 0, "w", "s");
const player2 = new Player(785, 0, 0, "o", "k");
animate();

function animate() {
  window.requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  c.font = "150px Turret Road";
  c.fillStyle = "#7B7772";
  c.fillText(player1.points, 150, 250);
  c.fillText(player2.points, 550, 250);
  player1.update();
  player2.update();
  player1.draw();
  player2.draw();
  ball.update();
  colision(ball, player1, player2);
  pointConter(ball);

  c.strokeStyle = "#FFFFFF";
  c.moveTo(399, 0);
  c.lineTo(399, 400);
  c.lineWidth = 3;
  c.stroke();
}

document.addEventListener("keypress", function (e) {
  player1.move(e.key);
  player2.move(e.key);
});

document.addEventListener("keyup", function (e) {
  player1.stop(e.key);
  player2.stop(e.key);
});

function colision(Circle, Player1, Player2) {
  let flagy = Circle.dy / Math.abs(Circle.dy);
  if (Circle.dx < 0) {
    if (
      Circle.y + 10 > Player1.y &&
      Circle.y - 10 < Player1.y + 75 &&
      Circle.x - 10 <= Player1.x + 15
    ) {
      Circle.dy =
        Math.abs(((Player1.y + 37.5 - Circle.y) * 4.5) / 37.5) * flagy;
      Circle.dx = Math.sqrt(50 - Math.pow(Circle.dy, 2));
      if (Circle.x - 10 < 15) {
        Circle.x = 25;
      }
    }
  }
  if (Circle.dx > 0) {
    if (
      Circle.y + 10 > Player2.y &&
      Circle.y - 10 < Player2.y + 75 &&
      Circle.x + 10 >= Player2.x
    ) {
      Circle.dy =
        Math.abs(((Player2.y + 37.5 - Circle.y) * 4.5) / 37.5) * flagy;
      Circle.dx = -Math.sqrt(50 - Math.pow(Circle.dy, 2));
      if (Circle.x + 10 > 785) {
        Circle.x = 775;
      }
    }
  }
}

function pointConter(Circle) {
  if (Circle.x + 10 >= 800) {
    player1.points += 1;
  }
  if (Circle.x - 10 <= 0) {
    player2.points += 1;
  }
}
