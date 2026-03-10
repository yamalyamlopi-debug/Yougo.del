// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RestaurantPage.jsx — Menu + Cart controls
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { C, IcoBack, IcoCart, IcoClock, IcoStar, IcoTruck, IcoPlus, IcoMinus, IcoFire } from "../components/Icons";
import { supabase } from "../lib/supabase";

const MOCK_MENU = {
  r1: [
    { id:"m1", name:"פיצה מרגריטה", description:"עגבניה, מוצרלה, בזיל", price:48, category:"פיצות", emoji:"🍕" },
    { id:"m2", name:"פיצה פסטו", description:"פסטו ביתי, עגבניות שרי, גבינת עיזים", price:58, category:"פיצות", emoji:"🍕" },
    { id:"m3", name:"פיצה BBQ", description:"עוף, בצל מקורמל, רוטב BBQ", price:62, category:"פיצות", emoji:"🍕" },
    { id:"m4", name:"כדורי בצק עם גבינה", description:"6 כדורים עם רוטב מרינרה", price:28, category:"תוספות", emoji:"🧀" },
    { id:"m5", name:"קולה", description:"250 מ\"ל", price:12, category:"שתייה", emoji:"🥤" },
  ],
  r2: [
    { id:"m6", name:"קלאסיק בורגר", description:"180 גר׳ בקר, חסה, עגבנייה, מלפפון חמוץ", price:55, category:"בורגרים", emoji:"🍔" },
    { id:"m7", name:"דאבל צ׳יזבורגר", description:"2×150 גר׳ בקר, 2 פרוסות גבינה", price:72, category:"בורגרים", emoji:"🍔" },
    { id:"m8", name:"צ׳יפס ביתי", description:"תפוחי אדמה טריים", price:22, category:"תוספות", emoji:"🍟" },
  ],
};

const DEFAULT_MENU = [
  { id:"d1", name:"מנת השף", description:"מנה מיוחדת של היום", price:65, category:"מנות עיקריות", emoji:"🍽️" },
  { id:"d2", name:"מנה קלה", description:"סלט ולחם", price:38, category:"סלטים", emoji:"🥗" },
  { id:"d3", name:"קינוח", description:"קינוח ביתי", price:22, category:"קינוחים", emoji:"🍰" },
];

export default function RestaurantPage({ cart, add, rem, cartCount, cartTotal }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: rest } = useLocation();
  const [menu, setMenu] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Try Supabase
    supabase.from("menu_items").select("*").eq("restaurant_id", id).eq("is_available", true)
      .then(({ data }) => {
        if (data && data.length > 0) setMenu(data);
        else setMenu(MOCK_MENU[id] || DEFAULT_MENU);
      })
      .catch(() => setMenu(MOCK_MENU[id] || DEFAULT_MENU));
  }, [id]);

  const sections = [...new Set(menu.map(m => m.category))];
  const cartItems = cart.filter(c => c.rid === id);
  const cartRestTotal = cartItems.reduce((s, c) => s + c.price * c.qty, 0);

  function getQty(itemId) {
    return cart.find(c => c.id === itemId && c.rid === id)?.qty || 0;
  }

  const r = rest || { name: "מסעדה", rating: 4.5, delivery_time: 25, delivery_fee: 12, min_order: 60, image: "🍽️", cuisine: "אוכל" };

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", paddingBottom: cartItems.length > 0 ? 100 : 20 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "44px 20px 65px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button onClick={() => navigate("/")}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <IcoBack s={18} c="white" />
          </button>
          <button onClick={() => navigate("/cart")} style={{ position: "relative", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <IcoCart s={18} c="white" />
            {cartCount > 0 && <span style={{ position: "absolute", top: -2, left: -2, background: C.gold, color: C.dark, fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
          </button>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{r.image}</div>
          <div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 900 }}>{r.name}</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 2 }}>{r.cuisine}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>
                ⭐ {r.rating}
              </span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>
                <IcoClock s={11} c="rgba(255,255,255,0.9)" /> {r.delivery_time} דק׳
              </span>
              <span style={{ color: r.delivery_fee === 0 ? "#86efac" : "rgba(255,255,255,0.9)", fontSize: 12 }}>
                {r.delivery_fee === 0 ? "🟢 משלוח חינם" : `₪${r.delivery_fee} משלוח`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      {sections.length > 1 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 16px 8px", scrollbarWidth: "none" }}>
          {sections.map(s => (
            <button key={s} onClick={() => setActiveSection(activeSection === s ? null : s)}
              style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", background: activeSection === s ? C.red : "white", color: activeSection === s ? "white" : C.gray, fontSize: 12, fontWeight: 600, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", fontFamily: "Arial,sans-serif" }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Menu */}
      <div style={{ padding: "0 16px 16px" }}>
        {sections.filter(s => !activeSection || s === activeSection).map(section => (
          <div key={section}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginTop: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <IcoFire s={14} /> {section}
            </div>
            {menu.filter(m => m.category === section).map(item => {
              const qty = getQty(item.id);
              return (
                <div key={item.id} style={{ background: "white", borderRadius: 16, padding: "14px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 58, height: 58, borderRadius: 12, background: C.ultra, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>{item.emoji || "🍽️"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{item.name}</div>
                    {item.description && <div style={{ fontSize: 12, color: C.gray, marginTop: 2, lineHeight: 1.4 }}>{item.description}</div>}
                    <div style={{ fontSize: 15, fontWeight: 900, color: C.red, marginTop: 6 }}>₪{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    {qty > 0 ? (
                      <>
                        <button onClick={() => rem(item.id, id)}
                          style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid " + C.lightGray, background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <IcoMinus s={13} c={C.dark} />
                        </button>
                        <span style={{ fontSize: 15, fontWeight: 900, color: C.dark, minWidth: 18, textAlign: "center" }}>{qty}</span>
                      </>
                    ) : null}
                    <button onClick={() => add(item, r)}
                      style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(200,16,46,0.35)" }}>
                      <IcoPlus s={16} c="white" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Cart bar */}
      {cartItems.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "12px 16px 20px", background: "white", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)" }}>
          <button onClick={() => navigate("/cart")}
            style={{ width: "100%", background: C.red, color: "white", border: "none", borderRadius: 16, padding: "15px 20px", fontSize: 15, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 16px rgba(200,16,46,0.35)" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "2px 10px", fontSize: 13 }}>{cartItems.reduce((s,c) => s + c.qty, 0)}</span>
            <span>מעבר לעגלה</span>
            <span>₪{cartRestTotal}</span>
          </button>
        </div>
      )}

      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
