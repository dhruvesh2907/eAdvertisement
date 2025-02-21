import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

export const Login = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to top, #1c1c1c, #623AA2, #E96479)",
      }}
    >
      <div className="card p-4 text-center shadow-lg" style={{ width: "350px", backdropFilter: "blur(10px)" }}>
        <h2 className="mb-4 text-white">Login</h2>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FaUser />
          </span>
          <input type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FaLock />
          </span>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="d-flex justify-content-between text-white">
          <div>
            <input type="checkbox" id="remember" /> <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="text-white">Forgot password?</a>
        </div>
        <button className="btn btn-light w-100 mt-3">Login</button>
        <p className="mt-3 text-white">
          Don't have an account? <a href="#" className="text-white fw-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

