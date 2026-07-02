import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function QuantityController({ quantity = 1, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center border border-outline-variant/50 rounded-DEFAULT bg-surface overflow-hidden">
      <button 
        onClick={onDecrease} 
        className="px-3 py-2 hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-primary disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <span className="material-symbols-outlined text-[18px]">remove</span>
      </button>
      <span className="font-label-mono text-label-mono text-on-surface w-8 text-center">{quantity}</span>
      <button 
        onClick={onIncrease} 
        className="px-3 py-2 hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
      </button>
    </div>
  );
}

export default function Cart() {
  const { 
    cartItems: items, 
    removeFromCart: handleRemove, 
    updateQuantity,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    checkoutSelected
  } = useCart();
  
  const { user } = useAuth();
  
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: user?.fullname || (user?.email ? user.email.split('@')[0] : ""),
    phone: "",
    address: ""
  });

  const selectedProducts = items.filter(item => selectedItems.includes(item.id));
  const totalItems = selectedProducts.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = selectedProducts.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.09; // 9% tax example
  const total = subtotal > 0 ? subtotal + tax : 0;
  
  const isAllSelected = items.length > 0 && selectedItems.length === items.length;

  const handleProceedCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để mua");
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert("Đặt mua thành công!");
    checkoutSelected();
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
      <div className="mb-12 pt-12">
        <Link className="inline-flex items-center text-secondary hover:text-secondary-fixed-dim transition-colors font-button text-button uppercase tracking-wider mb-8" to="/products">
          <span className="material-symbols-outlined mr-2 text-[20px]">arrow_back</span>
          Continue Shopping
        </Link>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">Shopping Cart</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{items.length} items in your cart</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {items.length > 0 && (
            <div className="flex items-center gap-3 bg-surface-container-highest p-4 rounded-lg border border-outline-variant/30">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest cursor-pointer cyber-checkbox"
                checked={isAllSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
              <span className="font-headline-md text-on-surface">Select All ({items.length})</span>
            </div>
          )}
          {items.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant font-body-lg bg-surface-container-highest rounded-lg border border-outline-variant/30">
              Your cart is empty.
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-surface-container-highest rounded-lg border border-outline-variant/30 p-6 flex flex-col md:flex-row gap-6 relative group transition-all duration-300 hover:bg-surface-bright/10 hover:border-outline/50 items-start md:items-center">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest cursor-pointer shrink-0 cyber-checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                />
                <div className="w-full md:w-40 h-40 bg-surface-container rounded-DEFAULT overflow-hidden flex-shrink-0 relative">
                  <img className="object-cover w-full h-full" alt={item.name} src={item.img} />
                </div>
                <div className="flex-grow flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{item.name}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-3">{item.specs}</p>
                      <span className="inline-block bg-secondary-container text-on-secondary-container font-label-mono text-label-mono px-3 py-1 rounded-full mb-4">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="font-headline-md text-headline-md text-primary block">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      {(item.quantity > 1) && (
                        <span className="font-label-mono text-xs text-on-surface-variant block mt-1">${item.price.toFixed(2)} each</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <QuantityController 
                      quantity={item.quantity || 1} 
                      onDecrease={() => updateQuantity(item.id, -1)}
                      onIncrease={() => updateQuantity(item.id, 1)}
                    />
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-error hover:bg-error/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 font-button text-button uppercase tracking-wider"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-surface-container-highest border border-outline-variant/30 rounded-lg p-8 sticky top-32 backdrop-blur-xl relative overflow-hidden">
            {/* Glassmorphism decorative element */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 relative z-10">Order Summary</h2>
            <div className="space-y-4 mb-6 relative z-10 border-b border-outline-variant/30 pb-6">
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal ({totalItems} items selected)</span>
                <span className="font-label-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-secondary font-label-mono">{subtotal > 0 ? "Calculated at next step" : "$0.00"}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Estimated Tax</span>
                <span className="font-label-mono">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-8 relative z-10">
              <span className="font-headline-md text-headline-md text-on-surface">Total</span>
              <div className="text-right">
                <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1">USD</span>
                <span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleProceedCheckout}
              className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 py-4 px-6 rounded-DEFAULT font-button text-button uppercase tracking-wider flex items-center justify-center gap-2 mb-6 group relative overflow-hidden z-10"
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              {/* Hover glow */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <div className="border-t border-outline-variant/30 pt-6 relative z-10">
              <p className="font-label-mono text-label-mono text-on-surface-variant text-center mb-4 tracking-wider opacity-60">SECURE PAYMENT</p>
              <div className="flex justify-center gap-4 text-on-surface-variant opacity-80">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="glass-panel bg-surface-container-lowest w-full max-w-lg rounded-xl p-8 relative shadow-2xl scale-100 transition-transform duration-300 border border-outline-variant">
            <button 
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-2"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="font-display-lg-mobile text-[24px] text-on-surface mb-6 font-bold">Checkout Information</h2>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Receiver Name</label>
                <input 
                  required 
                  type="text" 
                  value={checkoutForm.name} 
                  onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} 
                  className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Enter receiver's name"
                />
              </div>
              
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  value={checkoutForm.phone} 
                  onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} 
                  className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Shipping Address</label>
                <textarea 
                  required 
                  rows="3" 
                  value={checkoutForm.address} 
                  onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})} 
                  className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Enter full shipping address"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 border-t border-outline-variant/30 mt-8 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsCheckoutModalOpen(false)} 
                  className="px-6 py-3 font-button text-button text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors border border-transparent hover:border-outline-variant"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-primary text-on-primary px-8 py-3 rounded-lg font-button text-button uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all duration-300"
                >
                  Confirm Order (${total.toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
