import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRef, useEffect, useState } from "react";

export default function Layout() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Add a slight delay so React Router can update the "active" class on NavLink
    const timeoutId = setTimeout(() => {
      if (navRef.current) {
        const activeElement = navRef.current.querySelector('.active');
        if (activeElement) {
          setIndicatorStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
            opacity: 1
          });
        } else {
          setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
      }
    }, 50);

    // Also handle window resize to re-calculate indicator position
    const handleResize = () => {
      if (navRef.current) {
        const activeElement = navRef.current.querySelector('.active');
        if (activeElement) {
          setIndicatorStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
            opacity: 1
          });
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);
  
  const getNavClass = ({ isActive }) => {
    const baseClass = "font-button text-button uppercase tracking-wider px-2 py-1 rounded whitespace-nowrap transition-colors";
    return isActive 
      ? `${baseClass} text-primary active`
      : `${baseClass} text-on-surface hover:text-primary hover:backdrop-blur-2xl hover:bg-surface-dim/30`;
  };

  return (
    <div className="antialiased font-body-md text-body-md">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-headline-md font-bold tracking-tighter text-primary">
            TACTILE LUXE
          </Link>
          <div className="hidden md:flex gap-6 items-center relative" ref={navRef}>
            <NavLink to="/" className={getNavClass} end>Home</NavLink>
            <NavLink to="/products" className={getNavClass}>Keyboards</NavLink>
            <NavLink to="/keycaps" className={getNavClass}>Keycaps</NavLink>
            <NavLink to="/switches" className={getNavClass}>Switches</NavLink>
            <NavLink to="/accessories" className={getNavClass}>Accessories</NavLink>
            <NavLink to="/news" className={getNavClass}>News</NavLink>
            
            {/* Sliding Underline Indicator */}
            <div 
              className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out pointer-events-none rounded-full"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </button>
            <Link to="/cart" aria-label="Shopping Cart" className="text-on-surface hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-label-mono text-xs font-bold text-primary">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </span>
                <button onClick={logout} className="text-on-surface hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-[20px]" title="Logout">logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" aria-label="Account" className="text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full pt-24 pb-12 border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="col-span-1 md:col-span-1 mb-8 md:mb-0">
            <div className="font-display-lg text-headline-md font-extrabold text-primary mb-4">TACTILE LUXE</div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              © 2024 TACTILE LUXE. ENGINEERED FOR PRECISION.
            </p>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-wrap justify-start md:justify-end gap-6 md:gap-12">
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors transition-opacity duration-200" to="#">Support</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors transition-opacity duration-200" to="#">Shipping</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors transition-opacity duration-200" to="/feedback">Feedback</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors transition-opacity duration-200" to="#">Contact</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors transition-opacity duration-200" to="#">Community</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
