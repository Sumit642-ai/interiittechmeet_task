import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    
    try { 
      await login(email); 
      nav("/"); 
    } catch (e) { 
      setErr(e.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Login Form (60% width) */}
      <div className="login-form-section">
        <div className="login-form-container">
          {/* InterIIT Logo at Top */}
          <div className="interiit-logo-container">
            <img 
              src="/13th_inter_iit_tech_meet_logo.jpg" 
              alt="InterIIT Tech Meet Logo"
              className="interiit-logo"
            />
          </div>

          {/* Header */}
          <div className="login-header">
            <h1 className="login-subtitle">Start your journey</h1>
            <h2 className="login-title">Sign Up to InterIIT</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={submit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <div className="form-input-container">
                <input 
                  id="email"
                  type="email"
                  className="form-input email-input"
                  placeholder="Enter your email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <div className="form-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="form-input-container">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {err && (
              <div className="error-message">
                <p className="error-text">{err}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="signup-button"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="signin-link">
            <p className="signin-text">
              Have an account? 
              <button className="signin-button">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Natural InterIIT Logo Image */}
      <div className="login-image-section">
        <div className="login-image-bg"></div>
      </div>
    </div>
  );
}