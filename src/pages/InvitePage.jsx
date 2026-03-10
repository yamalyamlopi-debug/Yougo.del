// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  InvitePage.jsx — Referral / Invite system
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, IcoBack, IcoCheck, IcoGift } from "../components/Icons";

const FAKE_INVITED = [
  { name: "שרה כ.", joined: "לפני 2 ימים", earned: "₪20" },
  { name: "מוחמד א.", joined: "לפני שבוע", earned: "₪20" },
  { name: "יוסי ל.", joined: "לפני חודש", earned: "₪20" },
];

export default function InvitePage({ user }) {
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] || "חבר";
  const refCode = "YOUGO-" + firstName.toUpperCase().slice(0,4) + "30";
  const [copied, setCopied] = useState(false);
  const totalEarned = FAKE_INVITED.length * 20;

  function copyCode() {
    navigator.clipboard?.writeText(refCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function share(method) {
    const msg = `הצטרף ל-YOUGO עם הקוד שלי ${refCode} וקבל ₪20 על ההזמנה הראשונה! 🎁`;
    if (method === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
    else if (method === "telegram") window.open(`https://t.me/share/url?url=https://yougo.app&text=${encodeURIComponent(msg)}`);
    else if (method === "native" && navigator.share) navigator.share({ title: "YOUGO", text: msg });
    else copyCode();
  }

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", paddingBottom: 30 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#10B981,#059669)", padding: "44px 20px 70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.08 }}>🎁</div>
        <button onClick={() => navigate(-1)}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}>
          <IcoBack s={18} c="white" />
        </button>
        <div style={{ color: "white", fontSize: 28, fontWeight: 900 }}>הזמן חברים 🎉</div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginTop: 6 }}>אתה מרוויח ₪20 על כל חבר שמצטרף!</div>
      </div>

      <div style={{ padding: "0 16px" }}>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[
            { l: "חברים שהצטרפו", v: FAKE_INVITED.length, e: "👥" },
            { l: "הרוויחת סה״כ", v: `₪${totalEarned}`, e: "💰" },
            { l: "ממתין לפדיון", v: `₪${totalEarned}`, e: "⏳" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "white", borderRadius: 16, padding: "14px 10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.e}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.dark }}>{s.v}</div>
              <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{ background: "white", borderRadius: 18, padding: "16px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.dark, marginBottom: 12 }}>🤔 איך זה עובד?</div>
          {[
            { n: "1", t: "שתף את הקוד שלך", d: "שלח לחבר את קוד ההפניה האישי שלך" },
            { n: "2", t: "חבר מצטרף", d: "הוא מזין את הקוד ונרשם ל-YOUGO" },
            { n: "3", t: "שניכם מרוויחים", d: "אתה מקבל ₪20, הוא מקבל ₪20 על ההזמנה הראשונה" },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.green, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{step.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.dark }}>{step.t}</div>
                <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{step.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ref code */}
        <div style={{ background: "linear-gradient(135deg,#111827,#1f2937)", borderRadius: 18, padding: "20px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 8 }}>הקוד האישי שלך</div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 900, letterSpacing: 3, marginBottom: 14 }}>{refCode}</div>
          <button onClick={copyCode}
            style={{ background: copied ? C.green : C.red, color: "white", border: "none", borderRadius: 14, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, margin: "0 auto", transition: "background 0.3s" }}>
            {copied ? <><IcoCheck s={15} c="white" />הועתק!</> : <>📋 העתק קוד</>}
          </button>
        </div>

        {/* Share buttons */}
        <div style={{ fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 10 }}>שתף דרך:</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            { e: "💬", l: "WhatsApp", k: "whatsapp", bg: "#25D366" },
            { e: "✈️", l: "Telegram", k: "telegram", bg: "#229ED9" },
            { e: "📤", l: "שתף", k: "native", bg: C.dark },
          ].map(s => (
            <button key={s.k} onClick={() => share(s.k)}
              style={{ flex: 1, background: s.bg, color: "white", border: "none", borderRadius: 14, padding: "12px 8px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontFamily: "Arial,sans-serif" }}>
              <span style={{ fontSize: 20 }}>{s.e}</span>{s.l}
            </button>
          ))}
        </div>

        {/* Friends list */}
        {FAKE_INVITED.length > 0 && (
          <div style={{ background: "white", borderRadius: 18, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.dark, marginBottom: 12 }}>👥 חברים שהצטרפו</div>
            {FAKE_INVITED.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < FAKE_INVITED.length - 1 ? "1px solid " + C.lightGray : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.ultra, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.dark, marginLeft: 12 }}>
                  {f.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>{f.joined}</div>
                </div>
                <div style={{ background: "rgba(16,185,129,0.1)", color: C.green, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>+{f.earned}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}
