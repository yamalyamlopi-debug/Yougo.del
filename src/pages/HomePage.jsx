// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HomePage.jsx — Restaurant list, banners, search
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { C, IcoSearch, IcoStar, IcoClock, IcoTruck, IcoFire, IcoGift, IcoPin, IcoStore } from "../components/Icons";
import BottomNav from "../components/BottomNav";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["הכל","פיצה","המבורגר","סושי","פלאפל","עוף","סלטים","קינוחים","שתייה"];

const MOCK_RESTAURANTS = [
  { id:"r1", name:"פיצה רומא", cuisine:"פיצה", rating:4.8, delivery_time:25, delivery_fee:12, min_order:60, image:"🍕", is_popular:true, is_open:true, category:"פיצה" },
  { id:"r2", name:"בורגר הבית", cuisine:"המבורגר", rating:4.6, delivery_time:20, delivery_fee:0, min_order:80, image:"🍔", is_popular:true, is_open:true, category:"המבורגר" },
  { id:"r3", name:"סושי עם רוח", cuisine:"סושי", rating:4.9, delivery_time:35, delivery_fee:15, min_order:100, image:"🍣", is_popular:false, is_open:true, category:"סושי" },
  { id:"r4", name:"פלאפל אבו נאסר", cuisine:"פלאפל", rating:4.7, delivery_time:15, delivery_fee:0, min_order:40, image:"🧆", is_popular:true, is_open:true, category:"פלאפל" },
  { id:"r5", name:"שיפודי הכפר", cuisine:"עוף", rating:4.5, delivery_time:30, delivery_fee:10, min_order:70, image:"🍗", is_popular:false, is_open:false, category:"עוף" },
  { id:"r6", name:"סלט ומה שביניהם", cuisine:"סלטים", rating:4.3, delivery_time:20, delivery_fee:8, min_order:50, image:"🥗", is_popular:false, is_open:true, category:"סלטים" },
  { id:"r7", name:"גלידריה דולצ׳ה", cuisine:"קינוחים", rating:4.9, delivery_time:25, delivery_fee:12, min_order:45, image:"🍦", is_popular:true, is_open:true, category:"קינוחים" },
];

const BANNERS = [
  { id:1, bg:"linear-gradient(135deg,#C8102E,#7B0D1E)", emoji:"🎁", title:"משלוח חינם!", sub:"בהזמנה מעל ₪150", tag:"מוגבל בזמן" },
  { id:2, bg:"linear-gradient(135deg,#F97316,#DC2626)", emoji:"🔥", title:"קוד: NAAT10", sub:"10% הנחה על כל הזמנה", tag:"קוד פרומו" },
  { id:3, bg:"linear-gradient(135deg,#8B5CF6,#3B82F6)", emoji:"⚡", title:"משלוח מהיר", sub:"פחות מ-30 דקות מובטחות", tag:"חדש" },
];

export default function HomePage({ cart, add, rem, cartCount }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("הכל");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const bannerRef = useRef(null);

  // Auto-scroll banner every 3.8s
  useEffect(() => {
    const t = setInterval(() => setBannerIdx(p => (p + 1) % BANNERS.length), 3800);
    return () => clearInterval(t);
  }, []);

  // Try to load from Supabase, fallback to mock
  useEffect(() => {
    supabase.from("restaurants").select("*").eq("is_approved", true)
      .then(({ data }) => { if (data && data.length > 0) setRestaurants(data); })
      .catch(() => {});
  }, []);

  const filtered = restaurants.filter(r => {
    const matchCat = cat === "הכל" || r.category === cat || r.cuisine === cat;
    const matchSearch = r.name.includes(search) || r.cuisine.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "44px 20px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>משלוח אל</div>
            <div style={{ color: "white", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
              <IcoPin s={14} c="white" /> תל אביב, ישראל
            </div>
          </div>
          <div style={{ color: "white", fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>YOUGO</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", background: "white", borderRadius: 14, padding: "11px 14px", gap: 10 }}>
          <IcoSearch s={18} c={C.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="חיפוש מסעדה או מאכל..."
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "Arial,sans-serif", direction: "rtl", background: "transparent", color: C.dark }} />
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>

        {/* Banner carousel */}
        <div style={{ marginTop: 4, marginBottom: 16, position: "relative" }}>
          <div style={{ background: BANNERS[bannerIdx].bg, borderRadius: 18, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s ease", minHeight: 90 }}>
            <div>
              <div style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 6 }}>{BANNERS[bannerIdx].tag}</div>
              <div style={{ color: "white", fontSize: 18, fontWeight: 900 }}>{BANNERS[bannerIdx].title}</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 }}>{BANNERS[bannerIdx].sub}</div>
            </div>
            <div style={{ fontSize: 48 }}>{BANNERS[bannerIdx].emoji}</div>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
            {BANNERS.map((_, i) => (
              <div key={i} onClick={() => setBannerIdx(i)} style={{ width: i === bannerIdx ? 20 : 7, height: 7, borderRadius: 4, background: i === bannerIdx ? C.red : C.lightGray, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16, scrollbarWidth: "none" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: "none", background: cat === c ? C.red : "white", color: cat === c ? "white" : C.gray, fontSize: 12, fontWeight: cat === c ? 700 : 500, cursor: "pointer", boxShadow: cat === c ? "0 2px 10px rgba(200,16,46,0.3)" : "0 1px 4px rgba(0,0,0,0.07)", transition: "all 0.2s", fontFamily: "Arial,sans-serif" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Popular section */}
        {cat === "הכל" && !search && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <IcoFire s={16} /><span style={{ fontSize: 15, fontWeight: 800, color: C.dark }}>פופולרי עכשיו</span>
            </div>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", marginBottom: 20, paddingBottom: 4, scrollbarWidth: "none" }}>
              {restaurants.filter(r => r.is_popular && r.is_open).map(r => (
                <div key={r.id} onClick={() => navigate(`/restaurant/${r.id}`, { state: r })}
                  style={{ flexShrink: 0, width: 140, background: "white", borderRadius: 16, padding: "14px 12px", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: 36, textAlign: "center", marginBottom: 8 }}>{r.image}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, textAlign: "center", marginBottom: 4 }}>{r.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <IcoStar s={11} /><span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{r.rating}</span>
                    <span style={{ fontSize: 11, color: C.gray }}>· {r.delivery_time} דק׳</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All restaurants */}
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 12 }}>
          {cat === "הכל" ? "כל המסעדות" : cat} {filtered.length > 0 && <span style={{ color: C.gray, fontSize: 12, fontWeight: 500 }}>({filtered.length})</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.gray }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>לא נמצאו תוצאות</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>נסה לחפש משהו אחר</div>
          </div>
        ) : (
          filtered.map(r => (
            <div key={r.id} onClick={() => r.is_open && navigate(`/restaurant/${r.id}`, { state: r })}
              style={{ background: "white", borderRadius: 18, marginBottom: 12, padding: "14px", cursor: r.is_open ? "pointer" : "default", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", opacity: r.is_open ? 1 : 0.55, position: "relative" }}>
              {!r.is_open && (
                <div style={{ position: "absolute", top: 12, right: 14, background: C.dark, color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>סגור</div>
              )}
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 70, height: 70, borderRadius: 14, background: C.ultra, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{r.image}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: C.gray, marginBottom: 6 }}>{r.cuisine}</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: C.dark }}>
                      <IcoStar s={11} />{r.rating}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: C.gray }}>
                      <IcoClock s={11} c={C.gray} />{r.delivery_time} דק׳
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: r.delivery_fee === 0 ? C.green : C.gray }}>
                      <IcoTruck s={11} c={r.delivery_fee === 0 ? C.green : C.gray} />
                      {r.delivery_fee === 0 ? "משלוח חינם" : `₪${r.delivery_fee} משלוח`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Gift banner */}
        <div style={{ background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 18, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <IcoGift s={32} c="white" />
          <div>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800 }}>הזמן חבר, קבל ₪20!</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 }}>שתף את הקוד שלך ותרוויח</div>
          </div>
          <button onClick={() => navigate("/invite")}
            style={{ marginRight: "auto", background: "white", color: C.green, border: "none", borderRadius: 12, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>הזמן</button>
        </div>

      </div>

      <BottomNav cartCount={cartCount} />
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
