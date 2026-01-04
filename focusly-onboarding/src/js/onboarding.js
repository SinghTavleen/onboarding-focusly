import lottie from 'lottie-web';

// JSON animaties importeren
import screen1Anim from '../animations/screen1.json';
import screen2Anim from '../animations/screen2.json';
import screen3Anim from '../animations/screen3.json';
import screen4Anim from '../animations/screen4.json';
import screen5Anim from '../animations/screen5.json';

// containers
const screens = document.querySelectorAll('.c-screen');
const bullets = document.querySelectorAll('.js-bullet');

// Lottie setup
const lottieContainers = [
  { el: document.querySelector('.js-screen-1'), anim: screen1Anim },
  { el: document.querySelector('.js-screen-2'), anim: screen2Anim },
  { el: document.querySelector('.js-screen-3'), anim: screen3Anim },
  { el: document.querySelector('.js-screen-4'), anim: screen4Anim },
  { el: document.querySelector('.js-screen-5'), anim: screen5Anim },
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

// functie om bolletjes te updaten
function updateBullets(index) {
  bullets.forEach((b, i) => {
    b.classList.toggle('is-active', i === index);
  });
}

// functie om scherm te tonen
function showScreen(index) {
  screens.forEach((s, i) => {
    s.classList.toggle('is-hidden', i !== index);
  });

  // speel animatie
  lottieInstances[index].goToAndPlay(0, true);

  // update bolletjes
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

// init eerste scherm
showScreen(0);
