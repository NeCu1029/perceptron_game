const WIDTH = 800;
const HEIGHT = (WIDTH * 9) / 16;
let stat = 0; // 0: 시작 전, 1: 세팅 중, 2: 게임 중, 3: 집계 중, 4: 결과 표시
let change = true;

function set0() {
  stroke(0, 0, 0);
  strokeWeight(10);
  fill(255, 255, 255);
  rectMode(CORNERS);
  rect(WIDTH * 0.05, HEIGHT * 0.05, WIDTH * 0.95, HEIGHT * 0.95);

  strokeWeight(5);
  circle(WIDTH * 0.5, HEIGHT * 0.7, WIDTH * 0.125);

  fill(0, 200, 255);
  triangle(
    WIDTH * 0.477,
    HEIGHT * 0.643,
    WIDTH * 0.477,
    HEIGHT * 0.757,
    WIDTH * 0.537,
    HEIGHT * 0.7
  );

  textSize(WIDTH * 0.08);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  noStroke();
  text("퍼셉트론 게임", WIDTH * 0.5, HEIGHT * 0.3);
}

function keep0() {
  if (
    (mouseX - WIDTH * 0.5) ** 2 + (mouseY - HEIGHT * 0.7) ** 2 <=
    (WIDTH * 0.0625) ** 2
  ) {
    fill(255, 200, 0);
    triangle(
      WIDTH * 0.477,
      HEIGHT * 0.643,
      WIDTH * 0.477,
      HEIGHT * 0.757,
      WIDTH * 0.537,
      HEIGHT * 0.7
    );
  } else {
    fill(0, 200, 255);
    triangle(
      WIDTH * 0.477,
      HEIGHT * 0.643,
      WIDTH * 0.477,
      HEIGHT * 0.757,
      WIDTH * 0.537,
      HEIGHT * 0.7
    );
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(200);
}

function draw() {
  if (change) {
    switch (stat) {
      case 0:
        set0();
        break;
    }
    change = false;
  } else {
    switch (stat) {
      case 0:
        keep0();
        break;
    }
  }
}
