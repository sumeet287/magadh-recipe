export function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent 
      absolute inset-0 -translate-x-full ${className}`}
    />
  );
}
