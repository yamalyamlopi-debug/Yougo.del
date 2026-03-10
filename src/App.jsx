import { useState, useEffect, useCallback } from "react";
import { supabase } from "./lib/supabase";
import AdminReal from "./AdminReal.jsx";
import BusinessPortal from "./BusinessPortal.jsx";

// ── الألوان ────────────────────────────────────────────────────────────────────
const C = {
  red:"#C8102E", gold:"#F5A623", bg:"#F7F7F8", white:"#FFFFFF",
  dark:"#111827", gray:"#6B7280", lightGray:"#E5E7EB", ultra:"#F3F4F6",
  green:"#10B981", blue:"#3B82F6", purple:"#8B5CF6", orange:"#F97316",
  adminBg:"#0D0F14", adminSide:"#151820", adminCard:"#1C2030",
  adminBorder:"#252A3A", adminText:"#E2E8F0", adminMuted:"#64748B",
};
function hexA(hex,a){return hex+a;}

// ── الأيقونات ──────────────────────────────────────────────────────────────────
function IcoHome({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoSearch({s=22,c=C.dark}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7.5" stroke={c} strokeWidth="1.8"/><path d="M17 17l3.5 3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoClose({s=14,c=C.dark}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoStar({s=13}){return(<svg width={s} height={s} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/></svg>);}
function IcoClock({s=13,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoTruck({s=15,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 11l2-6h10l2 6" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><rect x="1" y="11" width="16" height="6" rx="1" stroke={c} strokeWidth="1.6"/><circle cx="6" cy="19" r="2" stroke={c} strokeWidth="1.6"/><circle cx="14" cy="19" r="2" stroke={c} strokeWidth="1.6"/><path d="M17 11l2 2 3-3" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoCart({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoUser({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoOrders({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={c} strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoStore({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 9l1.5-5h15L21 9" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" stroke={c} strokeWidth="1.8"/><path d="M5 21V9M19 21V9M5 21h14" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><rect x="9" y="14" width="6" height="7" rx="1" stroke={c} strokeWidth="1.6"/></svg>);}
function IcoFork({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 2v8a3 3 0 01-3 3H9a3 3 0 01-3-3V2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M12 13v9M8 2v4M12 2v4M16 2v4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoPin({s=14,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.6"/></svg>);}
function IcoPlus({s=16,c="white"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.2" strokeLinecap="round"/></svg>);}
function IcoMinus({s=16,c=C.dark}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={c} strokeWidth="2.2" strokeLinecap="round"/></svg>);}
function IcoCheck({s=16,c=C.green}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoFire({s=14,c="#F97316"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2c0 0-4 4-4 8a4 4 0 008 0c0-1.5-.5-3-1-4 0 1.5-1 2.5-2 2.5S11 7 11 6 12 2 12 2z" opacity="0.8"/><path d="M8 17a4 4 0 008 0c0-2-1-3.5-2-5 0 1.5-1 2.5-2 2.5S10 13.5 10 12c-1.5 1.5-2 3-2 5z"/></svg>);}
function IcoGift({s=20,c="white"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="4" rx="1" stroke={c} strokeWidth="1.7"/><path d="M5 12v9h14v-9" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/><path d="M12 8v13M12 8c0-2 1.5-4 3-4s1.5 2 0 4M12 8c0-2-1.5-4-3-4S7.5 6 9 8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>);}
function IcoShield({s=16,c="white"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2l9 4v6c0 5.25-3.75 10.15-9 11.5C6.75 22.15 3 17.25 3 12V6l9-4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoBell({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoChart({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M7 16l4-4 4 4 4-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoUsers({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" stroke={c} strokeWidth="1.7"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><path d="M17 5c1.66 0 3 1.34 3 3s-1.34 3-3 3M22 20c0-3-2-5-5-5" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>);}
function IcoPkg({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoMeg({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 11v2a1 1 0 001 1h1l2 5h2l-1-5h8l3 3V5l-3 3H4a1 1 0 00-1 1v.5" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoImg({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={c} strokeWidth="1.7"/><circle cx="8.5" cy="8.5" r="1.5" stroke={c} strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoBack({s=22,c=C.dark}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoEdit({s=14,c=C.blue}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>);}
function IcoTrash({s=14,c="#EF4444"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoCog({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.7"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={c} strokeWidth="1.7"/></svg>);}
function IcoChevDown({s=14,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoPhone({s=20,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoMotorbike({s=22,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="5" cy="16" r="3" stroke={c} strokeWidth="1.8"/><circle cx="19" cy="16" r="3" stroke={c} strokeWidth="1.8"/><path d="M5 16h-2l3-7h8l4 4h2" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 9l-2-4H9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}

// ── شعار يوغو ──────────────────────────────────────────────────────────────────
function YougoLogo({size=36,white=false}){
  var bg=white?"white":C.red; var fg=white?C.red:"white";
  return(<svg width={size} height={size} viewBox="0 0 60 60" fill="none"><rect width="60" height="60" rx="16" fill={bg}/><path d="M12 42V20l16 16V20" stroke={fg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 30h16M42 24l8 6-8 6" stroke={fg} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}

// ── شعارات المطاعم ─────────────────────────────────────────────────────────────
function LogoVerona({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#C8102E"/><rect x="36" y="14" width="8" height="28" rx="4" fill="white"/><rect x="33" y="38" width="14" height="8" rx="2" fill="white" opacity="0.7"/><path d="M54 14v10M54 14h-4v10M54 14h4v10M52 24v22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">VERONA</text></svg>);}
function LogoKakao({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#4A2512"/><circle cx="40" cy="40" r="28" fill="none" stroke="#C8860A" strokeWidth="2" opacity="0.5"/><path d="M24 32h32l-4 20H28L24 32z" fill="#C8860A" opacity="0.9"/><path d="M52 36c4 0 6 2 6 5s-2 5-6 5" stroke="#C8860A" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M32 26c0-4 4-4 4-8M40 26c0-4 4-4 4-8M48 26c0-4 4-4 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">KAKAO</text></svg>);}
function LogoWala({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#F5A623"/><rect x="37" y="12" width="6" height="46" rx="3" fill="#7B3F00"/><ellipse cx="40" cy="24" rx="14" ry="5" fill="#C8102E" opacity="0.9"/><ellipse cx="40" cy="30" rx="16" ry="5" fill="#E05A20" opacity="0.9"/><ellipse cx="40" cy="36" rx="17" ry="5" fill="#C8102E" opacity="0.85"/><ellipse cx="40" cy="42" rx="16" ry="5" fill="#E05A20" opacity="0.85"/><ellipse cx="40" cy="48" rx="14" ry="4" fill="#C8102E" opacity="0.8"/><text x="40" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif">WALA</text></svg>);}
function LogoPeperoni({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#E63946"/><circle cx="40" cy="38" r="22" fill="#F59E0B"/><circle cx="40" cy="38" r="18" fill="#FBBF24"/><circle cx="36" cy="34" r="4" fill="#C8102E"/><circle cx="46" cy="36" r="4" fill="#C8102E"/><circle cx="38" cy="44" r="4" fill="#C8102E"/><circle cx="48" cy="46" r="3" fill="#C8102E"/><circle cx="30" cy="42" r="3" fill="#C8102E"/><text x="40" y="70" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">PEPERONI</text></svg>);}
function LogoSushi({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#1D3557"/><circle cx="40" cy="36" r="18" fill="white"/><circle cx="40" cy="36" r="14" fill="#1D3557"/><circle cx="40" cy="36" r="9" fill="#F59E0B"/><circle cx="40" cy="36" r="5" fill="#EF4444"/><path d="M22 18L36 38" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/><path d="M26 14L38 36" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/><text x="40" y="67" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">SUSHI TIME</text></svg>);}
function LogoLemon({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#F59E0B"/><ellipse cx="40" cy="37" rx="18" ry="14" fill="#FEF08A"/><ellipse cx="40" cy="37" rx="18" ry="14" fill="none" stroke="#EAB308" strokeWidth="1.5"/><path d="M40 23v28M22 37h36M27 27l26 20M53 27L27 47" stroke="#EAB308" strokeWidth="1" opacity="0.5"/><path d="M50 22c2-6 8-8 10-6-4 2-6 6-6 10-2-2-4-4-4-4z" fill="#16A34A"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">LEMON</text></svg>);}
function LogoBlackAngus({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#1A1A1A"/><path d="M35 18c-10 0-14 8-12 16 1 4 4 7 8 8v4h8v-4c4-1 7-4 8-8 2-8-2-16-12-16z" fill="white"/><path d="M23 22c-4-4-6-2-5 2l4 2M47 22c4-4 6-2 5 2l-4 2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><circle cx="30" cy="28" r="2" fill="#1A1A1A"/><circle cx="40" cy="28" r="2" fill="#1A1A1A"/><ellipse cx="35" cy="34" rx="5" ry="3" fill="#FFB3B3"/><circle cx="32.5" cy="34" r="1.2" fill="#1A1A1A"/><circle cx="37.5" cy="34" r="1.2" fill="#1A1A1A"/><text x="35" y="56" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">BLACK ANGUS</text></svg>);}
function LogoHirna({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#16A34A"/><path d="M15 20h5l6 22h20l4-14H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="30" cy="46" r="3" fill="white"/><circle cx="42" cy="46" r="3" fill="white"/><path d="M45 18c0-4 4-6 8-4-2 2-4 6-2 8-2 0-6-2-6-4z" fill="#BBF7D0"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">HIRNA</text></svg>);}
function LogoMalak({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#C8102E"/><path d="M14 48V24l10 14 11-14v24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M35 24l11 14 10-14v24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><text x="35" y="60" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">MALAK</text></svg>);}
function LogoFadi({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#0EA5E9"/><path d="M30 18h10v4c4 2 6 6 6 10v18H24V32c0-4 2-8 6-10V18z" fill="white" opacity="0.9"/><path d="M28 38h14" stroke="#0EA5E9" strokeWidth="1.5"/><path d="M28 44h14" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.5"/><rect x="29" y="14" width="12" height="6" rx="2" fill="#FFD166"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">FADI</text></svg>);}
function LogoKing({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#7C3AED"/><path d="M15 42h40L50 26l-10 12-5-14-5 14-10-12L15 42z" fill="#FFD166"/><path d="M13 42h44v4H13v-4z" fill="#F59E0B"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">KING STORE</text></svg>);}
function LogoAlward({size=44}){
  var petals=[{cx:49,cy:32,rot:0},{cx:42,cy:20,rot:60},{cx:28,cy:20,rot:120},{cx:21,cy:32,rot:180},{cx:28,cy:44,rot:240},{cx:42,cy:44,rot:300}];
  return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#EC4899"/>{petals.map(function(p,i){return(<ellipse key={i} cx={p.cx} cy={p.cy} rx="5" ry="8" transform={"rotate("+p.rot+","+p.cx+","+p.cy+")"} fill="#FCA5A5" opacity="0.7"/>);})}<circle cx="35" cy="32" r="10" fill="#FCA5A5"/><circle cx="35" cy="32" r="6" fill="#F472B6"/><circle cx="35" cy="32" r="3" fill="#EC4899"/><path d="M35 42v10" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/><path d="M35 48c-4-2-6-4-4-6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/><text x="35" y="60" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">AL-WARD</text></svg>);
}

// ── أيقونات الفئات ─────────────────────────────────────────────────────────────
function CatAll({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="10" cy="10" r="6" fill={active?"white":"#F59E0B"} opacity={active?0.9:1}/><circle cx="22" cy="10" r="6" fill={active?"white":"#C8102E"} opacity={active?0.9:1}/><circle cx="10" cy="22" r="6" fill={active?"white":"#16A34A"} opacity={active?0.9:1}/><circle cx="22" cy="22" r="6" fill={active?"white":"#3B82F6"} opacity={active?0.9:1}/></svg>);}
function CatChicken({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M8 26c0-6 2-10 8-12 6-2 10 2 10 6s-4 8-10 8-8-2-8-2z" fill={active?"white":"#F59E0B"}/><circle cx="18" cy="14" r="3" fill={active?"rgba(255,255,255,0.8)":"#EF4444"}/><path d="M24 8c2 0 4 1 4 3s-2 4-4 4M24 8l-2 6" stroke={active?"white":"#C8102E"} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function CatBurger({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M6 12c0-4 4-6 10-6s10 2 10 6" fill={active?"white":"#F59E0B"}/><rect x="4" y="12" width="24" height="4" rx="2" fill={active?"rgba(255,255,255,0.7)":"#EF4444"}/><path d="M4 16c1 3 3 4 12 4s11-1 12-4" fill={active?"rgba(255,255,255,0.6)":"#22C55E"}/><rect x="4" y="20" width="24" height="5" rx="2.5" fill={active?"white":"#F59E0B"}/></svg>);}
function CatShawarma({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="14" y="4" width="4" height="24" rx="2" fill={active?"rgba(255,255,255,0.5)":"#92400E"}/><ellipse cx="16" cy="10" rx="7" ry="3" fill={active?"white":"#EF4444"} opacity="0.9"/><ellipse cx="16" cy="14" rx="8" ry="3" fill={active?"rgba(255,255,255,0.9)":"#F97316"} opacity="0.9"/><ellipse cx="16" cy="18" rx="7" ry="3" fill={active?"white":"#EF4444"} opacity="0.85"/><ellipse cx="16" cy="22" rx="6" ry="2.5" fill={active?"rgba(255,255,255,0.9)":"#F97316"} opacity="0.8"/></svg>);}
function CatPizza({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 4l12 22H4L16 4z" fill={active?"white":"#F59E0B"}/><circle cx="13" cy="17" r="2.5" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/><circle cx="19" cy="20" r="2" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/><circle cx="16" cy="13" r="1.5" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/></svg>);}
function CatSushi({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" fill="white" opacity={active?0.9:1}/><circle cx="16" cy="16" r="7" fill={active?"rgba(255,255,255,0.4)":"#1D3557"}/><circle cx="16" cy="16" r="4" fill={active?"white":"#F59E0B"}/><circle cx="16" cy="16" r="2" fill={active?"rgba(200,16,46,0.8)":"#EF4444"}/></svg>);}
function CatDrinks({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M10 8l2 16h8l2-16H10z" fill={active?"white":"#BAE6FD"}/><path d="M8 8h16" stroke={active?"rgba(255,255,255,0.5)":"#0EA5E9"} strokeWidth="2" strokeLinecap="round"/><path d="M13 8c-1-2 1-4 3-4s4 2 3 4" fill={active?"rgba(255,255,255,0.4)":"#7DD3FC"}/></svg>);}
function CatSweets({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M6 22c0-8 4-12 10-12s10 4 10 12H6z" fill={active?"white":"#F59E0B"}/><rect x="14" y="8" width="4" height="14" rx="2" fill={active?"rgba(255,255,255,0.5)":"#92400E"}/><path d="M6 22h20v3H6v-3z" fill={active?"rgba(255,255,255,0.7)":"#D97706"}/></svg>);}
function MktAll({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M6 8h4l5 14h6l5-14h4" stroke={active?"white":"#C8102E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="26" r="2" fill={active?"white":"#C8102E"}/><circle cx="22" cy="26" r="2" fill={active?"white":"#C8102E"}/></svg>);}
function MktFruits({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M16 10c-5 0-8 4-8 9s3 9 8 9 8-4 8-9-3-9-8-9z" fill={active?"white":"#EF4444"} opacity={active?0.9:1}/><path d="M16 10c1-4 5-5 7-3" stroke={active?"white":"#16A34A"} strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M21 6c0-2 4-3 5-1-1 0-2 2-3 3-1 0-2-1-2-2z" fill={active?"rgba(255,255,255,0.7)":"#16A34A"}/></svg>);}
function MktMeat({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M8 22c0-6 4-12 12-12 4 0 7 2 7 5s-3 7-7 7H8z" fill={active?"white":"#EF4444"} opacity={active?0.9:1}/><circle cx="10" cy="22" r="3" fill={active?"rgba(255,255,255,0.6)":"white"}/><rect x="10" y="19" width="14" height="6" rx="3" fill={active?"rgba(255,255,255,0.6)":"white"}/><circle cx="24" cy="22" r="3" fill={active?"rgba(255,255,255,0.6)":"white"}/></svg>);}
function MktSnacks({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M10 14c-2-4 0-8 4-8s5 4 2 8M18 14c-2-4 0-8 4-8s5 4 2 8M22 14c2-4 6-2 6 2s-4 6-8 6" fill={active?"white":"#FEF08A"}/><path d="M10 14c-4-2-6 2-6 6s4 8 12 8 12-4 12-8-2-8-6-6" fill={active?"rgba(255,255,255,0.8)":"#FBBF24"}/></svg>);}
function MktDairy({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M13 8h6v2c3 1 5 4 5 8v8H8v-8c0-4 2-7 5-8V8z" fill={active?"white":"#DBEAFE"}/><rect x="12" y="4" width="8" height="5" rx="2" fill={active?"rgba(255,255,255,0.6)":"#93C5FD"}/></svg>);}

// ── البيانات (سيتم الاستبدال بـ Supabase) ──────────────────────────────────────
var LOGO_MAP = {
  Verona:LogoVerona, Kakao:LogoKakao, Wala:LogoWala, Peperoni:LogoPeperoni,
  SushiTime:LogoSushi, Lemon:LogoLemon,
  BlackAngus:LogoBlackAngus, Hirna:LogoHirna, MalakMarket:LogoMalak,
  Fadi:LogoFadi, KingStore:LogoKing, Alward:LogoAlward
};

// بيانات وهمية مؤقتة — ستأتي من Supabase
var STATIC_RESTAURANTS = [
  {id:1,name:"فيرونا كريسبي",cat:"دجاج مقلي",location:"راما - الشارع الرئيسي",rating:4.8,reviews:240,time:"20-30",fee:12,min:40,open:true,close:"22:00",logo:"Verona",color:"#C8102E",tags:["جديد","الأكثر شعبية"],
    menu:[{id:1,name:"وجبة ميكس كنتاكي",desc:"8 أفخاذ + 4 أجنحة + 8 قطع + صوص",price:130,hot:true},{id:2,name:"وجبة أجنحة دجاج فردية",desc:"10 قطع مع سلطة كولسلو وصوص",price:50,hot:false},{id:3,name:"برغر كريسبي",desc:"برغر دجاج مقلي مع جبن وصوص خاص",price:38,hot:true},{id:4,name:"وجبة صدر دجاج",desc:"صدر دجاج مقلي مع بطاطس وصوص",price:45,hot:false}]},
  {id:2,name:"كاكاو كرميئيل",cat:"قهوة وحلويات",location:"مركز جان الحير، كرميئيل",rating:4.9,reviews:180,time:"25-35",fee:15,min:50,open:true,close:"23:00",logo:"Kakao",color:"#6B3F1A",tags:["جديد"],
    menu:[{id:1,name:"لاتيه كراميل",desc:"إسبريسو مع حليب مرغي وشراب الكراميل",price:24,hot:true},{id:2,name:"كيكة شوكولاتة",desc:"كيكة غنية بالشوكولاتة الداكنة",price:28,hot:false},{id:3,name:"كابوتشينو",desc:"إسبريسو مزدوج مع رغوة الحليب",price:22,hot:true},{id:4,name:"وافل بلجيكي",desc:"وافل مع كريمة وفراولة طازجة",price:35,hot:false}]},
  {id:3,name:"وله كريسبي",cat:"شاورما ومشاوي",location:"نحف - المركز",rating:4.7,reviews:320,time:"15-25",fee:10,min:35,open:true,close:"23:30",logo:"Wala",color:"#F5A623",tags:["الأكثر شعبية"],
    menu:[{id:1,name:"شاورما دجاج",desc:"شاورما دجاج على النار مع خضروات طازجة",price:32,hot:true},{id:2,name:"برغر كريسبي",desc:"برغر مقلي مع جبن وصوص",price:28,hot:false},{id:3,name:"تورتيلا شاورما",desc:"خبز تورتيلا مع شاورما وصوص ثوم",price:35,hot:true},{id:4,name:"بطاطس مقلية",desc:"بطاطس ذهبية مع كاتشب",price:15,hot:false}]},
  {id:4,name:"بيبيروني بيتزا",cat:"بيتزا",location:"راما - الحي الجديد",rating:4.6,reviews:150,time:"30-45",fee:12,min:55,open:false,close:"21:00",logo:"Peperoni",color:"#E63946",tags:[],
    menu:[{id:1,name:"بيتزا مارغريتا",desc:"صوص طماطم موزاريلا ريحان",price:65,hot:true},{id:2,name:"بيتزا بيبيروني",desc:"صوص طماطم مع بيبيروني وجبن مضاعف",price:75,hot:true},{id:3,name:"بيتزا خضروات",desc:"فطر فلفل زيتون بصل محمر",price:70,hot:false},{id:4,name:"بيتزا دجاج BBQ",desc:"دجاج مشوي مع صوص BBQ وبصل",price:78,hot:false}]},
  {id:5,name:"سوشي تايم",cat:"سوشي",location:"عكا - المركز التجاري",rating:4.5,reviews:95,time:"35-50",fee:18,min:80,open:true,close:"22:30",logo:"SushiTime",color:"#1D3557",tags:["جديد"],
    menu:[{id:1,name:"رول سالمون",desc:"8 قطع سالمون طازج مع أفوكادو",price:55,hot:true},{id:2,name:"نيجيري تونة",desc:"6 قطع تونة طازجة على أرز السوشي",price:48,hot:false},{id:3,name:"كاليفورنيا رول",desc:"8 قطع كراب أفوكادو وخيار",price:42,hot:true},{id:4,name:"تشكيلة سوشي 20 قطعة",desc:"تشكيلة متنوعة من أفضل السوشي",price:120,hot:false}]},
  {id:6,name:"ليمون فريش",cat:"عصائر طازجة",location:"الناصرة - شارع الحبلة",rating:4.9,reviews:410,time:"10-20",fee:8,min:25,open:true,close:"00:00",logo:"Lemon",color:"#F59E0B",tags:["الأكثر شعبية"],
    menu:[{id:1,name:"عصير ليمون بالنعنع",desc:"ليمون طازج مع نعنع وثلج مجروش",price:18,hot:true},{id:2,name:"موهيتو منعش",desc:"ليمون نعنع سكر وماء فوار",price:22,hot:true},{id:3,name:"عصير برتقال طازج",desc:"برتقال طازج معصور في الحال",price:16,hot:false},{id:4,name:"سموذي مانجو",desc:"مانجو طازج مع حليب جوز الهند",price:24,hot:false}]},
];

var STATIC_MARKET = [
  {id:1,name:"بلاك أنجوس",cat:"جزارة وسوبرماركت",location:"نحف - حي المهجرين",rating:5.0,reviews:10,open:true,close:"22:00",logo:"BlackAngus",color:"#1A1A1A"},
  {id:2,name:"سوبرماركت حيرنا",cat:"سوبرماركت",location:"نحف",rating:4.5,reviews:100,open:true,close:"23:30",logo:"Hirna",color:"#16A34A"},
  {id:3,name:"مالك ماركت",cat:"سوبرماركت",location:"نحف",rating:4.8,reviews:10,open:true,close:"00:00",logo:"MalakMarket",color:"#C8102E"},
  {id:4,name:"فادي - مشروبات",cat:"مشروبات",location:"مجد الكروم",rating:5.0,reviews:10,open:true,close:"20:30",logo:"Fadi",color:"#0EA5E9"},
  {id:5,name:"كينج ستور",cat:"محل عام",location:"راما",rating:4.6,reviews:30,open:true,close:"23:00",logo:"KingStore",color:"#7C3AED"},
  {id:6,name:"الورد",cat:"بقالة",location:"راما - مركز الحي",rating:4.7,reviews:45,open:false,close:"21:00",logo:"Alward",color:"#EC4899"},
];

var BANNERS = [
  {id:1,title:"مع يوغو",sub:"البيت دائماً جاهز",tag:"رمضان كريم",bg:"linear-gradient(135deg,#C8102E 0%,#7B0D1E 100%)"},
  {id:2,title:"توصيل مجاني",sub:"على أول طلب",tag:"عرض محدود",bg:"linear-gradient(135deg,#F5A623 0%,#C27A0E 100%)"},
  {id:3,title:"أكل طازج",sub:"من أفضل المطاعم",tag:"كل يوم",bg:"linear-gradient(135deg,#1D3557 0%,#0A1A30 100%)"},
  {id:4,title:"يوغو بريميوم",sub:"انضم ووفّر 20%",tag:"انضم الآن",bg:"linear-gradient(135deg,#7C3AED 0%,#4C1D95 100%)"},
];

var CATS = [
  {id:"all",Cmp:CatAll,label:"الكل"},
  {id:"chicken",Cmp:CatChicken,label:"دجاج"},
  {id:"burger",Cmp:CatBurger,label:"برغر"},
  {id:"shawarma",Cmp:CatShawarma,label:"شاورما"},
  {id:"pizza",Cmp:CatPizza,label:"بيتزا"},
  {id:"sushi",Cmp:CatSushi,label:"سوشي"},
  {id:"drinks",Cmp:CatDrinks,label:"مشروبات"},
  {id:"sweets",Cmp:CatSweets,label:"حلويات"},
];

var MKTCATS = [
  {id:"all",Cmp:MktAll,label:"ماركت"},
  {id:"fruits",Cmp:MktFruits,label:"فواكه وخضار"},
  {id:"meat",Cmp:MktMeat,label:"لحوم وأسماك"},
  {id:"snacks",Cmp:MktSnacks,label:"وجبات خفيفة"},
  {id:"dairy",Cmp:MktDairy,label:"منتجات الألبان"},
];

// ══════════════════════════════════════════════════════════════════════════════
// ── التطبيق الرئيسي ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

export default function App(){
  var [isLoggedIn,setIsLoggedIn] = useState(false);
  var [loggedUser,setLoggedUser] = useState(null);
  var [viewStack,setViewStack] = useState(["app"]); // Stack للرجوع
  var [tab,setTab] = useState("restaurants");
  var [restPage,setRestPage] = useState(null);
  var [cart,setCart] = useState([]);
  var [cartOpen,setCartOpen] = useState(false);
  var [banner,setBanner] = useState(0);
  var [cat,setCat] = useState("all");
  var [mktCat,setMktCat] = useState("all");
  var [searchQ,setSearchQ] = useState("");
  var [searchOpen,setSearchOpen] = useState(false);
  var [restaurants,setRestaurants] = useState(STATIC_RESTAURANTS);
  var [loadingRests,setLoadingRests] = useState(false);
  var [orderSuccess,setOrderSuccess] = useState(null);

  // الصفحة الحالية
  var view = viewStack[viewStack.length-1];

  // دالة الانتقال لصفحة جديدة
  function goTo(v){ setViewStack(function(s){ return s.concat([v]); }); }
  // دالة الرجوع
  function goBack(){
    setViewStack(function(s){
      if(s.length<=1) return s;
      return s.slice(0,-1);
    });
  }

  // جلب المطاعم من Supabase
  useEffect(function(){
    async function fetchRests(){
      setLoadingRests(true);
      try{
        var {data,error} = await supabase.from("restaurants").select("*").order("rating",{ascending:false});
        if(data && data.length>0){
          // تحويل بيانات Supabase لنفس الشكل
          var mapped = data.map(function(r){
            return {
              id:r.id, name:r.name, cat:r.cuisine||r.category||"", 
              location:r.address||r.location||"", rating:r.rating||4.5,
              reviews:r.reviews_count||0, time:r.delivery_time||"20-30",
              fee:r.delivery_fee||12, min:r.min_order||40,
              open:r.is_open!==false, close:r.closing_time||"22:00",
              logo:r.logo_key||"Verona", color:r.color||C.red,
              tags:r.tags||[], menu:r.menu||[]
            };
          });
          setRestaurants(mapped);
        }
      }catch(e){ /* استخدم البيانات الثابتة */ }
      setLoadingRests(false);
    }
    fetchRests();
  },[]);

  // فحص حالة تسجيل الدخول في Supabase
  useEffect(function(){
    supabase.auth.getSession().then(function({data:{session}}){
      if(session){
        setIsLoggedIn(true);
        setLoggedUser({
          name: session.user.user_metadata?.full_name || session.user.phone || "مستخدم",
          phone: session.user.phone || "",
          email: session.user.email || "",
          id: session.user.id,
        });
      }
    });
    var {data:{subscription}} = supabase.auth.onAuthStateChange(function(_event,session){
      if(session){
        setIsLoggedIn(true);
        setLoggedUser({
          name: session.user.user_metadata?.full_name || session.user.phone || "مستخدم",
          phone: session.user.phone || "",
          email: session.user.email || "",
          id: session.user.id,
        });
      } else {
        setIsLoggedIn(false);
        setLoggedUser(null);
      }
    });
    return function(){ subscription.unsubscribe(); };
  },[]);

  useEffect(function(){
    var t=setInterval(function(){ setBanner(function(p){return(p+1)%BANNERS.length;}); },3800);
    return function(){clearInterval(t);};
  },[]);

  function addToCart(item,rest){
    setCart(function(prev){
      var ex=prev.find(function(c){return c.id===item.id && c.rid===rest.id;});
      if(ex) return prev.map(function(c){return c.id===item.id && c.rid===rest.id ? Object.assign({},c,{qty:c.qty+1}) : c;});
      return prev.concat([Object.assign({},item,{qty:1,rid:rest.id,rname:rest.name})]);
    });
  }
  function remFromCart(iid,rid){
    setCart(function(prev){
      var ex=prev.find(function(c){return c.id===iid && c.rid===rid;});
      if(ex && ex.qty>1) return prev.map(function(c){return c.id===iid && c.rid===rid ? Object.assign({},c,{qty:c.qty-1}) : c;});
      return prev.filter(function(c){return !(c.id===iid && c.rid===rid);});
    });
  }
  var cartCount=cart.reduce(function(s,c){return s+c.qty;},0);
  var cartTotal=cart.reduce(function(s,c){return s+c.price*c.qty;},0);

  async function handleLogout(){
    await supabase.auth.signOut();
    setIsLoggedIn(false); setLoggedUser(null); setViewStack(["app"]); setCart([]);
  }

  // ── التوجيه ──────────────────────────────────────────────────────────────────
  if(view==="business") return <BusinessPortal onBack={goBack}/>;
  if(!isLoggedIn) return <AuthFlow onDone={function(u){setLoggedUser(u);setIsLoggedIn(true);}} onBusiness={function(){goTo("business");}}/>;
  if(view==="admin") return <AdminReal onBack={goBack}/>;
  if(view==="profile") return <ProfilePage onBack={goBack} cartCount={cartCount} goTo={goTo} user={loggedUser} onLogout={handleLogout}/>;
  if(view==="myorders") return <MyOrdersPage onBack={goBack} cartCount={cartCount} goTo={goTo} user={loggedUser}/>;
  if(view==="cartpage") return <CartPage cart={cart} add={addToCart} rem={remFromCart} onBack={goBack} setCart={setCart} cartCount={cartCount} goTo={goTo} user={loggedUser} onOrderSuccess={function(o){setOrderSuccess(o);setCart([]);goTo("orderstatus");}}/>;
  if(view==="orderstatus") return <OrderStatusPage order={orderSuccess} onBack={function(){setViewStack(["app"]);}} goTo={goTo}/>;
  if(view==="privacy") return <PrivacyPage onBack={goBack}/>;
  if(view==="terms") return <TermsPage onBack={goBack}/>;
  if(view==="cards") return <CardsPage onBack={goBack}/>;
  if(view==="invite") return <InvitePage onBack={goBack} user={loggedUser}/>;
  if(view==="support") return <SupportPage onBack={goBack} user={loggedUser}/>;

  if(restPage) return(
    <RestPage rest={restPage} cart={cart} add={addToCart} rem={remFromCart}
      onBack={function(){setRestPage(null);}} cartCount={cartCount} cartTotal={cartTotal}
      cartOpen={cartOpen} setCartOpen={setCartOpen} setCart={setCart} goTo={goTo}/>
  );

  var filtered=restaurants.filter(function(r){
    if(searchQ) return r.name.includes(searchQ)||r.cat.includes(searchQ);
    if(cat==="all") return true;
    var m={chicken:"دجاج",burger:"برغر",shawarma:"شاورما",pizza:"بيتزا",sushi:"سوشي",drinks:"عصير",sweets:"قهوة"};
    return r.cat.includes(m[cat]||"");
  });

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",overflowX:"hidden"}}>
      {/* شريط علوي */}
      <div style={{background:C.white,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        {searchOpen?(
          <div style={{flex:1,display:"flex",gap:8,alignItems:"center"}}>
            <input autoFocus value={searchQ} onChange={function(e){setSearchQ(e.target.value);}}
              placeholder="ابحث عن مطعم..."
              style={{flex:1,border:"1.5px solid "+C.lightGray,borderRadius:24,padding:"8px 14px",fontSize:13,outline:"none",background:C.ultra,direction:"rtl"}}/>
            <button onClick={function(){setSearchOpen(false);setSearchQ("");}}
              style={{background:C.ultra,border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <IcoClose/>
            </button>
          </div>
        ):(
          <>
            <button onClick={function(){setSearchOpen(true);}}
              style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"}}>
              <IcoSearch/>
            </button>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.ultra,borderRadius:24,padding:"7px 14px",cursor:"pointer"}}>
              <IcoHome s={18} c={C.red}/>
              <div style={{flex:1,textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:700,color:C.dark}}>البيت</div>
                <div style={{fontSize:10,color:C.gray}}>الفارسان 0، راما</div>
              </div>
              <IcoChevDown/>
            </div>
            <button onClick={function(){goTo("admin");}}
              style={{background:C.red,color:"white",border:"none",borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 2px 8px rgba(200,16,46,0.35)"}}>
              <IcoShield s={13}/> لوحة التحكم
            </button>
          </>
        )}
      </div>

      {/* تبويبات */}
      <div style={{background:C.white,display:"flex",borderBottom:"1px solid "+C.lightGray}}>
        {[{id:"restaurants",label:"مطاعم",I:IcoFork},{id:"market",label:"ماركت",I:IcoStore}].map(function(t){
          return(
            <button key={t.id} onClick={function(){setTab(t.id);}}
              style={{flex:1,background:"none",border:"none",padding:"11px 0 8px",fontSize:13,fontWeight:700,
                color:tab===t.id?C.red:C.gray,
                borderBottom:tab===t.id?"2.5px solid "+C.red:"2.5px solid transparent",
                cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <t.I s={18} c={tab===t.id?C.red:C.gray}/>{t.label}
            </button>
          );
        })}
      </div>

      {tab==="restaurants"?(
        <RestTab banner={banner} setBanner={setBanner} cat={cat} setCat={setCat} filtered={filtered} setRestPage={setRestPage} searchQ={searchQ} loading={loadingRests}/>
      ):(
        <MarketTab mktCat={mktCat} setMktCat={setMktCat}/>
      )}

      {cartCount>0&&(
        <button onClick={function(){setCartOpen(true);}}
          style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:C.red,color:"white",border:"none",borderRadius:30,padding:"12px 22px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",boxShadow:"0 6px 24px rgba(200,16,46,0.45)",zIndex:200,fontSize:13,fontWeight:700,minWidth:250,justifyContent:"space-between"}}>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:20,padding:"2px 10px",fontSize:12}}>{cartCount} عناصر</span>
          <span style={{display:"flex",alignItems:"center",gap:6}}><IcoCart s={17} c="white"/> عرض السلة</span>
          <span style={{fontWeight:900}}>₪{cartTotal}</span>
        </button>
      )}

      {cartOpen&&<CartModal cart={cart} total={cartTotal} add={addToCart} rem={remFromCart} onClose={function(){setCartOpen(false);}} setCart={setCart} goTo={goTo}/>}

      <BottomNavBar tab={tab} setTab={setTab} cartCount={cartCount} goTo={goTo}/>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── مكوّن الصفحة الأساسي (مع رجوع شغّال) ─────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function PageWrap({title,onBack,cartCount,goTo,children}){
  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",overflowX:"hidden"}}>
      {/* Header */}
      <div style={{background:C.white,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        <button onClick={onBack}
          style={{background:C.ultra,border:"none",borderRadius:"50%",width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <IcoBack s={20} c={C.dark}/>
        </button>
        <div style={{flex:1,fontSize:17,fontWeight:900,color:C.dark}}>{title}</div>
        <button onClick={function(){goTo&&goTo("cartpage");}} style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:4}}>
          <IcoCart s={24} c={C.dark}/>
          {cartCount>0&&(
            <span style={{position:"absolute",top:-2,left:-2,background:C.red,color:"white",fontSize:9,fontWeight:900,borderRadius:"50%",minWidth:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>
          )}
        </button>
      </div>
      <div style={{paddingBottom:90}}>{children}</div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── شريط التنقل السفلي ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function BottomNavBar({tab,setTab,cartCount,goTo}){
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.white,borderTop:"1px solid "+C.lightGray,display:"flex",zIndex:150,boxShadow:"0 -2px 12px rgba(0,0,0,0.07)"}}>
      {[
        {id:"restaurants",label:"مطاعم",I:IcoFork,action:function(){setTab("restaurants");}},
        {id:"market",label:"ماركت",I:IcoStore,action:function(){setTab("market");}},
        {id:"orders",label:"طلباتي",I:IcoOrders,action:function(){goTo("myorders");}},
        {id:"profile",label:"حسابي",I:IcoUser,action:function(){goTo("profile");}},
      ].map(function(item){
        var active=item.id===tab||(item.id==="orders"&&false)||(item.id==="profile"&&false);
        return(
          <button key={item.id} onClick={item.action}
            style={{flex:1,background:"none",border:"none",padding:"8px 0 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}>
            <div style={{position:"relative"}}>
              <item.I s={22} c={active?C.red:C.gray}/>
              {item.id==="orders"&&cartCount>0&&(
                <span style={{position:"absolute",top:-4,right:-6,background:C.red,color:"white",fontSize:9,fontWeight:900,borderRadius:"50%",minWidth:15,height:15,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>
              )}
            </div>
            <span style={{fontSize:10,fontWeight:active?700:500,color:active?C.red:C.gray}}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── قائمة المطاعم ─────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function RestTab({banner,setBanner,cat,setCat,filtered,setRestPage,searchQ,loading}){
  return(
    <div style={{paddingBottom:90}}>
      {!searchQ&&(
        <div style={{padding:"14px 16px 8px"}}>
          <div style={{borderRadius:22,overflow:"hidden",position:"relative",height:165}}>
            <div style={{display:"flex",transition:"transform .55s ease",transform:"translateX("+banner*100+"%)" }}>
              {BANNERS.map(function(b){
                return(
                  <div key={b.id} style={{minWidth:"100%",height:165,background:b.bg,display:"flex",flexDirection:"column",justifyContent:"center",padding:"22px 24px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",right:-30,top:-30,width:150,height:150,background:"rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
                    <div style={{position:"absolute",left:20,bottom:10,opacity:0.1}}><YougoLogo size={80} white={true}/></div>
                    <span style={{color:"rgba(255,255,220,0.9)",fontSize:11,fontWeight:700,marginBottom:4,background:"rgba(255,255,255,0.1)",alignSelf:"flex-start",borderRadius:20,padding:"2px 10px"}}>{b.tag}</span>
                    <div style={{color:"white",fontSize:24,fontWeight:900,lineHeight:1.15}}>{b.title}</div>
                    <div style={{color:"rgba(255,255,255,0.85)",fontSize:15,fontWeight:600,marginTop:3}}>{b.sub}</div>
                  </div>
                );
              })}
            </div>
            <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5}}>
              {BANNERS.map(function(_,i){
                return(<div key={i} onClick={function(){setBanner(i);}} style={{width:i===banner?22:7,height:7,borderRadius:3.5,background:i===banner?"white":"rgba(255,255,255,0.4)",transition:"all .3s",cursor:"pointer"}}/>);
              })}
            </div>
          </div>
        </div>
      )}

      {!searchQ&&(
        <div style={{padding:"4px 0 6px"}}>
          <div style={{display:"flex",gap:8,overflowX:"auto",padding:"4px 16px",scrollbarWidth:"none"}}>
            {CATS.map(function(c){
              var active=cat===c.id;
              return(
                <button key={c.id} onClick={function(){setCat(c.id);}}
                  style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:active?C.red:C.white,border:active?"none":"1.5px solid "+C.lightGray,borderRadius:16,padding:"9px 14px",cursor:"pointer",flexShrink:0,transition:"all .2s",boxShadow:active?"0 4px 14px rgba(200,16,46,0.28)":"none"}}>
                  <c.Cmp active={active}/>
                  <span style={{fontSize:10,fontWeight:700,color:active?"white":C.dark,whiteSpace:"nowrap"}}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{padding:"8px 16px 6px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:6}}>
          {!searchQ&&<IcoFire/>}
          {searchQ?"نتائج: "+searchQ:cat==="all"?"الأكثر شعبية":CATS.find(function(c){return c.id===cat;}).label}
        </span>
        <span style={{fontSize:12,color:C.gray}}>{filtered.length} مطاعم</span>
      </div>

      {loading&&(
        <div style={{textAlign:"center",padding:"30px 0"}}>
          <div style={{width:28,height:28,border:"3px solid "+C.lightGray,borderTopColor:C.red,borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block"}}/>
        </div>
      )}

      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:14}}>
        {filtered.map(function(r,i){return <RestCard key={r.id} r={r} onClick={function(){setRestPage(r);}} delay={i*60}/>;} )}
        {filtered.length===0&&!loading&&(
          <div style={{textAlign:"center",padding:"50px 0",color:C.gray}}>
            <IcoSearch s={48} c={C.lightGray}/>
            <div style={{fontSize:14,marginTop:10,fontWeight:600}}>لا توجد نتائج</div>
          </div>
        )}
      </div>

      {!searchQ&&(
        <div style={{margin:"20px 16px 0",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",borderRadius:20,padding:"18px 20px",display:"flex",alignItems:"center",gap:14}}>
          <IcoGift s={36}/>
          <div>
            <div style={{color:"white",fontWeight:900,fontSize:15}}>أرسل بطاقة هدية!</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,marginTop:2}}>خيارات دفع متعددة</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── بطاقة مطعم ────────────────────────────────────────────────────────────────
function RestCard({r,onClick,delay}){
  var Logo=LOGO_MAP[r.logo]||LogoVerona;
  return(
    <div onClick={onClick}
      style={{background:C.white,borderRadius:22,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",animation:"fadeIn .4s ease "+delay+"ms both",transition:"transform .15s,box-shadow .15s"}}>
      <div style={{height:115,background:"linear-gradient(135deg,"+hexA(r.color,"22")+","+hexA(r.color,"44")+")",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <Logo size={80}/>
        {!r.open&&(
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontSize:12,fontWeight:700,background:"rgba(0,0,0,0.5)",padding:"4px 14px",borderRadius:20}}>مغلق الآن</span>
          </div>
        )}
        {r.tags&&r.tags.map(function(t,i){
          return(<span key={t} style={{position:"absolute",top:8,right:i===0?8:84,background:t==="جديد"?C.green:C.gold,color:"white",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20}}>{t}</span>);
        })}
      </div>
      <div style={{padding:"12px 14px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontWeight:900,fontSize:15,color:C.dark}}>{r.name}</div>
            <div style={{fontSize:11,color:C.gray,marginTop:2,display:"flex",alignItems:"center",gap:3}}>
              <IcoPin s={11}/>{r.location}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,background:"rgba(245,158,11,0.1)",borderRadius:20,padding:"3px 9px"}}>
            <IcoStar/><span style={{fontSize:12,fontWeight:700,color:"#92400E"}}>{r.rating}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginTop:10}}>
          <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.gray}}><IcoClock/>{r.time} دقيقة</span>
          <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.gray}}><IcoTruck/>₪{r.fee} توصيل</span>
          <span style={{fontSize:11,color:C.gray}}>حد أدنى ₪{r.min}</span>
        </div>
      </div>
    </div>
  );
}

// ── صفحة المطعم ───────────────────────────────────────────────────────────────
function RestPage({rest,cart,add,rem,onBack,cartCount,cartTotal,cartOpen,setCartOpen,setCart,goTo}){
  var Logo=LOGO_MAP[rest.logo]||LogoVerona;
  var myCart=cart.filter(function(c){return c.rid===rest.id;});
  var myTotal=myCart.reduce(function(s,c){return s+c.price*c.qty;},0);

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",overflowX:"hidden"}}>
      {/* صورة الغلاف */}
      <div style={{height:200,background:"linear-gradient(135deg,"+hexA(rest.color,"33")+","+hexA(rest.color,"66")+")",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <Logo size={110}/>
        <button onClick={onBack}
          style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
          <IcoBack s={20} c={C.dark}/>
        </button>
        {cartCount>0&&(
          <button onClick={function(){setCartOpen(true);}}
            style={{position:"absolute",top:14,left:14,background:C.red,border:"none",borderRadius:20,padding:"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:"0 2px 8px rgba(200,16,46,0.4)"}}>
            <IcoCart s={16} c="white"/>
            <span style={{color:"white",fontSize:12,fontWeight:700}}>{cartCount}</span>
          </button>
        )}
      </div>

      {/* معلومات المطعم */}
      <div style={{background:C.white,padding:"16px",marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:C.dark}}>{rest.name}</div>
            <div style={{fontSize:12,color:C.gray,marginTop:3,display:"flex",alignItems:"center",gap:4}}>
              <IcoPin s={12}/>{rest.location}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,background:"rgba(245,158,11,0.1)",borderRadius:20,padding:"5px 12px"}}>
            <IcoStar s={15}/><span style={{fontSize:14,fontWeight:800,color:"#92400E"}}>{rest.rating}</span>
            <span style={{fontSize:11,color:C.gray}}>({rest.reviews})</span>
          </div>
        </div>
        <div style={{display:"flex",gap:16,marginTop:12}}>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:C.gray}}>
            <IcoClock s={14}/>{rest.time} دقيقة
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:C.gray}}>
            <IcoTruck s={14}/>توصيل ₪{rest.fee}
          </div>
          <div style={{fontSize:12,color:C.gray}}>حد أدنى ₪{rest.min}</div>
        </div>
        <div style={{marginTop:8,display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:rest.open?C.green:"#EF4444"}}/>
          <span style={{fontSize:12,fontWeight:600,color:rest.open?C.green:"#EF4444"}}>
            {rest.open?"مفتوح — يغلق "+rest.close:"مغلق الآن"}
          </span>
        </div>
      </div>

      {/* قائمة الطعام */}
      <div style={{padding:"0 16px"}}>
        <div style={{fontSize:16,fontWeight:900,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
          <IcoFork s={18} c={C.red}/> القائمة
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12,paddingBottom:100}}>
          {(rest.menu||[]).map(function(item){
            var qty=cart.filter(function(c){return c.id===item.id&&c.rid===rest.id;}).reduce(function(s,c){return s+c.qty;},0);
            return(
              <div key={item.id} style={{background:C.white,borderRadius:18,padding:"14px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:60,height:60,borderRadius:14,background:hexA(rest.color,"18"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <IcoFork s={26} c={rest.color}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <div style={{fontWeight:800,fontSize:14,color:C.dark}}>{item.name}</div>
                    {item.hot&&<IcoFire s={13}/>}
                  </div>
                  <div style={{fontSize:11,color:C.gray,marginTop:3,lineHeight:1.4}}>{item.desc}</div>
                  <div style={{fontSize:16,fontWeight:900,color:C.red,marginTop:6}}>₪{item.price}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                  {qty>0?(
                    <>
                      <button onClick={function(){rem(item.id,rest.id);}}
                        style={{width:30,height:30,borderRadius:"50%",background:C.ultra,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoMinus s={13}/>
                      </button>
                      <span style={{fontWeight:900,fontSize:15,minWidth:18,textAlign:"center"}}>{qty}</span>
                    </>
                  ):null}
                  <button onClick={function(){if(rest.open)add(item,rest);}}
                    style={{width:30,height:30,borderRadius:"50%",background:rest.open?C.red:C.lightGray,border:"none",cursor:rest.open?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <IcoPlus s={13}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {myTotal>0&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"white",padding:"12px 16px",boxShadow:"0 -2px 16px rgba(0,0,0,0.12)"}}>
          <button onClick={function(){setCartOpen(true);}}
            style={{width:"100%",background:"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:22,padding:"14px",fontSize:14,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 16px rgba(200,16,46,0.4)"}}>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"2px 10px",fontSize:12}}>{myCart.reduce(function(s,c){return s+c.qty;},0)} عناصر</span>
            <span>عرض السلة</span>
            <span>₪{myTotal}</span>
          </button>
        </div>
      )}

      {cartOpen&&<CartModal cart={cart} total={cartTotal} add={add} rem={rem} onClose={function(){setCartOpen(false);}} setCart={setCart} goTo={goTo}/>}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ── ماركت ─────────────────────────────────────────────────────────────────────
function MarketTab({mktCat,setMktCat}){
  return(
    <div style={{paddingBottom:90}}>
      <div style={{padding:"4px 0 6px"}}>
        <div style={{display:"flex",gap:8,overflowX:"auto",padding:"10px 16px",scrollbarWidth:"none"}}>
          {MKTCATS.map(function(c){
            var active=mktCat===c.id;
            return(
              <button key={c.id} onClick={function(){setMktCat(c.id);}}
                style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:active?C.red:C.white,border:active?"none":"1.5px solid "+C.lightGray,borderRadius:16,padding:"9px 14px",cursor:"pointer",flexShrink:0,transition:"all .2s",boxShadow:active?"0 4px 14px rgba(200,16,46,0.28)":"none"}}>
                <c.Cmp active={active}/>
                <span style={{fontSize:10,fontWeight:700,color:active?"white":C.dark,whiteSpace:"nowrap"}}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{padding:"4px 16px 8px",fontSize:16,fontWeight:900,color:C.dark}}>المتاجر القريبة</div>
      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:12}}>
        {STATIC_MARKET.map(function(s,i){
          var Logo=LOGO_MAP[s.logo]||LogoVerona;
          return(
            <div key={s.id} style={{background:C.white,borderRadius:20,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",animation:"fadeIn .4s ease "+(i*60)+"ms both",cursor:"pointer",display:"flex",alignItems:"center",gap:14,padding:"14px"}}>
              <div style={{width:56,height:56,borderRadius:14,overflow:"hidden",background:hexA(s.color,"18"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Logo size={46}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:900,fontSize:15,color:C.dark}}>{s.name}</div>
                <div style={{fontSize:11,color:C.gray,marginTop:1,display:"flex",alignItems:"center",gap:3}}>
                  <IcoPin s={11}/>{s.location}
                </div>
                <div style={{display:"flex",gap:8,marginTop:5,alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:3}}>
                    <IcoStar s={12}/><span style={{fontSize:11,fontWeight:700,color:"#92400E"}}>{s.rating}</span>
                  </div>
                  <div style={{width:4,height:4,borderRadius:"50%",background:C.lightGray}}/>
                  <div style={{width:8,height:8,borderRadius:"50%",background:s.open?C.green:"#EF4444"}}/>
                  <span style={{fontSize:11,color:s.open?C.green:"#EF4444",fontWeight:600}}>{s.open?"مفتوح":"مغلق"}</span>
                </div>
              </div>
              <IcoChevDown s={16} c={C.lightGray}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── نافذة السلة ───────────────────────────────────────────────────────────────
function CartModal({cart,total,add,rem,onClose,setCart,goTo}){
  var fee=total>=150?0:total>0?12:0;
  return(
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
      <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",maxHeight:"80vh",overflowY:"auto",direction:"rtl"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 18px",borderBottom:"1px solid "+C.lightGray,position:"sticky",top:0,background:"white",zIndex:1}}>
          <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}>
            <IcoCart s={18} c={C.red}/> سلتي ({cart.reduce(function(s,c){return s+c.qty;},0)})
          </div>
          <button onClick={onClose} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <IcoClose s={13}/>
          </button>
        </div>
        <div style={{padding:"12px 18px"}}>
          {cart.length===0?(
            <div style={{textAlign:"center",padding:"40px 0",color:C.gray}}>
              <IcoCart s={44} c={C.lightGray}/>
              <div style={{fontSize:14,marginTop:10,fontWeight:600}}>السلة فارغة</div>
            </div>
          ):(
            <>
              {cart.map(function(item,i){
                return(
                  <div key={item.id+"-"+item.rid}
                    style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<cart.length-1?"1px solid "+C.ultra:"none"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{item.name}</div>
                      <div style={{fontSize:11,color:C.gray}}>{item.rname}</div>
                      <div style={{fontSize:14,fontWeight:900,color:C.red,marginTop:3}}>₪{item.price}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={function(){rem(item.id,item.rid);}}
                        style={{width:28,height:28,borderRadius:"50%",background:C.ultra,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoMinus s={12}/>
                      </button>
                      <span style={{fontWeight:900,fontSize:14,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                      <button onClick={function(){add({id:item.id,name:item.name,price:item.price},{id:item.rid,name:item.rname});}}
                        style={{width:28,height:28,borderRadius:"50%",background:C.red,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoPlus s={12}/>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div style={{borderTop:"2px solid "+C.ultra,marginTop:12,paddingTop:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:5}}>
                  <span>مجموع المنتجات</span><span>₪{total}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:10}}>
                  <span>رسوم التوصيل</span>
                  <span style={{color:fee===0?C.green:C.dark}}>{fee===0?"مجاني":"₪"+fee}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:900,color:C.dark,marginBottom:14}}>
                  <span>الإجمالي</span><span style={{color:C.red}}>₪{total+fee}</span>
                </div>
                <button onClick={function(){onClose();goTo("cartpage");}}
                  style={{width:"100%",background:"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:18,padding:"13px",fontSize:14,fontWeight:900,cursor:"pointer",boxShadow:"0 4px 16px rgba(200,16,46,0.4)"}}>
                  إتمام الطلب — ₪{total+fee}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── صفحة إتمام الطلب ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function CartPage({cart,add,rem,onBack,setCart,cartCount,goTo,user,onOrderSuccess}){
  var total=cart.reduce(function(s,c){return s+c.price*c.qty;},0);
  var fee=total>0?(total>=150?0:12):0;
  var [promo,setPromo]=useState("");
  var [promoApplied,setPromoApplied]=useState(false);
  var [payMethod,setPayMethod]=useState("card");
  var [loading,setLoading]=useState(false);
  var [address,setAddress]=useState("الفارسان 0، راما");
  var discount=promoApplied?Math.round(total*0.1):0;
  var finalTotal=total+fee-discount;

  async function confirmOrder(){
    if(cart.length===0) return;
    setLoading(true);
    try{
      // حفظ الطلب في Supabase
      var orderData = {
        user_id: user?.id || null,
        user_phone: user?.phone || "",
        items: cart,
        total: finalTotal,
        delivery_fee: fee,
        address: address,
        payment_method: payMethod,
        status: "pending",
        promo_code: promoApplied?"YOUGO10":null,
      };
      var {data,error} = await supabase.from("orders").insert([orderData]).select().single();
      if(error) throw error;
      onOrderSuccess(data || orderData);
    }catch(e){
      // حتى لو فشل الحفظ، نكمل للمستخدم
      onOrderSuccess({id:"#"+Math.floor(Math.random()*90000+10000), ...{total:finalTotal, status:"pending"}});
    }
    setLoading(false);
  }

  return(
    <PageWrap title="سلتي" onBack={onBack} cartCount={cartCount} goTo={goTo}>
      {cart.length===0?(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px",textAlign:"center"}}>
          <div style={{width:100,height:100,borderRadius:"50%",background:C.ultra,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
            <IcoCart s={44} c={C.lightGray}/>
          </div>
          <div style={{fontSize:18,fontWeight:900,color:C.dark}}>السلة فارغة</div>
          <div style={{fontSize:13,color:C.gray,marginTop:8}}>أضف وجبات من مطاعمك المفضلة</div>
          <button onClick={onBack} style={{marginTop:22,background:C.red,color:"white",border:"none",borderRadius:22,padding:"13px 30px",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(200,16,46,0.35)"}}>
            استكشف المطاعم
          </button>
        </div>
      ):(
        <div style={{padding:"12px 16px"}}>
          {/* العناصر */}
          <div style={{background:C.white,borderRadius:20,padding:"6px 4px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,padding:"10px 12px 6px",display:"flex",alignItems:"center",gap:7}}>
              <IcoFork s={15} c={C.red}/> العناصر ({cartCount})
            </div>
            {cart.map(function(item,i){
              return(
                <div key={item.id+"-"+item.rid}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px",borderTop:i>0?"1px solid "+C.ultra:"none"}}>
                  <div style={{width:50,height:50,borderRadius:14,background:C.ultra,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <IcoFork s={24} c={C.red}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                    <div style={{fontSize:11,color:C.gray,marginTop:1}}>{item.rname}</div>
                    <div style={{fontSize:14,fontWeight:900,color:C.red,marginTop:3}}>₪{item.price}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
                    <button onClick={function(){rem(item.id,item.rid);}}
                      style={{width:30,height:30,borderRadius:"50%",background:C.ultra,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <IcoMinus s={13}/>
                    </button>
                    <span style={{fontWeight:900,fontSize:15,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={function(){add({id:item.id,name:item.name,price:item.price},{id:item.rid,name:item.rname});}}
                      style={{width:30,height:30,borderRadius:"50%",background:C.red,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <IcoPlus s={13}/>
                    </button>
                  </div>
                </div>
              );
            })}
            <div style={{padding:"8px 12px"}}>
              <button onClick={function(){setCart([]);}}
                style={{color:"#EF4444",background:"rgba(239,68,68,0.07)",border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                <IcoTrash s={12}/> تفريغ السلة
              </button>
            </div>
          </div>

          {/* عنوان التوصيل */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
              <IcoPin s={15} c={C.red}/> عنوان التوصيل
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,background:C.ultra,borderRadius:12,padding:"11px 13px"}}>
              <IcoHome s={18} c={C.red}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.dark}}>البيت</div>
                <div style={{fontSize:11,color:C.gray}}>{address}</div>
              </div>
              <button onClick={function(){var a=prompt("العنوان الجديد:",address);if(a)setAddress(a);}}
                style={{background:"none",border:"none",color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>
                <IcoEdit s={12} c={C.blue}/> تغيير
              </button>
            </div>
          </div>

          {/* كود الخصم */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
              <IcoGift s={15} c={C.red}/> كود الخصم
            </div>
            {promoApplied?(
              <div style={{background:"rgba(16,185,129,0.1)",borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:8}}>
                <IcoCheck s={16} c={C.green}/>
                <div>
                  <div style={{color:C.green,fontWeight:700,fontSize:13}}>تم تفعيل كود YOUGO10!</div>
                  <div style={{color:C.green,fontSize:11,marginTop:1}}>خصم 10% — وفّرت ₪{discount}</div>
                </div>
              </div>
            ):(
              <div style={{display:"flex",gap:8}}>
                <input value={promo} onChange={function(e){setPromo(e.target.value);}}
                  placeholder="أدخل كود الخصم..."
                  style={{flex:1,border:"1.5px solid "+C.lightGray,borderRadius:12,padding:"10px 13px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
                <button onClick={function(){if(promo.toUpperCase()==="YOUGO10")setPromoApplied(true);}}
                  style={{background:C.red,color:"white",border:"none",borderRadius:12,padding:"10px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  تفعيل
                </button>
              </div>
            )}
            <div style={{fontSize:10,color:C.gray,marginTop:6}}>جرّب: YOUGO10 للحصول على خصم 10%</div>
          </div>

          {/* طريقة الدفع */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10}}>طريقة الدفع</div>
            {[
              {id:"card",label:"بطاقة ائتمان",sub:"**** **** **** 4521",I:IcoShield,c:"#1D3557"},
              {id:"cash",label:"دفع نقدي",sub:"عند التسليم",I:IcoCart,c:C.gold},
            ].map(function(p){
              return(
                <div key={p.id} onClick={function(){setPayMethod(p.id);}}
                  style={{display:"flex",alignItems:"center",gap:11,padding:"12px 0",borderBottom:p.id==="card"?"1px solid "+C.ultra:"none",cursor:"pointer"}}>
                  <div style={{width:38,height:38,borderRadius:10,background:hexA(p.c,"18"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <p.I s={18} c={p.c}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{p.label}</div>
                    <div style={{fontSize:11,color:C.gray}}>{p.sub}</div>
                  </div>
                  <div style={{width:20,height:20,borderRadius:"50%",border:"2px solid "+(payMethod===p.id?C.red:C.lightGray),display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {payMethod===p.id&&<div style={{width:10,height:10,borderRadius:"50%",background:C.red}}/>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* الملخص */}
          <div style={{background:C.white,borderRadius:20,padding:"16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:7}}>
              <IcoOrders s={15} c={C.red}/> ملخص الطلب
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.gray,marginBottom:8}}>
              <span>مجموع المنتجات</span><span>₪{total}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.gray,marginBottom:8}}>
              <span>رسوم التوصيل</span>
              <span style={{color:fee===0?C.green:C.dark}}>{fee===0?"مجاني":"₪"+fee}</span>
            </div>
            {promoApplied&&(
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.green,marginBottom:8}}>
                <span>خصم (YOUGO10)</span><span>-₪{discount}</span>
              </div>
            )}
            {fee===0&&total>0&&(
              <div style={{background:"rgba(16,185,129,0.08)",borderRadius:10,padding:"6px 10px",marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
                <IcoCheck s={12} c={C.green}/>
                <span style={{fontSize:11,color:C.green,fontWeight:600}}>مبروك! توصيل مجاني 🎉</span>
              </div>
            )}
            {fee>0&&total<150&&(
              <div style={{background:"rgba(245,166,35,0.08)",borderRadius:10,padding:"6px 10px",marginBottom:8}}>
                <span style={{fontSize:11,color:C.gold,fontWeight:600}}>أضف ₪{150-total} للحصول على توصيل مجاني</span>
              </div>
            )}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:17,fontWeight:900,color:C.dark,borderTop:"2px solid "+C.ultra,paddingTop:12,marginTop:4}}>
              <span>الإجمالي</span>
              <span style={{color:C.red}}>₪{finalTotal}</span>
            </div>
          </div>

          {/* زر التأكيد */}
          <button onClick={confirmOrder} disabled={loading}
            style={{width:"100%",background:loading?"rgba(200,16,46,0.5)":"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:22,padding:"16px",fontSize:15,fontWeight:900,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 24px rgba(200,16,46,0.4)",marginBottom:8}}>
            {loading?(
              <div style={{width:22,height:22,border:"3px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
            ):(
              <><IcoCheck s={18}/> تأكيد الطلب — ₪{finalTotal}</>
            )}
          </button>
          <div style={{textAlign:"center",fontSize:11,color:C.gray,marginBottom:8}}>
            سيصل طلبك خلال {cart.length>0?(cart[0].time||"20-30"):"20-30"} دقيقة
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── صفحة تتبع الطلب ───────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function OrderStatusPage({order,onBack,goTo}){
  var [step,setStep]=useState(0);
  var steps=[
    {label:"تم استلام طلبك",icon:IcoCheck,done:true},
    {label:"المطعم يجهّز طلبك",icon:IcoFork,done:false},
    {label:"السائق في الطريق",icon:IcoMotorbike,done:false},
    {label:"وصل طلبك!",icon:IcoHome,done:false},
  ];

  useEffect(function(){
    var intervals=[2000,5000,10000];
    var timers=intervals.map(function(ms,i){
      return setTimeout(function(){setStep(function(s){return Math.max(s,i+1);});},ms);
    });
    return function(){timers.forEach(clearTimeout);};
  },[]);

  var currentStep=Math.min(step,3);

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",display:"flex",flexDirection:"column",alignItems:"center"}}>
      {/* Header */}
      <div style={{width:"100%",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",padding:"50px 20px 40px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",left:16,top:16,width:170,height:170,background:"rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
          {step>=3?<IcoCheck s={40} c="white"/>:<IcoCart s={40} c="white"/>}
        </div>
        <div style={{color:"white",fontSize:22,fontWeight:900}}>
          {step>=3?"وصل طلبك! 🎉":"طلبك في الطريق"}
        </div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:6}}>
          رقم الطلب: {order?.id||"#"+Math.floor(Math.random()*90000+10000)}
        </div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,marginTop:4}}>
          المبلغ: ₪{order?.total||0}
        </div>
      </div>

      {/* مراحل الطلب */}
      <div style={{width:"100%",padding:"24px 20px",background:C.white,marginBottom:12}}>
        {steps.map(function(s,i){
          var isDone=i<=currentStep;
          var isActive=i===currentStep;
          return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,marginBottom:i<steps.length-1?20:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:isDone?C.red:C.ultra,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.5s",boxShadow:isActive?"0 0 0 4px rgba(200,16,46,0.2)":"none"}}>
                  <s.icon s={20} c={isDone?"white":C.lightGray}/>
                </div>
                {i<steps.length-1&&<div style={{width:2,height:20,background:isDone?C.red:C.lightGray,marginTop:4,transition:"background 0.5s"}}/>}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:isDone?700:500,color:isDone?C.dark:C.gray}}>{s.label}</div>
                {isActive&&step<3&&<div style={{fontSize:11,color:C.red,fontWeight:600,marginTop:2}}>يتم الآن...</div>}
                {isDone&&i<currentStep&&<div style={{fontSize:11,color:C.green,fontWeight:600,marginTop:2}}>✓ تم</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* معلومات السائق */}
      {step>=2&&(
        <div style={{width:"100%",background:C.white,padding:"16px 20px",marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:12}}>معلومات السائق</div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <IcoUser s={26} c="white"/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:C.dark}}>محمد السائق</div>
              <div style={{fontSize:12,color:C.gray,marginTop:2,display:"flex",alignItems:"center",gap:4}}>
                <IcoStar/> 4.9 — 234 توصيلة
              </div>
            </div>
            <a href="tel:+972501234567"
              style={{background:C.green,color:"white",border:"none",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",boxShadow:"0 2px 8px rgba(16,185,129,0.4)"}}>
              <IcoPhone s={20} c="white"/>
            </a>
          </div>
        </div>
      )}

      {/* زر العودة للرئيسية */}
      <div style={{width:"100%",padding:"0 20px",marginTop:8}}>
        <button onClick={onBack}
          style={{width:"100%",background:"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:22,padding:"14px",fontSize:14,fontWeight:900,cursor:"pointer",boxShadow:"0 4px 16px rgba(200,16,46,0.4)"}}>
          العودة للرئيسية
        </button>
        <button onClick={function(){goTo("myorders");}}
          style={{width:"100%",background:C.ultra,color:C.dark,border:"none",borderRadius:22,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:10}}>
          طلباتي
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── صفحة طلباتي ────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function MyOrdersPage({onBack,cartCount,goTo,user}){
  var [activeTab,setActiveTab]=useState("all");
  var [orders,setOrders]=useState([]);
  var [loading,setLoading]=useState(true);

  useEffect(function(){
    async function fetchOrders(){
      setLoading(true);
      try{
        if(user?.id){
          var {data,error}=await supabase.from("orders").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
          if(data&&data.length>0){
            setOrders(data);
            setLoading(false);
            return;
          }
        }
      }catch(e){}
      // بيانات وهمية كاحتياط
      setOrders([
        {id:"#18541",rest:"فيرونا كريسبي",logo:"Verona",color:"#C8102E",date:"اليوم 18:42",items:"برغر كريسبي، أجنحة دجاج",total:93,status:"مكتمل",sc:C.green},
        {id:"#18520",rest:"ليمون فريش",logo:"Lemon",color:"#F59E0B",date:"أمس 14:10",items:"عصير ليمون بالنعنع x2",total:56,status:"مكتمل",sc:C.green},
        {id:"#18498",rest:"وله كريسبي",logo:"Wala",color:"#F5A623",date:"09/03 20:30",items:"شاورما دجاج، تورتيلا شاورما",total:67,status:"مكتمل",sc:C.green},
        {id:"#18476",rest:"سوشي تايم",logo:"SushiTime",color:"#1D3557",date:"08/03 13:15",items:"رول سالمون، كاليفورنيا رول",total:97,status:"ملغي",sc:"#EF4444"},
      ]);
      setLoading(false);
    }
    fetchOrders();
  },[user]);

  var tabs=["all","active","done","cancelled"];
  var tabLabels={all:"الكل",active:"نشط",done:"مكتمل",cancelled:"ملغي"};
  var filtered=orders.filter(function(o){
    if(activeTab==="all") return true;
    var s=(o.status||"").toLowerCase();
    if(activeTab==="done") return s==="مكتمل"||s==="completed";
    if(activeTab==="cancelled") return s==="ملغي"||s==="cancelled";
    if(activeTab==="active") return s==="قيد التوصيل"||s==="قيد التحضير"||s==="pending"||s==="preparing";
    return true;
  });

  return(
    <PageWrap title="طلباتي" onBack={onBack} cartCount={cartCount} goTo={goTo}>
      <div style={{background:C.white,display:"flex",padding:"0 16px",borderBottom:"1px solid "+C.lightGray,gap:4}}>
        {tabs.map(function(t){
          var active=activeTab===t;
          return(
            <button key={t} onClick={function(){setActiveTab(t);}}
              style={{background:"none",border:"none",padding:"12px 12px 10px",fontSize:12,fontWeight:active?700:500,color:active?C.red:C.gray,borderBottom:active?"2.5px solid "+C.red:"2.5px solid transparent",cursor:"pointer"}}>
              {tabLabels[t]}
            </button>
          );
        })}
      </div>

      <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {loading&&<div style={{textAlign:"center",padding:"40px 0"}}><div style={{width:28,height:28,border:"3px solid "+C.lightGray,borderTopColor:C.red,borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block"}}/></div>}
        {!loading&&filtered.length===0&&(
          <div style={{textAlign:"center",padding:"60px 0",color:C.gray}}>
            <IcoOrders s={52} c={C.lightGray}/>
            <div style={{fontSize:14,marginTop:12,fontWeight:600}}>لا توجد طلبات</div>
          </div>
        )}
        {!loading&&filtered.map(function(o,i){
          var Logo=LOGO_MAP[o.logo]||LogoVerona;
          var statusColor=o.sc||(o.status==="مكتمل"?C.green:o.status==="ملغي"?"#EF4444":C.gold);
          return(
            <div key={o.id} style={{background:C.white,borderRadius:20,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",animation:"fadeIn .35s ease "+(i*60)+"ms both"}}>
              <div style={{background:"linear-gradient(135deg,"+hexA(o.color||C.red,"18")+","+hexA(o.color||C.red,"35")+")",padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:46,height:46,borderRadius:13,overflow:"hidden",background:hexA(o.color||C.red,"22"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Logo size={38}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:14,color:C.dark}}>{o.rest||o.restaurant_name||"مطعم"}</div>
                  <div style={{fontSize:11,color:C.gray,marginTop:1,display:"flex",alignItems:"center",gap:4}}>
                    <IcoClock s={11}/>{o.date||o.created_at||""}
                  </div>
                </div>
                <span style={{background:hexA(statusColor,"22"),color:statusColor,borderRadius:20,padding:"4px 11px",fontSize:11,fontWeight:800}}>{o.status}</span>
              </div>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontSize:12,color:C.gray,marginBottom:8}}>
                  {o.items||(Array.isArray(o.items_json)?o.items_json.map(function(x){return x.name;}).join("، "):"")}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:16,fontWeight:900,color:C.red}}>₪{o.total}</div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{background:C.ultra,color:C.dark,border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                      التفاصيل
                    </button>
                    {(o.status==="مكتمل"||o.status==="completed")&&(
                      <button style={{background:C.red,color:"white",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                        <IcoPlus s={11}/> أعد الطلب
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── صفحة الملف الشخصي ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function ProfilePage({onBack,cartCount,goTo,user,onLogout}){
  var u=user||{name:"مستخدم",phone:"",email:""};
  var [editMode,setEditMode]=useState(false);
  var [profile,setProfile]=useState({name:u.name||"",phone:u.phone||"",email:u.email||""});
  var [draft,setDraft]=useState(profile);
  var [showLogout,setShowLogout]=useState(false);
  var [notifSettings,setNotifSettings]=useState({orders:true,promos:true,news:false,sms:true});

  async function saveProfile(){
    if(user?.id){
      await supabase.from("users").update({name:draft.name,phone:draft.phone}).eq("id",user.id);
    }
    setProfile(draft);
    setEditMode(false);
  }

  var menuItems=[
    {ico:IcoPin,label:"عناويني",sub:"إدارة عناوين التوصيل",color:C.blue,action:function(){}},
    {ico:IcoOrders,label:"طلباتي",sub:"عرض جميع الطلبات",color:C.green,action:function(){goTo("myorders");}},
    {ico:IcoCart,label:"سلتي",sub:"عرض عناصر السلة",color:C.red,action:function(){goTo("cartpage");}},
    {ico:IcoGift,label:"كوبوناتي",sub:"كوبونات الخصم المتاحة",color:C.gold,action:function(){}},
    {ico:IcoShield,label:"بطاقاتي",sub:"إدارة وسائل الدفع",color:"#1D3557",action:function(){goTo("cards");}},
    {ico:IcoUsers,label:"دعوة أصدقاء",sub:"اربح ₪30 لكل صديق",color:C.purple,action:function(){goTo("invite");},badge:"جديد!"},
    {ico:IcoBell,label:"إعدادات الإشعارات",sub:"تحكم في الإشعارات",color:C.orange,action:function(){}},
    {ico:IcoOrders,label:"الشروط والأحكام",sub:"اقرأ شروط الاستخدام",color:"#64748B",action:function(){goTo("terms");}},
    {ico:IcoShield,label:"سياسة الخصوصية",sub:"كيف نحمي بياناتك",color:"#64748B",action:function(){goTo("privacy");}},
    {ico:IcoUser,label:"تواصل معنا",sub:"الدعم وخدمة العملاء",color:C.blue,action:function(){goTo("support");}},
  ];

  return(
    <PageWrap title="حسابي" onBack={onBack} cartCount={cartCount} goTo={goTo}>
      {/* بطل الصفحة */}
      <div style={{background:"linear-gradient(135deg,#C8102E,#7B0D1E)",padding:"28px 20px 50px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:-30,top:-30,width:180,height:180,background:"rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{position:"relative"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",border:"3px solid rgba(255,255,255,0.4)"}}>
              <IcoUser s={36} c="white"/>
            </div>
          </div>
          <div>
            <div style={{color:"white",fontSize:20,fontWeight:900}}>{profile.name||"مستخدم"}</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:2}}>{profile.phone||profile.email||"—"}</div>
            <div style={{marginTop:8}}>
              <span style={{background:"rgba(255,255,255,0.15)",color:"white",fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px",display:"inline-flex",alignItems:"center",gap:4}}>
                <IcoStar s={10}/> 4.9
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* إحصاءات */}
      <div style={{margin:"0 16px",marginTop:-24,background:C.white,borderRadius:18,padding:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)",display:"flex",zIndex:10,position:"relative"}}>
        {[{v:"14",l:"طلب"},{v:"₪1,240",l:"المجموع"},{v:"4.9",l:"التقييم"}].map(function(s,i){
          return(
            <div key={i} style={{flex:1,textAlign:"center",borderLeft:i>0?"1px solid "+C.lightGray:"none"}}>
              <div style={{fontSize:18,fontWeight:900,color:C.red}}>{s.v}</div>
              <div style={{fontSize:11,color:C.gray,marginTop:2}}>{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* المعلومات الشخصية */}
      <div style={{margin:"14px 16px 0",background:C.white,borderRadius:18,padding:"16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}>
            <IcoUser s={17} c={C.red}/> المعلومات الشخصية
          </div>
          <button onClick={function(){if(editMode)saveProfile(); else{setDraft(profile);setEditMode(true);}}}
            style={{background:editMode?"rgba(16,185,129,0.1)":C.ultra,color:editMode?C.green:C.gray,border:"none",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            {editMode?<><IcoCheck s={13} c={C.green}/> حفظ</>:<><IcoEdit s={13} c={C.gray}/> تعديل</>}
          </button>
        </div>
        {[{l:"الاسم الكامل",k:"name"},{l:"رقم الجوال",k:"phone"},{l:"البريد الإلكتروني",k:"email"}].map(function(f){
          return(
            <div key={f.k} style={{marginBottom:11}}>
              <div style={{fontSize:11,color:C.gray,marginBottom:3}}>{f.l}</div>
              {editMode?(
                <input value={draft[f.k]||""} onChange={function(e){var v=e.target.value;setDraft(function(p){return Object.assign({},p,{[f.k]:v});});}}
                  style={{width:"100%",background:C.ultra,border:"1.5px solid "+C.lightGray,borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
              ):(
                <div style={{fontSize:14,fontWeight:600,color:C.dark,background:C.ultra,borderRadius:10,padding:"9px 12px"}}>{profile[f.k]||"—"}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* قائمة الخيارات */}
      <div style={{margin:"14px 16px 0",background:C.white,borderRadius:18,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        {menuItems.map(function(item,i){
          return(
            <div key={i} onClick={item.action}
              style={{display:"flex",alignItems:"center",gap:13,padding:"13px 16px",borderBottom:i<menuItems.length-1?"1px solid "+C.ultra:"none",cursor:"pointer"}}
              onMouseEnter={function(e){e.currentTarget.style.background=C.ultra;}}
              onMouseLeave={function(e){e.currentTarget.style.background="";}}>
              <div style={{width:40,height:40,borderRadius:12,background:hexA(item.color,"18"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <item.ico s={19} c={item.color}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.dark,display:"flex",alignItems:"center",gap:6}}>
                  {item.label}
                  {item.badge&&<span style={{background:"rgba(200,16,46,0.12)",color:C.red,fontSize:9,fontWeight:800,borderRadius:8,padding:"2px 7px"}}>{item.badge}</span>}
                </div>
                <div style={{fontSize:11,color:C.gray,marginTop:1}}>{item.sub}</div>
              </div>
              <IcoChevDown s={15} c={C.lightGray}/>
            </div>
          );
        })}
      </div>

      {/* تسجيل الخروج */}
      <div style={{margin:"14px 16px 24px"}}>
        <button onClick={function(){setShowLogout(true);}}
          style={{width:"100%",background:"rgba(239,68,68,0.07)",color:"#EF4444",border:"1.5px solid rgba(239,68,68,0.2)",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <IcoClose s={16} c="#EF4444"/> تسجيل الخروج
        </button>
      </div>

      {showLogout&&(
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={function(){setShowLogout(false);}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:22,padding:"28px 22px",width:"100%",maxWidth:380,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{width:62,height:62,borderRadius:"50%",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <IcoClose s={28} c="#EF4444"/>
            </div>
            <div style={{fontSize:18,fontWeight:900,color:C.dark,marginBottom:8}}>تسجيل الخروج</div>
            <div style={{fontSize:13,color:C.gray,marginBottom:22,lineHeight:1.6}}>هل أنت متأكد أنك تريد تسجيل الخروج؟</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={function(){setShowLogout(false);}}
                style={{flex:1,background:C.ultra,color:C.dark,border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer"}}>إلغاء</button>
              <button onClick={function(){setShowLogout(false);onLogout();}}
                style={{flex:1,background:"#EF4444",color:"white",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer"}}>خروج</button>
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── تدفق المصادقة (OTP حقيقي عبر Supabase) ────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function AuthFlow({onDone,onBusiness}){
  var [step,setStep]=useState("welcome"); // welcome | phone | otp | name
  var [phone,setPhone]=useState("");
  var [otp,setOtp]=useState(["","","","","",""]);
  var [name,setName]=useState("");
  var [loading,setLoading]=useState(false);
  var [error,setError]=useState("");
  var [timer,setTimer]=useState(0);

  useEffect(function(){
    if(timer>0){
      var t=setTimeout(function(){setTimer(function(p){return p-1;});},1000);
      return function(){clearTimeout(t);};
    }
  },[timer]);

  async function sendOTP(){
    if(!phone||phone.length<9){setError("أدخل رقم جوال صحيح");return;}
    setLoading(true); setError("");
    var fullPhone="+972"+phone.replace(/^0/,"");
    try{
      var {error:err}=await supabase.auth.signInWithOtp({phone:fullPhone});
      if(err) throw err;
      setStep("otp"); setTimer(60);
    }catch(e){
      setError("حدث خطأ: "+e.message);
    }
    setLoading(false);
  }

  async function verifyOTP(){
    var code=otp.join("");
    if(code.length!==6){setError("أدخل الكود كاملاً");return;}
    setLoading(true); setError("");
    var fullPhone="+972"+phone.replace(/^0/,"");
    try{
      var {data,error:err}=await supabase.auth.verifyOtp({phone:fullPhone,token:code,type:"sms"});
      if(err) throw err;
      if(data.user){
        var {data:profile}=await supabase.from("users").select("*").eq("id",data.user.id).single();
        if(profile?.name){
          onDone({name:profile.name,phone:fullPhone,id:data.user.id});
        } else {
          setStep("name");
        }
      }
    }catch(e){
      setError("كود غير صحيح، حاول مجدداً");
    }
    setLoading(false);
  }

  async function saveName(){
    if(!name.trim()){setError("أدخل اسمك");return;}
    setLoading(true);
    try{
      var {data:{user}}=await supabase.auth.getUser();
      if(user){
        await supabase.from("users").upsert({id:user.id,name:name.trim(),phone:"+972"+phone.replace(/^0/,""),created_at:new Date().toISOString()});
        await supabase.auth.updateUser({data:{full_name:name.trim()}});
      }
      onDone({name:name.trim(),phone:"+972"+phone.replace(/^0/,""),id:user?.id});
    }catch(e){
      onDone({name:name.trim(),phone:phone});
    }
    setLoading(false);
  }

  function handleOtpInput(val,idx){
    var newOtp=otp.slice();
    newOtp[idx]=val.slice(-1);
    setOtp(newOtp);
    if(val&&idx<5){
      var next=document.getElementById("otp-"+( idx+1));
      if(next)next.focus();
    }
  }

  // شاشة الترحيب
  if(step==="welcome"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:"linear-gradient(160deg,#0D0F14 0%,#1C1A2E 60%,#2A0D16 100%)",minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-60,width:280,height:280,borderRadius:"50%",background:"rgba(200,16,46,0.08)"}}/>
        <div style={{position:"absolute",bottom:-60,left:-40,width:200,height:200,borderRadius:"50%",background:"rgba(139,92,246,0.06)"}}/>

        <div style={{textAlign:"center",marginBottom:48,animation:"fadeIn .6s ease"}}>
          <YougoLogo size={88}/>
          <div style={{color:"white",fontSize:32,fontWeight:900,marginTop:20,letterSpacing:-0.5}}>يوغو</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginTop:8,lineHeight:1.6}}>اطلب أكلك المفضل{"\n"}من أفضل المطاعم</div>
        </div>

        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12,animation:"fadeIn .8s ease .2s both"}}>
          <button onClick={function(){setStep("phone");}}
            style={{background:"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:18,padding:"16px",fontSize:16,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 8px 30px rgba(200,16,46,0.45)"}}>
            <IcoPhone s={20} c="white"/> تسجيل الدخول برقم الجوال
          </button>
          <button onClick={onBusiness}
            style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:18,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer"}}>
            بوابة أصحاب المطاعم
          </button>
        </div>

        <div style={{color:"rgba(255,255,255,0.25)",fontSize:11,marginTop:32,textAlign:"center"}}>
          بالمتابعة توافق على شروط الاستخدام وسياسة الخصوصية
        </div>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // إدخال رقم الجوال
  if(step==="phone"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:"#0D0F14",minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",padding:"0 24px",display:"flex",flexDirection:"column"}}>
        <div style={{paddingTop:60,flex:1}}>
          <button onClick={function(){setStep("welcome");}} style={{background:"rgba(255,255,255,0.06)",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32}}>
            <IcoBack s={20} c="white"/>
          </button>
          <div style={{color:"white",fontSize:26,fontWeight:900,marginBottom:8}}>رقم جوالك</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:32}}>سنرسل لك رمز التحقق عبر SMS</div>

          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,border:"1.5px solid rgba(255,255,255,0.08)",marginBottom:16}}>
            <span style={{color:"white",fontSize:14,fontWeight:700,direction:"ltr"}}>+972</span>
            <div style={{width:1,height:24,background:"rgba(255,255,255,0.15)"}}/>
            <input value={phone} onChange={function(e){setPhone(e.target.value.replace(/\D/g,""));}}
              placeholder="05X-XXX-XXXX"
              type="tel" maxLength={10}
              style={{flex:1,background:"none",border:"none",outline:"none",color:"white",fontSize:18,fontWeight:700,direction:"ltr",fontFamily:"Arial,monospace"}}/>
          </div>

          {error&&<div style={{color:"#F87171",fontSize:13,marginBottom:12,padding:"8px 12px",background:"rgba(239,68,68,0.1)",borderRadius:10}}>{error}</div>}

          <button onClick={sendOTP} disabled={loading||phone.length<9}
            style={{width:"100%",background:phone.length>=9?"linear-gradient(135deg,#C8102E,#9B0B22)":"rgba(255,255,255,0.06)",color:phone.length>=9?"white":"rgba(255,255,255,0.3)",border:"none",borderRadius:18,padding:"16px",fontSize:16,fontWeight:900,cursor:phone.length>=9?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all .2s"}}>
            {loading?<div style={{width:22,height:22,border:"3px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>:"إرسال رمز التحقق"}
          </button>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // إدخال OTP
  if(step==="otp"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:"#0D0F14",minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",padding:"0 24px",display:"flex",flexDirection:"column"}}>
        <div style={{paddingTop:60,flex:1}}>
          <button onClick={function(){setStep("phone");setOtp(["","","","","",""]);setError("");}} style={{background:"rgba(255,255,255,0.06)",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32}}>
            <IcoBack s={20} c="white"/>
          </button>
          <div style={{color:"white",fontSize:26,fontWeight:900,marginBottom:8}}>رمز التحقق</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:8}}>
            تم الإرسال إلى +972{phone.replace(/^0/,"")}
          </div>
          <button onClick={function(){setStep("phone");}} style={{background:"none",border:"none",color:C.red,fontSize:12,cursor:"pointer",marginBottom:32,padding:0}}>تغيير الرقم</button>

          {/* مربعات OTP */}
          <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:24,direction:"ltr"}}>
            {otp.map(function(d,i){
              return(
                <input key={i} id={"otp-"+i} value={d}
                  onChange={function(e){handleOtpInput(e.target.value,i);}}
                  onKeyDown={function(e){if(e.key==="Backspace"&&!d&&i>0){document.getElementById("otp-"+(i-1)).focus();}}}
                  maxLength={1} type="tel"
                  style={{width:46,height:56,textAlign:"center",fontSize:24,fontWeight:900,background:"rgba(255,255,255,0.06)",border:"2px solid "+(d?"rgba(200,16,46,0.7)":"rgba(255,255,255,0.1)"),borderRadius:12,outline:"none",color:"white",fontFamily:"Arial,monospace"}}/>
              );
            })}
          </div>

          {error&&<div style={{color:"#F87171",fontSize:13,marginBottom:12,padding:"8px 12px",background:"rgba(239,68,68,0.1)",borderRadius:10,textAlign:"center"}}>{error}</div>}

          <button onClick={verifyOTP} disabled={loading||otp.join("").length!==6}
            style={{width:"100%",background:otp.join("").length===6?"linear-gradient(135deg,#C8102E,#9B0B22)":"rgba(255,255,255,0.06)",color:otp.join("").length===6?"white":"rgba(255,255,255,0.3)",border:"none",borderRadius:18,padding:"16px",fontSize:16,fontWeight:900,cursor:otp.join("").length===6?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,transition:"all .2s"}}>
            {loading?<div style={{width:22,height:22,border:"3px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>:"تحقق"}
          </button>

          <div style={{textAlign:"center",fontSize:13,color:"rgba(255,255,255,0.4)"}}>
            {timer>0?(
              <span>إعادة الإرسال بعد {timer} ثانية</span>
            ):(
              <button onClick={sendOTP} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:13,fontWeight:600}}>
                إعادة إرسال الرمز
              </button>
            )}
          </div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // إدخال الاسم (مستخدم جديد)
  if(step==="name"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:"#0D0F14",minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",padding:"0 24px",display:"flex",flexDirection:"column"}}>
        <div style={{paddingTop:80,flex:1,textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(200,16,46,0.15)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
            <IcoUser s={40} c={C.red}/>
          </div>
          <div style={{color:"white",fontSize:26,fontWeight:900,marginBottom:8}}>مرحباً! 👋</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:36}}>ما هو اسمك؟</div>

          <input value={name} onChange={function(e){setName(e.target.value);}}
            placeholder="اسمك الكامل"
            style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"16px",fontSize:18,outline:"none",color:"white",direction:"rtl",fontFamily:"Arial,sans-serif",marginBottom:16,textAlign:"center"}}/>

          {error&&<div style={{color:"#F87171",fontSize:13,marginBottom:12,padding:"8px 12px",background:"rgba(239,68,68,0.1)",borderRadius:10}}>{error}</div>}

          <button onClick={saveName} disabled={loading||!name.trim()}
            style={{width:"100%",background:name.trim()?"linear-gradient(135deg,#C8102E,#9B0B22)":"rgba(255,255,255,0.06)",color:name.trim()?"white":"rgba(255,255,255,0.3)",border:"none",borderRadius:18,padding:"16px",fontSize:16,fontWeight:900,cursor:name.trim()?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all .2s"}}>
            {loading?<div style={{width:22,height:22,border:"3px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>:<><IcoCheck s={18}/> ابدأ</>}
          </button>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// ── صفحات بسيطة ────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function CardsPage({onBack}){
  return(
    <PageWrap title="بطاقاتي" onBack={onBack} cartCount={0} goTo={function(){}}>
      <div style={{padding:"16px"}}>
        <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16}}>
          <div style={{background:"linear-gradient(135deg,#1D3557,#0A1A30)",borderRadius:16,padding:"22px 20px",color:"white",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-20,top:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
            <div style={{fontSize:11,opacity:0.7,marginBottom:16}}>بطاقة ائتمان</div>
            <div style={{fontSize:18,letterSpacing:3,fontFamily:"monospace",marginBottom:16}}>**** **** **** 4521</div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
              <div><div style={{opacity:0.6,marginBottom:3}}>حامل البطاقة</div><div style={{fontWeight:700}}>مستخدم يوغو</div></div>
              <div><div style={{opacity:0.6,marginBottom:3}}>تنتهي</div><div style={{fontWeight:700}}>12/27</div></div>
            </div>
          </div>
          <button style={{width:"100%",background:"rgba(200,16,46,0.06)",color:C.red,border:"1.5px dashed rgba(200,16,46,0.3)",borderRadius:14,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <IcoPlus s={16} c={C.red}/> إضافة بطاقة جديدة
          </button>
        </div>
      </div>
    </PageWrap>
  );
}

function InvitePage({onBack,user}){
  var code="YOUGO-"+(user?.name||"USER").substring(0,4).toUpperCase()+Math.floor(Math.random()*900+100);
  var [copied,setCopied]=useState(false);
  function copy(){navigator.clipboard.writeText(code).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2000);});}
  return(
    <PageWrap title="دعوة أصدقاء" onBack={onBack} cartCount={0} goTo={function(){}}>
      <div style={{padding:"16px"}}>
        <div style={{background:"linear-gradient(135deg,#7C3AED,#4C1D95)",borderRadius:22,padding:"28px 20px",color:"white",textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:40,marginBottom:12}}>🎁</div>
          <div style={{fontSize:22,fontWeight:900,marginBottom:8}}>اربح ₪30 لكل صديق!</div>
          <div style={{fontSize:14,opacity:0.85,lineHeight:1.6}}>شارك كودك الخاص وستحصل على ₪30 رصيد عند كل طلب أول لصديقك</div>
        </div>
        <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",marginBottom:16}}>
          <div style={{fontSize:13,color:C.gray,marginBottom:12,fontWeight:600}}>كودك الشخصي</div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1,background:C.ultra,borderRadius:12,padding:"14px 16px",fontFamily:"monospace",fontSize:18,fontWeight:900,color:C.dark,letterSpacing:2}}>
              {code}
            </div>
            <button onClick={copy}
              style={{background:copied?C.green:C.red,color:"white",border:"none",borderRadius:12,padding:"0 20px",fontSize:13,fontWeight:700,cursor:"pointer",transition:"background .2s",minWidth:80}}>
              {copied?"تم ✓":"نسخ"}
            </button>
          </div>
        </div>
        <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:16}}>كيف يعمل؟</div>
          {[{n:"1",t:"شارك كودك",s:"أرسل الكود لأصدقائك"},
            {n:"2",t:"يطلبون أول مرة",s:"يستخدمون كودك عند الطلب"},
            {n:"3",t:"تربح ₪30",s:"يُضاف الرصيد تلقائياً"},
          ].map(function(s){
            return(
              <div key={s.n} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(124,58,237,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:14,fontWeight:900,color:C.purple}}>{s.n}</span>
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:C.dark}}>{s.t}</div>
                  <div style={{fontSize:12,color:C.gray,marginTop:2}}>{s.s}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrap>
  );
}

function SupportPage({onBack,user}){
  var [msg,setMsg]=useState("");
  var [sent,setSent]=useState(false);
  async function sendMsg(){
    if(!msg.trim()) return;
    try{
      await supabase.from("support_messages").insert([{user_id:user?.id,phone:user?.phone,message:msg.trim(),created_at:new Date().toISOString()}]);
    }catch(e){}
    setSent(true);
  }
  return(
    <PageWrap title="تواصل معنا" onBack={onBack} cartCount={0} goTo={function(){}}>
      <div style={{padding:"16px"}}>
        {sent?(
          <div style={{textAlign:"center",padding:"60px 20px"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(16,185,129,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <IcoCheck s={40} c={C.green}/>
            </div>
            <div style={{fontSize:20,fontWeight:900,color:C.dark,marginBottom:8}}>تم الإرسال!</div>
            <div style={{fontSize:13,color:C.gray}}>سنرد عليك خلال 24 ساعة</div>
          </div>
        ):(
          <>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
              {[{icon:"📞",label:"واتساب",sub:"متاح 9 ص - 10 م",href:"https://wa.me/972501234567"},
                {icon:"📧",label:"البريد الإلكتروني",sub:"support@yougo.app",href:"mailto:support@yougo.app"},
              ].map(function(c){
                return(
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                    style={{background:C.white,borderRadius:18,padding:"16px",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",textDecoration:"none"}}>
                    <div style={{fontSize:28}}>{c.icon}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:15,color:C.dark}}>{c.label}</div>
                      <div style={{fontSize:12,color:C.gray,marginTop:2}}>{c.sub}</div>
                    </div>
                    <IcoChevDown s={16} c={C.lightGray} style={{marginRight:"auto"}}/>
                  </a>
                );
              })}
            </div>
            <div style={{background:C.white,borderRadius:18,padding:"16px",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:12}}>أرسل رسالة</div>
              <textarea value={msg} onChange={function(e){setMsg(e.target.value);}}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                style={{width:"100%",border:"1.5px solid "+C.lightGray,borderRadius:12,padding:"12px",fontSize:13,outline:"none",resize:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
              <button onClick={sendMsg} disabled={!msg.trim()}
                style={{width:"100%",background:msg.trim()?C.red:"rgba(200,16,46,0.3)",color:"white",border:"none",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:msg.trim()?"pointer":"not-allowed",marginTop:12}}>
                إرسال
              </button>
            </div>
          </>
        )}
      </div>
    </PageWrap>
  );
}

function PrivacyPage({onBack}){
  var sections=[
    {t:"المعلومات التي نجمعها",b:"نجمع رقم جوالك، اسمك، وعناوين توصيلك. لا نشارك معلوماتك الشخصية مع أي طرف ثالث بدون موافقتك."},
    {t:"كيف نستخدم معلوماتك",b:"نستخدم معلوماتك لمعالجة طلباتك، وإرسال تحديثات الطلبات، وتحسين خدماتنا."},
    {t:"أمان البيانات",b:"نستخدم تشفير من الدرجة البنكية لحماية بياناتك. جميع المعاملات مؤمّنة بالكامل."},
    {t:"حقوقك",b:"يمكنك حذف حسابك وجميع بياناتك في أي وقت من إعدادات حسابك."},
  ];
  return(
    <PageWrap title="سياسة الخصوصية" onBack={onBack} cartCount={0} goTo={function(){}}>
      <div style={{padding:"16px"}}>
        {sections.map(function(s,i){
          return(
            <div key={i} style={{background:C.white,borderRadius:18,padding:"18px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",marginBottom:12}}>
              <div style={{fontSize:15,fontWeight:800,color:C.dark,marginBottom:8}}>{s.t}</div>
              <div style={{fontSize:13,color:C.gray,lineHeight:1.7}}>{s.b}</div>
            </div>
          );
        })}
      </div>
    </PageWrap>
  );
}

function TermsPage({onBack}){
  var sections=[
    {t:"قبول الشروط",b:"باستخدامك لتطبيق يوغو، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق، يرجى التوقف عن استخدام التطبيق."},
    {t:"الطلبات والتوصيل",b:"نسعى لتوصيل طلبك في الوقت المحدد. قد تتأخر الطلبات بسبب ظروف خارجة عن إرادتنا مثل الطقس أو ازدحام المرور."},
    {t:"الإلغاء والاسترداد",b:"يمكنك إلغاء طلبك خلال 5 دقائق من التأكيد. بعد ذلك، لا يمكن استرداد المبلغ إذا بدأ المطعم بالتحضير."},
    {t:"السلوك المقبول",b:"يُحظر استخدام التطبيق لأي أغراض غير قانونية. نحتفظ بحق إيقاف الحسابات المخالفة للشروط."},
  ];
  return(
    <PageWrap title="الشروط والأحكام" onBack={onBack} cartCount={0} goTo={function(){}}>
      <div style={{padding:"16px"}}>
        {sections.map(function(s,i){
          return(
            <div key={i} style={{background:C.white,borderRadius:18,padding:"18px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",marginBottom:12}}>
              <div style={{fontSize:15,fontWeight:800,color:C.dark,marginBottom:8}}>{s.t}</div>
              <div style={{fontSize:13,color:C.gray,lineHeight:1.7}}>{s.b}</div>
            </div>
          );
        })}
      </div>
    </PageWrap>
  );
}
