interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({ children, onClick, type = "button", className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow ${className}`}
    >
      {children}
    </button>
  );
}