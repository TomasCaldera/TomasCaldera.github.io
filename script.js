const yearElement = document.getElementById('year');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const typewordElement = document.querySelector('.hero-word[data-typewords]');

if (typewordElement) {
  const words = (typewordElement.dataset.typewords || '')
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean);

  const initialWord = typewordElement.textContent.trim();

  if (!words.includes(initialWord)) {
    words.unshift(initialWord);
  }

  if (!prefersReducedMotion.matches && words.length > 1) {
    let currentIndex = 0;
    let currentText = initialWord;
    let isDeleting = false;
    let timeoutId = null;

    const pickNextIndex = () => {
      if (words.length <= 1) {
        return currentIndex;
      }

      let nextIndex = currentIndex;

      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * words.length);
      }

      return nextIndex;
    };

    const tick = () => {
      const targetWord = words[currentIndex];

      if (!isDeleting && currentText === targetWord) {
        typewordElement.classList.add('is-paused');
        timeoutId = window.setTimeout(() => {
          typewordElement.classList.remove('is-paused');
          typewordElement.classList.add('is-erasing');
          isDeleting = true;
          tick();
        }, 1300 + Math.random() * 900);
        return;
      }

      if (isDeleting && currentText.length === 0) {
        typewordElement.classList.remove('is-erasing');
        currentIndex = pickNextIndex();
        isDeleting = false;
      }

      const nextTarget = words[currentIndex];

      if (isDeleting) {
        currentText = currentText.slice(0, -1);
      } else {
        currentText = nextTarget.slice(0, currentText.length + 1);
      }

      typewordElement.textContent = currentText;

      const delay = isDeleting
        ? 42 + Math.random() * 36
        : 58 + Math.random() * 52;

      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, 1000);

    window.addEventListener('beforeunload', () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    });
  }
}

const parallaxRoot = document.querySelector('[data-parallax-root]');

if (parallaxRoot && !prefersReducedMotion.matches) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const orbitScene = parallaxRoot.querySelector('.system-orbit');
  const parallaxItems = parallaxRoot.querySelectorAll('[data-parallax-depth]');

  parallaxItems.forEach((item) => {
    const depth = Number.parseFloat(item.dataset.parallaxDepth || '0');
    item.style.setProperty('--parallax-depth', String(depth));
  });

  let pointerX = 0;
  let pointerY = 0;
  let scrollY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;
  let rafId = null;

  const renderParallax = () => {
    const targetX = pointerX;
    const targetY = pointerY + scrollY;
    const targetTiltX = clamp(pointerX * 0.32, -8, 8);
    const targetTiltY = clamp(pointerY * -0.36, -8, 8);

    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    currentTiltX += (targetTiltX - currentTiltX) * 0.1;
    currentTiltY += (targetTiltY - currentTiltY) * 0.1;

    parallaxRoot.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
    parallaxRoot.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);
    parallaxRoot.style.setProperty('--tilt-x', `${currentTiltX.toFixed(2)}deg`);
    parallaxRoot.style.setProperty('--tilt-y', `${currentTiltY.toFixed(2)}deg`);

    const stillMoving =
      Math.abs(targetX - currentX) > 0.08 ||
      Math.abs(targetY - currentY) > 0.08 ||
      Math.abs(targetTiltX - currentTiltX) > 0.06 ||
      Math.abs(targetTiltY - currentTiltY) > 0.06;

    if (stillMoving) {
      rafId = window.requestAnimationFrame(renderParallax);
    } else {
      rafId = null;
    }
  };

  const queueRender = () => {
    if (!rafId) {
      rafId = window.requestAnimationFrame(renderParallax);
    }
  };

  const updateFromPointer = (event) => {
    const rect = parallaxRoot.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX = clamp(relativeX * 64, -32, 32);
    pointerY = clamp(relativeY * 52, -26, 26);
    parallaxRoot.style.setProperty('--glow-x', `${((relativeX + 0.5) * 100).toFixed(2)}%`);
    parallaxRoot.style.setProperty('--glow-y', `${((relativeY + 0.5) * 100).toFixed(2)}%`);
    parallaxRoot.classList.add('is-active');
    orbitScene?.classList.add('is-active');
    queueRender();
  };

  const updateFromScroll = () => {
    const rect = parallaxRoot.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
    const normalized = clamp(centerOffset / viewportHeight, -1, 1);

    scrollY = clamp(normalized * -4, -4, 4);
    queueRender();
  };

  parallaxRoot.addEventListener('pointermove', updateFromPointer);
  parallaxRoot.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
    parallaxRoot.classList.remove('is-active');
    orbitScene?.classList.remove('is-active');
    queueRender();
  });

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();
}
