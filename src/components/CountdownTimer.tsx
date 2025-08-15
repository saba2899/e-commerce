import { useEffect } from "react";
import { useCountdown } from "../hooks";
import { cn } from "../utils/cn";

type CountdownTimerProps = {
  targetDate: string | Date;
  variant?: "default" | "circle" | "flashSale";
  className?: string;
  onComplete?: () => void;
};

export function CountdownTimer({
  targetDate,
  variant = "default",
  onComplete,
  className,
}: CountdownTimerProps) {
  const t = useCountdown(targetDate);

  useEffect(() => {
    if (t.isOver && onComplete) onComplete();
  }, [t.isOver, onComplete]);

  const L = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  };

  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  const wrap = cn(
    variant === "circle" && "flex gap-5 justify-center items-center",
    variant === "flashSale" && "flex flex-col gap-1",
    variant === "default" &&
    "flex gap-5 items-center justify-center text-center",
    className
  );

  const item = (label: string, value: number) => {
    const valueEl = (
      <span
        className={cn(
          "font-semibold",
          variant === "flashSale" ? "text-2xl md:text-3xl" : "text-2xl",
          "text-black"
        )}
        aria-label={`${label}: ${value}`}
      >
        {pad(value)}
      </span>
    );

    const labelEl = (
      <span
        className={cn(
          variant === "flashSale" ? "text-gray-500" : "text-black",
          variant === "flashSale"
            ? "text-xs md:text-sm"
            : "text-[10px] md:text-xs"
        )}
      >
        {label}
      </span>
    );

    return (
      <div
        key={label}
        className={cn(
          "flex flex-col items-center",
          variant === "circle" &&
          "bg-white w-20 h-20 rounded-full shadow justify-center"
        )}
      >
        {variant === "flashSale" ? (
          <>
            {labelEl}
            {valueEl}
          </>
        ) : (
          <>
            {valueEl}
            {labelEl}
          </>
        )}
      </div>
    );
  };

  // kept for default/circle layout (no separators needed). FlashSale layout renders separators inline.
  if (variant === "flashSale") {
    const units = [
      { label: L.days, value: t.days },
      { label: L.hours, value: t.hours },
      { label: L.minutes, value: t.minutes },
      { label: L.seconds, value: t.seconds },
    ];

    return (
      <div role="timer" aria-live="polite" className={wrap}>
        <div className="flex items-end gap-2 md:gap-3">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-end">
              <div className="flex flex-col items-center w-12 md:w-14">
                <span className="text-[10px] md:text-xs text-gray-500">
                  {u.label}
                </span>
                <span className="font-semibold text-2xl md:text-3xl text-black">
                  {pad(u.value)}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  className="mx-1 text-red-500 font-semibold text-lg md:text-xl self-center"
                  aria-hidden
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div role="timer" aria-live="polite" className={wrap}>
      {item(L.days, t.days)}
      {item(L.hours, t.hours)}
      {item(L.minutes, t.minutes)}
      {item(L.seconds, t.seconds)}
    </div>
  );
}
