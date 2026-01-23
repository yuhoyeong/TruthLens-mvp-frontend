import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "ghost";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseStyles =
      "w-full text-body-1-r text-neutral-10 placeholder:text-neutral-60 outline-none";

    const variantStyles = {
      default: "bg-white rounded-2xl border border-neutral-90 p-6",
      ghost: "bg-transparent",
    };

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
