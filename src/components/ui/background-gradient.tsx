import React from "react";

export function BackgroundGradient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute z-[-2] h-full w-full transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(255,237,213,.5)_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff1_0%,#ff620a05_50%,#fff1_100%)]" />
      </div>
      {children}
    </div>
  );
}
