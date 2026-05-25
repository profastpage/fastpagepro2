export function Spotlight({ className = '' }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <defs>
        <filter id="blur-spotlight" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="151" />
        </filter>
      </defs>
      <ellipse
        cx="2740"
        cy="2073"
        rx="1000"
        ry="700"
        fill="white"
        fillOpacity="0.15"
        filter="url(#blur-spotlight)"
      />
    </svg>
  );
}
