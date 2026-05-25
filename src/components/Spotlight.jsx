import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * Interactive Spotlight — inspired by 21st.dev/serafimcloud/splite
 * Mouse-following radial gradient using framer-motion springs.
 * Attaches to the nearest positioned parent and tracks the cursor.
 *
 * Props:
 *   size        - diameter of the primary spotlight circle (px)
 *   color       - primary radial gradient color (golden by default)
 *   color2      - secondary tighter glow color
 *   springConfig - framer-motion spring options
 */
export function Spotlight({
  className = '',
  size = 600,
  color = 'rgba(250,204,21,0.07)',
  color2 = 'rgba(255,255,255,0.04)',
  springConfig = { bounce: 0, stiffness: 150, damping: 25 },
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const size2 = size * 0.6;

  // Primary spotlight position
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);
  // Secondary spotlight position (smaller, tighter)
  const spot2Left = useTransform(mouseX, (x) => `${x - size2 / 2}px`);
  const spot2Top = useTransform(mouseY, (y) => `${y - size2 / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        if (!parent.style.position || parent.style.position === 'static') {
          parent.style.position = 'relative';
        }
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      const clientX = event.clientX ?? (event.touches?.[0]?.clientX ?? 0);
      const clientY = event.clientY ?? (event.touches?.[0]?.clientY ?? 0);
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentElement.addEventListener('touchmove', handleMouseMove, { passive: true });
    parentElement.addEventListener('mouseenter', onEnter);
    parentElement.addEventListener('mouseleave', onLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('touchmove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', onEnter);
      parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <>
      {/* Primary golden spotlight — large, soft */}
      <motion.div
        ref={containerRef}
        className={`pointer-events-none absolute rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{
          width: size,
          height: size,
          left: spotlightLeft,
          top: spotlightTop,
          background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          mixBlendMode: 'screen',
          filter: 'blur(40px)',
        }}
      />
      {/* Secondary white spotlight — smaller, tighter */}
      <motion.div
        className={`pointer-events-none absolute rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{
          width: size2,
          height: size2,
          left: spot2Left,
          top: spot2Top,
          background: `radial-gradient(circle at center, ${color2}, transparent 70%)`,
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
        }}
      />
    </>
  );
}

/**
 * Static SVG Spotlight (legacy — used for decorative animated glow)
 */
export function StaticSpotlight({ className = '', fill = 'white' }) {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}
