type InputProps = {
  children?: React.ReactNode;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
};

export function Input({
  name,
  placeholder,
  type,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
    />
  );
}
