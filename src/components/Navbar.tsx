export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <a href="/" className="text-xl font-bold tracking-tight">
        ScanMyCar 🚗
      </a>

      <div className="space-x-4">
        <a href="/register" className="text-gray-700 hover:text-black">
          Register
        </a>
        <a href="/dashboard" className="text-gray-700 hover:text-black">
          Dashboard
        </a>
      </div>
    </nav>
  );
}