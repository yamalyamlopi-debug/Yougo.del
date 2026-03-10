// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  OrdersPage.jsx — Order history with tabs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, IcoClock, IcoCheck, IcoClose, IcoFork } from "../components/Icons";
import BottomNav from "../components/BottomNav";
import { supabase } from "../lib/supabase";

const TABS = [
  { key: "all",       label: "הכל" },
  { key: "active",    label: "פעילות" },
  { key: "completed", label: "הושלמו" },
  { key: "cancelled", label: "בוטלו" },
];

const STATUS_MAP = {
  pending:    { label: "ממתין לאישור", color: C.gold,  icon: "⏳" },
  confirmed:  { label: "אושרה", color: C.blue,  icon: "✅" },
  preparing:  { label: "בהכנה", color: C.orange, icon: "👨‍🍳" },
  on_the_way: { label: "בדרך אליך", color: C.purple, icon: "🛵" },
  completed:  { label: "הושלמה", color: C.green, icon: "✅" },
  cancelled:  { label: "בוטלה", color: C.gray,  icon: "❌" },
};

const MOCK_ORDERS = [
  { id: "ORD-1001", restaurant: "פיצה רומא", items: ["פיצה מרגריטה x1", "קולה x2"], total: 72, status: "on_the_way", created_at: new Date(Date.now() - 20 * 60000).toISOString() },
  { id: "ORD-1002", restaurant: "בורגר הבית", items: ["קלאסיק בורגר x2", "צ׳יפס x1"], total: 132, status: "completed", created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "ORD-1003", restaurant: "פלאפל אבו נאסר", items: ["מנת פלאפל x3"], total: 54, status: "completed", created_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "ORD-1004", restaurant: "סושי עם רוח", items: ["סלמון רול x2"], total: 96, status: "cancelled", created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
];

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `לפני ${mins} דקות`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `לפני ${hrs} שעות`;
  return `לפני ${Math.floor(hrs / 24)} ימים`;
}

export default function OrdersPage({ cartCount }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o => {
    if (tab === "all") return true;
    if (tab === "active") return ["pending", "confirmed", "preparing", "on_the_way"].includes(o.status);
    if (tab === "completed") return o.status === "completed";
    if (tab === "cancelled") return o.status === "cancelled";
    return true;
  });

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "44px 20px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>ההזמנות שלי</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>{orders.length} הזמנות סה״כ</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "14px 16px 0", gap: 6 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ flex: 1, padding: "9px 4px", borderRadius: 12, border: "none", background: tab === t.key ? C.red : "white", color: tab === t.key ? "white" : C.gray, fontSize: 12, fontWeight: tab === t.key ? 800 : 500, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", fontFamily: "Arial,sans-serif", transition: "all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: C.gray }}>
            <div style={{ fontSize: 14 }}>טוען הזמנות...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0", color: C.gray }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>אין הזמנות</div>
            <div style={{ fontSize: 13, marginTop: 4, marginBottom: 24 }}>עוד לא הזמנת שום דבר</div>
            <button onClick={() => navigate("/")}
              style={{ background: C.red, color: "white", border: "none", borderRadius: 14, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
              <IcoFork s={14} c="white" /> הזמן עכשיו
            </button>
          </div>
        ) : filtered.map(order => {
          const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
          return (
            <div key={order.id} style={{ background: "white", borderRadius: 18, padding: "16px", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: C.dark }}>{order.restaurant}</div>
                  <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{timeAgo(order.created_at)}</div>
                </div>
                <div style={{ background: st.color + "18", color: st.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>{st.icon}</span>{st.label}
                </div>
              </div>

              <div style={{ fontSize: 12, color: C.gray, marginBottom: 10, lineHeight: 1.6 }}>
                {Array.isArray(order.items)
                  ? order.items.map((it, i) => <div key={i}>{typeof it === "object" ? `${it.name} x${it.qty}` : it}</div>)
                  : order.items}
              </div>

              {/* Progress bar for active orders */}
              {["pending","confirmed","preparing","on_the_way"].includes(order.status) && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    {["pending","preparing","on_the_way","completed"].map((s, i) => {
                      const steps = ["pending","confirmed","preparing","on_the_way","completed"];
                      const curIdx = steps.indexOf(order.status);
                      const thisIdx = steps.indexOf(s);
                      const done = thisIdx <= curIdx;
                      return (
                        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: done ? C.red : C.lightGray, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {done ? <IcoCheck s={11} c="white" /> : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid " + C.lightGray, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: C.red }}>₪{order.total}</span>
                {order.status === "completed" && (
                  <button onClick={() => navigate("/")}
                    style={{ background: C.dark, color: "white", border: "none", borderRadius: 12, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    הזמן שוב
                  </button>
                )}
                {order.status === "on_the_way" && (
                  <span style={{ fontSize: 12, color: C.orange, fontWeight: 600 }}>🛵 בדרך — ~15 דק׳</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav cartCount={cartCount} />
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}
