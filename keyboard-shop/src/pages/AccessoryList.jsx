import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const products = [
  {
    id: "a1",
    name: "Pro Coiled Cable - 'Amethyst Flare'",
    specs: "Hand-braided paracord cable with chrome Aviator connector.",
    price: 55.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHH1dx5xEx051K4D0ymfeJpld9o9KRGGke6mO-sNWluZM_SBtOazkPpzjfmQ8nDyR4fl8L04v18BUjGRF8NxWyc2d0dlkDfWEpIOmzETJnkS_XLDOrPHP_iEO1ImKohFAiXH8dYn4myrMPooMhgCjhS5HBXeMkdv6WM_erlV2xY6Ky5oYRApleL_gz1GQr7RcaEk6nCW3Upu1PcJM8Owv4Xa4rGR_ASq4FipZSyzaSFmff6zkonYYmNgnU4c6yfMD8cT26Dh25wNE",
    category: "Cables",
    isFeatured: true
  },
  {
    id: "a2",
    name: "Merino Wool Desk Mat",
    specs: "900x400mm size, anti-slip rubber base.",
    price: 35.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwW8osD7YuvOccSwxn-JqTG8B9eCHzCowVdEKpQdg5WNCymLWoXMYSBGcqm52RUug4aQUmlGMYoHdGYi7MXkHRc9XegQFkovusHe1-lZwxwOpTq8hQPMsvsNzed0QfbdWxuXDoc-vD6mfeqtVcX7HaemxTxeADP05Fd9Eq86Uweqh1wLOZB8lr1ujXTb3YXKA4v_GlTo02hwY5qcATzylNBPUPdjdK9niNrgw5DZJK2tkQzZRTafp-z_x5rGdQBf5aXKPmSQiom18",
    category: "Desk Mats",
    isFeatured: false
  },
  {
    id: "a3",
    name: "Titanium Tool Kit",
    specs: "Stainless steel, ergonomic design.",
    price: 15.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoUKm80mXvV3G9CcdjlUUjpHIgxLTb9Px_1HduIgE7eEO5E76NagNvb4tIr5QyczTIOq4r0mAzTKkdmPYXxBsxYfzpEm1mkIcD22hhTi0ZVptjGt1Imfdc3acYZZCl43d2LlD_-PDjQ1vYS1qeD6GwhduO8cRfahtdRvhi2GugHzvWDBZHthIsMB5uRUONw5OlY3MYLScG1R4dhzOmI7exaR1Y6puM841bn36VCwnj6xGoPMBYeR9RlUMH_O92wrWFNo7fvv5egOE",
    category: "Tools",
    isFeatured: false
  },
  {
    id: "a4",
    name: "EVA Armor Carrying Case",
    specs: "Ultimate shock protection for 60-75% keyboards.",
    price: 25.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOzUQD_LV6NzjkPwY34xT3tVlBpEHN14Vn7_WvZdBgMUynm7yWztF3De_vSEuAE3Glsr_Zro0kHOyQJObwAWcydFF9Og-RRKkW7fdsdvRPgZ5Xa9pxwIk8QWo4ZEjm7OJ0jTJ6d09KHQ3Vr_TG6dodl0X9Xq-cRqs7FstJYdkoxHPR5MBfjT8G4zXb4aiMsjEhL1QJki75wOFum6rLllFheuPxB5WqS4ip6Ohg7r_ELA9stN4NhbPwhup1LcEuEM8olrGwF4XPnZc",
    category: "Cases",
    isFeatured: false
  },
  {
    id: "a5",
    name: "Premium Lube Kit",
    specs: "Includes Krytox 205g0 and specialized brushes.",
    price: 19.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4vms50OVqpXS8qU5q6lzy52UBO-K8YQTfRsR7eCvnRedyMEXhReRlHtHfI2umXY6qT9jAui5UmDTFTdW4_eXToddQ72g1DvWDmtLY3A9F7yS2wMKlxXZ-W2HL2VcWpxcg06t5ZWA_Rl66s-AUcnInTEf3V5AjPWJ07nQb297zToCRetD3ROb2kFd14FnaxKtaeuaNS2QDe9TcT8aOfKe2zQMqoZwTHpdekEYDdDKsXn9hGTKb3P2vU2wnI_MnuPEwrHF6c-UK2K0",
    category: "Tools",
    isFeatured: false
  }
];

export default function AccessoryList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ["All", "Cables", "Desk Mats", "Tools", "Cases"];

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
    const notifId = Date.now() + Math.random();
    setNotifications((prev) => [{ id: notifId }, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    }, 3000);
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory === "All") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="flex-grow max-w-[1440px] mx-auto w-full px-margin-desktop py-12">
      {/* Hero Section */}
      <section className="mb-lg">
        <h1 className="font-display-lg text-display-lg mb-4 text-on-surface">Elevate Your Experience</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-8">Discover a curated collection of premium accessories designed to perfect your workspace. From custom coiled cables to minimalist desk mats.</p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-label-sm text-label-sm shadow-sm hover:scale-105 transition-all ${
                activeCategory === cat
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {filteredProducts.map((product) => {
          if (product.isFeatured) {
            return (
              <div key={product.id} className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-hover group cursor-pointer relative transition-all duration-300">
                <div className="aspect-[16/9] w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${product.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest via-transparent to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute bottom-0 w-full p-sm flex flex-col md:flex-row justify-between items-start md:items-end z-10 bg-surface-container-lowest/90 backdrop-blur-md">
                  <div className="mb-4 md:mb-0">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Featured</span>
                    <h3 className="font-headline-md text-headline-md mt-2 text-on-surface">{product.name}</h3>
                    <p className="text-on-surface-variant mt-1 text-sm">{product.specs}</p>
                  </div>
                  <div className="text-left md:text-right flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                    <p className="font-headline-md text-headline-md text-primary">${product.price.toFixed(2)}</p>
                    <button onClick={(e) => handleAddToCart(e, product)} className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:scale-105 transition-transform">
                      ADD TO CART <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={product.id} className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-hover flex flex-col group relative transition-all duration-300">
              <div className="aspect-square w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${product.img}')` }}></div>
              <div className="p-sm flex-grow bg-surface-container-lowest z-10 flex flex-col relative">
                <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">{product.name}</h3>
                <p className="text-on-surface-variant mt-2 text-sm">{product.specs}</p>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <p className="font-headline-md text-headline-md text-primary">${product.price.toFixed(2)}</p>
                  <button onClick={(e) => handleAddToCart(e, product)} className="bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary w-10 h-10 flex items-center justify-center rounded-lg transition-all shadow-sm">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
