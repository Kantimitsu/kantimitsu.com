'use client';

import { useEffect, useRef } from 'react';

const TARGET_SELECTOR = [
  'h1',
  'h2',
  'h3',
  '.brand',
  '.button',
  '.terminal-panel',
  '.terminal-visual',
  '.project-card',
  '.service-item',
  '.process-list li',
  '.preview-strip > *',
].join(',');

const FIELD_RADIUS = 230;
const MAX_PULL = 11;

export function MagneticDeflection() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    if (reducedMotion.matches || coarsePointer.matches) return;

    const screen = document.querySelector<HTMLElement>('.site-shell');
    const field = fieldRef.current;
    if (!screen || !field) return;

    const targets = Array.from(screen.querySelectorAll<HTMLElement>(TARGET_SELECTOR));
    targets.forEach((target) => target.classList.add('crt-magnetic-target'));

    let frame = 0;
    let pointerX = -500;
    let pointerY = -500;

    const render = () => {
      frame = 0;
      const normalX = pointerX / window.innerWidth - 0.5;
      const normalY = pointerY / window.innerHeight - 0.5;

      screen.style.setProperty('--screen-pull-x', `${normalX * 3.2}px`);
      screen.style.setProperty('--screen-pull-y', `${normalY * 2.2}px`);
      screen.style.setProperty('--magnet-origin-x', `${pointerX}px`);
      screen.style.setProperty('--magnet-origin-y', `${pointerY}px`);
      screen.style.setProperty('--screen-warp-x', `${normalY * -0.7}deg`);
      screen.style.setProperty('--screen-warp-y', `${normalX * 0.85}deg`);
      screen.style.setProperty('--screen-warp-skew', `${normalX * 0.22}deg`);
      screen.style.setProperty('--screen-warp-scale', '1.003');
      field.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;

      for (const target of targets) {
        const box = target.getBoundingClientRect();
        const dx = pointerX - (box.left + box.width / 2);
        const dy = pointerY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance >= FIELD_RADIUS || distance === 0) {
          target.style.setProperty('--magnetic-pull-x', '0px');
          target.style.setProperty('--magnetic-pull-y', '0px');
          target.style.setProperty('--magnetic-scale', '1');
          target.style.setProperty('--magnetic-rotate', '0deg');
          continue;
        }

        const strength = Math.pow(1 - distance / FIELD_RADIUS, 2);
        target.style.setProperty('--magnetic-pull-x', `${(dx / distance) * strength * MAX_PULL}px`);
        target.style.setProperty('--magnetic-pull-y', `${(dy / distance) * strength * MAX_PULL}px`);
        target.style.setProperty('--magnetic-scale', `${1 + strength * 0.022}`);
        target.style.setProperty('--magnetic-rotate', `${(dx / FIELD_RADIUS) * strength * 0.9}deg`);
      }
    };

    const queueRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      field.dataset.active = 'true';
      queueRender();
    };

    const releaseField = () => {
      field.dataset.active = 'false';
      screen.style.setProperty('--screen-pull-x', '0px');
      screen.style.setProperty('--screen-pull-y', '0px');
      screen.style.setProperty('--screen-warp-x', '0deg');
      screen.style.setProperty('--screen-warp-y', '0deg');
      screen.style.setProperty('--screen-warp-skew', '0deg');
      screen.style.setProperty('--screen-warp-scale', '1');
      targets.forEach((target) => {
        target.style.setProperty('--magnetic-pull-x', '0px');
        target.style.setProperty('--magnetic-pull-y', '0px');
        target.style.setProperty('--magnetic-scale', '1');
        target.style.setProperty('--magnetic-rotate', '0deg');
      });
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) releaseField();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
      if (frame) window.cancelAnimationFrame(frame);
      targets.forEach((target) => target.classList.remove('crt-magnetic-target'));
    };
  }, []);

  return <div ref={fieldRef} className="magnetic-field" aria-hidden="true" />;
}
