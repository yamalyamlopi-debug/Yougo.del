// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AuthPage.jsx — Login / Register flow
//  ✅ OTP only — no fake Google/Apple bypass
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { C, IcoCheck, IcoBack, IcoFork, IcoStore, IcoTruck } from "../components/Icons";

function YougoLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="16" fill="white" />
      <path d="M12 42V20l16 16V20" stroke={C.red} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 30h16M42 24l8 6-8 6" stroke={C.red} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoadSpinner({ size = 18, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: "spin .8s linear infinite" }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

const FAKE_CODE = "12345";

export default function AuthPage({ onDone, onBusiness }) {
  const [step, setStep]             = useState("splash");
  const [phone, setPhone]           = useState("");
  const [otp, setOtp]               = useState(["", "", "", "", ""]);
  const [otpError, setOtpError]     = useState(false);
  const [countdown, setCountdown]   = useState(60);
  const [canResend, setCanResend]   = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm]             = useState({ firstName: "", lastName: "", gender: "", age: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(false);

  useEffect(() => {
    if (step !== "splash") return;
    const t = setTimeout(() => setStep("phone"), 2600);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(60); setCanResend(false);
    const t = setInterval(() => {
      setCountdown(p => { if (p <= 1) { clearInterval(t); setCanResend(true); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [step]);

  function handlePhoneSubmit() {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 9) { setPhoneError("יש להזין מספר טלפון תקין"); return; }
    setPhoneError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1200);
  }

  function handleOtpChange(idx, val) {
    if (!/^\d*$/.test(val)) return;
    const next = otp.slice(); next[idx] = val.slice(-1);
    setOtp(next); setOtpError(false);
    if (val && idx < 4) { const el = document.getElementById("otp-" + (idx + 1)); if (el) el.focus(); }
    const code = next.join("");
    if (code.length === 5) {
      setTimeout(() => {
        if (code === FAKE_CODE) {
          setLoading(true);
          setTimeout(() => { setLoading(false); setStep("register"); }, 800);
        } else {
          setOtpError(true); setOtp(["", "", "", "", ""]);
          setTimeout(() => { const el = document.getElementById("otp-0"); if (el) el.focus(); }, 100);
        }
      }, 300);
    }
  }

  function handleOtpKey(idx, e) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const el = document.getElementById("otp-" + (idx - 1)); if (el) el.focus();
    }
  }

  function validateForm() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "שדה חובה";
    if (!form.lastName.trim())  errs.lastName  = "שדה חובה";
    if (!form.gender)           errs.gender    = "שדה חובה";
    const age = parseInt(form.age);
    if (!form.age || isNaN(age) || age < 13 || age > 100) errs.age = "גיל לא תקין (13-100)";
    return errs;
  }

  function handleRegister() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSuccess(true);
      setTimeout(() => {
        onDone({ name: form.firstName + " " + form.lastName, phone, gender: form.gender, age: form.age });
      }, 1600);
    }, 1000);
  }

  // ── SPLASH ─────────────────────────────────────
  if (step === "splash") return (
    <div style={{ fontFamily: "Arial,sans-serif", background: "linear-gradient(160deg,#C8102E 0%,#7B0D1E 60%,#3D0511 100%)", minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", direction: "rtl" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", top: -100, left: -100 }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", bottom: -80, right: -80 }} />
      <div style={{ animation: "splashPop .7s cubic-bezier(.34,1.56,.64,1) both" }}><YougoLogo size={100} /></div>
      <div style={{ color: "white", fontSize: 38, fontWeight: 900, marginTop: 16, letterSpacing: 2, animation: "splashPop .7s .15s cubic-bezier(.34,1.56,.64,1) both" }}>YOUGO</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 6, animation: "splashFade 1s .4s both" }}>הכל מגיע אליך</div>
      <div style={{ display: "flex", gap: 24, marginTop: 40, animation: "splashFade 1s .6s both" }}>
        {[{ I: IcoFork, l: "מסעדות" }, { I: IcoStore, l: "מרקט" }, { I: IcoTruck, l: "משלוח מהיר" }].map((x, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><x.I s={24} c="white" /></div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{x.l}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 60, display: "flex", gap: 8 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: `rgba(255,255,255,${i === 0 ? 0.9 : 0.35})`, animation: `dotPulse 1.2s ${i * 0.2}s infinite` }} />)}
      </div>
      <style>{`@keyframes splashPop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}@keyframes splashFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}*{box-sizing:border-box}`}</style>
    </div>
  );

  // ── PHONE ──────────────────────────────────────
  if (step === "phone") return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "40px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <div style={{ marginBottom: 16 }}><YougoLogo size={44} /></div>
        <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>ברוך הבא!</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 6 }}>הזן את מספר הטלפון שלך להמשך</div>
      </div>
      <div style={{ flex: 1, padding: "30px 24px" }}>
        <div style={{ fontSize: 13, color: C.gray, marginBottom: 6, fontWeight: 600 }}>מספר טלפון</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
          <div style={{ background: "white", border: "1.5px solid " + C.lightGray, borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>🇮🇱</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>+972</span>
          </div>
          <input value={phone} onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
            onKeyDown={e => { if (e.key === "Enter") handlePhoneSubmit(); }}
            placeholder="05X-XXX-XXXX" maxLength={12}
            style={{ flex: 1, background: "white", border: "1.5px solid " + (phoneError ? C.red : C.lightGray), borderRadius: 14, padding: "13px 16px", fontSize: 16, outline: "none", direction: "ltr", textAlign: "left", fontFamily: "Arial,sans-serif", color: C.dark }} />
        </div>
        {phoneError && <div style={{ color: C.red, fontSize: 12, marginBottom: 8 }}>{phoneError}</div>}
        <div style={{ color: C.gray, fontSize: 11, marginBottom: 28, marginTop: 8 }}>נשלח לך קוד אימות ב-SMS לאישור זהותך</div>

        <button onClick={handlePhoneSubmit} disabled={loading}
          style={{ width: "100%", background: loading ? "rgba(200,16,46,0.5)" : C.red, color: "white", border: "none", borderRadius: 16, padding: "15px", fontSize: 15, fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 20px rgba(200,16,46,0.35)" }}>
          {loading ? <><LoadSpinner />שולח קוד...</> : <><IcoCheck s={18} c="white" />המשך</>}
        </button>

        {/* Google / Apple — disabled, coming soon */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.lightGray }} />
          <span style={{ color: C.gray, fontSize: 12 }}>או המשך עם</span>
          <div style={{ flex: 1, height: 1, background: C.lightGray }} />
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <button disabled style={{ flex: 1, background: "white", color: C.gray, border: "1.5px solid " + C.lightGray, borderRadius: 14, padding: "12px", fontSize: 12, fontWeight: 600, cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.45 }}>
            <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.3 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.9 6.1C12.5 13.1 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/><path fill="#FBBC05" d="M10.6 28.6C10.2 27.5 10 26.3 10 25s.2-2.5.6-3.6L2.7 15.3C1 18.4 0 21.6 0 25s1 6.6 2.7 9.7l7.9-6.1z"/><path fill="#34A853" d="M24 50c6.2 0 11.5-2 15.3-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-3.6-13.4-8.8l-7.9 6.1C6.7 44.6 14.7 50 24 50z"/></svg>
            Google — قريباً
          </button>
          <button disabled style={{ flex: 1, background: "#111", color: "white", border: "none", borderRadius: 14, padding: "12px", fontSize: 12, fontWeight: 600, cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.4 }}>
            <svg width="14" height="18" viewBox="0 0 814 1000"><path fill="white" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.1 269-317.1 70.6 0 133.1 46.5 178.8 46.5 43.6 0 113-49.2 192.4-49.2 30.8 0 110.7 2.6 165.7 78.8zm-170.5-276c28.7-35 49.7-83.4 49.7-131.8 0-6.7-.6-13.5-1.9-19.5-46.8 1.9-101.8 31.3-134.7 69.4-25.3 28.7-49.7 74-49.7 123.1 0 7.4 1.3 14.9 1.9 17.2 3.2.6 8.4 1.3 13.6 1.3 43 0 95.6-27.7 121.1-60.7z"/></svg>
            Apple — قريباً
          </button>
        </div>

        <div style={{ marginTop: 20, borderTop: "1.5px solid " + C.lightGray, paddingTop: 20 }}>
          <div style={{ textAlign: "center", fontSize: 12, color: C.gray, marginBottom: 10, fontWeight: 600 }}>هل لديك مطعم أو متجر؟</div>
          <button onClick={onBusiness}
            style={{ width: "100%", background: "linear-gradient(135deg,#111827,#1f2937)", color: "white", border: "none", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🏪</span> بوابة الأعمال — سجّل مطعمك
          </button>
        </div>
        <div style={{ textAlign: "center", color: C.gray, fontSize: 11, marginTop: 16, lineHeight: 1.6 }}>
          بالمتابعة أنت توافق على <span style={{ color: C.red, fontWeight: 700 }}>שروط השימוש</span> ו<span style={{ color: C.red, fontWeight: 700 }}>מדיניות הפרטיות</span>
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );

  // ── OTP ────────────────────────────────────────
  if (step === "otp") return (
    <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "40px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
        <button onClick={() => { setStep("phone"); setOtp(["", "", "", "", ""]); setOtpError(false); }}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 16 }}>
          <IcoBack s={18} c="white" />
        </button>
        <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>אימות מספר</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 6 }}>שלחנו קוד אימות ל-<span style={{ fontWeight: 700 }}>{phone}</span></div>
      </div>
      <div style={{ flex: 1, padding: "30px 24px" }}>
        <div style={{ fontSize: 14, color: C.dark, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>הזן את הקוד בן 5 הספרות</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8, direction: "ltr" }}>
          {otp.map((digit, idx) => (
            <input key={idx} id={"otp-" + idx} value={digit}
              onChange={e => handleOtpChange(idx, e.target.value)}
              onKeyDown={e => handleOtpKey(idx, e)}
              maxLength={1}
              style={{ width: 52, height: 60, textAlign: "center", fontSize: 24, fontWeight: 900, border: "2px solid " + (otpError ? C.red : digit ? C.red : C.lightGray), borderRadius: 14, outline: "none", background: digit ? "rgba(200,16,46,0.05)" : "white", color: otpError ? "#EF4444" : C.dark, fontFamily: "Arial,sans-serif" }} />
          ))}
        </div>
        {otpError && <div style={{ textAlign: "center", color: "#EF4444", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>הקוד שגוי, נסה שוב</div>}
        {loading && <div style={{ textAlign: "center", marginBottom: 16 }}><LoadSpinner size={24} color={C.red} /></div>}
        <div style={{ textAlign: "center", color: C.gray, fontSize: 11, marginBottom: 16, background: C.ultra, borderRadius: 10, padding: "8px" }}>
          🧪 לבדיקה בלבד — הקוד: <span style={{ fontWeight: 900, color: C.red, letterSpacing: 2 }}>12345</span>
        </div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {canResend
            ? <button onClick={() => { setStep("otp"); setOtp(["", "", "", "", ""]); }} style={{ background: "none", border: "none", color: C.red, fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>שלח קוד חדש</button>
            : <div style={{ color: C.gray, fontSize: 12 }}>שלח קוד חדש בעוד <span style={{ color: C.red, fontWeight: 700 }}>{countdown}</span> שניות</div>
          }
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );

  // ── REGISTER ───────────────────────────────────
  if (step === "register") {
    if (success) return (
      <div style={{ fontFamily: "Arial,sans-serif", background: "linear-gradient(160deg,#C8102E,#7B0D1E)", minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
        <div style={{ animation: "successPop .6s cubic-bezier(.34,1.56,.64,1)" }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <IcoCheck s={50} c="white" />
          </div>
        </div>
        <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>ברוך הבא, {form.firstName}!</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 8 }}>החשבון שלך נוצר בהצלחה</div>
        <div style={{ marginTop: 24 }}><YougoLogo size={60} /></div>
        <style>{`@keyframes successPop{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:scale(1)}}*{box-sizing:border-box}`}</style>
      </div>
    );

    return (
      <div style={{ fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", direction: "rtl", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(160deg,#C8102E,#9B0B22)", padding: "36px 24px 55px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -30, left: 0, right: 0, height: 60, background: C.bg, borderRadius: "50% 50% 0 0" }} />
          <button onClick={() => setStep("otp")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 16 }}>
            <IcoBack s={18} c="white" />
          </button>
          <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>כמעט סיימנו!</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 6 }}>ספר לנו קצת על עצמך</div>
        </div>
        <div style={{ flex: 1, padding: "28px 24px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            {[{ l: "שם פרטי", k: "firstName", ph: "כגון: חמדאן" }, { l: "שם משפחה", k: "lastName", ph: "כגון: אחמד" }].map(f => (
              <div key={f.k} style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginBottom: 5 }}>{f.l} *</div>
                <input value={form[f.k]} onChange={e => { const v = e.target.value; setForm(p => ({ ...p, [f.k]: v })); setFormErrors(p => ({ ...p, [f.k]: "" })); }}
                  placeholder={f.ph}
                  style={{ width: "100%", background: "white", border: "1.5px solid " + (formErrors[f.k] ? C.red : C.lightGray), borderRadius: 13, padding: "12px 13px", fontSize: 13, outline: "none", direction: "rtl", fontFamily: "Arial,sans-serif" }} />
                {formErrors[f.k] && <div style={{ color: C.red, fontSize: 10, marginTop: 3 }}>{formErrors[f.k]}</div>}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginBottom: 8 }}>מגדר *</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ v: "male", l: "זכר" }, { v: "female", l: "נקבה" }, { v: "other", l: "אחר" }].map(g => (
                <button key={g.v} onClick={() => { setForm(p => ({ ...p, gender: g.v })); setFormErrors(p => ({ ...p, gender: "" })); }}
                  style={{ flex: 1, padding: "12px 8px", borderRadius: 14, border: "2px solid " + (form.gender === g.v ? C.red : C.lightGray), background: form.gender === g.v ? "rgba(200,16,46,0.06)" : "white", cursor: "pointer", fontSize: 12, fontWeight: form.gender === g.v ? 700 : 500, color: form.gender === g.v ? C.red : C.gray }}>
                  {g.l}
                </button>
              ))}
            </div>
            {formErrors.gender && <div style={{ color: C.red, fontSize: 10, marginTop: 4 }}>{formErrors.gender}</div>}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginBottom: 5 }}>גיל *</div>
            <input value={form.age} onChange={e => { const v = e.target.value.replace(/\D/g, ""); setForm(p => ({ ...p, age: v })); setFormErrors(p => ({ ...p, age: "" })); }}
              placeholder="הזן גיל (13-100)" maxLength={3}
              style={{ width: "100%", background: "white", border: "1.5px solid " + (formErrors.age ? C.red : C.lightGray), borderRadius: 13, padding: "12px 13px", fontSize: 14, outline: "none", direction: "rtl", fontFamily: "Arial,sans-serif" }} />
            {formErrors.age && <div style={{ color: C.red, fontSize: 10, marginTop: 3 }}>{formErrors.age}</div>}
          </div>
          <button onClick={handleRegister} disabled={loading}
            style={{ width: "100%", background: loading ? "rgba(200,16,46,0.5)" : C.red, color: "white", border: "none", borderRadius: 16, padding: "15px", fontSize: 15, fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 20px rgba(200,16,46,0.35)" }}>
            {loading ? <><LoadSpinner />יוצר חשבון...</> : <><IcoCheck s={18} c="white" />יצירת חשבון</>}
          </button>
        </div>
        <style>{`*{box-sizing:border-box}`}</style>
      </div>
    );
  }

  return null;
}
