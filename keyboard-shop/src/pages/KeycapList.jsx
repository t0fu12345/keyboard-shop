import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: "k1",
    name: "Nocturnal Purple",
    specs: "PBT Double-shot. Cherry Profile. 165 Keys.",
    price: 79.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxS0nJqQYBpaZ1EkP-Xz3Bu29e8XS16KXY2uR75rpwEhdO4hKW50ewZqcGXahxdSCHID1sXQDkv1Jqa0aYlbgB4Q37TZfZOHj7bZP56z7OE6KZ_AW-EnPsp-hS_UpflSp1yyO-sbHgXIskDu-LdkhazoGOCBDMt4T_V1SA5osg1gk9oegs3px5ZpaOZT7lkF6KqfUohfAB3bLYKkB9TZ1Xfv_boIcnFWBUZAOn6U0tvmrR9mHLmwSmFW6DVkFImmhO26DR6Nyl_fU",
    status: "In Stock",
    material: "PBT Double-shot",
    profile: "Cherry",
    isFeatured: true
  },
  {
    id: "k2",
    name: "Modern Minimalist Grey",
    specs: "ABS High-grade. OEM Profile.",
    price: 50.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLRtPBoOF9XsKl0GXwOE3MKZ4_89NDqt-01W08KuCMjd2KywU_I3JWNJLkbMfGEHvMMHvjl-0ysoiho6IKdXvabjbUz0BD-YYGz8jzWQw7tp9GDtRIFg-g7xZVvHyRVdzdS--oBIjpw2mtNBTdULEPb9JZYt0vaN_Z1oA-TyvSAjMEH27Ri66Hsyqhv2-xlhDF29Pq2NSdf0qxSzgZ2qN6N3O2M0_nsqI34G-U9-NyRRlol_7_bgb4j4ROk3WWTBEBZQRkX9849hg",
    status: "In Stock",
    material: "ABS High-grade",
    profile: "OEM",
    isFeatured: false
  },
  {
    id: "k3",
    name: "Cyber-tactile V2",
    specs: "PBT Double-shot. KAT Profile.",
    price: 89.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTgSpeImYERkgmoGpmY4La2q-WUxDDIjCPu8Kjtz6zFwC7Sa0MVbvNjeVQPrIBAmD98B-NcVHAkWyZqcp5SzjX1cp0aaB-6u1qMLSBTgAWJjhMVs96QZ-xFI-4Y6j964RmEDXT-P_cUbBW3sgCqKo9gPwIAz6ECp_u9iozgakQck3CqheQbA4i6JlJm8r9UvWUyjSx-P_PwFxcxW5NnvdIWYkD_Xk8QgEKafPABEMMaN3GmjFmv64pBjFylFDH3eoozlE1JKSXe9U",
    status: "In Stock",
    material: "PBT Double-shot",
    profile: "KAT",
    isFeatured: false
  },
  {
    id: "k4",
    name: "Frosted Glass Edition",
    specs: "Polycarbonate. Cherry Profile.",
    price: 70.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzeRygPjIBrXJ5xFmwUAJhrM8FvCOmlpi18_sIKZip7_EsKu1g8Ic91s12yzUHM-TRZLDtgltqtX-ttniGoJmI9pRF88hxdjRdEDJFlukQQSh7RmhMbFMuJkzQSJFVuWhzjfjRE2Q4edKhVJ1XnQw1GhjCjWA2M8q_O-zaLhPF4yzp21EYcSULnqXgKv4bqLqdjCUa5o3U8nL2YuxfCxqAYV41J6c9xNqq2-3LLmHd5iK1yB5yiLKysqVt7wTMnAREwFYjJZSbgWg",
    status: "In Stock",
    material: "Polycarbonate",
    profile: "Cherry",
    isFeatured: false
  },
  {
    id: "k5",
    name: "Artisan Roast",
    specs: "PBT Dye-sub. SA Profile.",
    price: 99.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYS-LqNBNRQpbU7A4WPDbQvn8sCKYZw1K098tXXOCX-4AwEKjL2zhnqSJCQB0xb1kVvVKBMDdt9RfUD6tKa2xtMClxsSRTvSY_vTIsa4KOvr7gmcKAMfKOpy9og6inM-0vSFZCW7hJOnvzSjgxQhSYK3iJLkuW-fxHG6yE6DOLdzkgr8dUUu50WthpdeKBt9-3eHVXSr84l-n8VPAhd-q01w89cZjGKVhmRHrZrcSRU8qTPUpIg3nFYInDKiYgl7t4LQHj1f-58-Y",
    status: "In Stock",
    material: "PBT Dye-sub",
    profile: "SA",
    isFeatured: false
  }
];

export default function KeycapList() {
  const [activeMaterials, setActiveMaterials] = useState([]);
  const [activeProfiles, setActiveProfiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { addToCart } = useCart();

  const handleMaterialChange = (material) => {
    setActiveMaterials(prev => 
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const handleProfileChange = (profile) => {
    setActiveProfiles(prev => 
      prev.includes(profile) ? prev.filter(p => p !== profile) : [...prev, profile]
    );
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

  const filteredProducts = products.filter(product => {
    if (activeMaterials.length > 0 && !activeMaterials.includes(product.material)) return false;
    if (activeProfiles.length > 0 && !activeProfiles.includes(product.profile)) return false;
    return true;
  });

  return (
    <div className="flex-grow max-w-[1440px] mx-auto w-full px-margin-desktop py-12">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-lg">
          <div className="sticky top-[104px]">
            <h2 className="font-headline-md text-headline-md mb-md text-on-surface">Filters</h2>
            
            {/* Material Filter */}
            <div className="mb-lg">
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-sm">Material</h3>
              <div className="space-y-xs">
                {["PBT Double-shot", "PBT Dye-sub", "ABS High-grade", "Polycarbonate"].map(material => (
                  <label key={material} className="flex items-center gap-sm cursor-pointer group">
                    <input 
                      className="w-5 h-5 border-outline-variant rounded text-primary focus:ring-primary-container cyber-checkbox" 
                      type="checkbox" 
                      checked={activeMaterials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                    />
                    <span className="group-hover:text-primary transition-colors text-on-surface-variant text-body-md">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Filter */}
            <div className="mb-lg">
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-sm">Profile</h3>
              <div className="flex flex-wrap gap-xs">
                {["Cherry", "OEM", "SA", "KAT", "XDA"].map(profile => (
                  <button 
                    key={profile}
                    onClick={() => handleProfileChange(profile)}
                    className={`px-sm py-xs font-label-sm rounded-full transition-all ${activeProfiles.includes(profile) ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary'}`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-lg">
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-sm">Color</h3>
              <div className="grid grid-cols-5 gap-xs">
                <button className="w-8 h-8 rounded-full bg-on-surface border border-outline-variant hover:scale-110 transition-transform"></button>
                <button className="w-8 h-8 rounded-full bg-white border border-outline-variant hover:scale-110 transition-transform"></button>
                <button className="w-8 h-8 rounded-full bg-primary border border-outline-variant hover:scale-110 transition-transform"></button>
                <button className="w-8 h-8 rounded-full bg-tertiary border border-outline-variant hover:scale-110 transition-transform"></button>
                <button className="w-8 h-8 rounded-full bg-on-surface-variant border border-outline-variant hover:scale-110 transition-transform"></button>
              </div>
            </div>
            
            <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Need help?</p>
              <p className="font-body-md text-body-md text-on-surface font-semibold">Get expert advice on choosing the perfect keycaps for your build.</p>
              <button className="mt-md w-full py-sm border border-primary text-primary font-bold rounded-lg hover:bg-primary-container/10 transition-all active:scale-95 uppercase tracking-wider text-sm">Contact Us</button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-xs">Keycap Collection</h1>
              <p className="text-on-surface-variant font-body-lg text-body-lg">Explore intricately crafted keycaps that optimize your typing feel.</p>
            </div>
            <div className="hidden lg:block text-outline font-label-sm">
              Showing 1-{filteredProducts.length} of 48 products
            </div>
          </div>

          {/* Bento Grid Layout for Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.map((product) => {
              if (product.isFeatured) {
                return (
                  <div key={product.id} className="md:col-span-2 lg:col-span-2 relative group overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-xl bento-card-hover transition-all duration-300">
                    <div className="aspect-[16/9] w-full bg-surface-container-highest overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} src={product.img} />
                    </div>
                    <div className="p-lg">
                      <div className="flex justify-between items-start mb-sm">
                        <div>
                          <span className="px-sm py-1 bg-primary-container text-on-primary text-[10px] uppercase font-bold tracking-widest rounded-full mb-xs inline-block">New Arrival</span>
                          <h3 className="font-headline-md text-headline-md text-on-surface">{product.name} - {product.material}</h3>
                        </div>
                        <p className="font-headline-md text-headline-md text-primary">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-md mb-md">
                        <span className="flex items-center gap-xs font-label-sm text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">keyboard</span> {product.profile} Profile</span>
                        <span className="flex items-center gap-xs font-label-sm text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">layers</span> 165 Keys</span>
                      </div>
                      <button onClick={(e) => handleAddToCart(e, product)} className="w-full py-md bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-all">
                        <span>Add to Cart</span>
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={product.id} className="group overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-xl bento-card-hover transition-all duration-300 flex flex-col">
                  <div className="aspect-square w-full bg-surface-container-highest overflow-hidden relative">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} src={product.img} />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <div className="p-md flex flex-col flex-grow">
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-xs truncate">{product.name}</h3>
                    <p className="font-label-sm text-on-surface-variant mb-md">{product.specs}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="font-body-lg text-body-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                      <button onClick={(e) => handleAddToCart(e, product)} className="w-10 h-10 bg-surface-container-low text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-xl flex justify-center items-center gap-sm">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
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
