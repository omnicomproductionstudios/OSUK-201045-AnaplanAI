var startTime;
var tl1;

if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {
  gsap.registerPlugin(SplitText);
}

function init() {
  // Ensure the container is visible, but text remains hidden via CSS
  gsap.set("#main", { autoAlpha: 1 });
  
  if (document.fonts) {
    document.fonts.ready.then(startAnimation);
  } else {
    setTimeout(startAnimation, 500);
  }
}

function startAnimation() {
  startTime = new Date();
  tl1 = gsap.timeline({ onComplete: endTime });
  animate();
  setRollover();
}

function animate() {
  // 1. Setup Splits
  let split1 = new SplitText("#text-1b", { type: "chars" });
  let split2 = new SplitText("#text-2", { type: "chars" });
  let split3 = new SplitText("#text-3", { type: "chars" });
  let split4 = new SplitText("#text-4", { type: "chars" });

  // 2. FORCE INITIAL HIDDEN STATE (Prevents "everything at once")
  // We use autoAlpha: 0 and y: -20 so Safari knows where they start
  gsap.set([split1.chars, split2.chars, split3.chars, split4.chars], { 
    autoAlpha: 0, 
    y: -20 
  });
  
  // Show the parent containers now that children are hidden
  gsap.set(["#text-1b", "#text-2", "#text-3", "#text-4"], { autoAlpha: 1 });

  applyGradientText(split1);

  // 3. Timeline
  tl1.to(['#icon-1', '#icon-2'], { duration: 0.5, y: -250 }, 0)
     .to('#icon-1', { duration: 0.5, x: 150 }, 0)
     .to('#icon-2', { duration: 0.5, x: -150 }, 0)
     .to(['#bg-1', '#icon-1', '#icon-2'], { duration: 0.5, autoAlpha: 0 }, 0.5);

  tl1.to('#bg-1-icon', { duration: 0.5, scale: 35, rotation: 0.1, ease: "power1.in" }, 1);

  // Split Animations
  // immediateRender: false is key here for Safari staggered from tweens
  tl1.to(split1.chars, { 
    duration: 0.2, 
    y: 0, 
    autoAlpha: 1, 
    stagger: 0.05, 
    ease: "power1.out" 
  }, "+=0.5");

  tl1.to(split2.chars, { 
    duration: 0.2, 
    y: 0, 
    autoAlpha: 1, 
    stagger: 0.05, 
    ease: "power1.out" 
  }, ">");

  tl1.to('#logo-1', { duration: 0.5, autoAlpha: 0 }, "+=1.5");
  tl1.to('#frame-1', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" });
  tl1.set('#frame-1', { autoAlpha: 0 });

  tl1.to(split3.chars, { 
    duration: 0.2, 
    y: 0, 
    autoAlpha: 1, 
    stagger: 0.05 
  }, "-=0.1");

  tl1.to('#logo-2', { duration: 0.5, autoAlpha: 0 }, "+=2");
  tl1.to('#frame-2', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" });
  tl1.set('#frame-2', { autoAlpha: 0 });
  
  tl1.to(split4.chars, { 
    duration: 0.2, 
    y: 0, 
    autoAlpha: 1, 
    stagger: 0.05 
  }, ">");
}

function applyGradientText(splitInstance) {
    if (!splitInstance) return;
    const gradientStyle = "linear-gradient(117deg, #ff9757 10%, #ff6100 100%)";
    const parent = document.querySelector("#text-1b"); // Simplified for debugging
    if(!parent) return;

    const parentRect = parent.getBoundingClientRect();
    
    splitInstance.chars.forEach(char => {
        const rect = char.getBoundingClientRect();
        const offsetX = rect.left - parentRect.left;
        const offsetY = rect.top - parentRect.top;

        char.style.backgroundImage = gradientStyle;
        char.style.backgroundSize = `${parentRect.width}px ${parentRect.height}px`;
        char.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
        char.style.webkitBackgroundClip = "text";
        char.style.webkitTextFillColor = "transparent";
        char.style.display = "inline-block";
    });
}

function setRollover() {
  const bgExit = document.getElementById("bgExit");
  bgExit.addEventListener("mouseenter", function() {
    gsap.to(["#cta", "#cta-2", "#cta-3"], { duration: 0.3, scale: 1.1 });
  });
  bgExit.addEventListener("mouseleave", function() {
    gsap.to(["#cta", "#cta-2", "#cta-3"], { duration: 0.3, scale: 1 });
  });
}

function endTime() {
  console.log("Animation duration: " + (new Date() - startTime) / 1000 + "s");
}