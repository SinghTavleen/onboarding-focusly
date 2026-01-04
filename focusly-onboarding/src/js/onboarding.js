import lottie from 'lottie-web';

import screen2Anim from '../animations/screen2.json';
import screen3Anim from '../animations/screen3.json';
import screen4Anim from '../animations/screen4.json';

const screens = document.querySelectorAll('.c-screen');
const bullets = document.querySelectorAll('.js-bullet');

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
    autoplay: false, 
    animationData: obj.anim,
  })
);

let currentIndex = 0; 

function updateBullets(index) {
  bullets.forEach((b, i) => {
    b.classList.toggle('is-active', i === index);
  });
}

function showScreen(index) {
  screens.forEach((s, i) => {
    s.classList.toggle('is-hidden', i !== index);
  });

  const lottieIndex = index - 1; 
  if (lottieInstances[lottieIndex]) {
    lottieInstances[lottieIndex].goToAndPlay(0, true);
  }

  updateBullets(index);
  currentIndex = index;
}

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

bullets.forEach((b) => {
  b.addEventListener('click', () => {
    const index = parseInt(b.dataset.index);
    showScreen(index);
  });
});

showScreen(0);
