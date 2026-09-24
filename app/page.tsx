"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    
    const data = await res.json();
    setResponse(data.result || data.error);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Mojaru AI Assistant</h2>
      <form onSubmit={fetchAI} style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
        <input 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Ask something..."
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} 
          required
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 16px", cursor: "pointer", borderRadius: "4px", background: "#0070f3", color: "white", border: "none" }}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
      {response && (
        <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "15px", borderRadius: "8px", color: "black" }}>
          {response}
        </pre>
      )}
    </div>
  );
}