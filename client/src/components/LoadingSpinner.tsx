import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
  animation?: 'pulse' | 'wave';
}

export default function Skeleton({
  variant = 'text',
  width = '100%',
  height = '1rem',
  count = 1,
  className = '',
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = `bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 ${className}`;
  
  const animationClass = animation === 'pulse' 
    ? 'animate-pulse' 
    : 'animate-shimmer';

  const variantClasses = {
    text: `${baseClasses} rounded h-[${height}]`,
    circular: `${baseClasses} rounded-full`,
    rectangular: `${baseClasses} rounded`,
    card: `${baseClasses} rounded-lg p-4 space-y-3`,
    avatar: `${baseClasses} rounded-full w-[${width}] h-[${height}]`,
  };

  const skeletons = Array.from({ length: count }).map((_, idx) => (
    <div
      key={idx}
      className={`${variantClasses[variant]} ${animationClass}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  ));

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} ${animationClass} rounded-lg p-4 space-y-3`}>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
        <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
        <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
      </div>
    );
  }

  return count === 1 ? skeletons[0] : <div className="space-y-2">{skeletons}</div>;
}
