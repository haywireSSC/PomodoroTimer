let f
function preload() {
  palettes = []
  palettes[0] = [
    color(33, 161, 121),//work
    color(251, 159, 137),//rest
    color(30, 30, 36),//background
    color(129, 174, 157),//minuates
    color(80, 80, 90)//light background
  ]

  palettes[1] = [
    color(184, 196, 128),//work
    color(212, 231, 158),//rest
    color(60, 27, 67),//background
    color(129, 174, 157),//minuates
    color(146, 45, 80)//light background
  ]

  palettes[2] = [
    color(251, 77, 61),//work
    color(3, 206, 164),//rest
    color(52, 89, 149),//background
    color(234, 196, 53),//minuates
    color(228, 0, 102)//light background
  ]

  palettes[3] = [
    color(244, 96, 54),//work
    color(197, 216, 109),//rest
    color(46, 41, 78),//background
    color(231, 29, 54),//minuates
    color(27, 153, 139)//light background
  ]

  palettes[4] = [
    color(135, 188, 222),//work
    color(128, 94, 115),//rest
    color(36, 59, 74),//background
    color(78, 77, 92),//minuates
    color(45, 70, 84)//light background
  ]

  palettes[5] = [
    color(177, 182, 149),//work
    color(252, 208, 161),//rest
    color(94, 75, 86),//background
    color(175, 210, 233),//minuates
    color(166, 144, 164)//light background
  ]
  f = loadFont('TypoGraphica_demo.otf');
  sound = loadSound('game-radar-ping-SBA-300420147-preview.wav');
  tick = createAudio('clock-ticking-2.wav');
  colours = random(palettes);
  tick.loop();
  
}

function setup() {
  if (windowHeight < windowWidth) {
    size = windowHeight;
  } else {
    size = windowWidth;
  }
  createCanvas(windowWidth, windowHeight);
  workTime = 60000 * 25;
  restTime = 60000 * 5;
  workColour = colours[0];
  restColour = colours[1];
  resting = false;
  maxTime = workTime;
  colour = workColour;
  start = 0;
  sound.play();
}

function draw() {
  if (millis() - start > maxTime) {
    sound.play();
    resting = !resting;
    if (resting) {
      maxTime = restTime;
      colour = restColour;
    } else {
      maxTime = workTime;
      colour = workColour;
    }
    start = millis();
  }
  amount = map(maxTime-(millis()-start), 0, maxTime, 0, 180);

  background(colours[2]);
  noFill();

  stroke(255, 255, 255);
  strokeWeight(s(8));
  ellipse(width/2, height/2, size*2.6/4, size*2.6/4);

  strokeWeight(s(4));
  stroke(colours[4]);
  ellipse(width/2, height/2, size*2.4/4, size*2.4/4);
  ellipse(width/2, height/2, size*2.8/4, size*2.8/4);

  stroke(color(colours[3]));
  arc(width/2, height/2, size*2.4/4, size*2.4/4, radians(270-int((maxTime - (millis()-start)) % 60000/1000)*3), radians(270+int((maxTime - (millis()-start)) % 60000/1000)*3));

  stroke(colour);
  arc(width/2, height/2, size*2.8/4, size*2.8/4, radians(90-amount), radians(90+amount));
  textSize(s(64));
  strokeWeight(0);
  textFont(f);
  textAlign(CENTER);
  if (resting){
    fill(workColour);
    text('rest', width/2, height/2);
  } else{
    fill(restColour);
    text('work', width/2, height/2);
  }

  textSize(s(32));
  t = String(int((maxTime - (millis()-start)) % 3.6e+6/60000)) + ' : ' + String(int((maxTime - (millis()-start)) % 60000/1000))
  text(t, width/2, height/1.7);

}

function s(n){
  return n/400*size;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight, true);
  if (windowHeight < windowWidth) {
    size = windowHeight;
  } else {
    size = windowWidth;
  }
}
