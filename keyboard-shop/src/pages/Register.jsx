import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = register(fullname, email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop w-full max-w-[1440px] mx-auto min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md mt-16">
        {/* Brand Anchor */}
        <div className="text-center mb-lg">
          <Link className="font-display-lg text-display-lg tracking-tighter text-primary inline-block mb-sm" to="/">
              TACTILE LUXE
          </Link>
          <h1 className="font-headline-md text-headline-md text-on-surface">Create an Account</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Join the professional mechanical keyboard community</p>
        </div>
        
        {/* Registration Form Card */}
        <div className="bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)]">
          {error && error !== "Passwords do not match" && <div className="mb-4 text-error font-body-md text-sm text-center bg-error/10 py-2 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-sm">
            {/* Full Name */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="fullname">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">person</span>
                <input 
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-lowest border border-surface-variant rounded focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline outline-none input-glow" 
                  id="fullname" 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter your full name" 
                  required 
                  type="text"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input 
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-lowest border border-surface-variant rounded focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline outline-none input-glow" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                  type="email"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input 
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-lowest border border-surface-variant rounded focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline outline-none input-glow" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password" 
                  required 
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="confirm_password">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">lock_reset</span>
                <input 
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-lowest border border-surface-variant rounded focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline outline-none input-glow" 
                  id="confirm_password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password" 
                  required 
                  type={showPassword ? "text" : "password"}
                />
              </div>
              {error === "Passwords do not match" && (
                <p className="text-error font-body-md text-sm mt-1">Passwords do not match</p>
              )}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start mt-md">
              <div className="flex items-center h-5">
                <input className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest cyber-checkbox" id="terms" required type="checkbox"/>
              </div>
              <div className="ml-xs text-sm">
                <label className="font-body-md text-body-md text-on-surface-variant text-sm leading-tight" htmlFor="terms">
                    I agree to the <Link className="text-primary hover:underline transition-all" to="#">Terms of Service</Link> and <Link className="text-primary hover:underline transition-all" to="#">Privacy Policy</Link> of TACTILE LUXE.
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-sm">
              <button className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm py-sm px-md rounded hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(189,0,255,0.4)] transition-all duration-200 flex justify-center items-center gap-xs" type="submit">
                <span>Create Account</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            {/* Alternative Registration (Bento style divider) */}
            <div className="mt-md pt-md border-t border-surface-variant relative text-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-lowest px-sm font-label-sm text-label-sm text-outline">OR</span>
              <div className="grid grid-cols-2 gap-sm mt-sm">
                <button className="flex items-center justify-center gap-xs py-xs px-sm border border-surface-variant rounded bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface" type="button">
                  <img className="w-4 h-4" alt="Google" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA8eBVGHvBN4oBZOnwpbd6hBiSIRJnSdpiujVVJ7a7S6nPmtJcYRGQMNsgxCtC2h4TO83OEtGxVyqaSMGaAyp9lae47TPG3Zfv5AHzc41SD4-awADInkJV77rnrbJUfEMgKUOKUQ8UyEWMq8Vvtzw2WDcYQaWaWcsGXYmNGoD5L_aiT5tNAF-0dTbOSe_OG7sfwh9ZpHkMH2lzC9nD2qXIvNAPJ-uP8X1sPjmkWelDhHrjuUXQ8sTKcZPnYhRiTPkopS2gMzN9FzM"/>
                    Google
                </button>
                <button className="flex items-center justify-center gap-xs py-xs px-sm border border-surface-variant rounded bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-sm text-label-sm text-on-surface" type="button">
                  <img className="w-4 h-4" alt="Apple" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB99f9i9MSmqhr7qigQYFQM1dA2d23kPWGpT-j--g8vK8Rf76r_a6Co-CCvwQuw2C0910DInXU_-fOsYYv4iilNk_dNec-jmycMfBSTL3j9r_azqd6Bz4T_rgZtbReGWGvGfpjDzYseSqWKMm_XMkM_L_zdUmUHxICRPxt_vRnFaaqOGw03EDjSp1OU1DgpLX5_UZvNxeYKsd9LW3CUQDzyuT5QQnByd7zYxYUEaljAgBHTRoC3pn2EH5RyuQfklewr-an0HPj6NI"/>
                    Apple
                </button>
              </div>
            </div>
          </form>
          <div className="mt-md text-center">
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                Already have an account? <Link className="text-primary hover:underline font-bold transition-all" to="/login">Sign in now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
