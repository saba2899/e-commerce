import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={clsx(
        className && className,
        "p-5 text-center cursor-pointer rounded-md "
      )}
    >
      {children}
    </button>
  );
}
