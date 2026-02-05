var startTime;
var tl1;

// 1. Register Plugin Defensively
if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {
    gsap.registerPlugin(SplitText);
}

function init() {
    // Hide frames initially via JS if CSS hasn't done it
    gsap.set(["#text-1b", "#text-2", "#text-3", "#text-4"], { autoAlpha: 0 });
    
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
    let split1, split2, split3, split4;

    // Check if SplitText is actually loaded
    const isSplitLoaded = typeof SplitText !== "undefined";

    if (isSplitLoaded) {
        try {
            // 'segmenter: false' prevents the Safari 13/14 Intl error
            split1 = new SplitText("#text-1b", { type: "chars", segmenter: false });
            split2 = new SplitText("#text-2", { type: "chars", segmenter: false });
            split3 = new SplitText("#text-3", { type: "chars", segmenter: false });
            split4 = new SplitText("#text-4", { type: "chars", segmenter: false });

            // Set chars to hidden immediately
            gsap.set([split1.chars, split2.chars, split3.chars, split4.chars], { autoAlpha: 0, y: -20 });
            // Show parent containers
            gsap.set(["#text-1b", "#text-2", "#text-3", "#text-4"], { autoAlpha: 1 });
            
            applyGradientText(split1);
        } catch (err) {
            console.error("SplitText failed to init:", err);
        }
    } else {
        console.warn("SplitText not found. Falling back to standard animation.");
    }

    // --- TIMELINE START ---
    
    tl1.to('#main', { duration: 0.1, autoAlpha: 1 }, 0);
    tl1.to(['#icon-1', '#icon-2'], { duration: 0.5, y: -250 }, 0)
       .to('#icon-1', { duration: 0.5, x: 150 }, 0)
       .to('#icon-2', { duration: 0.5, x: -150 }, 0)
       .to(['#bg-1', '#icon-1', '#icon-2'], { duration: 0.5, autoAlpha: 0 }, 0.5);

    tl1.to('#bg-1-icon', { duration: 0.5, scale: 35, rotation: 0.1, ease: "power1.in" }, 1);

    // Text 1 & 2
    let text1Target = (split1 && isSplitLoaded) ? split1.chars : "#text-1b";
    let text2Target = (split2 && isSplitLoaded) ? split2.chars : "#text-2";

    tl1.to(text1Target, { duration: 0.2, y: 0, autoAlpha: 1, stagger: 0.05 }, "+=0.5");
    tl1.to(text2Target, { duration: 0.2, y: 0, autoAlpha: 1, stagger: 0.05 }, ">");

    // Frame 1 Transition
    tl1.to('#logo-1', { duration: 0.5, autoAlpha: 0 }, "+=1.5")
       .to('#frame-1', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" })
       .set('#frame-1', { autoAlpha: 0 });

    // Text 3
    let text3Target = (split3 && isSplitLoaded) ? split3.chars : "#text-3";
    tl1.to(text3Target, { duration: 0.2, y: 0, autoAlpha: 1, stagger: 0.05 }, "-=0.1");

    // Frame 2 Transition
    tl1.to('#logo-2', { duration: 0.5, autoAlpha: 0 }, "+=2")
       .to('#frame-2', { duration: 0.5, scale: 100, rotation: 0.1, ease: "power1.in" })
       .set('#frame-2', { autoAlpha: 0 });
    
    // Text 4
    let text4Target = (split4 && isSplitLoaded) ? split4.chars : "#text-4";
    tl1.to(text4Target, { duration: 0.2, y: 0, autoAlpha: 1, stagger: 0.05 }, ">");
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