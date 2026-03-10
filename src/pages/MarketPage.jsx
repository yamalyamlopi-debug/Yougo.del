// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MarketPage.jsx — Market stores grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, IcoSearch, IcoStar, IcoClock } from "../components/Icons";
import BottomNav from "../components/BottomNav";

const CATS = ["הכל","סופרמרקט","פארמה","אלכוהול","חיות מחמד","אלקטרוניקה","פרחים"];

const STORES = [
  { id:"s1", name:"שופרסל אקספרס", cat:"סופרמרקט", emoji:"🛒", rating:4.4, time:20, fee:15, open:true, badge:"כשר" },
  { id:"s2", name:"רמי לוי", cat:"סופרמרקט", emoji:"🏪", rating:4.2, time:30, fee:12, open:true, badge:null },
  { id:"s3", name:"סופר פארם", cat:"פארמה", emoji:"💊", rating:4.6, time:25, fee:10, open:true, badge:"24/7" },
  { id:"s4", name:"Boot´s פארמסי", cat:"פארמה", emoji:"🧴", rating:4.5, time:30, fee:10, open:false, badge:null },
  { id:"s5", name:"ויקטורי", cat:"סופרמרקט", emoji:"🥬", rating:4.3, time:25, fee:0, open:true, badge:"אורגני" },
  { id:"s6", name:"פאונד קפה אלכוהול", cat:"אלכוהול", emoji:"🍷", rating:4.7, time:20, fee:18, open:true, badge:null },
  { id:"s7", name:"זולו פט", cat:"חיות מחמד", emoji:"🐾", rating:4.5, time:35, fee:12, open:true, badge:null },
  { id:"s8", name:"iDigital", cat:"אלקטרוניקה", emoji:"📱", rating:4.2, time:60, fee:20, open:true, badge:"מורשה Apple" },
  { id:"s9", name:"שוק הפרחים", cat:"פרחים", emoji:"🌸", rating:4.8, time:30, fee:15, open:true, badge:null },
];

export default function MarketPage({ cartCount }) {
  const navigate = useNavigate();
  const [cat, setCat] = useState("הכל");
  const [search, setSearch] = useState("");

  const filtered = STORES.filter(s =>
    (cat === "הכל" || s.cat === cat) &&
    (s.name.includes(search) || s.cat.includes(search))
  );

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "44px 20px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ color: "white", fontSize: 26, fontWeight: 900, marginBottom: 14 }}>מרקט 🛍️</div>
        <div style={{ display: "flex", alignItems: "center", background: "white", borderRadius: 14, padding: "11px 14px", gap: 10 }}>
          <IcoSearch s={18} c={C.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="חיפוש חנות..."
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "Arial,sans-serif", direction: "rtl", background: "transparent", color: C.dark }} />
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Categories */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 8px", scrollbarWidth: "none" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: "none", background: cat === c ? C.red : "white", color: cat === c ? "white" : C.gray, fontSize: 12, fontWeight: cat === c ? 700 : 500, cursor: "pointer", boxShadow: cat === c ? "0 2px 10px rgba(200,16,46,0.3)" : "0 1px 4px rgba(0,0,0,0.07)", fontFamily: "Arial,sans-serif" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured banner */}
        {cat === "הכל" && !search && (
          <div style={{ background: "linear-gradient(135deg,#111827,#1f2937)", borderRadius: 18, padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 42 }}>🚀</div>
            <div>
              <div style={{ color: "white", fontSize: 16, fontWeight: 900 }}>מהיר כמו מחשבה</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 3 }}>משלוח אקספרס ב-20 דקות</div>
            </div>
          </div>
        )}

        {/* Store count */}
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
          {cat === "הכל" ? "כל החנויות" : cat}
          <span style={{ color: C.gray, fontWeight: 400, marginRight: 6 }}>({filtered.length} חנויות)</span>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map(store => (
            <div key={store.id}
              style={{ background: "white", borderRadius: 18, padding: "16px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", cursor: store.open ? "pointer" : "default", opacity: store.open ? 1 : 0.55, position: "relative" }}>
              {!store.open && (
                <div style={{ position: "absolute", top: 10, left: 10, background: C.dark, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>סגור</div>
              )}
              {store.badge && (
                <div style={{ position: "absolute", top: 10, right: 10, background: C.red, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{store.badge}</div>
              )}
              <div style={{ fontSize: 42, textAlign: "center", marginBottom: 10 }}>{store.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: C.dark, textAlign: "center", marginBottom: 4 }}>{store.name}</div>
              <div style={{ fontSize: 11, color: C.gray, textAlign: "center", marginBottom: 8 }}>{store.cat}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: C.dark, display: "flex", alignItems: "center", gap: 2 }}>
                  ⭐ {store.rating}
                </span>
                <span style={{ fontSize: 11, color: C.gray, display: "flex", alignItems: "center", gap: 2 }}>
                  <IcoClock s={10} c={C.gray} /> {store.time}
                </span>
              </div>
              <div style={{ textAlign: "center", marginTop: 6, fontSize: 11, color: store.fee === 0 ? C.green : C.gray }}>
                {store.fee === 0 ? "🟢 משלוח חינם" : `₪${store.fee} משלוח`}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px 0", color: C.gray }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>לא נמצאו חנויות</div>
          </div>
        )}

      </div>

      <BottomNav cartCount={cartCount} />
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
