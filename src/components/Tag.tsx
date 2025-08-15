type TagProps = {
  children: string;
  variant?: "red" | "green" | "gray";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  className?: string;
};

export function Tag({
  children,
  variant = "red",
  size = "md",
  icon,
  className,
}: TagProps) {
  const base = "inline-flex items-center gap-2";
  const color =
    variant === "red"
      ? "text-red-600"
      : variant === "green"
        ? "text-green-600"
        : "text-gray-600";

  const dot =
    variant === "red"
      ? "bg-red-600"
      : variant === "green"
        ? "bg-green-600"
        : "bg-gray-400";
  const height = size === "sm" ? "h-8 w-4" : "h-10 w-4";

  return (
    <div className={`${base} ${className ?? ""}`}>
      <div className={`${dot}  ${height} rounded-sm`} aria-hidden />
      <h1 className={`${color}`}>{children}</h1>
      {icon}
    </div>
  );
}
