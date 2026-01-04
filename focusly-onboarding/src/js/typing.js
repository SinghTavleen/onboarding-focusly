function typeText(element, speed = 50) {
  const text = element.textContent;
  element.textContent = ''; // eerst leeg maken
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Selecteer je element
const textElement = document.querySelector('.js-typing');

// Trigger de animatie bijvoorbeeld meteen:
typeText(textElement, 50); // 50ms per letter
