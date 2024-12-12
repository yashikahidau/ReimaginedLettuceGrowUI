function loco() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();


}
loco();


//*****NAVBAR MENU PAGE*****/
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu");
  const closeButton = document.getElementById("close");
  const menuSection = document.getElementById("menu-section");
  const links = document.querySelectorAll("#menu-section ul li a");

  menuButton.addEventListener("click", () => {
    gsap.to(menuSection, { duration: 0.5, height: "100vh", opacity: 1, visibility: "visible" });
    gsap.fromTo(links,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.3, delay: 0.5, ease: "slowMo" }
    );
  });

  closeButton.addEventListener("click", () => {
    gsap.to(links, { y: 50, opacity: 0, duration: 0.5, stagger: -0.1, ease: "power2.out" });
    gsap.to(menuSection, {
      duration: 0.5,
      height: "0vh",
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(menuSection, { visibility: "hidden", });
      }
    });
  });
});


//NAVBAR color changes
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  const blackSections = document.querySelectorAll('.black-background');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.add('nav-dark');
      } else {
        nav.classList.remove('nav-dark');
      }
    });
  }, observerOptions);

  blackSections.forEach(section => {
    observer.observe(section);
  });
});





// LOADER ANIMATION
const tL1 = gsap.timeline();
tL1.to("#page1", {
  opacity: 1,
  duration: 0.5,
});
tL1.fromTo(
  "#page1 .fruit",
  {
    opacity: 0,
    y: -100,
  },
  {
    y: 350,
    opacity: 1,
    duration: 1,
    ease: "bounce.out",
  }
);
tL1.to("#page2", {
  opacity: 1,
  duration: 0.5,
});
tL1.fromTo(
  "#page2 .fruit",
  {
    opacity: 0,
    y: -100,
  },
  {
    y: 350,
    opacity: 1,
    duration: 1,
    ease: "bounce.out",
  }
);

tL1.to("#page3", {
  opacity: 1,
  duration: 0.5,
});

tL1.fromTo(
  "#page3 .fruit",
  {
    opacity: 0,
    y: -100,
  },
  {
    y: 350,
    opacity: 1,
    duration: 1,
    ease: "bounce.out",
  }
);
tL1.to("#loader", {
  y: "-100%",
  duration: 1,
  opacity: 0,
  onComplete: () => {
    document.querySelector("#loader").style.display = "none";
  },
});


//********LEAF TRAIL MOUSE CURSOR EFFECT
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById('leafCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let stars = [];
  const leafImage = new Image();
  leafImage.src = 'media/leaf.png';

  window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Star {
    constructor(x, y, velocityX, velocityY) {
      this.x = x;
      this.y = y;
      this.finalSize = Math.random() * 5 + 5;
      this.alpha = 1;
      this.velocityX = velocityX * 0.05;
      this.velocityY = 1 + Math.random() + velocityY * 0.05;
      this.gravity = 0.02;
      this.drag = 0.97;
      this.turbulence = () => Math.random() * 0.5 - 0.25;
      this.timeElapsed = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.atan2(this.velocityY, this.velocityX));
      ctx.drawImage(leafImage, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }

    update(deltaTime) {
      this.x += this.velocityX + this.turbulence();
      this.velocityX *= this.drag;
      this.y += this.velocityY;
      this.velocityY += this.gravity;
      this.alpha = Math.max(0, this.alpha - 0.005);

      this.timeElapsed += deltaTime;
      if (this.timeElapsed < 2000) {
        this.size = this.finalSize * 2 - (this.finalSize * this.timeElapsed / 2000);
      } else {
        this.size = this.finalSize;
      }
    }
  }

  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseVelocityX = 0;
  let mouseVelocityY = 0;

  function addStar(e) {
    mouseVelocityX = e.clientX - lastMouseX;
    mouseVelocityY = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    let randomOffsetX = (Math.random() - 0.5) * 100;
    let randomOffsetY = (Math.random() - 0.5) * 100;

    stars.push(new Star(e.clientX, e.clientY, mouseVelocityX + randomOffsetX, mouseVelocityY + randomOffsetY));
  }

  document.addEventListener('mousemove', addStar);

  let lastTime = 0;

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => star.update(deltaTime));
    stars.forEach(star => star.draw());
    stars = stars.filter(star => star.alpha > 0 && star.y < height && star.x > 0 && star.x < width);
    requestAnimationFrame(update);
  }

  leafImage.onload = function () {
    update();
  };
});


// SECTION 1 ANIMATION
tL1.from("#section-1 #section1-vid", {
  opacity: 0,
  duration: 1,
});

tL1.to("#section-1 #section1-vid", {
  duration: 1,
  width: "50%",
  left: 0,
  ease: "slowMo",
});

tL1.to("#section-1 #section1-vid", {
  duration: 1,
  width: "98%",
  ease: "slowMo",
});

tL1.from("#section-1 #section1-content h1", {
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
  delay: 1,
  y: 100,
});

tL1.to("#section-1 #section1-vid", {
  duration: 1,
  width: "100%",
  ease: "power2.inOut",
});


tL1.to("#overlay-text h2", {
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power2.inOut",
  delay: 1
})

//SECTION 1 CURSOR EFFECT
let videoContent = document.querySelector("#section1-vid");
let cursor = document.querySelector("#video-cursor");

function cursoreffect() {
  videoContent.addEventListener("mousemove", function (val) {
    gsap.to(cursor, {
      x: val.x,
      y: val.y
    })
  })

  videoContent.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1
    })
  })
  videoContent.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      opacity: 0,
      scale: 0
    })
  })

}
cursoreffect();


// SECTION 2 CURSOR EFFECT 
let focus = document.querySelector(".focus");

document.addEventListener("mousemove", function (e) {
  let x = e.pageX;
  let y = e.pageY;

  focus.style.background = "radial-gradient(circle at " + x + "px " + y + "px, rgba(190, 255, 255, 0.2), transparent 20%)";
});

// TEXT REVEAL ANIMATION
document.addEventListener("DOMContentLoaded", function (event) {
  animation_text_1("#text-anim");
});

function animation_text_1(element) {
  var newText = "";
  var theText = document.querySelector(element);

  for (var i = 0; i < theText.innerText.length; i++) {
    newText += "<div>";
    if (theText.innerText[i] == " ") {
      newText += "&nbsp;";
    } else {
      newText += theText.innerText[i];
    }
    newText += "</div>";
  }

  theText.innerHTML = newText;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(element + " div", {
    opacity: 0,
    y: 90
  }, {
    duration: 2,
    opacity: 1,
    y: 0,
    stagger: 0.03,
    ease: "elastic(1.2, 0.5)",
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      toggleActions: "restart none none reverse"
    }
  });
}



// SECTION 3
var tL2 = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    start: "top top",
    end: "+=400%",
    scrub: 2,
    trigger: "#horizontal-container",
    pin: true,
    autoAlpha: 0,
    ease: "none"
  }
});
tL2.to("#section-3", {
  x: "-60vw",
  duration: 3,
  delay: .6
})
tL2.to("#section4-part-1", {
  x: "-100vw",
  duration: 3
}, "-=3.2")
tL2.to("#section4-part-1", {
  opacity: 0,
  duration: 3
}, "+=2")
tL2.to("#section4-part-2", {
  x: "-100vw",
  duration: 3
}, "-=3")

tL2.to("#section4-part-2", {
  opacity: 0,
  duration: 3
}, "+=2")
tL2.to("#section4-part-3", {
  x: "-100vw",
  duration: 3
}, "-=3")



//SECTION-5 TRIGGER
var tL3 = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    trigger: "#section-5",
    start: "top 0%",
    end: "top 0%",
    duration: 10,

  }
});
//SECTION-5 HEADING ANIMATION
var t = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    trigger: "#section-5",
    start: "-50% top",
    end: "0% top",
    scrub: 1
  }
});

t.to("#section-5 .word", {
  opacity: 1,
  y: 0,
  stagger: 0.3,
  duration: 2,
  ease: "power2.out"
});

//SECTION-5 SLIDES ANIMATION 
gsap.to("#slider-track .slide", {
  rotate: '360deg',
  translateX: '500',
  ease: "none",
  scrollTrigger: {
    trigger: "#slider",
    scroller: "#main",
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const progress = self.progress;
      const direction = progress > 0.5 ? "right" : "left";
      const distance = progress * 100;

      gsap.to("#slider-track", {
        x: direction === "right" ? distance : -distance,
        ease: "none"
      });


      gsap.to("#slider-track .slide span", {
        rotate: -360 * progress,
        // duration: .5,
        ease: "none"
      });
    }
  }
});



// SECTION-6 HEADING
var t2 = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    trigger: "#card-container",
    start: "-50% top",
    end: "-0% top",
    scrub: 1
  }
});

t2.to("#section-6 h1 .word", {
  opacity: 1,
  y: 0,
  stagger: 0.3,
  duration: 1,
  ease: "power2.out"
});

//SECTION-6 ANIMATION(CARDS)
var tl = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    start: "top top",
    end: "400% top",
    scrub: true,
    trigger: "#section-6",
    pin: true,
    autoAlpha: 0,
    ease: "none"
  }
});

tl.to(".bg-image img", {
  width: "100%",
  left: "0%",
  duration: 6
}, 0)
  .to("#card1", {
    y: "-75%",
    duration: 5
  }, 0);

tl.to("#card-container>h1", {
  opacity: 0,
  duration: 3
}, .5);

tl.to("#card2", {
  y: "-125.5%",
  duration: 3
}, 2)
  .to("#card3", {
    y: "-125.5%",
    duration: 3
  }, 5);

tl.to(".bg-image:nth-child(2)", {
  height: '100%',
  duration: 4
}, 7.8);

tl.to("#card1", {
  y: "-200%",
  duration: 3
}, 12);

tl.to("#card2", {
  y: "-200%",
  duration: 3
}, 13);



// SECTION-7 HORIZONTAL SECTION
const additionalWidth = window.innerWidth * 0.15; // in pixels

gsap.to("#media-main", {
  x: () => -document.querySelector("#media-main").scrollWidth - additionalWidth + window.innerWidth,
  ease: "none",
  scrollTrigger: {
    trigger: "#section-7 #page1",
    scroller: "#main",
    start: "top top",
    end: () => `+=${document.querySelector("#media-main").scrollWidth + additionalWidth - window.innerWidth}px`,
    scrub: 2,
    pin: true,
  }
});


// SECTIION-7 PARALLAX EFFECTS FOR ALL ELEMENTS
document.querySelectorAll(".parallax-element").forEach((el) => {
  const speed = el.dataset.speed;
  gsap.to(el, {
    x: () => -(document.querySelector("#media-main").scrollWidth - window.innerWidth) * speed / 40,
    ease: "none",
    scrollTrigger: {
      trigger: "#section-7 #page1",
      scroller: "#main",
      start: "top top",
      end: () => "+=" + (document.querySelector("#media-main").scrollWidth - window.innerWidth),
      scrub: 2,
    }
  });
});

// SECTION-7 VERTICAL PARALLAX FOR #TXT-DIV HEADING
const txtDivSpeed = 6;
gsap.to("#sub-page3-wrapper #txt-div", {
  y: () => (document.querySelector("#media-main").scrollWidth - window.innerWidth) * txtDivSpeed / 40,
  ease: "none",
  scrollTrigger: {
    trigger: "#sub-page3",
    scroller: "#main",
    start: "top top",
    end: () => "+=" + (document.querySelector("#media-main").scrollWidth - window.innerWidth),
    scrub: 2,
  }
});



//SECTION-8  TRIGGER
gsap.to("#section-8", {
  scrollTrigger: {
    trigger: "#section-8",
    scroller: "#main",
    start: "top 900%",
    end: "top 0%",
    duration: 10,
    scrub: 3,
    pin: true,
  },
});

//SECTION-8 ANIMATION (REVIEW-SECTION)
var tl1 = gsap.timeline({
  scrollTrigger: {
    scroller: "#main",
    scrub: true,
    trigger: "#section-8",
    pin: true,
    end: "150% top",
    autoAlpha: 0,
    ease: "none"
  }
});

tl1.to("#review-main", {
  width: "53%",
  duration: 6
}, 0)

tl1.to("#review-bottom", {
  y: "-68%",
  duration: 6
})


//SECTION-9 TEXT ANIMATION(SHOP ACCESSORIES)
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-9",
    start: `-40% top`,
    end: `60% top`,
    scrub: 1,
    scroller: `#main`,
  }
})
tl2.from("#section-9 #shop-main h1", {
  x: "-15%",
  opacity: 0,
  duration: 1,
  stagger: {
    amount: 2,
    from: "start"
  }
});
tl2.from("#section-9 #shop-main span", {
  x: "35%",
  opacity: 0,
  duration: 2,
  stagger: {
    amount: 2,
    from: "start"
  }
}, "-=3");


// SECTION-9 IMAGE REVEAL
const shopMain = document.querySelector('#shop-main');
const images = document.querySelectorAll('.images img');

gsap.utils.toArray('.accessories').forEach(category => {
  let { label } = category.dataset;
  let image = document.querySelector(`img[data-image=${label}]`);

  category.addEventListener('mousemove', e => {
    const rect = shopMain.getBoundingClientRect();
    const viewportX = e.clientX;
    const viewportY = e.clientY;

    const x = viewportX - rect.left;
    const y = viewportY - rect.top;

    gsap.to(image, {
      duration: 0.1,
      opacity: 1,
      scale: 1,
      x: x,
      y: y - 480, //
      zIndex: 1,
      xPercent: -50,
      yPercent: -50,
      ease: "none"
    });
  });
  category.addEventListener('mouseleave', () => {
    gsap.to(image, {
      duration: 0.1,
      opacity: 0,
      scale: 0.8,
      zIndex: -1,
      ease: "none"
    });
  });
});



//FOOTER
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "footer",
    start: `-100% top`,
    end: `0% top`,
    scrub: 1,
    scroller: `#main`,
  }
})

tl2.from("footer #logo-img", {
  x: "-15%",
  opacity: 0,
  duration: 1,
});

tl2.from("footer #left-up li", {
  x: "-10%",
  opacity: 0,
  duration: 2,
  stagger: {
    amount: 1,
    from: "start"
  }
});

tl2.from(".scrolling-text-item", {
  opacity: 0,
  duration: 2,
  stagger: {
    amount: 2,
    from: "start"
  }
}, "-=2");


tl2.from("footer span", {
  x: "-15%",
  opacity: 0,
  duration: 2,
  stagger: {
    amount: 1,
    from: "start"
  }
});


//SHERY.JS EFFECTS 
//SECTION-7 
Shery.hoverWithMediaCircle("#section-7", {
  images: ["image1.jpg", "image2.jpg", "image3.jpg"],
});

//FOOTER SVG
Shery.makeMagnet(".scrolling-text-container svg", {
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});





