import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"
            />
            <span className="text-xs text-white/60">Cargando 3D...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
