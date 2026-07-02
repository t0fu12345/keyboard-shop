import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: "s1",
    name: "Gateron Ink Black V2",
    specs: "Smoothest linear switch. Premium smoky housing. 10pcs",
    price: 9.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPEaZClzXo-Tcre-9EB-Ll23ePPEvkNv7BInQb9VEYFh_BIwjY0yxxvTHOnbv5q0OdBec672QseQjL3pz9C1iUMQLFfjrR5ZDg7bd_Mr3038S9Sl1HzCKu0_fxSSCjAiKS5pSMYfXj4UAEEiNabT4yXbzNgjUWmedZfZeupxcq_dh31_l6e2yXPv2eUXZhmUM212Yo-aTky3cf4T21T3ISi5TI_HVHL60IMPlf8F3kdFFzPljc60EDXnMNIa67i64RskV4PFAOCKQ",
    status: "In Stock",
    type: "Linear",
    brand: "Gateron",
    actuationForce: 60,
    travel: 4,
    badgeBg: "bg-primary text-on-primary"
  },
  {
    id: "s2",
    name: "ZealPC Zealios V2",
    specs: "The pinnacle of tactile feedback. Crisp bump. 10pcs",
    price: 13.50,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh1vqGToMABd8RavsxRyR7geeLlHqGlyB1NpMH8uL1c0IySDmFbXCjXdBp_zvRbKSTMRDDq_vGEOuMDG5bjSGOcpO-XoyTfAvjnF1Df1RzYzGzoU6BlZIvPNwMUaxXP2-E_qVzyW1qcB4iGewPrnj9jxwIuVkIGfzwz1AIAj7J6FvjwvUdQqnHjGez6uu5feaVwgRKERL4pXQgZJnfuIijMJXDT51PA45LiNE6tc93-uQa3BnpPzMozM91Nwm_2hYu2P4NyjjAHM",
    status: "In Stock",
    type: "Tactile",
    brand: "ZealPC",
    actuationForce: 67,
    travel: 4,
    badgeBg: "bg-tertiary-container text-on-tertiary-container"
  },
  {
    id: "s3",
    name: "Cherry MX Blue",
    specs: "Classic clicky sound. Legendary durability. 10pcs",
    price: 5.50,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHE_XIQruLIFQgytdzGOt8TkTg3r7_J3L8niojwrOWn9Irp4DC-QZr0W-1gcF21qX26hzQ6azwCgdaJqp8bOY1WKyzX5GsBcISKRhPMieJD9zLeBSbo9aV8xBAImpAnzqcuRuW7Bif7zlB7E1j4FNY76v3PCdvLITDGpNyLIeNKkvQDI6NNncYuvLCRBO9GCqg7tc1mFJSDW-U8Sux3YqNi7RvxcUF1YnG9voD1J39SKSxOtUy8cml_qmb8EQlxXtF7DrN9VMYWXk",
    status: "In Stock",
    type: "Clicky",
    brand: "Cherry MX",
    actuationForce: 50,
    travel: 4,
    badgeBg: "bg-error text-on-error"
  },
  {
    id: "s4",
    name: "Gateron Milky Yellow",
    specs: "Budget king linear switch. Smooth feel. 10pcs",
    price: 3.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGyStSKGmU3jfXuABOgDbxlSH1-vlSV-7HWV393h-RYFGVu0xLvTdbIcgbVj-42vxlioJI8bIztS9JckxpzXvaemete_4IOJjv-eebdjTmqljfFyU9WBXAR8u8I65DNG6G3SNIMljPIzEDkZSxlHI7if6ObdLWu6xgZm8V1TIJDjf50wsQcaltmdV1XhpruWKzg559FKmMSBoIVys8KXmPYhqPm43VD1MxXqWNSTWk9QYX8zWa2YGTN5jOr76i0yyjnrfIg9HQxWc",
    status: "In Stock",
    type: "Linear",
    brand: "Gateron",
    actuationForce: 50,
    travel: 4,
    badgeBg: "bg-primary text-on-primary"
  },
  {
    id: "s5",
    name: "ZealPC Tealios V2",
    specs: "Smoothest linear switch with signature Teal stem. 10pcs",
    price: 13.50,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLet_aPNZxq_BFbKNKqMRYUiIHZ51DPqUH4OIhhpM_YinXf3ydAeHu9z1EWjc4YOnhDy0EoevV8BpR66V4ObdcPzGym7oBm8XLnmzNBhMQeQFYQcpfpmuE1IXH9hwlTvAaeruB-326O4je2JrYFJhIAAyVEIhCuLhOqp1TBSeEkoRsXlhc_mkqE3qXkQUCpcQqCrTliIfOk_gGWAKN7CLGrPyPHhffatjk4uBCSPiKXH1TVip5GrLvD-BZyXgm-cYBpaaZCXK4LyE",
    status: "In Stock",
    type: "Linear",
    brand: "ZealPC",
    actuationForce: 67,
    travel: 4,
    badgeBg: "bg-primary text-on-primary"
  },
  {
    id: "s6",
    name: "Cherry MX Brown",
    specs: "Perfect balance for typing and gaming. 10pcs",
    price: 5.50,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYfe4XzlpXCa5HCFaWup-bvR5w9T3MHtGFxl9AS0T7iJTwKoO06pnrZhX76IvFGekGvOYki-GPVAt6uAEoqkUy-033P43Bf-IEm2PDUHIwykl0TWHIgSEfHX_g1ZbpBBwvtmXrU2jBCdyrQTmvlzr9VuXnMtZkV_5MQHbCMkZ29SULZ2j0afFQKkFlmV9djdQv2p3QWQq9j6eXIlrxCgaaS6sh9ZZ8Za4nVdiEaQdffYF4PDW3hAmDw-g3HiwAZrZXhr9cMGevhT8",
    status: "In Stock",
    type: "Tactile",
    brand: "Cherry MX",
    actuationForce: 45,
    travel: 4,
    badgeBg: "bg-tertiary-container text-on-tertiary-container"
  }
];

export default function SwitchList() {
  const [actuationForce, setActuationForce] = useState(100);
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [notifications, setNotifications] = useState([]);
  const { addToCart } = useCart();

  const handleTypeChange = (type) => {
    setActiveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleBrandChange = (brand) => {
    setActiveBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setActiveTypes([]);
    setActiveBrands([]);
    setActuationForce(100);
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
    if (activeTypes.length > 0 && !activeTypes.includes(product.type)) return false;
    if (activeBrands.length > 0 && !activeBrands.includes(product.brand)) return false;
    if (product.actuationForce > actuationForce) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Newest Arrivals") return b.id.localeCompare(a.id);
    return 0; // "Featured"
  });

  return (
    <div className="flex-grow max-w-[1440px] mx-auto w-full px-margin-desktop py-12">
      <div className="grid grid-cols-12 gap-gutter">
        {/* Filter Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-lg">
          <div className="sticky top-[104px]">
            <div className="flex items-center justify-between mb-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">Filters</h2>
              <button onClick={clearAll} className="text-label-sm text-primary hover:underline uppercase tracking-wider font-bold">Clear All</button>
            </div>

            {/* Type Filter */}
            <div className="space-y-sm pb-md border-b border-outline-variant">
              <p className="font-bold text-on-surface uppercase tracking-wider text-xs">Switch Type</p>
              <div className="flex flex-wrap gap-xs">
                {["Linear", "Tactile", "Clicky"].map(type => (
                  <label key={type} className="cursor-pointer">
                    <input 
                      checked={activeTypes.includes(type)} 
                      onChange={() => handleTypeChange(type)} 
                      className="hidden peer" 
                      type="checkbox" 
                    />
                    <span className="px-3 py-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all text-xs font-label-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-sm py-md border-b border-outline-variant">
              <p className="font-bold text-on-surface uppercase tracking-wider text-xs">Brand</p>
              <div className="space-y-2">
                {["Gateron", "Cherry MX", "ZealPC", "Kailh"].map(brand => (
                  <label key={brand} className="flex items-center gap-2 group cursor-pointer">
                    <input 
                      checked={activeBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cyber-checkbox" 
                      type="checkbox" 
                    />
                    <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actuation Force */}
            <div className="space-y-sm py-md">
              <div className="flex justify-between items-center">
                <p className="font-bold text-on-surface uppercase tracking-wider text-xs">Max Actuation Force</p>
                <span className="font-label-mono text-primary">{actuationForce}cN</span>
              </div>
              <input 
                className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                max="100" 
                min="35" 
                type="range" 
                value={actuationForce}
                onChange={(e) => setActuationForce(Number(e.target.value))}
              />
              <div className="flex justify-between text-label-sm text-on-surface-variant">
                <span>35cN</span>
                <span>100cN</span>
              </div>
            </div>

            {/* Glass Promo Card */}
            <div className="mt-lg p-sm rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm relative overflow-hidden group">
              <div className="relative z-10">
                <p className="font-label-sm text-primary mb-1">Need help?</p>
                <p className="text-on-surface text-sm leading-snug">Our experts are ready to help you find the perfect switch.</p>
                <button className="mt-sm text-primary font-bold text-xs uppercase hover:tracking-widest transition-all">Contact Us →</button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-6xl text-primary">keyboard</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="col-span-12 lg:col-span-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-sm">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Mechanical Switches</h1>
              <p className="text-on-surface-variant font-body-md">Discover world-class premium switches for your next build.</p>
            </div>
            <div className="flex items-center gap-xs">
              <span className="text-label-sm text-on-surface-variant">Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-surface border-none text-body-md font-bold text-primary focus:ring-0 cursor-pointer">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Bento-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {sortedProducts.map((product) => (
              <div key={product.id} className="switch-card bg-surface-container-lowest border border-outline-variant p-sm flex flex-col transition-all duration-300">
                <div className="relative aspect-square mb-sm overflow-hidden bg-surface-container-low rounded-lg group">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} src={product.img} />
                  <div className="absolute top-2 left-2">
                    <span className={`${product.badgeBg} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter`}>{product.type}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline-md text-headline-md leading-tight text-on-surface">{product.name}</h3>
                  </div>
                  <p className="text-on-surface-variant text-xs mb-4">{product.specs}</p>
                  <div className="flex items-center gap-md mb-4 text-xs text-on-surface-variant font-label-sm">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bolt</span> {product.actuationForce}g</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">straighten</span> {product.travel}mm</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant">
                  <span className="text-headline-md font-bold text-primary">${product.price.toFixed(2)}</span>
                  <button onClick={(e) => handleAddToCart(e, product)} className="bg-primary hover:bg-primary-container text-on-primary w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-xl flex items-center justify-center gap-2">
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
