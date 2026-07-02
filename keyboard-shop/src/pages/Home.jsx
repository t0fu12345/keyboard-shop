import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-[819px] flex items-center justify-center mb-32">
        <div className="absolute inset-0 z-0">
          <div className="bg-cover bg-center w-full h-full opacity-30 rounded-xl glow-effect" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfzT0Ac7nSh3Ypic-ThHKO2W7687amwKihvH-Mn796HPgZDWCmwpGOxmOyaNj4gMg0GXiYeTMsuAPBzB7E47m7UhM40aNAIVH5Sqpq6f8u44l5OS_kf7U2zsI6gbuq47fwJ-g87O_YiCBKBoSeHJJdBKWKcGifrD2JpFc7hgrSBHRDLV4a3hEEwpesMpOeF1gNVaBpVLO9V9Bb8ItFWZgIldj0vHJIo_1oPcWTfWCDG7TJWK8zWQabg3PkSa3uM7j_jvG4BPt-KoE')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent rounded-xl"></div>
        </div>
        <div className="relative z-10 text-center space-y-8 glass-panel p-8 md:p-12 rounded-xl max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container border border-secondary-container text-on-secondary-container font-label-mono text-label-mono">NEW: TITANIUM SERIES</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            ENGINEERED FOR PRECISION. <br/><span className="text-primary">DESIGNED FOR YOU.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Elevate your typing experience with bespoke, hand-assembled mechanical keyboards crafted for enthusiasts who demand tactile perfection.
          </p>
          <div className="pt-4">
            <Link to="/products" className="btn-primary font-button text-button px-8 py-4 rounded-lg uppercase tracking-wider inline-block">Explore Collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
