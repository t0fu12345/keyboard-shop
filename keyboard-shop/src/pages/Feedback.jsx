import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Feedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Review submitted successfully!");
    setIsModalOpen(false);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg mb-xl border-b border-outline-variant/30 pb-lg">
        <div className="flex flex-col gap-sm">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">What Our Customers Say</h1>
          <div className="flex items-center gap-md mt-base">
            <div className="flex items-center gap-1 text-primary-container">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[32px]">star_half</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">4.8 / 5</span>
              <span className="font-body-md text-body-md text-on-surface-variant">Based on 1,204 reviews</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(189,0,255,0.3)] transition-all duration-300 ease-out flex items-center gap-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">edit_square</span>
          Write a Review
        </button>
      </header>
      
      <section className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
        <article className="break-inside-avoid bg-surface-container-lowest border border-surface-variant rounded-xl p-md hover:shadow-xl hover:border-l-[3px] hover:border-l-primary-container transition-all duration-300 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-sm">
              <img alt="User" className="w-12 h-12 rounded-full object-cover bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbfN2ddLPQvR3jpLBDoonm4SYVgSc4G8pRh6sA0dhTh1QlTY0JrqtjhG1d5z8nLOpXx9OfymSf-f0ZsaqI86BxDzIk04LuC5YNlkHBnKzAP35trCCbxaDIQ4hk_TxJ4BWVQ3Y1dxJtYLGnqVgZLn50OG6oJBmyGT3_QC5r-scSJeaoagXu8zSJ3CjIKGmyLaNXF1-tAbmRZSzfDmYMc6ddeJl8P5b_NsPNCuIdC61uPtjNOwjogvJE5Rk7VQw9Vi9HdN7m6xD_N7M"/>
              <div className="flex flex-col">
                <span className="font-headline-md text-body-lg text-on-surface font-semibold">Alex Nguyen</span>
                <span className="flex items-center gap-1 text-primary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Verified Buyer
                </span>
              </div>
            </div>
            <div className="flex text-primary-container">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Amazing build quality. Typing feels incredibly solid and smooth. The thocky sound is exactly as expected. I especially love the CNC aluminum case, feels very premium on the desk.
          </p>
          <div className="mt-sm rounded-lg overflow-hidden border border-surface-variant">
            <img alt="Review photo" className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgqOEXrzW4TzRel2cWkEO0Ia2YVrACvZ1nwlnL03dth0SeAEcEoGRAbBMY9aU3v66PhsoV8u8ByuzJ1DnSd8Pcj4LzBqbcpYoo8fOEccFQ0qOMfd428V8s4-SMIuaBN4i223SUfACj74HUeUr5GLJTKbdXkutUbT_F3zcfidzPc0aKs4m6NeOCm2xatVqlmtleB7gsXy-yzMwOHPif0U8qgeDIDV2_2uxqfut8oe3fkNzEy2CXq1kPyfbPZdrbNUcjq0pTWX-lStY"/>
          </div>
        </article>
        
        <article className="break-inside-avoid bg-surface-container-lowest border border-surface-variant rounded-xl p-md hover:shadow-xl hover:border-l-[3px] hover:border-l-primary-container transition-all duration-300 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-sm">
              <img alt="User" className="w-12 h-12 rounded-full object-cover bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_laqpY1D7z0WQMUivouGgIctSdlzqKd0Uhav8Iq4uQ6N5q4-wYWA6dXp4fZ9uqoyZmgqHsRJ3kQDuQsaAQvGV_XGNgh4ebiDq1QWziorvwPtqWB8m-Kv0oYeRJZpfcn0Nf_DvfSv3IvFbgnKdSMuAuqiZUoPWlXf5CIQJhcvpXo9oDVcMfKDE2LtqQUvTUZJrf0rzg146IpzKp5lKcRq6C1Zv86L-k3sZBpg1IlxxMFqm6eSRJ5wW2byB0ZX9PRz1epcO-9jak9A"/>
              <div className="flex flex-col">
                <span className="font-headline-md text-body-lg text-on-surface font-semibold">Minh Tran</span>
                <span className="flex items-center gap-1 text-primary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Verified Buyer
                </span>
              </div>
            </div>
            <div className="flex text-primary-container">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Incredible PBT keycap set, colors are very accurate and resist fingerprints. Careful packaging, fast shipping. Will support the shop for a long time.
          </p>
        </article>
        
        <article className="break-inside-avoid bg-surface-container-lowest border border-surface-variant rounded-xl p-md hover:shadow-xl hover:border-l-[3px] hover:border-l-primary-container transition-all duration-300 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-sm">
              <img alt="User" className="w-12 h-12 rounded-full object-cover bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYpa7ryJp2ii6BHgqn3DNm7ti9SPpN75fPbWqsxxpiT3a-nEaKsfpp0q_kL7w676DQe1cAVoJoSOWy0C_hrpbFOCDl7FCUFU-NnHSM4SkwVb3kH7aaawXiLpDcA-685u8EPVkdJQ3FzTyNfIyNqUth1k_gw3Vp3EYi25gTLMuUZMMHxHr0Kc66Z_BY7LSm-ODqpFLjlG8WwesNXlIrDUlVsP7fxvvQC6Hi3KTO1L3KBbZ-6snScI4xgcwSNZnxNKLzWNrjHCA9-Oc"/>
              <div className="flex flex-col">
                <span className="font-headline-md text-body-lg text-on-surface font-semibold">Hoang Le</span>
                <span className="flex items-center gap-1 text-primary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Verified Buyer
                </span>
              </div>
            </div>
            <div className="flex text-primary-container">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Tactile Luxe switches feel amazing to type on. Great tactility, crisp sound. Setting it up on my desk makes it look very clean and professional.
          </p>
          <div className="mt-sm rounded-lg overflow-hidden border border-surface-variant">
            <img alt="Review photo" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-AN1mePtkL0NqxlUhGx0MevqUxOAPqLRwNdZslye9hqd5M_fv0ytUbGhZkXlXIoIjh0gV0Lb6hwYRspLLE2-eexwANNaW4LF6Yc5urO45Ow74QmbWmc7uITXPxkXYKt9YT1kYLfl2ckDqoG3P6Sa11tNi-8s_m0Q9uHh1Fb3gkgYU2cibC9Tq9VjyrCDVwtcWgY66fEXXE9xs6gA0plKqXp1bjVngjNI6tOIpdP8QbEvSmFzj2-92g1xQ_O6VPHwZNeqNLti0rsU"/>
          </div>
        </article>
        
        <article className="break-inside-avoid bg-surface-container-lowest border border-surface-variant rounded-xl p-md hover:shadow-xl hover:border-l-[3px] hover:border-l-primary-container transition-all duration-300 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-sm">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-headline-md text-on-surface">T</div>
              <div className="flex flex-col">
                <span className="font-headline-md text-body-lg text-on-surface font-semibold">Tuan Anh</span>
                <span className="flex items-center gap-1 text-primary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Verified Buyer
                </span>
              </div>
            </div>
            <div className="flex text-primary-container">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Wonderful shopping experience. The staff was very enthusiastic in helping me choose the best setup for coding. The keyboard is meticulously crafted in every detail.
          </p>
        </article>
      </section>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="glass-panel bg-surface-container-lowest w-full max-w-lg rounded-xl p-lg relative shadow-2xl scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="font-display-lg-mobile text-[24px] text-on-surface mb-md font-bold">Write a Review</h2>

            {!user ? (
              <div className="text-center py-lg">
                <span className="material-symbols-outlined text-[48px] text-primary mb-sm">lock</span>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">You need to be logged in to share your experience.</p>
                <Link 
                  to="/login" 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(189,0,255,0.3)] transition-all duration-300 inline-block"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-md">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">YOUR NAME</label>
                  <input 
                    type="text" 
                    value={user.fullname || "Anonymous User"} 
                    readOnly 
                    className="w-full bg-surface-container border border-outline-variant text-on-surface-variant rounded-lg py-2 px-3 font-body-md text-body-md cursor-not-allowed opacity-70"
                  />
                </div>
                
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">RATING</label>
                  <div className="flex gap-1 text-primary-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                        className="hover:scale-110 transition-transform focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">YOUR REVIEW</label>
                  <textarea 
                    rows="4" 
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what you think about your purchase..."
                    className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg py-2 px-3 font-body-md text-body-md input-glow transition-all resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="pt-sm flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-4 py-2 font-button text-button text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(189,0,255,0.3)] transition-all duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
