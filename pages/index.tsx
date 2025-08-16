
import { useState } from "react";
import DataTable from "@/components/DataTable";
import UserChart from "@/components/UserChart";

import DeepWikiPanel from "@/components/DeepWikiPanel";

export default function Home() {
  const [notification, setNotification] = useState<string | null>(null);
  const [activity, setActivity] = useState<string[]>(["Dashboard loaded", "User data fetched"]);

  // Demo quick actions
  const handleQuickAction = (action: string) => {
    setNotification(`Action: ${action} completed!`);
    setActivity(prev => [action, ...prev].slice(0, 5));
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 px-2 sm:px-6 lg:px-8 flex flex-col items-center transition-colors duration-300">
      <DarkModeToggle />
      <div className="w-full max-w-5xl py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center text-blue-700 dark:text-blue-300 drop-shadow">IsolationBox Dashboard</h1>
        <p className="mb-6 text-center text-base sm:text-lg text-gray-700 dark:text-gray-200">Your Next.js & Vercel project is now deployed successfully!</p>

        {/* Notifications */}
        {notification && (
          <div className="mb-4 px-4 py-2 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 shadow text-center animate-bounce">
            {notification}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
            onClick={() => handleQuickAction("Refresh Data")}
          >
            🔄 Refresh Data
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow"
            onClick={() => handleQuickAction("Export All")}
          >
            📤 Export All
          </button>
          <button
            className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow"
            onClick={() => handleQuickAction("Show Help")}
          >
            ❓ Help
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-200">User Data Table</h2>
            <div className="overflow-x-auto">
              <DataTable />
            </div>
          </section>
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-200">User Chart</h2>
            <div className="w-full h-72">
              <UserChart />
            </div>
          </section>
        </div>

        {/* Deep Wiki Help Panel for Noobs */}
        <DeepWikiPanel />

        {/* Recent Activity */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Recent Activity</h3>
          <ul className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-sm text-gray-700 dark:text-gray-200">
            {activity.map((act, i) => (
              <li key={i} className="mb-1">• {act}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}