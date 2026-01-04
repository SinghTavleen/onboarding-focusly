import lottie from 'lottie-web';

// JSON animaties importeren
import screen2Anim from '../animations/screen2.json';
import screen3Anim from '../animations/screen3.json';
import screen4Anim from '../animations/screen4.json';

// containers
const screens = document.querySelectorAll('.c-screen');
const bullets = document.querySelectorAll('.js-bullet');

// Lottie setup
// Let op: lottieInstances[0] = screen2Anim
const lottieContainers = [
  { el: document.querySelector('.js-screen-2'), anim: screen2Anim },
  { el: document.querySelector('.js-screen-3'), anim: screen3Anim },
  { el: document.querySelector('.js-screen-4'), anim: screen4Anim },
];

const lottieInstances = lottieContainers.map((obj) =>
  lottie.loadAnimation({
    container: obj.el,
    renderer: 'svg',
    loop: false,
    autoplay: false, // autoplay uit, start alleen op show
    animationData: obj.anim,
  })
);

let currentIndex = 0; // dit is de "screen index" op het scherm

// update bolletjes
function updateBullets(index) {
  bullets.forEach((b, i) => {
    b.classList.toggle('is-active', i === index);
  });
}

// scherm tonen
function showScreen(index) {
  screens.forEach((s, i) => {
    s.classList.toggle('is-hidden', i !== index);
  });

  // speel Lottie alleen als er een animatie is
  // screen2 = lottieInstances[0], screen3 = lottieInstances[1], etc.
  const lottieIndex = index - 1; // omdat eerste scherm geen animatie heeft
  if (lottieInstances[lottieIndex]) {
    lottieInstances[lottieIndex].goToAndPlay(0, true);
  }

  updateBullets(index);
  currentIndex = index;
}

// navigatieknoppen
document.querySelectorAll('.js-next').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentIndex < screens.length - 1) showScreen(currentIndex + 1);
  });
});

document.querySelectorAll('.js-prev').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentIndex > 0) showScreen(currentIndex - 1);
  });
});

// klik op bolletjes
bullets.forEach((b) => {
  b.addEventListener('click', () => {
    const index = parseInt(b.dataset.index);
    showScreen(index);
  });
});

// init eerste scherm tonen (zonder animatie)
showScreen(0);
