export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex justify-between items-center transition-colors">
      <a href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        ScanMyCar 🚗
      </a>

      <div className="flex gap-6">
        <a href="/register" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
          Register
        </a>
        <a href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
          Dashboard
        </a>
      </div>
    </nav>
  );
}
