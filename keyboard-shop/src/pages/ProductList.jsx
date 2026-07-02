import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Onyx 65 Pro",
    specs: "CNC Aluminum • Hot-swappable • Tactile",
    price: 320.00,
    mount: "Gasket Mount",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxJYBKsVhq-QPIWtbaI_uHabU51YF8fN-PkIWa4qAZhOMCjZ6onz0fBiVZWzoaWciU5UwgoNgoVWwZZA9-cBkIiyhcgCLBbrg2hHRLYtsoO7OyqldCeAfZb-sUdY4q3DO4L-FipxDlpRML0PWlI6k0Vz4lASA6zHQgg7-EgRVAC884Horf2SZHEjLaTORb8yVd7TCyieNOjIcd79U3fIpCNVwCsa1YzE_wiZyBOfewrbtkGWsAHQopFJD7EFq7-6stxLzujKDTwdw",
    status: "In Stock",
    size: "65%",
    switchType: "Tactile",
    material: "Machined Aluminum"
  },
  {
    id: 2,
    name: "Glacier 60",
    specs: "Frosted PC • Hot-swappable • Linear",
    price: 280.00,
    mount: "Polycarbonate",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTezUOidlY6Qju3W53leMwOrReZyKe47--EP4EQRnG9aUPslNQhJupuEbgd6usuq40FoOsb4mSfHG9--W1tsN3-7c7vFH0UT2clBCE0gdVOcNVVKWLznv8JSxMzVwVpfiaI8NhqU1qjRWnNkl3nbMMeDyL2QI3yk-ug5Ap_mbootWEzQFiE66f-NXtw8slnt9ToDxa4ObupQ13UDftOHx44iPPhcWNc2Rce20RAiv7rBGTbX_JnRS6eKPU7KqiG5HBx-fMp6hMYAA",
    status: "In Stock",
    size: "60%",
    switchType: "Linear",
    material: "Polycarbonate"
  },
  {
    id: 3,
    name: "Specter TKL",
    specs: "CNC Aluminum • Top Mount • Tactile",
    price: 390.00,
    mount: "Top Mount",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfnJ1U-9fEAveMXQy0se07PWLYkqsyEYdHj3BaZxRSfbhLntEw8dh3rvFH82fvBLsH-t4joB2zkeo_ERUF5YHcRZ0CFtwPhB2XAGF0lsNiZf2PoXyaKW-Q2Qdd_OOr77tJXItgtm3tkhQ5WpUeh1-Xm78wTZhBwqKN9ZsZAx2GUhuIBiO-Nw6-eehee__5pGDsibygliuq3OWMuJ0U4DVqiH81CKxkMIaUXuOy3_S9-JtzrPWLc6_BPp0xTQzBzzPjxqYMJXFIL0",
    status: "Ships in 2 weeks",
    size: "TKL",
    switchType: "Tactile",
    material: "Machined Aluminum"
  }
];

export default function ProductList() {
  const absoluteMin = 50;
  const absoluteMax = 600;
  const [minPrice, setMinPrice] = useState(150);
  const [maxPrice, setMaxPrice] = useState(450);
  const [notifications, setNotifications] = useState([]);
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("Featured");
  
  const [filters, setFilters] = useState({
    sizes: [],
    switchTypes: [],
    materials: [],
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  const handleClearAll = () => {
    setFilters({ sizes: [], switchTypes: [], materials: [] });
    setMinPrice(absoluteMin);
    setMaxPrice(absoluteMax);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    const notifId = Date.now() + Math.random();
    setNotifications((prev) => [{ id: notifId }, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    }, 3000);
  };

  // Calculate visual boundaries to prevent CSS layout breaks when user types out of bounds
  const visualMin = Math.max(absoluteMin, Math.min(Number(minPrice) || 0, absoluteMax));
  const visualMax = Math.max(visualMin, Math.min(Number(maxPrice) || 0, absoluteMax));
  const leftPercent = ((visualMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
  const rightPercent = 100 - ((visualMax - absoluteMin) / (absoluteMax - absoluteMin)) * 100;

  // Process products
  const filteredProducts = products.filter(product => {
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (filters.sizes.length > 0 && !filters.sizes.includes(product.size)) return false;
    if (filters.switchTypes.length > 0 && !filters.switchTypes.includes(product.switchType)) return false;
    if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Newest Arrivals") return b.id - a.id;
    return 0; // "Featured"
  });

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 flex flex-col md:flex-row gap-gutter">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-8 glass-panel p-6 rounded-lg self-start sticky top-[104px]">
        <div className="flex items-center justify-between border-b border-outline-variant/50 pb-4 mb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Filters</h2>
          <button onClick={handleClearAll} className="text-primary hover:text-primary-fixed-dim font-button text-button uppercase tracking-wider transition-colors">Clear All</button>
        </div>
        
        {/* Size Filter */}
        <div className="space-y-3">
          <h3 className="font-headline-md text-body-lg font-semibold text-on-surface">Size</h3>
          <div className="flex flex-col space-y-2">
            {["60%", "65%", "TKL", "Full Size"].map(size => (
              <label key={size} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  className="cyber-checkbox" 
                  type="checkbox" 
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleFilter("sizes", size)}
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Switch Type Filter */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/50">
          <h3 className="font-headline-md text-body-lg font-semibold text-on-surface">Switch Type</h3>
          <div className="flex flex-col space-y-2">
            {["Linear", "Tactile", "Clicky"].map(type => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  className="cyber-checkbox" 
                  type="checkbox" 
                  checked={filters.switchTypes.includes(type)}
                  onChange={() => toggleFilter("switchTypes", type)}
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Material Filter */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/50">
          <h3 className="font-headline-md text-body-lg font-semibold text-on-surface">Material</h3>
          <div className="flex flex-col space-y-2">
            {["Machined Aluminum", "Polycarbonate"].map(material => (
              <label key={material} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  className="cyber-checkbox" 
                  type="checkbox" 
                  checked={filters.materials.includes(material)}
                  onChange={() => toggleFilter("materials", material)}
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{material}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/50">
          <h3 className="font-headline-md text-body-lg font-semibold text-on-surface">
            Price Range
          </h3>
          <div className="relative pt-4 pb-2 h-10">
            {/* Track Background */}
            <div className="absolute top-5 left-0 w-full h-[4px] bg-outline-variant rounded-full z-0 overflow-hidden"></div>
            {/* Highlighted Track */}
            <div className="absolute top-5 h-[4px] bg-primary rounded-full z-10" style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}></div>
            {/* Min Range Slider */}
            <input 
              className="absolute top-5 w-full appearance-none bg-transparent pointer-events-none cyber-range-dual z-20" 
              max={absoluteMax} 
              min={absoluteMin} 
              type="range" 
              value={minPrice}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), maxPrice - 10);
                setMinPrice(value);
              }}
            />
            {/* Max Range Slider */}
            <input 
              className="absolute top-5 w-full appearance-none bg-transparent pointer-events-none cyber-range-dual z-20" 
              max={absoluteMax} 
              min={absoluteMin} 
              type="range" 
              value={maxPrice}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), minPrice + 10);
                setMaxPrice(value);
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container w-full h-10 px-3 overflow-hidden focus-within:border-primary transition-colors">
              <span className="text-on-surface-variant font-label-mono mr-1">$</span>
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value) || 0)} onBlur={() => setMinPrice(Math.max(absoluteMin, Math.min(minPrice, maxPrice - 10)))} className="w-full bg-transparent border-none text-on-surface font-label-mono focus:ring-0 p-0 m-0" />
            </div>
            <span className="text-on-surface-variant font-bold">-</span>
            <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container w-full h-10 px-3 overflow-hidden focus-within:border-primary transition-colors">
              <span className="text-on-surface-variant font-label-mono mr-1">$</span>
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value) || 0)} onBlur={() => setMaxPrice(Math.min(absoluteMax, Math.max(maxPrice, minPrice + 10)))} className="w-full bg-transparent border-none text-on-surface font-label-mono focus:ring-0 p-0 m-0" />
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <section className="flex-grow flex flex-col space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center glass-panel p-4 rounded-lg">
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 sm:mb-0">
            Showing <span className="text-primary font-semibold">{sortedProducts.length}</span> high-performance builds
          </p>
          <div className="flex items-center space-x-4">
            <label className="font-body-md text-body-md text-on-surface-variant whitespace-nowrap">Sort by:</label>
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-surface-container text-on-surface border border-outline-variant rounded px-4 py-2 pr-10 focus:outline-none focus:border-primary transition-colors font-body-md text-body-md w-full sm:w-auto">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {sortedProducts.map((product) => (
            <article key={product.id} className="product-card group relative flex flex-col bg-surface-container rounded-lg overflow-hidden border border-outline-variant/50 transition-all duration-300 hover:border-primary shadow-sm hover:shadow-md">
              <div className="product-glow absolute inset-0 bg-primary opacity-0 transition-opacity duration-500 blur-[40px] pointer-events-none z-0"></div>
              <div className="relative h-64 overflow-hidden z-10 bg-surface flex items-center justify-center p-4">
                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out mix-blend-multiply" alt={product.name} src={product.img} />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="font-label-mono text-[10px] uppercase tracking-widest text-primary-container bg-primary-container/20 px-2 py-1 rounded-full border border-primary-container/30 backdrop-blur-sm">{product.mount}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow z-10 relative bg-surface-container">
                <div className="flex justify-between items-start mb-2 h-[56px]">
                  <h3 className="font-headline-md text-body-lg font-bold text-on-surface line-clamp-2 mr-2">{product.name}</h3>
                  <span className="font-label-mono text-label-mono text-primary font-semibold mt-1">${product.price.toFixed(2)}</span>
                </div>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4 h-[44px] line-clamp-2">{product.specs}</p>
                <div className="flex gap-2 mt-auto">
                  <Link to={`/product/${product.id}`} className="flex-grow text-center block bg-surface-container-high border border-outline-variant text-on-surface font-label-mono text-[12px] py-2 rounded hover:bg-surface-variant transition-colors uppercase tracking-widest font-semibold">
                    View Details
                  </Link>
                  <button onClick={(e) => handleAddToCart(e, product)} className="w-10 flex-shrink-0 flex items-center justify-center bg-primary text-on-primary rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 mb-8">
          <nav className="flex items-center space-x-2">
            <button className="p-2 border border-outline-variant bg-surface-container rounded text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded bg-primary text-on-primary font-label-mono text-label-mono shadow-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant bg-surface-container text-on-surface hover:border-primary hover:text-primary transition-colors font-label-mono text-label-mono">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant bg-surface-container text-on-surface hover:border-primary hover:text-primary transition-colors font-label-mono text-label-mono">3</button>
            <span className="text-on-surface-variant">...</span>
            <button className="p-2 border border-outline-variant bg-surface-container rounded text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </nav>
        </div>
      </section>

      {/* Toast Notification */}
      <div className="fixed top-24 right-8 z-50 flex flex-col gap-3 pointer-events-none">
        {notifications.map((n) => (
          <div key={n.id} className="toast-enter bg-surface-container-highest border border-outline-variant text-on-surface p-4 rounded-lg shadow-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            <span className="font-body-md text-body-md">Added to Cart</span>
          </div>
        ))}
      </div>
    </div>
  );
}
