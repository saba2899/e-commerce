import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx("p-3 text-center cursor-pointer rounded-md", className)}
      {...props}
    >
      {children}
    </button>
  );
}
