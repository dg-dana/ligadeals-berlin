import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'gold' | 'outline' | 'navy';
type ButtonSize = 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'bg-gold-400 text-navy-800 hover:bg-gold-300',
  outline: 'border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-navy-700',
  navy: 'bg-navy-600 text-white hover:bg-navy-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'rounded-full px-6 py-3 font-semibold',
  lg: 'rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl',
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  href,
  className = '',
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
