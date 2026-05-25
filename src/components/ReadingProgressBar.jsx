import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ReadingProgressBar — Electric Thunder Effect
 * A fixed golden bar at the very top that grows with scroll.
 * Features:
 *   - Neon glow (box-shadow)
 *   - Lightning bolt tip at the leading edge
 *   - Spark particles when reaching 100%
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [sparks, setSparks] = useState([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const rafRef = useRef(null);
  const sparksTimeoutRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      try {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        setProgress(pct);

        // Trigger sparks at 98%+
        if (pct >= 0.98 && !hasCompleted) {
          setHasCompleted(true);
          // Generate random spark particles
          const newSparks = Array.from({ length: 12 }, (_, i) => ({
            id: i + Date.now(),
            x: 100 + (Math.random() - 0.5) * 8, // near right edge
            y: 50 + (Math.random() - 0.5) * 30,
            size: Math.random() * 3 + 1,
            vx: (Math.random() - 0.3) * 60,
            vy: -(Math.random() * 40 + 10),
            life: 1,
            delay: Math.random() * 300,
          }));
          setSparks(newSparks);

          // Clear sparks after animation
          sparksTimeoutRef.current = setTimeout(() => {
            setSparks([]);
          }, 1200);
        }

        // Reset when scrolling back up
        if (pct < 0.95) {
          setHasCompleted(false);
          if (sparksTimeoutRef.current) clearTimeout(sparksTimeoutRef.current);
        }
      } catch {}
    });
  }, [hasCompleted]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (sparksTimeoutRef.current) clearTimeout(sparksTimeoutRef.current);
    };
  }, [handleScroll]);

  const pctWidth = `${progress * 100}%`;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none" style={{ height: '3px' }}>
      {/* Track (subtle) */}
      <div className="absolute inset-0 bg-white/[0.03]" />

      {/* Progress bar with neon glow */}
      <div
        className="absolute top-0 left-0 h-full transition-[width] duration-75 ease-out"
        style={{
          width: pctWidth,
          background: 'linear-gradient(90deg, #facc15 0%, #fde047 60%, #fff 100%)',
          boxShadow: '0 0 6px 1px rgba(250,204,21,0.6), 0 0 16px 3px rgba(250,204,21,0.25), 0 -1px 8px 1px rgba(250,204,21,0.15)',
          borderRadius: '0 1px 1px 0',
        }}
      >
        {/* Lightning tip — bright point at leading edge */}
        {progress > 0.02 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-[2px]"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 8px 3px #facc15, 0 0 16px 5px rgba(250,204,21,0.5), 0 0 30px 8px rgba(250,204,21,0.2)',
            }}
          />
        )}
      </div>

      {/* Spark particles at 100% */}
      {sparks.length > 0 && (
        <div className="absolute inset-0 overflow-visible">
          {sparks.map((spark) => (
            <SparkParticle key={spark.id} spark={spark} />
          ))}
        </div>
      )}
    </div>
  );
}

function SparkParticle({ spark }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setOpacity(0), spark.delay + 400);
    return () => clearTimeout(t);
  }, [spark.delay]);

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${spark.x}%`,
        top: `${spark.y}%`,
        width: `${spark.size}px`,
        height: `${spark.size}px`,
        background: '#facc15',
        boxShadow: '0 0 4px #facc15, 0 0 8px rgba(250,204,21,0.5)',
        opacity,
        transition: `opacity 0.4s ease ${spark.delay}ms, transform 0.6s ease-out ${spark.delay}ms`,
        transform: `translate(${spark.vx}px, ${spark.vy}px)`,
      }}
    />
  );
}
