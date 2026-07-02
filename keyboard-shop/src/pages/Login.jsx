import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden min-h-[calc(100vh-200px)]">
      {/* Abstract Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-primary-fixed-dim/20 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[50%] rounded-full bg-tertiary-fixed-dim/20 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>
      
      {/* Login Container */}
      <div className="glass-panel w-full max-w-md rounded-xl p-lg relative z-10 shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="text-center mb-lg">
          <Link to="/" className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-primary mb-sm block">TACTILE LUXE</Link>
          <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your precision workspace.</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-gutter">
          {error && <div className="text-error font-body-md text-sm text-center bg-error/10 py-2 rounded">{error}</div>}
          
          {/* Email Input */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs" htmlFor="email">EMAIL ADDRESS</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>mail</span>
              </span>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg py-sm pl-xl pr-sm font-body-md text-body-md input-glow transition-all" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                required 
                type="email"
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-xs">
              <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">PASSWORD</label>
              <Link className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors underline-offset-4 hover:underline" to="#">Forgot password?</Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>lock</span>
              </span>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg py-sm pl-xl pr-sm font-body-md text-body-md input-glow transition-all" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
                type="password"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-sm">
            <button className="w-full btn-primary rounded-lg py-sm px-md font-headline-md text-headline-md flex justify-center items-center gap-2" type="submit">
              Sign In
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>arrow_forward</span>
            </button>
          </div>
          
          {/* Register Link */}
          <div className="text-center pt-md border-t border-outline-variant/50">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don't have an account? 
              <Link className="font-headline-md text-[16px] text-primary hover:text-primary-fixed-dim transition-colors underline underline-offset-4 ml-2" to="/register">Create new account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
