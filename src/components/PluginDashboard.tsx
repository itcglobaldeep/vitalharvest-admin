import React, { useState } from "react";

export default function PluginDashboard() {
  const [search, setSearch] = useState("");

  const plugins = [
    {
      name: "Voice Assistant",
      description: "Talk to AI using your mic.",
      tag: "Voice",
      icon: "🎤",
    },
    {
      name: "Text Summarizer",
      description: "Summarize long documents quickly.",
      tag: "NLP",
      icon: "📝",
    },
    {
      name: "Image Enhancer",
      description: "Improve image quality with AI.",
      tag: "Graphics",
      icon: "🖼️",
    },
  ];

  const filtered = plugins.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔌 Plugin Dashboard</h1>
      
      <input
        type="text"
        placeholder="Search plugins..."
        className="mb-6 w-full px-3 py-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((plugin) => (
          <div
            key={plugin.name}
            className="border p-4 rounded-lg shadow hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">{plugin.icon}</div>
            <h2 className="text-lg font-semibold">{plugin.name}</h2>
            <p className="text-sm text-gray-600">{plugin.description}</p>
            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {plugin.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
