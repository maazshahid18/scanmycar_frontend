export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Changed max-w-4xl to max-w-6xl for better desktop spacing */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            ScanMyCar 🚗
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Never miss an urgent notification about your parked vehicle.
            Get instant alerts when someone needs you to move your car.
          </p>
          
          {/* CTA Buttons moved here for better flow, adjusted padding/width */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href="/register"
              className="w-full sm:w-auto inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 text-center"
            >
              Register Your Vehicle
            </a>
            <a
              href="/dashboard"
              className="w-full sm:w-auto inline-block bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 px-8 py-4 rounded-xl text-lg font-medium shadow-sm hover:shadow-md transition-all active:scale-95 text-center"
            >
              View My QR Code
            </a>
          </div>
        </div>

        {/* Features Grid - Added hover effects and better spacing */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="text-5xl mb-6">🔔</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Instant Notifications</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Get push notifications immediately when someone scans your QR code. Never miss an alert!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="text-5xl mb-6">🔒</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Privacy Protected</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your contact info stays private. No public display of phone numbers or personal data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Easy Setup</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Register once, enable notifications, download your QR, and you're done!
            </p>
          </div>
        </div>

        {/* How it Works - Refactored for Desktop Grid */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            How It Works
          </h2>
          
          {/* Changed from space-y-6 to a Grid on Desktop */}
          <div className="grid md:grid-cols-3 gap-10 relative">
            
            {/* Connector Line (Desktop Only) - Visual flair */}
            <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

            {/* Step 1 */}
            <div className="flex md:flex-col gap-4 items-start md:items-center">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg ring-4 ring-white dark:ring-gray-900">
                1
              </div>
              <div className="md:text-center">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Register & Enable Alerts</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Enter your vehicle details and enable instant notifications in one simple flow.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex md:flex-col gap-4 items-start md:items-center">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg ring-4 ring-white dark:ring-gray-900">
                2
              </div>
              <div className="md:text-center">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Download & Display</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Download your QR code and place it on your car's windshield.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex md:flex-col gap-4 items-start md:items-center">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg ring-4 ring-white dark:ring-gray-900">
                3
              </div>
              <div className="md:text-center">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Get Notified</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Get notified immediately when someone scans your QR code. No delays!
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}