const WIDTH = 800;
const HEIGHT = (WIDTH * 9) / 16;
let stat = 0; // 0: 시작 전, 1: 규칙 안내, 2: 준비, 3: 게임 중, 4: 집계 중, 5: 끝
let change = true;
let timeTrack1, timeTrack2;

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
    "<규칙>\n\n검은 점과 흰 점이 주어집니다. (전체 1000개 중 랜덤 200개)\n빨간색 선을 움직여 화살표가 있는 쪽에만 흰 점이 위치하도록 합니다.\n화살표는 선 위에 있는 중심점에 달려 있으며, 항상 선에 수직합니다.\nA/D키로 중심점을 이동할 수 있습니다. (D키가 화살표 쪽)\nW/S키로 선을 회전할 수 있습니다. (W키가 시계 방향)\n선이 이동할 때 미끄러짐이 작용합니다. \n15초 후 올바르게 분류한 점의 개수가 점수가 됩니다. (시작할 때 보여주지 않은 점 포함)\n\n스페이스 바 눌러 시작",
    WIDTH * 0.5,
    HEIGHT * 0.5
  );
}

function keep1() {
  // 1번 장면 지속
  if (key == " ") {
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
  textSet(0, 128, 0, WIDTH * 0.2);
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
  background(230);
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
    change = false;
  } else {
    if (stat == 0) keep0();
    else if (stat == 1) keep1();
    else if (stat == 2) keep2();
  }
}
