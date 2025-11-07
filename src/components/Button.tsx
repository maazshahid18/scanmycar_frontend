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
      className={`bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 font-medium ${className}`}
    >
      {children}
    </button>
  );
}
