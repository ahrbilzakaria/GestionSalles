import Spline from '@splinetool/react-spline/next';

export function SplineBg() {
  return (
    <div className="absolute top-0 scale-[120%] opacity-40 left-0 w-full h-full z-0 pointer-events-none">
      <Spline scene="https://prod.spline.design/gsPW07ZawdfFXnqM/scene.splinecode" />
    </div>
  );
}