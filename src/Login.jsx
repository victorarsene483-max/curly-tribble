import { useState } from "react";
import "./Login.css"

function LoginForm({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "EB1/74360/24";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Enter your name to continue.");
      return;
    }

    if (password !== correctPassword) {
      setError("Incorrect password. Please try again.");
      return;
    }

    setError("");
    onLogin({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-brand">
          <span className="login-brand-rent">Edu</span>
          <span className="login-brand-flow">Mate</span>
        </div>

        <h1 className="login-title">Log in to your account</h1>
        <p className="login-subtitle">
          Enter your details to access your dashboard.
        </p>

        <label className="login-field">
          <span className="login-label">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="login-input"
          />
        </label>

        <label className="login-field">
          <span className="login-label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@.gmail.com"
            className="login-input"
          />
        </label>

        <label className="login-field">
          <span className="login-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="login-input"
          />
        </label>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;