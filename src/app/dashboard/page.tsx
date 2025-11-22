import DashboardWidgets from "@/components/DashboardWidgets";
import AlertsList from "@/components/AlertsList";

export default function Dashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-md mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Your vehicle alerts, history, and settings will appear here.
        </p>
        <div className="mt-8">
          <a
            href="/find"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find My QR Code
          </a>
        </div>
      </div>

      <DashboardWidgets />
      <AlertsList />
    </div>
  );
}