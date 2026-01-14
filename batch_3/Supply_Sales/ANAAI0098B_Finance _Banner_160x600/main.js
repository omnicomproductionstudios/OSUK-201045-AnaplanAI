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
  const gradientStyle = "linear-gradient(117deg, #ff9757 0%, #ff6100 100%)";
  const parent = document.getElementById("text-1b");
  if (!parent) return;

  // Apply to parent
  const parentRect = parent.getBoundingClientRect();
  const parentWidth = parentRect.width || parent.offsetWidth || 0;
  const parentHeight = parentRect.height || parent.offsetHeight || 0;
  parent.style.backgroundImage = gradientStyle;
  parent.style.webkitBackgroundClip = "text";
  parent.style.backgroundClip = "text";
  parent.style.webkitTextFillColor = "transparent";
  parent.style.color = "transparent";
  parent.classList.add("split-gradient");

  // Align gradient across chars so it remains continuous
  const chars = (splitInstance && splitInstance.chars) || [];
  chars.forEach(char => {
    const rect = char.getBoundingClientRect();
    const offset = rect.left - parentRect.left;
    const offsetY = rect.top - parentRect.top;
    char.style.backgroundImage = gradientStyle;
    char.style.backgroundSize = `${parentWidth}px ${parentHeight}px`;
    char.style.backgroundPosition = `-${offset}px -${offsetY}px`;
    char.style.backgroundRepeat = "no-repeat";
    char.style.webkitBackgroundClip = "text";
    char.style.backgroundClip = "text";
    char.style.webkitTextFillColor = "transparent";
    char.style.color = "transparent";
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