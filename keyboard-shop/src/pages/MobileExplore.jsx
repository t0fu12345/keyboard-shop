import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const keyboards = [
  {
    id: 1,
    name: "Onyx 65 Pro",
    specs: "Custom Aluminum Gasket Mount",
    price: 249.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSiFbAWkKbs2WD9vAYcyldbGm2aMnmgZDmfaWYatVQb1oJvbNL52aeYOy6XalEgCNyZL-Uv3henS5I1zU7KlVkpH2yMDueXTOA4Tuf1SwEgGdB6L39vhHIreD8D8rMq4k-rkHf9rMiHDmn8xGyzn1NBIW7WbAlSeABqDrG6q1OitIUYAT6J1yIW9n2bwdamMeKoCon5hChW6cYmGea6xUGOjNI9Mr9i4_9A0-L3w4mw80J2R659apFcHJ3HH3sXIpSBJ6rG60Gjng"
  },
  {
    id: 2,
    name: "Glacier 60",
    specs: "Frosted Polycarbonate Case",
    price: 189.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBggJoswJZAU-YOklRTNtC7XsmQ6lyWfRPuFTYb_M51R8vqkOZpIaglS2tDsHDuGz9a5p_tMGN6DFdtMJAeK8gqmuxmS0MjwTole6A2InP5SHLJ9x2tSQgXk7Bz2s1MSYMfJcgVTVSX3vjtNs5TDwdbNTWH8JyqZWm3VXrWLmeVGvinby_ZAKF_sslooRMFlgm42d78nrTC1YperfkpGMKEw6dRm7Ids8g8H92L1tH9_NuxLDk-iIjkrX0OPwWNhqE2_ztlhTVNyco"
  }
];

const keycaps = [
  {
    id: "k1",
    name: "Nocturnal Purple",
    specs: "PBT Double-shot",
    price: 89.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxS0nJqQYBpaZ1EkP-Xz3Bu29e8XS16KXY2uR75rpwEhdO4hKW50ewZqcGXahxdSCHID1sXQDkv1Jqa0aYlbgB4Q37TZfZOHj7bZP56z7OE6KZ_AW-EnPsp-hS_UpflSp1yyO-sbHgXIskDu-LdkhazoGOCBDMt4T_V1SA5osg1gk9oegs3px5ZpaOZT7lkF6KqfUohfAB3bLYKkB9TZ1Xfv_boIcnFWBUZAOn6U0tvmrR9mHLmwSmFW6DVkFImmhO26DR6Nyl_fU"
  },
  {
    id: "k3",
    name: "Cyber-tactile V2",
    specs: "ABS Laser-etched",
    price: 75.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTgSpeImYERkgmoGpmY4La2q-WUxDDIjCPu8Kjtz6zFwC7Sa0MVbvNjeVQPrIBAmD98B-NcVHAkWyZqcp5SzjX1cp0aaB-6u1qMLSBTgAWJjhMVs96QZ-xFI-4Y6j964RmEDXT-P_cUbBW3sgCqKo9gPwIAz6ECp_u9iozgakQck3CqheQbA4i6JlJm8r9UvWUyjSx-P_PwFxcxW5NnvdIWYkD_Xk8QgEKafPABEMMaN3GmjFmv64pBjFylFDH3eoozlE1JKSXe9U"
  }
];

const accessories = [
  {
    id: "a1",
    name: "Pro Coiled Cable",
    specs: "Hand-braided paracord",
    price: 55.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHH1dx5xEx051K4D0ymfeJpld9o9KRGGke6mO-sNWluZM_SBtOazkPpzjfmQ8nDyR4fl8L04v18BUjGRF8NxWyc2d0dlkDfWEpIOmzETJnkS_XLDOrPHP_iEO1ImKohFAiXH8dYn4myrMPooMhgCjhS5HBXeMkdv6WM_erlV2xY6Ky5oYRApleL_gz1GQr7RcaEk6nCW3Upu1PcJM8Owv4Xa4rGR_ASq4FipZSyzaSFmff6zkonYYmNgnU4c6yfMD8cT26Dh25wNE"
  },
  {
    id: "a2",
    name: "Merino Wool Desk Mat",
    specs: "900x400mm size",
    price: 35.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwW8osD7YuvOccSwxn-JqTG8B9eCHzCowVdEKpQdg5WNCymLWoXMYSBGcqm52RUug4aQUmlGMYoHdGYi7MXkHRc9XegQFkovusHe1-lZwxwOpTq8hQPMsvsNzed0QfbdWxuXDoc-vD6mfeqtVcX7HaemxTxeADP05Fd9Eq86Uweqh1wLOZB8lr1ujXTb3YXKA4v_GlTo02hwY5qcATzylNBPUPdjdK9niNrgw5DZJK2tkQzZRTafp-z_x5rGdQBf5aXKPmSQiom18"
  }
];

const switches = [
  {
    id: "s1",
    name: "Gateron Ink Black V2",
    specs: "Linear. Smoky housing.",
    price: 9.00,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPEaZClzXo-Tcre-9EB-Ll23ePPEvkNv7BInQb9VEYFh_BIwjY0yxxvTHOnbv5q0OdBec672QseQjL3pz9C1iUMQLFfjrR5ZDg7bd_Mr3038S9Sl1HzCKu0_fxSSCjAiKS5pSMYfXj4UAEEiNabT4yXbzNgjUWmedZfZeupxcq_dh31_l6e2yXPv2eUXZhmUM212Yo-aTky3cf4T21T3ISi5TI_HVHL60IMPlf8F3kdFFzPljc60EDXnMNIa67i64RskV4PFAOCKQ"
  },
  {
    id: "s2",
    name: "ZealPC Zealios V2",
    specs: "Crisp bump tactile.",
    price: 13.50,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh1vqGToMABd8RavsxRyR7geeLlHqGlyB1NpMH8uL1c0IySDmFbXCjXdBp_zvRbKSTMRDDq_vGEOuMDG5bjSGOcpO-XoyTfAvjnF1Df1RzYzGzoU6BlZIvPNwMUaxXP2-E_qVzyW1qcB4iGewPrnj9jxwIuVkIGfzwz1AIAj7J6FvjwvUdQqnHjGez6uu5feaVwgRKERL4pXQgZJnfuIijMJXDT51PA45LiNE6tc93-uQa3BnpPzMozM91Nwm_2hYu2P4NyjjAHM"
  }
];

export default function MobileExplore() {
  const keyboardRef = useRef(null);
  const keycapRef = useRef(null);
  const accessoryRef = useRef(null);
  const switchRef = useRef(null);
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch default title on mount
    window.dispatchEvent(new CustomEvent('updateMobileTitle', { detail: 'Khám phá' }));

    const observer = new IntersectionObserver((entries) => {
      // Find the most visible section
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Just pick the first one intersecting
        const title = visibleEntries[0].target.getAttribute('data-title');
        window.dispatchEvent(new CustomEvent('updateMobileTitle', { detail: title }));
      }
    }, { threshold: 0.3 });

    if (keyboardRef.current) observer.observe(keyboardRef.current);
    if (keycapRef.current) observer.observe(keycapRef.current);
    if (accessoryRef.current) observer.observe(accessoryRef.current);
    if (switchRef.current) observer.observe(switchRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
    <div className="px-margin-mobile flex flex-col gap-12 max-w-md mx-auto md:hidden pb-12">
      {/* Keyboard Section */}
      <section ref={keyboardRef} data-title="Bàn phím" className="flex flex-col gap-4 scroll-mt-24">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Bàn phím</h2>
        </div>
        <div className="flex flex-col gap-4">
          {keyboards.map(kb => (
            <article key={kb.id} className="bento-card overflow-hidden">
              <img alt={kb.name} className="w-full h-48 object-cover" src={kb.img} />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">{kb.name}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{kb.specs}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-body-lg text-body-lg font-bold text-primary">${kb.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <button onClick={(e) => handleAddToCart(e, kb)} className="border border-primary text-primary hover:bg-primary-container/10 transition-colors px-3 py-2 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    </button>
                    <Link to={`/product/${kb.id}`} className="btn-primary px-4 py-2 rounded-full font-label-sm text-label-sm flex items-center justify-center">Xem ngay</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link to="/products" className="border border-primary text-primary text-center w-full py-3 rounded-full font-label-sm text-label-sm mt-2 block hover:bg-primary-container/10 transition-colors">
          Xem tất cả Bàn phím
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-surface-container-high"></div>

      {/* Keycaps Section */}
      <section ref={keycapRef} data-title="Keycaps" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display-lg-mobile text-[28px] font-bold text-on-surface leading-tight mb-2">Keycaps</h2>
        <div className="grid grid-cols-2 gap-4">
          {keycaps.map(kc => (
            <article key={kc.id} className="bento-card overflow-hidden flex flex-col">
              <img alt={kc.name} className="w-full h-32 object-cover" src={kc.img} />
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-surface leading-snug">{kc.name}</h3>
                  <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">{kc.specs}</p>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="font-body-md text-body-md font-bold text-primary">${kc.price.toFixed(2)}</span>
                  <div className="flex justify-between gap-1">
                    <button onClick={(e) => handleAddToCart(e, kc)} className="border border-primary text-primary hover:bg-primary-container/10 transition-colors flex-1 py-1.5 rounded font-label-sm text-[10px] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                    </button>
                    <Link to={`/product/${kc.id}`} className="btn-primary flex-1 py-1.5 rounded font-label-sm text-[10px] flex items-center justify-center">
                      Xem
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link to="/keycaps" className="border border-primary text-primary text-center w-full py-3 rounded-full font-label-sm text-label-sm mt-2 block hover:bg-primary-container/10 transition-colors">
          Xem tất cả Keycaps
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-surface-container-high"></div>

      {/* Switches Section */}
      <section ref={switchRef} data-title="Switches" className="flex flex-col gap-4 scroll-mt-24">
        <h2 className="font-display-lg-mobile text-[28px] font-bold text-on-surface leading-tight mb-2">Switches</h2>
        <div className="grid grid-cols-2 gap-4">
          {switches.map(sw => (
            <article key={sw.id} className="bento-card overflow-hidden flex flex-col">
              <img alt={sw.name} className="w-full h-32 object-cover" src={sw.img} />
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-surface leading-snug">{sw.name}</h3>
                  <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">{sw.specs}</p>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="font-body-md text-body-md font-bold text-primary">${sw.price.toFixed(2)}</span>
                  <div className="flex justify-between gap-1">
                    <button onClick={(e) => handleAddToCart(e, sw)} className="border border-primary text-primary hover:bg-primary-container/10 transition-colors flex-1 py-1.5 rounded font-label-sm text-[10px] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                    </button>
                    <Link to={`/product/${sw.id}`} className="btn-primary flex-1 py-1.5 rounded font-label-sm text-[10px] flex items-center justify-center">
                      Xem
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link to="/switches" className="border border-primary text-primary text-center w-full py-3 rounded-full font-label-sm text-label-sm mt-2 block hover:bg-primary-container/10 transition-colors">
          Xem tất cả Switches
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-surface-container-high"></div>

      {/* Accessories Section */}
      <section ref={accessoryRef} data-title="Phụ kiện" className="flex flex-col gap-4 scroll-mt-24">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-display-lg-mobile text-[28px] font-bold text-on-surface leading-tight mb-2">Phụ kiện</h2>
        </div>
        <div className="flex flex-col gap-4">
          {accessories.map(acc => (
            <article key={acc.id} className="bento-card overflow-hidden">
              <img alt={acc.name} className="w-full h-48 object-cover" src={acc.img} />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">{acc.name}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{acc.specs}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-body-lg text-body-lg font-bold text-primary">${acc.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <button onClick={(e) => handleAddToCart(e, acc)} className="border border-primary text-primary hover:bg-primary-container/10 transition-colors px-3 py-2 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    </button>
                    <Link to={`/product/${acc.id}`} className="btn-primary px-4 py-2 rounded-full font-label-sm text-label-sm flex items-center justify-center">Xem ngay</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link to="/accessories" className="border border-primary text-primary text-center w-full py-3 rounded-full font-label-sm text-label-sm mt-2 block hover:bg-primary-container/10 transition-colors">
          Xem tất cả Phụ kiện
        </Link>
      </section>
    </div>
  );
}
