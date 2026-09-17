import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Compass, BookOpen, HelpCircle, MessageSquarePlus } from "lucide-react";
import { useDashboard } from "./DashboardContext";
import "./AIAssistant.css";

const QUICK_ACTIONS = [
  { icon: HelpCircle, label: "Explain a concept", prompt: "Can you help me understand a concept I'm stuck on?" },
  { icon: BookOpen, label: "Help with assignment", prompt: "Can you help me get started on an upcoming assignment?" },
  { icon: Compass, label: "Study tips & resources", prompt: "Any study tips for managing my current workload?" },
];

function buildContext(units, assignments) {
  const upcoming = assignments
    .filter((a) => !a.completed)
    .map((a) => ({ ...a, daysLeft: getDaysUntil(a.dueDate) }))
    .filter((a) => a.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  const unitLines = units.map((u) => `- ${u.code}: ${u.name} (${u.progress}% complete)`).join("\n");
  const assignmentLines = upcoming
    .map((a) => `- ${a.title} (${a.unitCode}) — due in ${a.daysLeft} day(s)`)
    .join("\n");

  return `Units:\n${unitLines || "none yet"}\n\nUpcoming assignments:\n${assignmentLines || "none upcoming"}`;
}

function AIAssistant({ userName = "Arsene" }) {
  const { units, assignments } = useDashboard();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: buildContext(units, assignments),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError("Couldn't reach the assistant. Check your backend server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setError("");
  }

  const isIdle = messages.length === 0;

  return (
    <div className="ai-assistant-card">
      <div className="ai-header">
        <div className="ai-header-title">
          <Sparkles size={16} />
          <h3>AI Assistant</h3>
        </div>
        <button className="ai-new-chat-btn" onClick={handleNewChat}>
          New Chat
        </button>
      </div>

      {isIdle ? (
        <div className="ai-idle">
          <p className="ai-greeting">Hey {userName}! 👋</p>
          <p className="ai-subtext">How can I help you today?</p>

          <div className="ai-quick-actions">
            {QUICK_ACTIONS.map(({ icon: Icon, label, prompt }) => (
              <button
                key={label}
                className="ai-quick-action"
                onClick={() => sendMessage(prompt)}
              >
                <span className="ai-quick-action-label">
                  <Icon size={16} />
                  {label}
                </span>
                <span className="ai-quick-action-arrow">›</span>
              </button>
            ))}
          </div>

          <button className="ai-start-chat-btn" onClick={() => sendMessage("Hi! What can you help me with?")}>
            <MessageSquarePlus size={16} />
            Start a new chat
          </button>
        </div>
      ) : (
        <>
          <div className="ai-thread" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ai-bubble-${m.role}`}>
                {m.content}
              </div>
            ))}
            {isLoading && <div className="ai-bubble ai-bubble-assistant ai-bubble-loading">Thinking…</div>}
            {error && <div className="ai-error">{error}</div>}
          </div>

          <form className="ai-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="ai-send-btn" disabled={isLoading || !input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AIAssistant;