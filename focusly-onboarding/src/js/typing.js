function typeText(element, speed = 50) {
  const text = element.textContent;
  element.textContent = ''; 
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

const textElement = document.querySelector('.js-typing');

typeText(textElement, 50);
