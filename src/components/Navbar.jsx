import React, { useState, useEffect } from "react";
import logo from "../assets/logoo.png";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

export default function Navbar({ currentUser, setCurrentUser }) {
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    alert("Logged out successfully!");
  };

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!email || !password) return alert("Fill all fields");
    if (!users[email] || users[email].password !== password)
      return alert("Invalid credentials");

    localStorage.setItem("currentUser", email);
    setCurrentUser(email);

    alert("Logged in successfully!");
    const modalEl = document.getElementById("loginModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  // Register function
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (!name || !email || !password || !confirmPassword) return alert("Fill all fields");
    if (password !== confirmPassword) return alert("Passwords do not match");

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) return alert("User already exists");

    users[email] = { name, password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully! Please login!");
    const modalEl = document.getElementById("registerModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient-pink fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="HerWellness Logo" height="80px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2"><Link className="nav-link" to="/home">Home</Link></li>
              <li className="nav-item mx-2"><Link className="nav-link" to="/today">Today</Link></li>
              <li className="nav-item mx-2"><Link className="nav-link" to="/insights">Insights</Link></li>
              <li className="nav-item mx-2"><Link className="nav-link" to="/calendar">Calendar</Link></li>
              <li className="nav-item mx-2"><Link className="nav-link" to="/chat">Chat</Link></li> {/* ✅ New Chat link */}
              <li className="nav-item mx-2">
                {currentUser ? (
                  <button className="btn btn-pink" onClick={handleLogout}>Logout</button>
                ) : (
                  <button className="btn btn-pink" data-bs-toggle="modal" data-bs-target="#loginModal">
                    Log In
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title">Log In</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-pink w-100">Login</button>
              </form>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              <small>
                Don’t have an account?{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal" data-bs-dismiss="modal">Register</a>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title">Register</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Create password" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Confirm password" />
                </div>
                <button type="submit" className="btn btn-pink w-100">Register</button>
              </form>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              <small>
                Already have an account?{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Login</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
