const WIDTH = 800;
const HEIGHT = (WIDTH * 9) / 16;
let stat = 0;
let change = true;
let centX, centY, rot, lvel, avel, score;
let timeTrack1, timeTrack2, tmp;
const show1 = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const show2 = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

function ccw(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function fillAndLineSet(fr, fg, fb, sr, sg, sb, sw) {
  // 채우기 + 윤곽선 설정
  fill(fr, fg, fb);
  if (sw == 0) noStroke();
  else {
    stroke(sr, sg, sb);
    strokeWeight(sw);
  }
}

function textSet(tr, tg, tb, ts) {
  // 텍스트 설정
  fill(tr, tg, tb);
  noStroke();
  textSize(ts);
}

function mouseClicked() {
  if (stat == 0) {
    if (
      (mouseX - WIDTH * 0.5) ** 2 + (mouseY - HEIGHT * 0.7) ** 2 <=
      (WIDTH * 0.0625) ** 2
    ) {
      stat = 1;
      change = true;
    }
  }
}

function drawGame() {
  background(230);
  fillAndLineSet(0, 150, 255, 0, 0, 0, 1);
  for (let i = 0; i < 10; i++) {
    circle(WIDTH * show1[i][0], HEIGHT * show1[i][1], WIDTH * 0.01);
  }
  fillAndLineSet(255, 100, 0, 0, 0, 0, 1);
  for (let i = 0; i < 10; i++) {
    circle(WIDTH * show2[i][0], HEIGHT * show2[i][1], WIDTH * 0.01);
  }

  fillAndLineSet(0, 0, 0, 0, 0, 0, 3);
  circle(centX, centY, WIDTH * 0.02);
  line(
    centX + 3 * WIDTH * Math.cos(rot),
    centY + 3 * WIDTH * Math.sin(rot),
    centX - 3 * WIDTH * Math.cos(rot),
    centY - 3 * WIDTH * Math.sin(rot)
  );
  line(
    centX,
    centY,
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot)
  );
  line(
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot),
    centX -
      0.05 * WIDTH * Math.sin(rot) +
      0.02 * WIDTH * Math.cos(rot + (Math.PI * 4) / 3),
    centY +
      0.05 * WIDTH * Math.cos(rot) +
      0.02 * WIDTH * Math.sin(rot + (Math.PI * 4) / 3)
  );
  line(
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot),
    centX -
      0.05 * WIDTH * Math.sin(rot) +
      0.02 * WIDTH * Math.cos(rot + (Math.PI * 5) / 3),
    centY +
      0.05 * WIDTH * Math.cos(rot) +
      0.02 * WIDTH * Math.sin(rot + (Math.PI * 5) / 3)
  );
}

function set0() {
  // 0번 장면 시작
  background(230);
  fillAndLineSet(255, 255, 255, 0, 0, 0, 3);
  circle(WIDTH * 0.5, HEIGHT * 0.7, WIDTH * 0.125);
  fillAndLineSet(0, 150, 255, 0, 0, 0, 0);
  triangle(
    WIDTH * 0.477,
    HEIGHT * 0.643,
    WIDTH * 0.477,
    HEIGHT * 0.757,
    WIDTH * 0.537,
    HEIGHT * 0.7
  );
  fillAndLineSet(255, 255, 255, 0, 0, 0, 3);
  rect(WIDTH * 0.2, HEIGHT * 0.2, WIDTH * 0.8, HEIGHT * 0.4);
  textSet(0, 0, 0, WIDTH * 0.08);
  text("퍼셉트론 게임", WIDTH * 0.5, HEIGHT * 0.3);
}

function keep0() {
  // 0번 장면 지속
  if (
    (mouseX - WIDTH * 0.5) ** 2 + (mouseY - HEIGHT * 0.7) ** 2 <=
    (WIDTH * 0.0625) ** 2
  ) {
    fillAndLineSet(255, 100, 0, 0, 0, 0, 0);
    triangle(
      WIDTH * 0.477,
      HEIGHT * 0.643,
      WIDTH * 0.477,
      HEIGHT * 0.757,
      WIDTH * 0.537,
      HEIGHT * 0.7
    );
  } else {
    fillAndLineSet(0, 150, 255, 0, 0, 0, 0);
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

function set1() {
  // 1번 장면 시작
  background(230);
  textSet(0, 0, 0, WIDTH * 0.025);
  text(
    "<규칙>\n\n파란색 점과 주황색 점이 주어집니다. (전체 1000개 중 랜덤 20개)\n검은색 선을 움직여 화살표가 있는 쪽에만 주황색 점이 위치하도록 합니다.\n화살표는 선 위에 있는 중심점에 달려 있으며, 항상 선에 수직합니다.\nW/S키로 화살표를 따라 중심점을 이동할 수 있습니다. (W키가 화살표 쪽)\nA/D키로 중심점을 기준으로 선을 회전할 수 있습니다. (D키가 시계 방향)\n선이 이동할 때 미끄러짐이 작용합니다.\n15초 후 올바르게 분류한 점의 개수가 점수가 됩니다. (시작할 때 보여주지 않은 점 포함)\n\n스페이스 바를 눌러 시작",
    WIDTH * 0.5,
    HEIGHT * 0.5
  );
}

function keep1() {
  // 1번 장면 지속
  if (key == " " && keyIsPressed) {
    stat = 2;
    change = true;
  }
}

function set2() {
  // 2번 장면 시작
  background(230);
  timeTrack1 = new Date().getTime();
}

function keep2() {
  // 2번 장면 지속
  background(230);
  textSet(255, 100, 0, WIDTH * 0.2);
  timeTrack2 = new Date().getTime();
  if (timeTrack2 - timeTrack1 >= 3000) {
    stat = 3;
    change = true;
  } else {
    text(
      (3 - Math.floor((timeTrack2 - timeTrack1 + 1) / 1000)).toString(),
      WIDTH * 0.5,
      HEIGHT * 0.5
    );
  }
}

function set3() {
  // 3번 장면 시작
  for (let i = 0; i < 10; i++) {
    tmp = i * 50 + Math.floor(50 * Math.random());
    show1[i][0] = pts1[tmp][0];
    show1[i][1] = pts1[tmp][1];
    tmp = i * 50 + Math.floor(50 * Math.random());
    show2[i][0] = pts2[tmp][0];
    show2[i][1] = pts2[tmp][1];
  }

  centX = random(0, WIDTH);
  centY = random(0, HEIGHT);
  rot = Math.random() * 2 * Math.PI;
  lvel = 0;
  avel = 0;
  score = 0;
  timeTrack1 = new Date().getTime();

  drawGame();
}

function keep3() {
  // 3번 장면 지속
  timeTrack2 = new Date().getTime();
  if (timeTrack2 - timeTrack1 >= 15000) {
    stat = 4;
    change = true;
  }

  lvel *= 0.99;
  avel *= 0.95;

  if (key === "s" && keyIsPressed) lvel += WIDTH / 3600;
  else if (key === "w" && keyIsPressed) lvel -= WIDTH / 3600;
  else if (key === "d" && keyIsPressed) avel += Math.PI / 450;
  else if (key === "a" && keyIsPressed) avel -= Math.PI / 450;
  lvel = Math.min(Math.max(lvel, -WIDTH / 120), WIDTH / 120);
  avel = Math.min(Math.max(avel, -Math.PI / 15), Math.PI / 15);

  centX += lvel * sin(rot);
  centY -= lvel * cos(rot);
  rot += avel;
  centX = Math.min(Math.max(centX, 0), WIDTH);
  centY = Math.min(Math.max(centY, 0), HEIGHT);
  if (rot < 0) rot += 2 * Math.PI;
  if (rot > 2 * Math.PI) rot -= 2 * Math.PI;

  drawGame();
}

function set4() {
  // 4번 장면 시작
  background(230);
  fillAndLineSet(0, 150, 255, 0, 0, 0, 1);
  for (let i = 0; i < 500; i++) {
    circle(WIDTH * pts1[i][0], HEIGHT * pts1[i][1], WIDTH * 0.01);
  }
  fillAndLineSet(255, 100, 0, 0, 0, 0, 1);
  for (let i = 0; i < 500; i++) {
    circle(WIDTH * pts2[i][0], HEIGHT * pts2[i][1], WIDTH * 0.01);
  }

  fillAndLineSet(0, 0, 0, 0, 0, 0, 3);
  circle(centX, centY, WIDTH * 0.02);
  line(
    centX + 3 * WIDTH * Math.cos(rot),
    centY + 3 * WIDTH * Math.sin(rot),
    centX - 3 * WIDTH * Math.cos(rot),
    centY - 3 * WIDTH * Math.sin(rot)
  );
  line(
    centX,
    centY,
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot)
  );
  line(
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot),
    centX -
      0.05 * WIDTH * Math.sin(rot) +
      0.02 * WIDTH * Math.cos(rot + (Math.PI * 4) / 3),
    centY +
      0.05 * WIDTH * Math.cos(rot) +
      0.02 * WIDTH * Math.sin(rot + (Math.PI * 4) / 3)
  );
  line(
    centX - 0.05 * WIDTH * Math.sin(rot),
    centY + 0.05 * WIDTH * Math.cos(rot),
    centX -
      0.05 * WIDTH * Math.sin(rot) +
      0.02 * WIDTH * Math.cos(rot + (Math.PI * 5) / 3),
    centY +
      0.05 * WIDTH * Math.cos(rot) +
      0.02 * WIDTH * Math.sin(rot + (Math.PI * 5) / 3)
  );

  timeTrack1 = new Date().getTime();
}

function keep4() {
  // 4번 장면 지속
  timeTrack2 = new Date().getTime();
  if (timeTrack2 - timeTrack1 >= 2500) {
    stat = 5;
    change = true;
  }
}

function set5() {
  // 5번 장면 시작
  background(230);
  for (let i = 0; i < 500; i++) {
    if (
      ccw(
        centX,
        centY,
        centX + Math.cos(rot),
        centY + Math.sin(rot),
        WIDTH * pts1[i][0],
        HEIGHT * pts1[i][1]
      ) < 0
    ) {
      fillAndLineSet(0, 255, 0, 0, 0, 0, 1);
      score++;
    } else fillAndLineSet(255, 0, 0, 0, 0, 0, 1);
    circle(WIDTH * pts1[i][0], HEIGHT * pts1[i][1], WIDTH * 0.01);
  }
  for (let i = 0; i < 500; i++) {
    if (
      ccw(
        centX,
        centY,
        centX + Math.cos(rot),
        centY + Math.sin(rot),
        WIDTH * pts2[i][0],
        HEIGHT * pts2[i][1]
      ) > 0
    ) {
      fillAndLineSet(0, 255, 0, 0, 0, 0, 1);
      score++;
    } else fillAndLineSet(255, 0, 0, 0, 0, 0, 1);
    circle(WIDTH * pts2[i][0], HEIGHT * pts2[i][1], WIDTH * 0.01);
  }

  timeTrack1 = new Date().getTime();
}

function keep5() {
  // 5번 장면 지속
  timeTrack2 = new Date().getTime();
  if (timeTrack2 - timeTrack1 >= 2500) {
    stat = 6;
    change = true;
  }
}

function set6() {
  // 6번 장면 시작
  background(230);
  textSet(0, 150, 255, WIDTH * 0.2);
  text(`${score}점`, WIDTH * 0.5, HEIGHT * 0.4);
  textSet(0, 0, 0, WIDTH * 0.025);
  text("스페이스 바를 눌러 복귀", WIDTH * 0.5, HEIGHT * 0.7);
}

function keep6() {
  // 6번 장면 지속
  if (key == " " && keyIsPressed) {
    stat = 0;
    change = true;
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  rectMode(CORNERS);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (change) {
    if (stat == 0) set0();
    else if (stat == 1) set1();
    else if (stat == 2) set2();
    else if (stat == 3) set3();
    else if (stat == 4) set4();
    else if (stat == 5) set5();
    else if (stat == 6) set6();
    change = false;
  } else {
    if (stat == 0) keep0();
    else if (stat == 1) keep1();
    else if (stat == 2) keep2();
    else if (stat == 3) keep3();
    else if (stat == 4) keep4();
    else if (stat == 5) keep5();
    else if (stat == 6) keep6();
  }
}
