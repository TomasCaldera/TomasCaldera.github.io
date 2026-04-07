const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const parallaxRoot = document.querySelector('[data-parallax-root]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
    parallaxRoot.style.setProperty('--glow-x', '50%');
    parallaxRoot.style.setProperty('--glow-y', '50%');
    parallaxRoot.classList.remove('is-active');
    orbitScene?.classList.remove('is-active');
    queueRender();
  });

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();
}
