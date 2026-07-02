import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBMozIPqju1VzZCs-27vFFEFmz0qHqxKIDV3hEZdkmvU7FBJujXjpCo5Lrr7q490t33G2OZMNsXHqzp49nqOAxVfFmjRiIRsQFP2ohZ-EQhljLeY5yVq2in0xicoLj8iBMDdynCFpLLd2tZXBDoHpPjm5bpSJKi5JzPl07FlEoaAYki-ji1It7wbI55My4J3aCXc5Q9RJO6xs5YXek6MYzXXR79upoAhcOPSnXXlYi1Rjf3W00Kg99zKi4U6pbGhVsspeKWpeYiSQ4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQsLstPFbP2ZTylker-jACxtpiHMxr4baWUjfWWIWyYdSmnBljd6KTrkslpdugMmLcmdXUFDHAqHADXrxBayonEA8HcyISMMb4oA_TvbGus6QJnMhD-p70cEPbaZRxjFPeKvm8zZFcXftMmpTDXvBlp4iRoee9j5j1qdy4nHzrgAq9uxWHoXE8zDlzhKmr2PlzjpqNtPb5JhU35QPCcXzZzEqLfOT61YO8gKrNdqlKdrG8t9c8bCqSFQBm8kAv9kMNQoIgTsE1V-c",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvJ_774iwBL4VsM2O61vSC9DzazSsc4SRXPOJ5mO2k5EECBP-fVci2lqiqWFjRu80we5iogULUPBrmI0rbdu84cLlr-cVfqvyVZYaHPBdpU1wsh3IU1qe6X6QJb1azejn7UROfYGj9k_reXhNmx1ki9clwl-9TvtSYTspnx2gtnAswCPiUibKvnU55OlJX1n0zaHv5Hx0_OQYDHZnffZkCc1dJSUPIws4hrxOMEU4bFvzQ8PbzLMw2-T7raN0d3n5gFXeYauCOqU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuABfw1EgaarIHGn6MJ0P3zIv3xhJBpkIw6ZBNw5DPTooCfZwq2-HywnEUfNVgRoz4eaxY-KrLwLg1ETUqwITvE_X6aDt1OmsmYOKBaq6knJN6gUgjPSL1EaO0d8ali4sop0EL2KFsc20l_or9g0yIJY0zi7Kw7a_y0qeoQOz2lMl0y5jx4I2Jy7YFapu6kpWEs86a1y9caWu-jXnF9K3jPH3YPsyY8jMYSPcsuMCtTWGVbOFVnDm74omdq3F1rTqA9GD2EfjgkDh3o"
  ];
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    addToCart({
      id: "apex-75",
      name: "The Apex-75 Custom",
      price: 249.00,
      img: images[0],
      status: "In Stock",
      specs: "75% / Alu 6063",
    });
    alert("Added to cart!");
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-8 uppercase">
        <Link className="hover:text-primary transition-colors" to="/">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link className="hover:text-primary transition-colors" to="/products">Custom Keyboards</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary">The Apex-75 Custom</span>
      </div>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-24">
        {/* Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low group">
            <img alt="The Apex-75 Custom Main View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={mainImage} />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,0.4)] pointer-events-none"></div>
            <button className="absolute top-4 right-4 p-2 rounded-full glass-panel text-on-surface hover:text-primary transition-colors z-10">
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div onClick={() => setMainImage(images[1])} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${mainImage === images[1] ? 'border-primary' : 'border-transparent hover:border-outline-variant opacity-70 hover:opacity-100'}`}>
              <img alt="Angle 1" className="w-full h-full object-cover" src={images[1]} />
            </div>
            <div onClick={() => setMainImage(images[2])} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${mainImage === images[2] ? 'border-primary' : 'border-transparent hover:border-outline-variant opacity-70 hover:opacity-100'}`}>
              <img alt="Angle 2" className="w-full h-full object-cover" src={images[2]} />
            </div>
            <div onClick={() => setMainImage(images[3])} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${mainImage === images[3] ? 'border-primary' : 'border-transparent hover:border-outline-variant opacity-70 hover:opacity-100'}`}>
              <img alt="Angle 3" className="w-full h-full object-cover" src={images[3]} />
            </div>
            <div onClick={() => setMainImage(images[0])} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors flex items-center justify-center bg-surface-container group ${mainImage === images[0] ? 'border-primary' : 'border-transparent hover:border-outline-variant opacity-70 hover:opacity-100'}`}>
              <span className="material-symbols-outlined text-[48px] text-outline-variant group-hover:text-primary transition-colors">image</span>
            </div>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container">GASKET MOUNT</span>
              <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container">HOT-SWAP</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">The Apex-75 Custom</h1>
            <p className="font-headline-md text-on-surface-variant">$249.00 <span className="text-outline text-body-md line-through ml-2">$299.00</span></p>
          </div>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Engineered for absolute acoustic perfection and unyielding typing feel. Featuring a precision-machined monolithic aluminum chassis, isolated gasket mounting, and unparalleled acoustic dampening layers. Experience the thock.
          </p>

          {/* Configuration Options */}
          <div className="flex flex-col gap-6">
            {/* Switch Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label className="font-headline-md text-[14px] font-semibold text-on-surface uppercase tracking-wider">Switch Type</label>
                <button className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">volume_up</span> Sound Test
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="cursor-pointer">
                  <input defaultChecked className="peer sr-only" name="switch" type="radio" />
                  <div className="p-4 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all flex flex-col gap-1 relative overflow-hidden">
                    <div className="font-headline-md text-[14px] font-semibold text-on-surface">Gateron Black Ink V2</div>
                    <div className="font-label-sm text-[12px] text-on-surface-variant">Linear / Heavy / Deep</div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-lg flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                    </div>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="switch" type="radio" />
                  <div className="p-4 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all flex flex-col gap-1 relative overflow-hidden">
                    <div className="font-headline-md text-[14px] font-semibold text-on-surface">Holy Panda X</div>
                    <div className="font-label-sm text-[12px] text-on-surface-variant">Tactile / Snappy / Clack</div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-lg flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                    </div>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="switch" type="radio" />
                  <div className="p-4 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all flex flex-col gap-1 relative overflow-hidden">
                    <div className="font-headline-md text-[14px] font-semibold text-on-surface">Barebones</div>
                    <div className="font-label-sm text-[12px] text-on-surface-variant">No Switches (-$40.00)</div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-lg flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Keycap Selection */}
            <div className="flex flex-col gap-3">
              <label className="font-headline-md text-[14px] font-semibold text-on-surface uppercase tracking-wider">Keycap Profile</label>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                <label className="cursor-pointer shrink-0">
                  <input defaultChecked className="peer sr-only" name="keycaps" type="radio" />
                  <div className="px-4 py-2 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:text-primary hover:border-primary/50 transition-all font-label-sm text-label-sm">
                    Cherry Profile
                  </div>
                </label>
                <label className="cursor-pointer shrink-0">
                  <input className="peer sr-only" name="keycaps" type="radio" />
                  <div className="px-4 py-2 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:text-primary hover:border-primary/50 transition-all font-label-sm text-label-sm">
                    SA Profile
                  </div>
                </label>
                <label className="cursor-pointer shrink-0">
                  <input className="peer sr-only" name="keycaps" type="radio" />
                  <div className="px-4 py-2 rounded-lg border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:text-primary hover:border-primary/50 transition-all font-label-sm text-label-sm">
                    Barebones (-$30.00)
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-outline-variant/30">
            <div className="flex gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low h-12 w-32 overflow-hidden">
                <button onClick={decreaseQuantity} className="w-10 h-full flex items-center justify-center bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                <input className="w-full h-full bg-transparent border-none text-center font-label-sm text-label-sm text-on-surface focus:ring-0 p-0 m-0" min="1" type="number" value={quantity} readOnly />
                <button onClick={increaseQuantity} className="w-10 h-full flex items-center justify-center bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
              </div>
              <button onClick={handleAddToCart} className="flex-grow bg-primary text-on-primary font-headline-md text-[14px] font-semibold uppercase tracking-wider h-12 rounded-lg glow-hover transition-shadow flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span> Add to Cart
              </button>
            </div>
            <Link to="/cart" className="w-full flex items-center justify-center bg-surface-container-high border border-outline-variant text-on-surface hover:border-primary hover:text-primary font-headline-md text-[14px] font-semibold uppercase tracking-wider h-12 rounded-lg transition-colors">
              Buy It Now
            </Link>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-[12px] mt-2">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span> Free Worldwide Shipping over $150
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-24 border-b border-outline-variant/30">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar">
          <button className="pb-4 font-headline-md text-[14px] font-semibold uppercase tracking-wider text-primary border-b-2 border-primary whitespace-nowrap">Technical Specs</button>
          <button className="pb-4 font-headline-md text-[14px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Box Contents</button>
          <button className="pb-4 font-headline-md text-[14px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Reviews (42)</button>
        </div>
      </div>

      <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="font-headline-md text-primary mb-6">Uncompromising Build</h3>
          <ul className="space-y-4 font-label-sm text-label-sm text-on-surface-variant">
            <li className="flex justify-between border-b border-outline-variant/20 pb-2">
              <span>Layout</span>
              <span className="text-on-surface text-right">75% (84 Keys)</span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/20 pb-2">
              <span>Mounting Style</span>
              <span className="text-on-surface text-right">Isolated Gasket Mount</span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/20 pb-2">
              <span>Case Material</span>
              <span className="text-on-surface text-right">CNC Machined 6063 Aluminum</span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/20 pb-2">
              <span>Plate Material</span>
              <span className="text-on-surface text-right">Polycarbonate (Default)</span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/20 pb-2">
              <span>PCB</span>
              <span className="text-on-surface text-right">Hot-swappable, South-facing RGB</span>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="aspect-video bg-surface-container rounded-xl overflow-hidden relative">
            <img alt="Exploded View" className="w-full h-full object-cover opacity-90 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsQX59SRyjCyKWHZ0KFzkzgzzRl4mYdsFhzwcsSwa7o81-ykhx5rH6bvAdraou0I8x4AhNvEnsjNVRD_BxXG472GfvW-gLTCO72syidUDFByijFPTNd63HgVqdlrlfvgmxVfIRd5rxREHXmC4STGcQXP_z4HzvL5sikpiEud7_7ccIr_C6NIAPd5GJi_W0YHF_ZcW9dhgYf4tsrQKJkLWN5zXoaDjbEpdPWSwQjhpFClvibhR-8Qft_LfFsB3NNgvJLNNpHeFXLnU" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="px-2 py-1 bg-surface/80 backdrop-blur text-primary font-label-sm text-[10px] uppercase border border-primary/30 rounded">Acoustic Architecture</span>
            </div>
          </div>
          <p className="font-body-md text-on-surface-variant">
            Our proprietary 5-layer acoustic dampening system eliminates case ping and hollowness, delivering a deep, focused sound signature right out of the box.
          </p>
          <button className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 uppercase tracking-widest mt-4">
            View Raw Specs <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
