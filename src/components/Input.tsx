import clsx from "clsx";
import React, { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx("w=full border-b pb-1 pr-3  outline-none", className)}
        {...props}
      />
    );
  }
);
