import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border-primary hover:bg-primary/90 disabled:bg-neutral-90 disabled:text-neutral-60 disabled:border-neutral-90",
  secondary:
    "bg-neutral-98 text-neutral-60 border-neutral-90 hover:bg-primary hover:text-white hover:border-primary disabled:cursor-not-allowed",
  outline:
    "bg-transparent text-neutral-10 border-neutral-20 hover:bg-neutral-98 disabled:text-neutral-60 disabled:border-neutral-90",
  ghost:
    "bg-transparent text-neutral-50 border-transparent hover:bg-neutral-98 hover:text-neutral-10 disabled:text-neutral-60",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-1-n rounded-lg",
  md: "px-4 py-2 text-body-2 rounded-xl",
  lg: "px-6 py-4 text-headline-2 rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        border transition-colors font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
