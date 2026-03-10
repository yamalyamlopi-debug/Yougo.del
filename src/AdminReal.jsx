// ══════════════════════════════════════════════════════════════════════════════
// YOUGO - Real Admin Dashboard connected to Supabase
// ══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase Config ────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://eppsgrewrxdjdctlrebf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcHNncmV3cnhkamRjdGxyZWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzM1OTcsImV4cCI6MjA4ODcwOTU5N30.IRs4mGsMYFG9VRPH7zPHvnWbXTANnaen9Ky-2dNDQSA";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Colors ─────────────────────────────────────────────────────────────────────
const C = {
  red: "#C8102E", gold: "#F5A623", bg: "#F7F7F8", white: "#FFFFFF",
  dark: "#111827", gray: "#6B7280", lightGray: "#E5E7EB", ultra: "#F3F4F6",
  green: "#10B981", blue: "#3B82F6", purple: "#8B5CF6", orange: "#F97316",
  adminBg: "#0D0F14", adminSide: "#151820", adminCard: "#1C2030",
  adminBorder: "#252A3A", adminText: "#E2E8F0", adminMuted: "#64748B",
};

// ── Icons ──────────────────────────────────────────────────────────────────────
function Ico({ path, s = 18, c = C.adminMuted, fill = "none", vb = "0 0 24 24" }) {
  return <svg width={s} height={s} viewBox={vb} fill={fill} style={{ flexShrink: 0 }}>{path}</svg>;
}
const IcoChart = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M3 3v18h18" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinecap="round" /><path d="M7 16l4-4 4 4 4-6" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>} />;
const IcoPkg = ({ s, c }) => <Ico s={s} c={c} path={<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={c || C.adminMuted} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />} />;
const IcoStore = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M3 9l1.5-5h15L21 9" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinejoin="round" /><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" stroke={c || C.adminMuted} strokeWidth="1.8" /><path d="M5 21V9M19 21V9M5 21h14" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinecap="round" /></>} />;
const IcoUsers = ({ s, c }) => <Ico s={s} c={c} path={<><circle cx="9" cy="8" r="3.5" stroke={c || C.adminMuted} strokeWidth="1.7" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke={c || C.adminMuted} strokeWidth="1.7" strokeLinecap="round" /><path d="M17 5c1.66 0 3 1.34 3 3s-1.34 3-3 3M22 20c0-3-2-5-5-5" stroke={c || C.adminMuted} strokeWidth="1.7" strokeLinecap="round" /></>} />;
const IcoCog = ({ s, c }) => <Ico s={s} c={c} path={<><circle cx="12" cy="12" r="3" stroke={c || C.adminMuted} strokeWidth="1.7" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={c || C.adminMuted} strokeWidth="1.7" /></>} />;
const IcoBell = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>} />;
const IcoCheck = ({ s, c }) => <Ico s={s} c={c} path={<path d="M5 13l4 4L19 7" stroke={c || C.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />} />;
const IcoClose = ({ s, c }) => <Ico s={s} c={c} path={<path d="M18 6L6 18M6 6l12 12" stroke={c || C.dark} strokeWidth="2" strokeLinecap="round" />} />;
const IcoBack = ({ s, c }) => <Ico s={s} c={c} path={<path d="M19 12H5M12 5l-7 7 7 7" stroke={c || C.adminMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />} />;
const IcoShield = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M12 2l9 4v6c0 5.25-3.75 10.15-9 11.5C6.75 22.15 3 17.25 3 12V6l9-4z" stroke={c || "white"} strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={c || "white"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>} />;
const IcoEdit = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={c || C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c || C.blue} strokeWidth="1.8" strokeLinejoin="round" /></>} />;
const IcoTrash = ({ s, c }) => <Ico s={s} c={c} path={<><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={c || "#EF4444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 11v6M14 11v6" stroke={c || "#EF4444"} strokeWidth="1.8" strokeLinecap="round" /></>} />;
const IcoPlus = ({ s, c }) => <Ico s={s} c={c} path={<path d="M12 5v14M5 12h14" stroke={c || "white"} strokeWidth="2.2" strokeLinecap="round" />} />;

// ── Yougo Logo ─────────────────────────────────────────────────────────────────
function YougoLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="16" fill={C.red} />
      <path d="M12 42V20l16 16V20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 30h16M42 24l8 6-8 6" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────
function Spinner({ size = 20, color = C.red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: "spin .8s linear infinite" }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

// ── Toast notification ─────────────────────────────────────────────────────────
function Toast({ msg, type = "success", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const bg = type === "success" ? C.green : type === "error" ? "#EF4444" : C.blue;
  return (
    <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: bg, color: "white", borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 700, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 8, animation: "fadeInDown .3s ease" }}>
      {type === "success" ? <IcoCheck s={16} c="white" /> : <IcoClose s={14} c="white" />}
      {msg}
      <style>{`@keyframes fadeInDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminReal({ onBack }) {
  const [sec, setSec] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Real data from Supabase
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ ordersToday: 0, revenueToday: 0, activeUsers: 0, activeRests: 0 });

  // Mobile sidebar state
  const [sideOpen, setSideOpen] = useState(false);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // ── Load all data ────────────────────────────────────────────────────────────
  useEffect(() => { loadAll(); }, []);

  // ── Real-time orders subscription ───────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setOrders(prev => [payload.new, ...prev]);
          setStats(prev => ({
            ...prev,
            ordersToday: prev.ordersToday + 1,
            revenueToday: prev.revenueToday + (payload.new.total || 0),
          }));
          showToast("🔔 طلب جديد وصل!", "info");
        }
        if (payload.eventType === "UPDATE") {
          setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
        }
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [ordRes, restRes, usrRes] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("restaurants").select("*").order("created_at", { ascending: false }),
        supabase.from("users").select("*").order("created_at", { ascending: false }),
      ]);

      const ordersData = ordRes.data || [];
      const restsData = restRes.data || [];
      const usersData = usrRes.data || [];

      setOrders(ordersData);
      setRestaurants(restsData);
      setUsers(usersData);

      // Calculate stats
      const today = new Date().toISOString().split("T")[0];
      const todayOrders = ordersData.filter(o => o.created_at?.startsWith(today));
      setStats({
        ordersToday: todayOrders.length,
        revenueToday: todayOrders.reduce((s, o) => s + (o.total || 0), 0),
        activeUsers: usersData.filter(u => u.active !== false).length,
        activeRests: restsData.filter(r => r.active !== false).length,
      });
    } catch (err) {
      showToast("خطأ في تحميل البيانات", "error");
    }
    setLoading(false);
  }

  // ── Update order status ──────────────────────────────────────────────────────
  async function updateOrderStatus(id, status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { showToast("خطأ في التحديث", "error"); return; }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast("تم تحديث الطلب ✓");
  }

  // ── Toggle restaurant active ─────────────────────────────────────────────────
  async function toggleRest(id, current) {
    const { error } = await supabase.from("restaurants").update({ active: !current }).eq("id", id);
    if (error) { showToast("خطأ", "error"); return; }
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, active: !current } : r));
    showToast(!current ? "تم تفعيل المطعم ✓" : "تم إيقاف المطعم");
  }

  // ── Block/unblock user ───────────────────────────────────────────────────────
  async function toggleUser(id, current) {
    const { error } = await supabase.from("users").update({ active: !current }).eq("id", id);
    if (error) { showToast("خطأ", "error"); return; }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !current } : u));
    showToast(!current ? "تم تفعيل المستخدم ✓" : "تم حظر المستخدم");
  }

  // ── Delete order ─────────────────────────────────────────────────────────────
  async function deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) { showToast("خطأ في الحذف", "error"); return; }
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast("تم حذف الطلب");
  }

  // ── Side nav items ───────────────────────────────────────────────────────────
  const sideNav = [
    { id: "dashboard", I: IcoChart, label: "لوحة التحكم" },
    { id: "orders", I: IcoPkg, label: "الطلبات", badge: orders.filter(o => o.status === "جديد" || o.status === "new").length || null },
    { id: "restaurants", I: IcoStore, label: "المطاعم" },
    { id: "users", I: IcoUsers, label: "المستخدمين" },
    { id: "analytics", I: IcoChart, label: "الإحصائيات" },
    { id: "settings", I: IcoCog, label: "الإعدادات" },
  ];

  const statusColor = {
    "جديد": C.blue, "new": C.blue,
    "قيد التحضير": C.gold, "preparing": C.gold,
    "في الطريق": C.purple, "on_way": C.purple,
    "مكتمل": C.green, "completed": C.green,
    "ملغي": "#EF4444", "cancelled": "#EF4444",
  };

  const statusOptions = ["جديد", "قيد التحضير", "في الطريق", "مكتمل", "ملغي"];

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div style={{ width: 200, background: C.adminSide, display: "flex", flexDirection: "column", padding: "0 0 20px", borderLeft: "1px solid " + C.adminBorder, flexShrink: 0, height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid " + C.adminBorder, display: "flex", alignItems: "center", gap: 10 }}>
        <YougoLogo size={36} />
        <div>
          <div style={{ color: C.adminText, fontWeight: 900, fontSize: 14 }}>Yougo</div>
          <div style={{ color: C.adminMuted, fontSize: 10 }}>لوحة الإدارة</div>
        </div>
      </div>

      {/* Live indicator */}
      <div style={{ margin: "10px 12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
        <span style={{ color: C.green, fontSize: 11, fontWeight: 700 }}>متصل - بيانات حية</span>
      </div>

      <div style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {sideNav.map(s => (
          <button key={s.id} onClick={() => { setSec(s.id); setSideOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "right", background: sec === s.id ? "rgba(200,16,46,0.14)" : "transparent", color: sec === s.id ? C.red : C.adminMuted, fontWeight: sec === s.id ? 700 : 400, fontSize: 12, transition: "all .15s", fontFamily: "Arial,sans-serif" }}>
            <s.I s={16} c={sec === s.id ? C.red : C.adminMuted} />
            {s.label}
            {s.badge ? <span style={{ marginRight: "auto", background: C.red, color: "white", fontSize: 9, fontWeight: 800, borderRadius: 10, padding: "2px 7px" }}>{s.badge}</span> : null}
          </button>
        ))}
      </div>

      <button onClick={onBack}
        style={{ margin: "0 8px", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid " + C.adminBorder, background: "transparent", color: C.adminMuted, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "Arial,sans-serif" }}>
        <IcoBack s={14} c={C.adminMuted} /> رجوع للتطبيق
      </button>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );

  // ── Dashboard section ────────────────────────────────────────────────────────
  const DashboardSection = () => {
    const statCards = [
      { label: "الطلبات اليوم", value: stats.ordersToday, color: C.blue, icon: IcoPkg },
      { label: "الإيرادات اليوم", value: "₪" + stats.revenueToday.toFixed(0), color: C.green, icon: IcoChart },
      { label: "المستخدمين النشطين", value: stats.activeUsers, color: C.purple, icon: IcoUsers },
      { label: "المطاعم النشطة", value: stats.activeRests, color: C.orange, icon: IcoStore },
    ];

    const recentOrders = orders.slice(0, 8);

    return (
      <div>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
          {statCards.map(s => (
            <div key={s.label} style={{ background: C.adminCard, borderRadius: 16, padding: 16, border: "1px solid " + C.adminBorder, borderTop: "3px solid " + s.color }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: s.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon s={17} c={s.color} />
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
              </div>
              <div style={{ color: C.adminText, fontSize: 22, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: C.adminMuted, fontSize: 11, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div style={{ background: C.adminCard, borderRadius: 16, padding: 16, border: "1px solid " + C.adminBorder }}>
          <div style={{ color: C.adminText, fontWeight: 800, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
            <IcoPkg s={15} c={C.red} /> أحدث الطلبات
            <span style={{ marginRight: "auto", background: "rgba(200,16,46,0.15)", color: C.red, fontSize: 10, borderRadius: 8, padding: "3px 9px", fontWeight: 700 }}>حية</span>
          </div>
          {recentOrders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: C.adminMuted, fontSize: 13 }}>لا توجد طلبات بعد</div>
          ) : (
            recentOrders.map(o => (
              <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + C.adminBorder }}>
                <div style={{ width: 36, height: 36, background: "rgba(200,16,46,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IcoPkg s={17} c={C.red} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.adminText, fontWeight: 700, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {o.customer_name || "عميل"} — {o.restaurant_name || "مطعم"}
                  </div>
                  <div style={{ color: C.adminMuted, fontSize: 10, marginTop: 2 }}>
                    {new Date(o.created_at).toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ color: C.green, fontWeight: 800, fontSize: 13 }}>₪{o.total || 0}</span>
                  <span style={{ background: (statusColor[o.status] || C.gray) + "22", color: statusColor[o.status] || C.gray, borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700 }}>{o.status || "جديد"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // ── Orders section ───────────────────────────────────────────────────────────
  const OrdersSection = () => {
    const [filter, setFilter] = useState("الكل");
    const filters = ["الكل", "جديد", "قيد التحضير", "في الطريق", "مكتمل", "ملغي"];
    const filtered = filter === "الكل" ? orders : orders.filter(o => o.status === filter);

    return (
      <div>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid " + (filter === f ? C.red : C.adminBorder), background: filter === f ? "rgba(200,16,46,0.15)" : "transparent", color: filter === f ? C.red : C.adminMuted, fontSize: 11, fontWeight: filter === f ? 700 : 400, cursor: "pointer", fontFamily: "Arial,sans-serif" }}>
              {f}
              {f !== "الكل" && <span style={{ marginRight: 4, opacity: 0.7 }}>({orders.filter(o => o.status === f).length})</span>}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div style={{ background: C.adminCard, borderRadius: 16, border: "1px solid " + C.adminBorder, overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: C.adminMuted }}>
              <IcoPkg s={40} c={C.adminBorder} />
              <div style={{ marginTop: 10, fontSize: 13 }}>لا توجد طلبات</div>
            </div>
          ) : (
            filtered.map((o, i) => (
              <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: i < filtered.length - 1 ? "1px solid " + C.adminBorder : "none", flexWrap: "wrap", gap: 8 }}>
                <div style={{ width: 36, height: 36, background: (statusColor[o.status] || C.gray) + "18", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IcoPkg s={16} c={statusColor[o.status] || C.gray} />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ color: C.adminText, fontWeight: 700, fontSize: 12 }}>{o.customer_name || "عميل غير معروف"}</div>
                  <div style={{ color: C.adminMuted, fontSize: 10, marginTop: 1 }}>{o.restaurant_name || "—"} • {o.items_count || 0} عناصر</div>
                  <div style={{ color: C.adminMuted, fontSize: 10 }}>{new Date(o.created_at).toLocaleString("ar")}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
                  <span style={{ color: C.green, fontWeight: 800, fontSize: 14 }}>₪{o.total || 0}</span>
                  {/* Status dropdown */}
                  <select
                    value={o.status || "جديد"}
                    onChange={e => updateOrderStatus(o.id, e.target.value)}
                    style={{ background: (statusColor[o.status] || C.gray) + "22", color: statusColor[o.status] || C.gray, border: "1px solid " + (statusColor[o.status] || C.gray) + "44", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "Arial,sans-serif", outline: "none" }}>
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => deleteOrder(o.id)}
                    style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "none", borderRadius: 7, padding: "4px 8px", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <IcoTrash s={12} c="#EF4444" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // ── Restaurants section ──────────────────────────────────────────────────────
  const RestaurantsSection = () => {
    const [editR, setEditR] = useState(null);
    const [saving, setSaving] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [newR, setNewR] = useState({ name: "", category: "", location: "", phone: "" });

    async function saveEdit() {
      setSaving(true);
      const { error } = await supabase.from("restaurants").update({
        name: editR.name,
        category: editR.category,
        location: editR.location,
        phone: editR.phone,
      }).eq("id", editR.id);
      setSaving(false);
      if (error) { showToast("خطأ في الحفظ", "error"); return; }
      setRestaurants(prev => prev.map(r => r.id === editR.id ? editR : r));
      setEditR(null);
      showToast("تم حفظ التغييرات ✓");
    }

    async function addRest() {
      if (!newR.name.trim()) { showToast("أدخل اسم المطعم", "error"); return; }
      setSaving(true);
      const { data, error } = await supabase.from("restaurants").insert([{ ...newR, active: true }]).select();
      setSaving(false);
      if (error) { showToast("خطأ في الإضافة", "error"); return; }
      setRestaurants(prev => [data[0], ...prev]);
      setNewR({ name: "", category: "", location: "", phone: "" });
      setShowAdd(false);
      showToast("تم إضافة المطعم ✓");
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ color: C.adminMuted, fontSize: 12 }}>{restaurants.length} مطعم مسجل</div>
          <button onClick={() => setShowAdd(true)}
            style={{ background: C.red, color: "white", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "Arial,sans-serif" }}>
            <IcoPlus s={14} /> إضافة مطعم
          </button>
        </div>

        {/* Add modal */}
        {showAdd && (
          <div style={{ background: C.adminCard, borderRadius: 16, padding: 18, border: "1px solid " + C.adminBorder, marginBottom: 14 }}>
            <div style={{ color: C.adminText, fontWeight: 800, fontSize: 13, marginBottom: 14 }}>➕ مطعم جديد</div>
            {[{ l: "اسم المطعم *", k: "name" }, { l: "الفئة", k: "category" }, { l: "الموقع", k: "location" }, { l: "رقم الهاتف", k: "phone" }].map(f => (
              <div key={f.k} style={{ marginBottom: 10 }}>
                <label style={{ color: C.adminMuted, fontSize: 11, display: "block", marginBottom: 3 }}>{f.l}</label>
                <input value={newR[f.k]} onChange={e => setNewR(p => ({ ...p, [f.k]: e.target.value }))}
                  style={{ width: "100%", background: C.adminBg, border: "1px solid " + C.adminBorder, borderRadius: 9, padding: "8px 11px", color: C.adminText, fontSize: 12, outline: "none", fontFamily: "Arial,sans-serif", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={addRest} disabled={saving}
                style={{ flex: 1, background: C.red, color: "white", border: "none", borderRadius: 10, padding: 10, fontWeight: 700, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: "Arial,sans-serif" }}>
                {saving ? <Spinner size={16} /> : <IcoCheck s={14} c="white" />} حفظ
              </button>
              <button onClick={() => setShowAdd(false)}
                style={{ flex: 1, background: "transparent", color: C.adminMuted, border: "1px solid " + C.adminBorder, borderRadius: 10, padding: 10, cursor: "pointer", fontSize: 13, fontFamily: "Arial,sans-serif" }}>
                إلغاء
              </button>
            </div>
          </div>
        )}

        <div style={{ background: C.adminCard, borderRadius: 16, border: "1px solid " + C.adminBorder, overflow: "hidden" }}>
          {restaurants.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: C.adminMuted, fontSize: 13 }}>لا توجد مطاعم مسجلة</div>
          ) : restaurants.map((r, i) => (
            <div key={r.id}>
              {editR?.id === r.id ? (
                <div style={{ padding: "14px 16px", borderBottom: i < restaurants.length - 1 ? "1px solid " + C.adminBorder : "none", background: "rgba(200,16,46,0.05)" }}>
                  {[{ l: "الاسم", k: "name" }, { l: "الفئة", k: "category" }, { l: "الموقع", k: "location" }, { l: "الهاتف", k: "phone" }].map(f => (
                    <input key={f.k} value={editR[f.k] || ""} placeholder={f.l}
                      onChange={e => setEditR(p => ({ ...p, [f.k]: e.target.value }))}
                      style={{ width: "100%", background: C.adminBg, border: "1px solid " + C.adminBorder, borderRadius: 8, padding: "7px 10px", color: C.adminText, fontSize: 12, outline: "none", marginBottom: 8, fontFamily: "Arial,sans-serif", boxSizing: "border-box" }} />
                  ))}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={saveEdit} disabled={saving}
                      style={{ flex: 1, background: C.green, color: "white", border: "none", borderRadius: 8, padding: "8px", fontWeight: 700, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: "Arial,sans-serif" }}>
                      {saving ? <Spinner size={14} color="white" /> : <IcoCheck s={13} c="white" />} حفظ
                    </button>
                    <button onClick={() => setEditR(null)}
                      style={{ flex: 1, background: "transparent", color: C.adminMuted, border: "1px solid " + C.adminBorder, borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 12, fontFamily: "Arial,sans-serif" }}>
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: i < restaurants.length - 1 ? "1px solid " + C.adminBorder : "none" }}>
                  <div style={{ width: 40, height: 40, background: "rgba(200,16,46,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IcoStore s={20} c={C.red} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.adminText, fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                    <div style={{ color: C.adminMuted, fontSize: 10, marginTop: 2 }}>{r.category || "—"} • {r.location || "—"}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ background: r.active !== false ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.1)", color: r.active !== false ? C.green : "#EF4444", borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>
                      {r.active !== false ? "نشط" : "متوقف"}
                    </span>
                    <button onClick={() => setEditR({ ...r })}
                      style={{ background: "rgba(59,130,246,0.1)", color: C.blue, border: "none", borderRadius: 7, padding: "5px 9px", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center" }}>
                      <IcoEdit s={12} c={C.blue} />
                    </button>
                    <button onClick={() => toggleRest(r.id, r.active !== false)}
                      style={{ background: r.active !== false ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: r.active !== false ? "#EF4444" : C.green, border: "none", borderRadius: 7, padding: "5px 9px", fontSize: 10, cursor: "pointer", fontFamily: "Arial,sans-serif" }}>
                      {r.active !== false ? "إيقاف" : "تفعيل"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Users section ────────────────────────────────────────────────────────────
  const UsersSection = () => (
    <div style={{ background: C.adminCard, borderRadius: 16, border: "1px solid " + C.adminBorder, overflow: "auto" }}>
      <div style={{ minWidth: 500 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 10, padding: "12px 16px", borderBottom: "1px solid " + C.adminBorder }}>
          {["الاسم", "الهاتف", "الطلبات", "الحالة", "إجراء"].map(h => (
            <div key={h} style={{ color: C.adminMuted, fontSize: 11, fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.adminMuted, fontSize: 13 }}>لا يوجد مستخدمون</div>
        ) : users.map((u, i) => (
          <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 10, padding: "12px 16px", borderBottom: i < users.length - 1 ? "1px solid " + C.adminBorder : "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 28, height: 28, background: "rgba(200,16,46,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IcoUsers s={14} c={C.red} />
              </div>
              <span style={{ color: C.adminText, fontWeight: 600, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name || u.full_name || "—"}</span>
            </div>
            <div style={{ color: C.adminMuted, fontSize: 11 }}>{u.phone || "—"}</div>
            <div style={{ color: C.adminText, fontWeight: 700, fontSize: 12 }}>{u.orders_count || 0}</div>
            <div>
              <span style={{ background: u.active !== false ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.1)", color: u.active !== false ? C.green : "#EF4444", borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700 }}>
                {u.active !== false ? "نشط" : "محظور"}
              </span>
            </div>
            <div>
              <button onClick={() => toggleUser(u.id, u.active !== false)}
                style={{ background: u.active !== false ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)", color: u.active !== false ? "#EF4444" : C.green, border: "none", borderRadius: 7, padding: "4px 10px", fontSize: 10, cursor: "pointer", fontWeight: 700, fontFamily: "Arial,sans-serif" }}>
                {u.active !== false ? "حظر" : "تفعيل"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Analytics section ────────────────────────────────────────────────────────
  const AnalyticsSection = () => {
    const statusGroups = statusOptions.map(s => ({
      name: s,
      count: orders.filter(o => o.status === s).length,
      color: statusColor[s] || C.gray,
    }));
    const maxCount = Math.max(...statusGroups.map(s => s.count), 1);
    const totalRevenue = orders.filter(o => o.status === "مكتمل").reduce((s, o) => s + (o.total || 0), 0);

    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 16 }}>
          {[
            { l: "إجمالي الطلبات", v: orders.length, c: C.blue },
            { l: "الطلبات المكتملة", v: orders.filter(o => o.status === "مكتمل").length, c: C.green },
            { l: "الطلبات الملغاة", v: orders.filter(o => o.status === "ملغي").length, c: "#EF4444" },
            { l: "إجمالي الإيرادات", v: "₪" + totalRevenue.toFixed(0), c: C.gold },
          ].map(s => (
            <div key={s.l} style={{ background: C.adminCard, borderRadius: 14, padding: 14, border: "1px solid " + C.adminBorder, borderTop: "2px solid " + s.c }}>
              <div style={{ color: C.adminText, fontSize: 20, fontWeight: 900 }}>{s.v}</div>
              <div style={{ color: C.adminMuted, fontSize: 11, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Status chart */}
        <div style={{ background: C.adminCard, borderRadius: 16, padding: 16, border: "1px solid " + C.adminBorder }}>
          <div style={{ color: C.adminText, fontWeight: 800, fontSize: 13, marginBottom: 16 }}>توزيع الطلبات حسب الحالة</div>
          {statusGroups.map(s => (
            <div key={s.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: C.adminText, fontSize: 12, fontWeight: 600 }}>{s.name}</span>
                <span style={{ color: s.color, fontSize: 12, fontWeight: 700 }}>{s.count}</span>
              </div>
              <div style={{ height: 6, background: C.adminBorder, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: (s.count / maxCount * 100) + "%", background: s.color, borderRadius: 3, transition: "width .6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Settings section ─────────────────────────────────────────────────────────
  const SettingsSection = () => {
    const [appName, setAppName] = useState("Yougo");
    const [deliveryFee, setDeliveryFee] = useState("10");
    const [minOrder, setMinOrder] = useState("40");
    const [saved, setSaved] = useState(false);

    async function saveSettings() {
      const { error } = await supabase.from("settings").upsert([
        { key: "app_name", value: appName },
        { key: "delivery_fee", value: deliveryFee },
        { key: "min_order", value: minOrder },
      ]);
      if (error) { showToast("خطأ في الحفظ", "error"); return; }
      setSaved(true);
      showToast("تم حفظ الإعدادات ✓");
      setTimeout(() => setSaved(false), 2000);
    }

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
        <div style={{ background: C.adminCard, borderRadius: 16, padding: 18, border: "1px solid " + C.adminBorder }}>
          <div style={{ color: C.adminText, fontWeight: 800, fontSize: 13, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <IcoCog s={15} c={C.red} /> إعدادات التطبيق
          </div>
          {[
            { l: "اسم التطبيق", v: appName, set: setAppName },
            { l: "رسوم التوصيل (₪)", v: deliveryFee, set: setDeliveryFee },
            { l: "الحد الأدنى للطلب (₪)", v: minOrder, set: setMinOrder },
          ].map(f => (
            <div key={f.l} style={{ marginBottom: 12 }}>
              <label style={{ color: C.adminMuted, fontSize: 11, display: "block", marginBottom: 4 }}>{f.l}</label>
              <input value={f.v} onChange={e => f.set(e.target.value)}
                style={{ width: "100%", background: C.adminBg, border: "1px solid " + C.adminBorder, borderRadius: 9, padding: "9px 12px", color: C.adminText, fontSize: 13, outline: "none", fontFamily: "Arial,sans-serif", boxSizing: "border-box" }} />
            </div>
          ))}
          <button onClick={saveSettings}
            style={{ width: "100%", background: saved ? C.green : C.red, color: "white", border: "none", borderRadius: 10, padding: 11, fontWeight: 700, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background .3s", fontFamily: "Arial,sans-serif" }}>
            <IcoCheck s={14} c="white" /> {saved ? "تم الحفظ ✓" : "حفظ الإعدادات"}
          </button>
        </div>

        <div style={{ background: C.adminCard, borderRadius: 16, padding: 18, border: "1px solid " + C.adminBorder }}>
          <div style={{ color: C.adminText, fontWeight: 800, fontSize: 13, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <IcoShield s={15} c={C.red} /> معلومات قاعدة البيانات
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { l: "الطلبات", v: orders.length },
              { l: "المطاعم", v: restaurants.length },
              { l: "المستخدمون", v: users.length },
            ].map(item => (
              <div key={item.l} style={{ display: "flex", justifyContent: "space-between", background: C.adminBg, borderRadius: 9, padding: "10px 12px", border: "1px solid " + C.adminBorder }}>
                <span style={{ color: C.adminMuted, fontSize: 12 }}>{item.l}</span>
                <span style={{ color: C.adminText, fontWeight: 700, fontSize: 13 }}>{item.v}</span>
              </div>
            ))}
            <button onClick={loadAll}
              style={{ background: "rgba(59,130,246,0.1)", color: C.blue, border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "Arial,sans-serif" }}>
              🔄 تحديث البيانات
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── Section title ────────────────────────────────────────────────────────────
  const secTitle = sideNav.find(s => s.id === sec)?.label || "";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.adminBg, fontFamily: "Arial,sans-serif", direction: "rtl" }}>
      {/* Desktop sidebar */}
      <div style={{ display: "none" }} className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Mobile overlay sidebar */}
      {sideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
          <div onClick={() => setSideOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
          <div style={{ position: "relative", zIndex: 1, width: 220 }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Persistent sidebar for larger screens */}
      <div style={{ display: "flex", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px", minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSideOpen(true)}
              style={{ background: C.adminCard, border: "1px solid " + C.adminBorder, borderRadius: 9, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}
              className="mobile-menu-btn">
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 16, height: 2, background: C.adminMuted, borderRadius: 1 }} />)}
              </div>
            </button>
            <div>
              <div style={{ color: C.adminText, fontSize: 17, fontWeight: 900 }}>{secTitle}</div>
              <div style={{ color: C.adminMuted, fontSize: 11, marginTop: 1 }}>
                {new Date().toLocaleDateString("ar", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {loading && <Spinner size={18} color={C.adminMuted} />}
            <div style={{ background: C.adminCard, borderRadius: 10, padding: "7px 12px", border: "1px solid " + C.adminBorder, display: "flex", alignItems: "center", gap: 6 }}>
              <IcoBell s={15} c={C.adminMuted} />
              {orders.filter(o => o.status === "جديد").length > 0 && (
                <span style={{ background: C.red, color: "white", fontSize: 9, fontWeight: 800, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {orders.filter(o => o.status === "جديد").length}
                </span>
              )}
            </div>
            <div style={{ background: C.adminCard, borderRadius: 10, padding: "7px 12px", color: C.adminText, fontSize: 11, border: "1px solid " + C.adminBorder, display: "flex", alignItems: "center", gap: 6 }}>
              <IcoShield s={13} c={C.red} /> مدير
            </div>
          </div>
        </div>

        {/* Sections */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: 16 }}>
            <Spinner size={36} color={C.red} />
            <div style={{ color: C.adminMuted, fontSize: 14 }}>جاري تحميل البيانات...</div>
          </div>
        ) : (
          <>
            {sec === "dashboard" && <DashboardSection />}
            {sec === "orders" && <OrdersSection />}
            {sec === "restaurants" && <RestaurantsSection />}
            {sec === "users" && <UsersSection />}
            {sec === "analytics" && <AnalyticsSection />}
            {sec === "settings" && <SettingsSection />}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(200,16,46,0.3);border-radius:2px}
        select option{background:#1C2030;color:#E2E8F0}
        @media(max-width:640px){
          .desktop-sidebar{display:none!important}
        }
      `}</style>
    </div>
  );
}
