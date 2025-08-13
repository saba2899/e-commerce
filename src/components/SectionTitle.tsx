import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

type Props<T extends ElementType = "h2"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};
export default function SectionTitle<T extends ElementType = "h2">({
  as,
  children,
  className,
}: Props<T>) {
  const Comp = (as || "h2") as ElementType;
  return (
    <Comp
      className={cn("font-semibold text-3xl md:text-4xl text-black", className)}
    >
      {children}
    </Comp>
  );
}
