export default function HomePage() {
  return (
    <div className="text-center py-24">
      <h1 className="text-5xl font-bold mb-4">ScanMyCar 🚗</h1>

      <p className="text-gray-600 max-w-lg mx-auto mb-8">
        A simple way to notify vehicle owners when their car is blocking someone.
        Register your vehicle and get your QR code.
      </p>

      <a
        href="/register"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
      >
        Register Your Vehicle
      </a>
    </div>
  );
}