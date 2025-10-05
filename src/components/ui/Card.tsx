import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'organic' | 'elevated';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = false,
  className = '',
  onClick,
}) => {
  const baseClasses = 'transition-organic';

  const variantClasses = {
    default: 'bg-white rounded-2xl shadow-md border border-neutral-200',
    glass: 'glass-card rounded-2xl',
    organic: 'bg-white organic-shape shadow-lg border border-neutral-100',
    elevated: 'bg-white rounded-2xl shadow-xl border border-neutral-100',
  };

  const hoverClasses = hover ? 'hover-lift cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
