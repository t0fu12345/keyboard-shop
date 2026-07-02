import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const allProducts = [
  { id: "1", name: "Onyx 65 Pro", specs: "CNC Aluminum • Hot-swappable • Tactile", price: 320.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxJYBKsVhq-QPIWtbaI_uHabU51YF8fN-PkIWa4qAZhOMCjZ6onz0fBiVZWzoaWciU5UwgoNgoVWwZZA9-cBkIiyhcgCLBbrg2hHRLYtsoO7OyqldCeAfZb-sUdY4q3DO4L-FipxDlpRML0PWlI6k0Vz4lASA6zHQgg7-EgRVAC884Horf2SZHEjLaTORb8yVd7TCyieNOjIcd79U3fIpCNVwCsa1YzE_wiZyBOfewrbtkGWsAHQopFJD7EFq7-6stxLzujKDTwdw" },
  { id: "2", name: "Glacier 60", specs: "Frosted PC • Hot-swappable • Linear", price: 280.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTezUOidlY6Qju3W53leMwOrReZyKe47--EP4EQRnG9aUPslNQhJupuEbgd6usuq40FoOsb4mSfHG9--W1tsN3-7c7vFH0UT2clBCE0gdVOcNVVKWLznv8JSxMzVwVpfiaI8NhqU1qjRWnNkl3nbMMeDyL2QI3yk-ug5Ap_mbootWEzQFiE66f-NXtw8slnt9ToDxa4ObupQ13UDftOHx44iPPhcWNc2Rce20RAiv7rBGTbX_JnRS6eKPU7KqiG5HBx-fMp6hMYAA" },
  { id: "3", name: "Specter TKL", specs: "CNC Aluminum • Top Mount • Tactile", price: 390.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfnJ1U-9fEAveMXQy0se07PWLYkqsyEYdHj3BaZxRSfbhLntEw8dh3rvFH82fvBLsH-t4joB2zkeo_ERUF5YHcRZ0CFtwPhB2XAGF0lsNiZf2PoXyaKW-Q2Qdd_OOr77tJXItgtm3tkhQ5WpUeh1-Xm78wTZhBwqKN9ZsZAx2GUhuIBiO-Nw6-eehee__5pGDsibygliuq3OWMuJ0U4DVqiH81CKxkMIaUXuOy3_S9-JtzrPWLc6_BPp0xTQzBzzPjxqYMJXFIL0" },
  { id: "k1", name: "Nocturnal Purple", specs: "PBT Double-shot", price: 89.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxS0nJqQYBpaZ1EkP-Xz3Bu29e8XS16KXY2uR75rpwEhdO4hKW50ewZqcGXahxdSCHID1sXQDkv1Jqa0aYlbgB4Q37TZfZOHj7bZP56z7OE6KZ_AW-EnPsp-hS_UpflSp1yyO-sbHgXIskDu-LdkhazoGOCBDMt4T_V1SA5osg1gk9oegs3px5ZpaOZT7lkF6KqfUohfAB3bLYKkB9TZ1Xfv_boIcnFWBUZAOn6U0tvmrR9mHLmwSmFW6DVkFImmhO26DR6Nyl_fU" },
  { id: "k2", name: "Modern Minimalist Grey", specs: "ABS High-grade. OEM Profile.", price: 50.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLRtPBoOF9XsKl0GXwOE3MKZ4_89NDqt-01W08KuCMjd2KywU_I3JWNJLkbMfGEHvMMHvjl-0ysoiho6IKdXvabjbUz0BD-YYGz8jzWQw7tp9GDtRIFg-g7xZVvHyRVdzdS--oBIjpw2mtNBTdULEPb9JZYt0vaN_Z1oA-TyvSAjMEH27Ri66Hsyqhv2-xlhDF29Pq2NSdf0qxSzgZ2qN6N3O2M0_nsqI34G-U9-NyRRlol_7_bgb4j4ROk3WWTBEBZQRkX9849hg" },
  { id: "k3", name: "Cyber-tactile V2", specs: "ABS Laser-etched", price: 75.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTgSpeImYERkgmoGpmY4La2q-WUxDDIjCPu8Kjtz6zFwC7Sa0MVbvNjeVQPrIBAmD98B-NcVHAkWyZqcp5SzjX1cp0aaB-6u1qMLSBTgAWJjhMVs96QZ-xFI-4Y6j964RmEDXT-P_cUbBW3sgCqKo9gPwIAz6ECp_u9iozgakQck3CqheQbA4i6JlJm8r9UvWUyjSx-P_PwFxcxW5NnvdIWYkD_Xk8QgEKafPABEMMaN3GmjFmv64pBjFylFDH3eoozlE1JKSXe9U" },
  { id: "k4", name: "Frosted Glass Edition", specs: "Polycarbonate. Cherry Profile.", price: 70.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzeRygPjIBrXJ5xFmwUAJhrM8FvCOmlpi18_sIKZip7_EsKu1g8Ic91s12yzUHM-TRZLDtgltqtX-ttniGoJmI9pRF88hxdjRdEDJFlukQQSh7RmhMbFMuJkzQSJFVuWhzjfjRE2Q4edKhVJ1XnQw1GhjCjWA2M8q_O-zaLhPF4yzp21EYcSULnqXgKv4bqLqdjCUa5o3U8nL2YuxfCxqAYV41J6c9xNqq2-3LLmHd5iK1yB5yiLKysqVt7wTMnAREwFYjJZSbgWg" },
  { id: "k5", name: "Artisan Roast", specs: "PBT Dye-sub. SA Profile.", price: 99.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYS-LqNBNRQpbU7A4WPDbQvn8sCKYZw1K098tXXOCX-4AwEKjL2zhnqSJCQB0xb1kVvVKBMDdt9RfUD6tKa2xtMClxsSRTvSY_vTIsa4KOvr7gmcKAMfKOpy9og6inM-0vSFZCW7hJOnvzSjgxQhSYK3iJLkuW-fxHG6yE6DOLdzkgr8dUUu50WthpdeKBt9-3eHVXSr84l-n8VPAhd-q01w89cZjGKVhmRHrZrcSRU8qTPUpIg3nFYInDKiYgl7t4LQHj1f-58-Y" },
  { id: "s1", name: "Gateron Ink Black V2", specs: "Linear. Smoky housing.", price: 9.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPEaZClzXo-Tcre-9EB-Ll23ePPEvkNv7BInQb9VEYFh_BIwjY0yxxvTHOnbv5q0OdBec672QseQjL3pz9C1iUMQLFfjrR5ZDg7bd_Mr3038S9Sl1HzCKu0_fxSSCjAiKS5pSMYfXj4UAEEiNabT4yXbzNgjUWmedZfZeupxcq_dh31_l6e2yXPv2eUXZhmUM212Yo-aTky3cf4T21T3ISi5TI_HVHL60IMPlf8F3kdFFzPljc60EDXnMNIa67i64RskV4PFAOCKQ" },
  { id: "s2", name: "ZealPC Zealios V2", specs: "Crisp bump tactile.", price: 13.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh1vqGToMABd8RavsxRyR7geeLlHqGlyB1NpMH8uL1c0IySDmFbXCjXdBp_zvRbKSTMRDDq_vGEOuMDG5bjSGOcpO-XoyTfAvjnF1Df1RzYzGzoU6BlZIvPNwMUaxXP2-E_qVzyW1qcB4iGewPrnj9jxwIuVkIGfzwz1AIAj7J6FvjwvUdQqnHjGez6uu5feaVwgRKERL4pXQgZJnfuIijMJXDT51PA45LiNE6tc93-uQa3BnpPzMozM91Nwm_2hYu2P4NyjjAHM" },
  { id: "s3", name: "Cherry MX Blue", specs: "Classic clicky sound.", price: 5.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHE_XIQruLIFQgytdzGOt8TkTg3r7_J3L8niojwrOWn9Irp4DC-QZr0W-1gcF21qX26hzQ6azwCgdaJqp8bOY1WKyzX5GsBcISKRhPMieJD9zLeBSbo9aV8xBAImpAnzqcuRuW7Bif7zlB7E1j4FNY76v3PCdvLITDGpNyLIeNKkvQDI6NNncYuvLCRBO9GCqg7tc1mFJSDW-U8Sux3YqNi7RvxcUF1YnG9voD1J39SKSxOtUy8cml_qmb8EQlxXtF7DrN9VMYWXk" },
  { id: "a1", name: "Pro Coiled Cable", specs: "Hand-braided paracord", price: 55.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHH1dx5xEx051K4D0ymfeJpld9o9KRGGke6mO-sNWluZM_SBtOazkPpzjfmQ8nDyR4fl8L04v18BUjGRF8NxWyc2d0dlkDfWEpIOmzETJnkS_XLDOrPHP_iEO1ImKohFAiXH8dYn4myrMPooMhgCjhS5HBXeMkdv6WM_erlV2xY6Ky5oYRApleL_gz1GQr7RcaEk6nCW3Upu1PcJM8Owv4Xa4rGR_ASq4FipZSyzaSFmff6zkonYYmNgnU4c6yfMD8cT26Dh25wNE" },
  { id: "a2", name: "Merino Wool Desk Mat", specs: "900x400mm size", price: 35.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwW8osD7YuvOccSwxn-JqTG8B9eCHzCowVdEKpQdg5WNCymLWoXMYSBGcqm52RUug4aQUmlGMYoHdGYi7MXkHRc9XegQFkovusHe1-lZwxwOpTq8hQPMsvsNzed0QfbdWxuXDoc-vD6mfeqtVcX7HaemxTxeADP05Fd9Eq86Uweqh1wLOZB8lr1ujXTb3YXKA4v_GlTo02hwY5qcATzylNBPUPdjdK9niNrgw5DZJK2tkQzZRTafp-z_x5rGdQBf5aXKPmSQiom18" },
  { id: "a3", name: "Titanium Tool Kit", specs: "Stainless steel, ergonomic design.", price: 15.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoUKm80mXvV3G9CcdjlUUjpHIgxLTb9Px_1HduIgE7eEO5E76NagNvb4tIr5QyczTIOq4r0mAzTKkdmPYXxBsxYfzpEm1mkIcD22hhTi0ZVptjGt1Imfdc3acYZZCl43d2LlD_-PDjQ1vYS1qeD6GwhduO8cRfahtdRvhi2GugHzvWDBZHthIsMB5uRUONw5OlY3MYLScG1R4dhzOmI7exaR1Y6puM841bn36VCwnj6xGoPMBYeR9RlUMH_O92wrWFNo7fvv5egOE" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === String(id)) || {
    id: "apex-75",
    name: "The Apex-75 Custom",
    specs: "75% / Alu 6063",
    price: 249.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMozIPqju1VzZCs-27vFFEFmz0qHqxKIDV3hEZdkmvU7FBJujXjpCo5Lrr7q490t33G2OZMNsXHqzp49nqOAxVfFmjRiIRsQFP2ohZ-EQhljLeY5yVq2in0xicoLj8iBMDdynCFpLLd2tZXBDoHpPjm5bpSJKi5JzPl07FlEoaAYki-ji1It7wbI55My4J3aCXc5Q9RJO6xs5YXek6MYzXXR79upoAhcOPSnXXlYi1Rjf3W00Kg99zKi4U6pbGhVsspeKWpeYiSQ4"
  };
  const images = [
    product.img,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQsLstPFbP2ZTylker-jACxtpiHMxr4baWUjfWWIWyYdSmnBljd6KTrkslpdugMmLcmdXUFDHAqHADXrxBayonEA8HcyISMMb4oA_TvbGus6QJnMhD-p70cEPbaZRxjFPeKvm8zZFcXftMmpTDXvBlp4iRoee9j5j1qdy4nHzrgAq9uxWHoXE8zDlzhKmr2PlzjpqNtPb5JhU35QPCcXzZzEqLfOT61YO8gKrNdqlKdrG8t9c8bCqSFQBm8kAv9kMNQoIgTsE1V-c",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvJ_774iwBL4VsM2O61vSC9DzazSsc4SRXPOJ5mO2k5EECBP-fVci2lqiqWFjRu80we5iogULUPBrmI0rbdu84cLlr-cVfqvyVZYaHPBdpU1wsh3IU1qe6X6QJb1azejn7UROfYGj9k_reXhNmx1ki9clwl-9TvtSYTspnx2gtnAswCPiUibKvnU55OlJX1n0zaHv5Hx0_OQYDHZnffZkCc1dJSUPIws4hrxOMEU4bFvzQ8PbzLMw2-T7raN0d3n5gFXeYauCOqU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuABfw1EgaarIHGn6MJ0P3zIv3xhJBpkIw6ZBNw5DPTooCfZwq2-HywnEUfNVgRoz4eaxY-KrLwLg1ETUqwITvE_X6aDt1OmsmYOKBaq6knJN6gUgjPSL1EaO0d8ali4sop0EL2KFsc20l_or9g0yIJY0zi7Kw7a_y0qeoQOz2lMl0y5jx4I2Jy7YFapu6kpWEs86a1y9caWu-jXnF9K3jPH3YPsyY8jMYSPcsuMCtTWGVbOFVnDm74omdq3F1rTqA9GD2EfjgkDh3o"
  ];
  const [mainImage, setMainImage] = useState(images[0]);
  
  // Re-sync main image when route ID changes
  useEffect(() => {
    setMainImage(product.img);
  }, [product.img]);
  
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
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      status: "In Stock",
      specs: product.specs,
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
        <Link className="hover:text-primary transition-colors" to="/products">Store</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary">{product.name}</span>
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
              <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container">PREMIUM</span>
              <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container">IN STOCK</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">{product.name}</h1>
            <p className="font-headline-md text-on-surface-variant">${product.price.toFixed(2)}</p>
          </div>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            {product.specs}. Designed with absolute attention to detail, crafted from premium materials.
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
