import React, { useState } from "react";
import { toast } from "sonner";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceMic() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");

  const startListening = () => {
    if (!SpeechRecognition) {
      toast.error("⚠️ Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      toast("🎙️ Listening...");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setListening(false);
      toast.loading("🤖 AI is thinking...");

      // Send to AI
      const aiReply = await sendToAI(transcript);
      setReply(aiReply);
    };

    recognition.onerror = (event) => {
      console.error("Mic error:", event.error);
      toast.error("⚠️ Mic error: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const sendToAI = async (message: string) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No reply from AI.";
    } catch (error) {
      console.error("AI error:", error);
      return <div>⚠️ MicInput component loaded! (You can customize this UI)</div>;
    }
  };

  return <div>✅ MicInput component loaded! (You can customize this UI)</div>;
}
