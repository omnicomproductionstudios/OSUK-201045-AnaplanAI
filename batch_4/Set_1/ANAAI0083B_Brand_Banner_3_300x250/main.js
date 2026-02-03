// Banner duration timer start time
var startTime;

// Timeline reference
var tl;
var tl1;
var tl2;

// Ensure SplitText plugin is registered (GSAP 3)
if (typeof gsap !== "undefined" && gsap.registerPlugin && typeof SplitText !== "undefined") {
  gsap.registerPlugin(SplitText);
}

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
  // Split text for animations
  let split1, split2, split3, split4;
  try {
    split1 = new SplitText("#text-1a", { type: "words, chars" });
    split2 = new SplitText("#text-1b", { type: "words, chars" });
    split3 = new SplitText("#text-3", { type: "words, chars" });
    split4 = new SplitText("#text-4", { type: "words, chars" });
  } catch (err) {
    console.warn("SplitText failed to initialize; showing text without split animations", err);
  }


  // Ensure gradient styles apply on the whole phrase (no per-char gradient)
  applyGradientText(split1);

  // tl1.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl1.set(["#cta"], { force3D: false, rotation: .001 });

  tl1.to(['#main'], 0.5,{ autoAlpha: 1 }, 0);
  tl1.to(['#icon-1', '#icon-2'], 0.5,{ y: '-=250' }, 0);
  tl1.to(['#icon-1'], 0.5,{ x: '+=150' }, 0);
  tl1.to(['#icon-2'], 0.5,{ x: '-=150' }, 0);
  tl1.to(['#bg-1', '#icon-1', '#icon-2'], 0.5,{ autoAlpha: 0, ease: "sine.inOut", }, '+=0.1');

  tl1.to(['#bg-1-icon'], 0.5,{ scale: 35, rotation: 0.1, ease: "sine.inOut", force3D: false }, 1);
  tl1.to(['#icon-1', '#icon-2', '#bg-1'], 0,{ autoAlpha: 0 }, '+=0');
  
  tl1.to(['#frame-1'], 0,{ autoAlpha: 0,ease: "power1.in", }, '<');

  tl1.from(split1 ? split1.chars : "#text-1a", 0.1, { y: -20, autoAlpha: 0, stagger: 0.05 }, '+=0.5');
  tl1.from(split2 ? split2.chars : "#text-1b", 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '>');
  tl1.to(["#text-1a, #text-1b"], 0.5,{ease: "power1.in", autoAlpha: 0 }, '+=1');

  tl1.to(".box", 0.5, {y:-48, ease: "power1.out",}, ">");
  tl1.to(".photo", 0.4, {transform: 'translate(0px, 0px)', ease: "power1.out",}, "<");
  tl1.to([".star1", ".star2", ".star3"], {y: -47, ease: "power1.out", stagger: 0.05}, "<");
  tl1.to(".card", 0.5, {y:-48, ease: "power1.out",}, "<+0.07");

  tl1.from(split3 ? split3.chars : "#text-3", 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '+=0.1');
  tl1.to(['.star, .box, .card, .photo, #text-3'], 0.2,{ autoAlpha: 0, ease: "power1.in", }, '+=2');
  tl1.from(split4 ? split4.chars : "#text-4", 0.1, { y: -20, autoAlpha: 0, stagger: 0.05,}, '<+0.2');

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
function applyGradientText(splitInstance) {
  const gradientStyle = "linear-gradient(117deg, #ff9757 10%, #ff6100 100%)";

  // 👇 class based selection
  const parents = document.querySelectorAll(".TextGradiat");
  if (!parents.length) return;

  parents.forEach(parent => {
    const parentRect = parent.getBoundingClientRect();
    const parentWidth = parentRect.width || parent.offsetWidth || 0;
    const parentHeight = parentRect.height || parent.offsetHeight || 0;

    // Apply to parent
    parent.style.backgroundImage = gradientStyle;
    parent.style.webkitBackgroundClip = "text";
    parent.style.backgroundClip = "text";
    parent.style.webkitTextFillColor = "transparent";
    parent.style.color = "transparent";
    parent.classList.add("split-gradient");

    // 👇 chars jo isi parent ke andar ho
    const chars =
      (splitInstance && splitInstance.chars || []).filter(char =>
        parent.contains(char)
      );

    chars.forEach(char => {
      const rect = char.getBoundingClientRect();
      const offsetX = rect.left - parentRect.left;
      const offsetY = rect.top - parentRect.top;

      char.style.backgroundImage = gradientStyle;
      char.style.backgroundSize = `${parentWidth}px ${parentHeight}px`;
      char.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
      char.style.backgroundRepeat = "no-repeat";
      char.style.webkitBackgroundClip = "text";
      char.style.backgroundClip = "text";
      char.style.webkitTextFillColor = "transparent";
      char.style.color = "transparent";
    });
  });
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