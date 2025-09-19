import React, { useState } from "react";
import "./Auth.css";

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (isRegister) {
      if (!email || !password || !name) return alert("Fill all fields");
      if (users[email]) return alert("User already exists");
      users[email] = { name, password };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully! Please login");
      setIsRegister(false);
    } else {
      if (!email || !password) return alert("Fill all fields");
      if (!users[email] || users[email].password !== password)
        return alert("Invalid credentials");
      onLogin(email);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-pink" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

