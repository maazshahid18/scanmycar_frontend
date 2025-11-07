export default function HomePage() {
  return (
    <div className="text-center py-24 px-4">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">ScanMyCar 🚗</h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
        A simple way to notify vehicle owners when their car is blocking someone.
        Register your vehicle and get your QR code.
      </p>

      <a
        href="/register"
        className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        Register Your Vehicle
      </a>
    </div>
  );
}
