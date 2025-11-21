// Banner duration timer start time
var startTime;

// Timeline reference
var tl;
var tl1;
var tl2;

// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Background Timeline
  tl2 = new TimelineMax({  });

  // Set Global Timeline
  tl1 = new TimelineMax({ onComplete: endTime });
  animate();
}

function animate() {
  let split1 = SplitText.create("#text-1b", { type: "words, chars" });
  let split2 = SplitText.create("#text-2", { type: "words, chars" });
  let split3 = SplitText.create("#text-3", { type: "words, chars" });
  let split4 = SplitText.create("#text-4", { type: "words, chars" });

  // tl1.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl1.set(["#cta"], { force3D: false, rotation: .001 });

  tl1.to(['#main'], 0.5,{ autoAlpha: 1 }, 0);
  tl1.to(['#icon-1', '#icon-2'], 0.5,{ y: '-=250' }, 0);
  tl1.to(['#icon-1'], 0.5,{ x: '+=150' }, 0);
  tl1.to(['#icon-2'], 0.5,{ x: '-=150' }, 0);
  tl1.to(['#bg-1', '#icon-1', '#icon-2'], 0.5,{ autoAlpha: 0 }, '+=0');

  tl1.to(['#bg-1-icon'], 0.5,{ scale: 35, rotation: 0.1, ease: "power1.in", force3D: false }, 1);
  tl1.to(['#icon-1', '#icon-2', '#bg-1'], 0,{ autoAlpha: 0 }, '+=0');

  tl1.from(split1.chars, 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '+=0.5');

  tl1.from(split2.chars, 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '+=0.5');
  tl1.to(['#text-1b'], 0,{ webkitTextFillColor: '#ff6100' }, '<');

  tl1.to(['#logo-1'], 0,{ autoAlpha: 0 }, '+=0.5');
  tl1.to(['#frame-1'], 0.5,{ scale: 100, rotation: 0.1, ease: "power1.in", force3D: false }, '+=0');
  tl1.to(['#frame-1'], 0,{autoAlpha: 0 }, '+=0');

  tl1.from(split3.chars, 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '+=0');

  tl1.to(['#logo-2'], 0,{ autoAlpha: 0 }, '+=1');
  tl1.to(['#frame-2'], 0.5,{ scale: 100, rotation: 0.1, ease: "power1.in", force3D: false }, '+=0');
  tl1.to(['#frame-2'], 0,{autoAlpha: 0 }, '+=0');
  
  tl1.from(split4.chars, 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '+=0');

}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function endTime() {
  // show total banner animation time in browser console.
  var endTime = new Date();

  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
}

// CTA grow on hover

function setRollover() {
  document
    .getElementById("bgExit")
    .addEventListener("mouseover", default_over, false);
  document
    .getElementById("bgExit")
    .addEventListener("mouseout", default_out, false);
}

function default_over(event) {
  TweenMax.to(["#cta", "#cta-shine-container"], 0.3, { scale: 1.1, ease: Power1.easeOut, delay: 0 });
}

function default_out(event) {
  TweenMax.to(["#cta", "#cta-shine-container"], 0.3, { scale: 1, ease: Power1.easeOut, delay: 0 });
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}