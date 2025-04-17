import React, { useState } from "react";
import { toast } from "sonner";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);
    toast.loading("⚙️ AI is processing your request...");

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("AI server error");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      toast.success("✅ AI replied successfully!");
    } catch (error) {
      console.error("AI Fetch Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, I couldn't get a response from AI right now. Please try again later or check your OpenAI usage.",
        },
      ]);
      toast.error("❌ AI failed to respond!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm">
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500 italic animate-pulse">
            AI is thinking...
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          className="bg-purple-600 text-white px-4 py-1 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
