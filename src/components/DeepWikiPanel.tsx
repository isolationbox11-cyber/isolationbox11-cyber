import React, { useState } from "react";

const wikiData = [
  {
    title: "What is IsolationBox?",
    content:
      "IsolationBox is a secure dashboard built with Next.js and Vercel, designed for easy data visualization and management."
  },
  {
    title: "How do I use the Data Table?",
    content:
      "You can search, filter, paginate, and export user data using the table above. Try typing in the search box or clicking Export CSV."
  },
  {
    title: "How do I switch to Dark Mode?",
    content:
      "Click the moon/sun button in the top right to toggle between light and dark themes."
  },
  {
    title: "What are Quick Actions?",
    content:
      "Quick Actions let you refresh data, export all, or get help instantly. Click any button to see a notification and log the action."
  },
  {
    title: "Where can I get more help?",
    content:
      "Check the official documentation or contact support for advanced topics. This panel is a quick start for beginners!"
  }
];

export default function DeepWikiPanel() {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = wikiData.filter(
    item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-10 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-200 text-center">Deep Wiki Help for Noobs</h2>
      <input
        type="text"
        placeholder="Search help topics..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:text-gray-100"
      />
      <ul className="mb-4">
        {filtered.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400">No topics found.</li>
        ) : (
          filtered.map((item, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-3 py-2 rounded mb-2 font-semibold transition-colors ${selected === idx ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
                onClick={() => setSelected(selected === idx ? null : idx)}
                aria-expanded={selected === idx}
                aria-controls={`wiki-content-${idx}`}
              >
                {item.title}
              </button>
              {selected === idx && (
                <div
                  id={`wiki-content-${idx}`}
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950 rounded animate-fade-in"
                >
                  {item.content}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">This help panel is powered by Deep Wiki. For more, ask your admin!</p>
    </div>
  );
}
