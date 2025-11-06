interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function Input({ value, onChange, placeholder, className }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border w-full p-3 rounded-lg bg-white ${className}`}
    />
  );
}