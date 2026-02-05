var startTime;
var tl1, tl2;

// Register Plugin
if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {
  gsap.registerPlugin(SplitText);
}

function init() {
  // Safari 13/14 specific: Wait for fonts to ensure SplitText measures correctly
  if (document.fonts) {
    document.fonts.ready.then(function() {
      startAnimation();
    });
  } else {
    // Fallback for very old browsers
    setTimeout(startAnimation, 500);
  }
}

function startAnimation() {
  startTime = new Date();
  tl2 = gsap.timeline();
  tl1 = gsap.timeline({ onComplete: endTime });
  
  animate();
  setRollover();
}

function animate() {
  let split1, split2, split3, split4;
  
  try {
    // Using simple types to reduce Safari DOM nesting complexity
    split1 = new SplitText("#text-1b", { type: "chars" });
    split2 = new SplitText("#text-2", { type: "chars" });
    split3 = new SplitText("#text-3", { type: "chars" });
    split4 = new SplitText("#text-4", { type: "chars" });
  } catch (err) {
    console.warn("SplitText error:", err);
  }

  // Apply gradient fixes
  applyGradientText(split1);

  // Setup initial states
  gsap.set(["#main"], { autoAlpha: 1 });
  gsap.set(["#cta"], { rotation: 0.01, force3D: true });

  // Main Timeline - Cleaned up to GSAP 3 syntax
  tl1.to('#main', { duration: 0.5, autoAlpha: 1 }, 0)
     .to(['#icon-1', '#icon-2'], { duration: 0.5, y: -250 }, 0)
     .to('#icon-1', { duration: 0.5, x: 150 }, 0)
     .to('#icon-2', { duration: 0.5, x: -150 }, 0)
     .to(['#bg-1', '#icon-1', '#icon-2'], { duration: 0.5, autoAlpha: 0 }, 0.5);

  tl1.to('#bg-1-icon', { duration: 0.5, scale: 35, rotation: 0.1, ease: "power1.in" }, 1);

  // Split Text Animations with Safari "ClearProps" fix
  const staggerVal = 0.05;
  const charVars = { y: -20, autoAlpha: 0, duration: 0.2, stagger: staggerVal, clearProps: "transform" };

  if (split1) tl1.from(split1.chars, charVars, 1.5);
  
  if (split2) {
    tl1.from(split2.chars, charVars, ">");
    // Ensure parent visibility after split
    tl1.set('#text-1b', { webkitTextFillColor: '#ff6100' }, "<");
  }

  tl1.to('#logo-1', { duration: 0, autoAlpha: 0 }, "+=1.5")
     .to('#frame-1', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" })
     .set('#frame-1', { autoAlpha: 0 });

  if (split3) tl1.from(split3.chars, charVars, "-=0.1");

  tl1.to('#logo-2', { duration: 0, autoAlpha: 0 }, "+=2")
     .to('#frame-2', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" })
     .set('#frame-2', { autoAlpha: 0 });
  
  if (split4) tl1.from(split4.chars, charVars, ">");
}

function applyGradientText(splitInstance) {
  if (!splitInstance) return;
  const gradientStyle = "linear-gradient(117deg, #ff9757 10%, #ff6100 100%)";
  const parents = document.querySelectorAll(".TextGradiat");

  parents.forEach(parent => {
    const parentRect = parent.getBoundingClientRect();
    
    parent.style.backgroundImage = gradientStyle;
    parent.style.webkitBackgroundClip = "text";
    parent.style.webkitTextFillColor = "transparent";

    const chars = splitInstance.chars.filter(char => parent.contains(char));

    chars.forEach(char => {
      const rect = char.getBoundingClientRect();
      const offsetX = rect.left - parentRect.left;
      const offsetY = rect.top - parentRect.top;

      char.style.display = "inline-block";
      char.style.backgroundImage = gradientStyle;
      char.style.backgroundSize = `${parentRect.width}px ${parentRect.height}px`;
      char.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
      char.style.webkitBackgroundClip = "text";
      char.style.webkitTextFillColor = "transparent";
      // Safari render fix: force a redraw
      char.style.webkitTransform = "translateZ(0)";
    });
  });
}

function setRollover() {
  const bgExit = document.getElementById("bgExit");
  bgExit.addEventListener("mouseenter", () => {
    gsap.to(["#cta", "#cta-2", "#cta-3"], { duration: 0.3, scale: 1.1, ease: "power1.out" });
  });
  bgExit.addEventListener("mouseleave", () => {
    gsap.to(["#cta", "#cta-2", "#cta-3"], { duration: 0.3, scale: 1, ease: "power1.out" });
  });
}

function endTime() {
  console.log("Animation duration: " + (new Date() - startTime) / 1000 + "s");
}