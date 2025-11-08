export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            ScanMyCar 🚗
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Never miss an urgent notification about your parked vehicle.
            Get instant alerts when someone needs you to move your car.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Instant Notifications</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get push notifications immediately when someone scans your QR code. Never miss an alert!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Privacy Protected</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your contact info stays private. No public display of phone numbers or personal data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Easy Setup</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Register once, enable notifications, download your QR, and you're done!
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 w-full sm:w-auto text-center"
          >
            Register Your Vehicle
          </a>
          <a
            href="/dashboard"
            className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-medium shadow-sm hover:shadow-md transition-all active:scale-95 w-full sm:w-auto text-center"
          >
            View My QR Code
          </a>
        </div>

        {/* How it Works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Register & Enable Alerts</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enter your vehicle details and enable instant notifications in one simple flow
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Download & Display</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download your QR code and place it on your car's windshield
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Receive Instant Notifications</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get notified immediately when someone scans your QR code. No delays, no missed alerts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
