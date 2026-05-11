import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_CHAT_API_URL || "http://localhost:5000/chat";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "Astrix AI",
      text: "Hello! I’m your AI assistant. Ask me anything, and I’ll respond with clear, professional answers.",
      type: "assistant"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isLoading]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const userMsg = {
      sender: "You",
      text: trimmed,
      type: "user"
    };

    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(API_URL, { message: trimmed });
      const aiMsg = {
        sender: "Astrix AI",
        text: res.data?.reply || "I’m sorry, I couldn’t generate a response right now.",
        type: "assistant"
      };
      setChat((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = {
        sender: "Astrix AI",
        text: "Unable to reach the backend service. Please ensure the server is running.",
        type: "error"
      };
      setChat((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="subtitle">Astrix AI</p>
          <h1>Professional AI chat assistant</h1>
          <p className="header-description">
            Professional responses, polished interface, and seamless chat experience.
          </p>
        </div>
        <div className="status-pill">Online</div>
      </header>

      <section className="chat-panel">
        <div className="chat-header">
          <div>
            <p className="chat-title">Astrix AI Chat</p>
            <p className="chat-subtitle">Type a message below to begin your conversation.</p>
          </div>
        </div>

        <div className="messages" role="log" aria-live="polite">
          {chat.map((msg, index) => (
            <div key={index} className={`message-row ${msg.type === "user" ? "user" : "assistant"}`}>
              <div className={`message-bubble ${msg.type}`}>
                <div className="message-meta">
                  <span>{msg.sender}</span>
                  {msg.type === "error" && <span className="error-tag">Connection issue</span>}
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-row assistant">
              <div className="message-bubble assistant typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </section>

      <form
        className="input-panel"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <textarea
          id="chat-input"
          className="chat-input"
          placeholder="Ask a question or start a conversation..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="send-button" type="submit" disabled={!message.trim() || isLoading}>
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default App;
