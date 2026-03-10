import { useState, useEffect } from "react";

const C = {
  red:"#C8102E", gold:"#F5A623", bg:"#F7F7F8", white:"#FFFFFF",
  dark:"#111827", gray:"#6B7280", lightGray:"#E5E7EB", ultra:"#F3F4F6",
  green:"#10B981", blue:"#3B82F6", purple:"#8B5CF6", orange:"#F97316",
  adminBg:"#0D0F14", adminSide:"#151820", adminCard:"#1C2030",
  adminBorder:"#252A3A", adminText:"#E2E8F0", adminMuted:"#64748B",
};

function hexA(hex, a) { return hex + a; }

// ── SVG ICONS ──────────────────────────────────────────────────────────────────
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
function IcoBack({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoEdit({s=14,c=C.blue}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>);}
function IcoTrash({s=14,c="#EF4444"}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function IcoCog({s=18,c=C.adminMuted}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.7"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={c} strokeWidth="1.7"/></svg>);}
function IcoChevDown({s=14,c=C.gray}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}

// NAAT Logo
function YougoLogo({size=36,white=false}){
  var bg = white ? "white" : C.red;
  var fg = white ? C.red : "white";
  return(
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="16" fill={bg}/>
      <path d="M12 42V20l16 16V20" stroke={fg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 30h16M42 24l8 6-8 6" stroke={fg} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Restaurant Logos
function LogoVerona({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#C8102E"/><rect x="36" y="14" width="8" height="28" rx="4" fill="white"/><rect x="33" y="38" width="14" height="8" rx="2" fill="white" opacity="0.7"/><path d="M54 14v10M54 14h-4v10M54 14h4v10M52 24v22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">VERONA</text></svg>);}
function LogoKakao({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#4A2512"/><circle cx="40" cy="40" r="28" fill="none" stroke="#C8860A" strokeWidth="2" opacity="0.5"/><path d="M24 32h32l-4 20H28L24 32z" fill="#C8860A" opacity="0.9"/><path d="M52 36c4 0 6 2 6 5s-2 5-6 5" stroke="#C8860A" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M32 26c0-4 4-4 4-8M40 26c0-4 4-4 4-8M48 26c0-4 4-4 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">KAKAO</text></svg>);}
function LogoWala({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#F5A623"/><rect x="37" y="12" width="6" height="46" rx="3" fill="#7B3F00"/><ellipse cx="40" cy="24" rx="14" ry="5" fill="#C8102E" opacity="0.9"/><ellipse cx="40" cy="30" rx="16" ry="5" fill="#E05A20" opacity="0.9"/><ellipse cx="40" cy="36" rx="17" ry="5" fill="#C8102E" opacity="0.85"/><ellipse cx="40" cy="42" rx="16" ry="5" fill="#E05A20" opacity="0.85"/><ellipse cx="40" cy="48" rx="14" ry="4" fill="#C8102E" opacity="0.8"/><text x="40" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif">WALA</text></svg>);}
function LogoPeperoni({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#E63946"/><circle cx="40" cy="38" r="22" fill="#F59E0B"/><circle cx="40" cy="38" r="18" fill="#FBBF24"/><circle cx="36" cy="34" r="4" fill="#C8102E"/><circle cx="46" cy="36" r="4" fill="#C8102E"/><circle cx="38" cy="44" r="4" fill="#C8102E"/><circle cx="48" cy="46" r="3" fill="#C8102E"/><circle cx="30" cy="42" r="3" fill="#C8102E"/><text x="40" y="70" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">PEPERONI</text></svg>);}
function LogoSushi({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#1D3557"/><circle cx="40" cy="36" r="18" fill="white"/><circle cx="40" cy="36" r="14" fill="#1D3557"/><circle cx="40" cy="36" r="9" fill="#F59E0B"/><circle cx="40" cy="36" r="5" fill="#EF4444"/><path d="M22 18L36 38" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/><path d="M26 14L38 36" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/><text x="40" y="67" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">SUSHI TIME</text></svg>);}
function LogoLemon({size=52}){return(<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" fill="#F59E0B"/><ellipse cx="40" cy="37" rx="18" ry="14" fill="#FEF08A"/><ellipse cx="40" cy="37" rx="18" ry="14" fill="none" stroke="#EAB308" strokeWidth="1.5"/><path d="M40 23v28M22 37h36M27 27l26 20M53 27L27 47" stroke="#EAB308" strokeWidth="1" opacity="0.5"/><path d="M50 22c2-6 8-8 10-6-4 2-6 6-6 10-2-2-4-4-4-4z" fill="#16A34A"/><text x="40" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">LEMON</text></svg>);}

// Market Logos
function LogoBlackAngus({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#1A1A1A"/><path d="M35 18c-10 0-14 8-12 16 1 4 4 7 8 8v4h8v-4c4-1 7-4 8-8 2-8-2-16-12-16z" fill="white"/><path d="M23 22c-4-4-6-2-5 2l4 2M47 22c4-4 6-2 5 2l-4 2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><circle cx="30" cy="28" r="2" fill="#1A1A1A"/><circle cx="40" cy="28" r="2" fill="#1A1A1A"/><ellipse cx="35" cy="34" rx="5" ry="3" fill="#FFB3B3"/><circle cx="32.5" cy="34" r="1.2" fill="#1A1A1A"/><circle cx="37.5" cy="34" r="1.2" fill="#1A1A1A"/><text x="35" y="56" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">BLACK ANGUS</text></svg>);}
function LogoHirna({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#16A34A"/><path d="M15 20h5l6 22h20l4-14H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="30" cy="46" r="3" fill="white"/><circle cx="42" cy="46" r="3" fill="white"/><path d="M45 18c0-4 4-6 8-4-2 2-4 6-2 8-2 0-6-2-6-4z" fill="#BBF7D0"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">HIRNA</text></svg>);}
function LogoMalak({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#C8102E"/><path d="M14 48V24l10 14 11-14v24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M35 24l11 14 10-14v24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><text x="35" y="60" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">MALAK</text></svg>);}
function LogoFadi({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#0EA5E9"/><path d="M30 18h10v4c4 2 6 6 6 10v18H24V32c0-4 2-8 6-10V18z" fill="white" opacity="0.9"/><path d="M28 38h14" stroke="#0EA5E9" strokeWidth="1.5"/><path d="M28 44h14" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.5"/><rect x="29" y="14" width="12" height="6" rx="2" fill="#FFD166"/><circle cx="34" cy="42" r="2" fill="#BAE6FD" opacity="0.6"/><circle cx="38" cy="36" r="1.5" fill="#BAE6FD" opacity="0.6"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">FADI</text></svg>);}
function LogoKing({size=44}){return(<svg width={size} height={size} viewBox="0 0 70 70" fill="none"><rect width="70" height="70" rx="16" fill="#7C3AED"/><path d="M15 42h40L50 26l-10 12-5-14-5 14-10-12L15 42z" fill="#FFD166"/><path d="M13 42h44v4H13v-4z" fill="#F59E0B"/><circle cx="35" cy="32" r="3" fill="white" opacity="0.9"/><circle cx="22" cy="36" r="2" fill="white" opacity="0.7"/><circle cx="48" cy="36" r="2" fill="white" opacity="0.7"/><text x="35" y="58" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">KING STORE</text></svg>);}
function LogoAlward({size=44}){
  var petals = [
    {cx:49,cy:32,rot:0},{cx:42,cy:20,rot:60},{cx:28,cy:20,rot:120},
    {cx:21,cy:32,rot:180},{cx:28,cy:44,rot:240},{cx:42,cy:44,rot:300}
  ];
  return(
    <svg width={size} height={size} viewBox="0 0 70 70" fill="none">
      <rect width="70" height="70" rx="16" fill="#EC4899"/>
      {petals.map(function(p,i){
        return(<ellipse key={i} cx={p.cx} cy={p.cy} rx="5" ry="8" transform={"rotate("+p.rot+","+p.cx+","+p.cy+")"} fill="#FCA5A5" opacity="0.7"/>);
      })}
      <circle cx="35" cy="32" r="10" fill="#FCA5A5"/>
      <circle cx="35" cy="32" r="6" fill="#F472B6"/>
      <circle cx="35" cy="32" r="3" fill="#EC4899"/>
      <path d="M35 42v10" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/>
      <path d="M35 48c-4-2-6-4-4-6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
      <text x="35" y="60" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">AL-WARD</text>
    </svg>
  );
}

// Category Icons
function CatAll({active}){var c=active?"white":"#F59E0B";return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="10" cy="10" r="6" fill={active?"white":"#F59E0B"} opacity={active?0.9:1}/><circle cx="22" cy="10" r="6" fill={active?"white":"#C8102E"} opacity={active?0.9:1}/><circle cx="10" cy="22" r="6" fill={active?"white":"#16A34A"} opacity={active?0.9:1}/><circle cx="22" cy="22" r="6" fill={active?"white":"#3B82F6"} opacity={active?0.9:1}/></svg>);}
function CatChicken({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M8 26c0-6 2-10 8-12 6-2 10 2 10 6s-4 8-10 8-8-2-8-2z" fill={active?"white":"#F59E0B"}/><circle cx="18" cy="14" r="3" fill={active?"rgba(255,255,255,0.8)":"#EF4444"}/><path d="M24 8c2 0 4 1 4 3s-2 4-4 4M24 8l-2 6" stroke={active?"white":"#C8102E"} strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function CatBurger({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M6 12c0-4 4-6 10-6s10 2 10 6" fill={active?"white":"#F59E0B"}/><rect x="4" y="12" width="24" height="4" rx="2" fill={active?"rgba(255,255,255,0.7)":"#EF4444"}/><path d="M4 16c1 3 3 4 12 4s11-1 12-4" fill={active?"rgba(255,255,255,0.6)":"#22C55E"}/><rect x="4" y="20" width="24" height="5" rx="2.5" fill={active?"white":"#F59E0B"}/></svg>);}
function CatShawarma({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect x="14" y="4" width="4" height="24" rx="2" fill={active?"rgba(255,255,255,0.5)":"#92400E"}/><ellipse cx="16" cy="10" rx="7" ry="3" fill={active?"white":"#EF4444"} opacity="0.9"/><ellipse cx="16" cy="14" rx="8" ry="3" fill={active?"rgba(255,255,255,0.9)":"#F97316"} opacity="0.9"/><ellipse cx="16" cy="18" rx="7" ry="3" fill={active?"white":"#EF4444"} opacity="0.85"/><ellipse cx="16" cy="22" rx="6" ry="2.5" fill={active?"rgba(255,255,255,0.9)":"#F97316"} opacity="0.8"/></svg>);}
function CatPizza({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 4l12 22H4L16 4z" fill={active?"white":"#F59E0B"}/><circle cx="13" cy="17" r="2.5" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/><circle cx="19" cy="20" r="2" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/><circle cx="16" cy="13" r="1.5" fill={active?"rgba(255,255,255,0.6)":"#EF4444"}/></svg>);}
function CatSushi({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" fill="white" opacity={active?0.9:1}/><circle cx="16" cy="16" r="7" fill={active?"rgba(255,255,255,0.4)":"#1D3557"}/><circle cx="16" cy="16" r="4" fill={active?"white":"#F59E0B"}/><circle cx="16" cy="16" r="2" fill={active?"rgba(200,16,46,0.8)":"#EF4444"}/></svg>);}
function CatDrinks({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M10 8l2 16h8l2-16H10z" fill={active?"white":"#BAE6FD"}/><path d="M8 8h16" stroke={active?"rgba(255,255,255,0.5)":"#0EA5E9"} strokeWidth="2" strokeLinecap="round"/><path d="M13 8c-1-2 1-4 3-4s4 2 3 4" fill={active?"rgba(255,255,255,0.4)":"#7DD3FC"}/><path d="M16 12l2-8" stroke={active?"rgba(255,255,255,0.6)":"#F59E0B"} strokeWidth="2" strokeLinecap="round"/></svg>);}
function CatSweets({active}){return(<svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M6 22c0-8 4-12 10-12s10 4 10 12H6z" fill={active?"white":"#F59E0B"}/><rect x="14" y="8" width="4" height="14" rx="2" fill={active?"rgba(255,255,255,0.5)":"#92400E"}/><path d="M6 22h20v3H6v-3z" fill={active?"rgba(255,255,255,0.7)":"#D97706"}/></svg>);}

function MktAll({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M6 8h4l5 14h6l5-14h4" stroke={active?"white":"#C8102E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="26" r="2" fill={active?"white":"#C8102E"}/><circle cx="22" cy="26" r="2" fill={active?"white":"#C8102E"}/></svg>);}
function MktFruits({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M16 10c-5 0-8 4-8 9s3 9 8 9 8-4 8-9-3-9-8-9z" fill={active?"white":"#EF4444"} opacity={active?0.9:1}/><path d="M16 10c1-4 5-5 7-3" stroke={active?"white":"#16A34A"} strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M16 10c-1-2-1-4 0-6" stroke={active?"rgba(255,255,255,0.7)":"#16A34A"} strokeWidth="1.8" strokeLinecap="round"/><path d="M21 6c0-2 4-3 5-1-1 0-2 2-3 3-1 0-2-1-2-2z" fill={active?"rgba(255,255,255,0.7)":"#16A34A"}/></svg>);}
function MktMeat({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M8 22c0-6 4-12 12-12 4 0 7 2 7 5s-3 7-7 7H8z" fill={active?"white":"#EF4444"} opacity={active?0.9:1}/><circle cx="10" cy="22" r="3" fill={active?"rgba(255,255,255,0.6)":"white"}/><rect x="10" y="19" width="14" height="6" rx="3" fill={active?"rgba(255,255,255,0.6)":"white"}/><circle cx="24" cy="22" r="3" fill={active?"rgba(255,255,255,0.6)":"white"}/></svg>);}
function MktSnacks({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M10 14c-2-4 0-8 4-8s5 4 2 8M18 14c-2-4 0-8 4-8s5 4 2 8M22 14c2-4 6-2 6 2s-4 6-8 6" fill={active?"white":"#FEF08A"}/><path d="M10 14c-4-2-6 2-6 6s4 8 12 8 12-4 12-8-2-8-6-6" fill={active?"rgba(255,255,255,0.8)":"#FBBF24"}/></svg>);}
function MktDairy({active}){return(<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M13 8h6v2c3 1 5 4 5 8v8H8v-8c0-4 2-7 5-8V8z" fill={active?"white":"#DBEAFE"}/><path d="M8 18c2-2 6-2 8 0s6 2 8 0" stroke={active?"rgba(255,255,255,0.5)":"#3B82F6"} strokeWidth="1.5"/><rect x="12" y="4" width="8" height="5" rx="2" fill={active?"rgba(255,255,255,0.6)":"#93C5FD"}/><circle cx="16" cy="22" r="3" fill={active?"rgba(200,16,46,0.5)":"#EF4444"} opacity="0.7"/></svg>);}

// ── DATA ──────────────────────────────────────────────────────────────────────
var LOGO_MAP = {
  Verona:LogoVerona, Kakao:LogoKakao, Wala:LogoWala, Peperoni:LogoPeperoni,
  SushiTime:LogoSushi, Lemon:LogoLemon,
  BlackAngus:LogoBlackAngus, Hirna:LogoHirna, MalakMarket:LogoMalak,
  Fadi:LogoFadi, KingStore:LogoKing, Alward:LogoAlward
};

var RESTAURANTS = [
  {id:1,name:"ורונה קריספי",cat:"עוף מטוגן",location:"ראמה - הרחוב הראשי",rating:4.8,reviews:240,time:"20-30",fee:12,min:40,open:true,close:"22:00",logo:"Verona",color:"#C8102E",tags:["חדש","הכי פופולרי"],
    menu:[
      {id:1,name:"מנת מיקס קנטאקי",desc:"8 ירכיים + 4 כנפיים + 8 סף + רוטב",price:130,hot:true},
      {id:2,name:"מנת כנפי עוף אישית",desc:"10 חתיכות כולל סלט קולסלו ורוטב",price:50,hot:false},
      {id:3,name:"המבורגר קריספי",desc:"המבורגר עוף מטוגן עם גבינה ורוטב מיוחד",price:38,hot:true},
      {id:4,name:"מנת חזה עוף",desc:"חזה עוף מטוגן עם צ'יפס ורוטב",price:45,hot:false},
    ]},
  {id:2,name:"קאקאו קרמיאל",cat:"קפה וקינוחים",location:"מרכז ג'אן האייר, קרמיאל",rating:4.9,reviews:180,time:"25-35",fee:15,min:50,open:true,close:"23:00",logo:"Kakao",color:"#6B3F1A",tags:["חדש"],
    menu:[
      {id:1,name:"לאטה קרמל",desc:"אספרסו עם חלב מוקצף וסירופ קרמל",price:24,hot:true},
      {id:2,name:"עוגת שוקולד",desc:"עוגה עשירה בשוקולד מריר",price:28,hot:false},
      {id:3,name:"קפוצ'ינו",desc:"אספרסו כפול עם קצף חלב עדין",price:22,hot:true},
      {id:4,name:"וופל בלגי",desc:"וופל עם קצפת ותות שדה טרי",price:35,hot:false},
    ]},
  {id:3,name:"וואלה קריספי",cat:"שווארמה ומנגל",location:"נחף - המרכז",rating:4.7,reviews:320,time:"15-25",fee:10,min:35,open:true,close:"23:30",logo:"Wala",color:"#F5A623",tags:["הכי פופולרי"],
    menu:[
      {id:1,name:"שווארמה עוף",desc:"שווארמה עוף על האש עם ירקות טריים",price:32,hot:true},
      {id:2,name:"המבורגר קריספי",desc:"המבורגר מטוגן עם גבינה ורוטב",price:28,hot:false},
      {id:3,name:"טורטייה שווארמה",desc:"לחם טורטייה עם שווארמה ורוטב שום",price:35,hot:true},
      {id:4,name:"צ'יפס מטוגן",desc:"צ'יפס זהוב עם קטשופ",price:15,hot:false},
    ]},
  {id:4,name:"פפרוני פיצה",cat:"פיצה",location:"ראמה - שכונה חדשה",rating:4.6,reviews:150,time:"30-45",fee:12,min:55,open:false,close:"21:00",logo:"Peperoni",color:"#E63946",tags:[],
    menu:[
      {id:1,name:"פיצה מרגריטה",desc:"רוטב עגבניות מוצרלה בזיליקום",price:65,hot:true},
      {id:2,name:"פיצה פפרוני",desc:"רוטב עגבניות עם פפרוני וגבינה כפולה",price:75,hot:true},
      {id:3,name:"פיצה ירקות",desc:"פטריות פלפל זיתים בצל מושחם",price:70,hot:false},
      {id:4,name:"פיצה עוף BBQ",desc:"עוף על האש עם רוטב BBQ ובצל",price:78,hot:false},
    ]},
  {id:5,name:"סושי טיים",cat:"סושי",location:"עכו - המרכז המסחרי",rating:4.5,reviews:95,time:"35-50",fee:18,min:80,open:true,close:"22:30",logo:"SushiTime",color:"#1D3557",tags:["חדש"],
    menu:[
      {id:1,name:"רול סלמון",desc:"8 חתיכות סלמון טרי עם אבוקדו",price:55,hot:true},
      {id:2,name:"ניגירי טונה",desc:"6 חתיכות טונה טרייה על אורז סושי",price:48,hot:false},
      {id:3,name:"קליפורניה רול",desc:"8 חתיכות קראב אבוקדו ומלפפון",price:42,hot:true},
      {id:4,name:"מגוון סושי 20 חתיכות",desc:"מבחר מגוון מהסושי הטוב ביותר",price:120,hot:false},
    ]},
  {id:6,name:"לימון פרש",cat:"מיצים טריים",location:"נצרת - רחוב החבלה",rating:4.9,reviews:410,time:"10-20",fee:8,min:25,open:true,close:"00:00",logo:"Lemon",color:"#F59E0B",tags:["הכי פופולרי"],
    menu:[
      {id:1,name:"מיץ לימון עם נענע",desc:"לימון טרי עם נענע וקרח כתוש",price:18,hot:true},
      {id:2,name:"מוהיטו מרענן",desc:"לימון נענע סוכר ומים מוגזים",price:22,hot:true},
      {id:3,name:"מיץ תפוז סחוט",desc:"תפוז טרי סחוט במקום",price:16,hot:false},
      {id:4,name:"סמות' מנגו",desc:"מנגו טרי עם חלב קוקוס",price:24,hot:false},
    ]},
];

var MARKET_STORES = [
  {id:1,name:"בלאק אנגוס",cat:"קצביה וסופרמרקט",location:"נחף - שכונת המגורשים",rating:5.0,reviews:10,open:true,close:"22:00",logo:"BlackAngus",color:"#1A1A1A"},
  {id:2,name:"סופרמרקט חירנה",cat:"סופרמרקט",location:"נחף",rating:4.5,reviews:100,open:true,close:"23:30",logo:"Hirna",color:"#16A34A"},
  {id:3,name:"מלך מרקט",cat:"סופרמרקט",location:"נחף",rating:4.8,reviews:10,open:true,close:"00:00",logo:"MalakMarket",color:"#C8102E"},
  {id:4,name:"פאדי - שתייה",cat:"משקאות",location:"מג'ד אל-כרום",rating:5.0,reviews:10,open:true,close:"20:30",logo:"Fadi",color:"#0EA5E9",self:true},
  {id:5,name:"קינג סטור",cat:"חנות כללית",location:"ראמה",rating:4.6,reviews:30,open:true,close:"23:00",logo:"KingStore",color:"#7C3AED"},
  {id:6,name:"אל-ורד",cat:"מכולת",location:"ראמה - מרכז השכונה",rating:4.7,reviews:45,open:false,close:"21:00",logo:"Alward",color:"#EC4899"},
];

var BANNERS = [
  {id:1,title:"עם Yougo",sub:"הבית תמיד מוכן",tag:"רמדאן כריים",bg:"linear-gradient(135deg,#C8102E 0%,#7B0D1E 100%)"},
  {id:2,title:"משלוח חינם",sub:"על ההזמנה הראשונה",tag:"מבצע מוגבל",bg:"linear-gradient(135deg,#F5A623 0%,#C27A0E 100%)"},
  {id:3,title:"אוכל טרי",sub:"מהמסעדות הטובות",tag:"כל יום",bg:"linear-gradient(135deg,#1D3557 0%,#0A1A30 100%)"},
  {id:4,title:"Yougo פרמיום",sub:"הצטרף וחסוך 20%",tag:"הצטרף עכשיו",bg:"linear-gradient(135deg,#7C3AED 0%,#4C1D95 100%)"},
];

var CATS = [
  {id:"all",Cmp:CatAll,label:"הכל"},
  {id:"chicken",Cmp:CatChicken,label:"עוף"},
  {id:"burger",Cmp:CatBurger,label:"המבורגר"},
  {id:"shawarma",Cmp:CatShawarma,label:"שווארמה"},
  {id:"pizza",Cmp:CatPizza,label:"פיצה"},
  {id:"sushi",Cmp:CatSushi,label:"סושי"},
  {id:"drinks",Cmp:CatDrinks,label:"משקאות"},
  {id:"sweets",Cmp:CatSweets,label:"קינוחים"},
];

var MKTCATS = [
  {id:"all",Cmp:MktAll,label:"מרקט"},
  {id:"fruits",Cmp:MktFruits,label:"פירות וירקות"},
  {id:"meat",Cmp:MktMeat,label:"דגים ובשרים"},
  {id:"snacks",Cmp:MktSnacks,label:"בתי קלי"},
  {id:"dairy",Cmp:MktDairy,label:"מוצרי חלב"},
];

var ADMIN_ORDERS = [
  {id:"#18541",customer:"חמדאן",restaurant:"ורונה קריספי",amount:"₪93",status:"הושלם",time:"18:42",sc:C.green},
  {id:"#18540",customer:"מוחמד ח.",restaurant:"לימון פרש",amount:"₪56",status:"בדרך",time:"18:38",sc:C.blue},
  {id:"#18539",customer:"אחמד מ.",restaurant:"וואלה קריספי",amount:"₪120",status:"בהכנה",time:"18:35",sc:C.gold},
  {id:"#18538",customer:"יוסף ס.",restaurant:"קאקאו קרמיאל",amount:"₪78",status:"הושלם",time:"18:22",sc:C.green},
  {id:"#18537",customer:"ראמי א.",restaurant:"סושי טיים",amount:"₪145",status:"בוטל",time:"18:10",sc:"#EF4444"},
  {id:"#18536",customer:"נאדיה ק.",restaurant:"פפרוני פיצה",amount:"₪88",status:"הושלם",time:"18:01",sc:C.green},
];

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App(){
  var [isLoggedIn,setIsLoggedIn] = useState(false);
  var [loggedUser,setLoggedUser] = useState(null);
  var [view,setView] = useState("app");
  var [tab,setTab] = useState("restaurants");
  var [restPage,setRestPage] = useState(null);
  var [cart,setCart] = useState([]);
  var [cartOpen,setCartOpen] = useState(false);
  var [banner,setBanner] = useState(0);
  var [cat,setCat] = useState("all");
  var [mktCat,setMktCat] = useState("all");
  var [searchQ,setSearchQ] = useState("");
  var [searchOpen,setSearchOpen] = useState(false);

  useEffect(function(){
    var t = setInterval(function(){ setBanner(function(p){ return (p+1)%BANNERS.length; }); }, 3800);
    return function(){ clearInterval(t); };
  },[]);

  function addToCart(item,rest){
    setCart(function(prev){
      var ex = prev.find(function(c){ return c.id===item.id && c.rid===rest.id; });
      if(ex) return prev.map(function(c){ return c.id===item.id && c.rid===rest.id ? Object.assign({},c,{qty:c.qty+1}) : c; });
      return prev.concat([Object.assign({},item,{qty:1,rid:rest.id,rname:rest.name})]);
    });
  }
  function remFromCart(iid,rid){
    setCart(function(prev){
      var ex = prev.find(function(c){ return c.id===iid && c.rid===rid; });
      if(ex && ex.qty>1) return prev.map(function(c){ return c.id===iid && c.rid===rid ? Object.assign({},c,{qty:c.qty-1}) : c; });
      return prev.filter(function(c){ return !(c.id===iid && c.rid===rid); });
    });
  }
  var cartCount = cart.reduce(function(s,c){ return s+c.qty; },0);
  var cartTotal = cart.reduce(function(s,c){ return s+c.price*c.qty; },0);

  if(!isLoggedIn) return <AuthFlow onDone={function(u){ setLoggedUser(u); setIsLoggedIn(true); }}/>;
  if(view==="admin") return <AdminDashboard onBack={function(){ setView("app"); }}/>;
  if(view==="profile") return <ProfilePage onBack={function(){ setView("app"); }} cartCount={cartCount} setView={setView} user={loggedUser} onLogout={function(){ setIsLoggedIn(false); setLoggedUser(null); setView("app"); setCart([]); }}/>;
  if(view==="myorders") return <MyOrdersPage onBack={function(){ setView("app"); }} cartCount={cartCount} setView={setView}/>;
  if(view==="cartpage") return <CartPage cart={cart} add={addToCart} rem={remFromCart} onBack={function(){ setView("app"); }} setCart={setCart} cartCount={cartCount} setView={setView}/>;
  if(view==="privacy") return <PrivacyPage onBack={function(){ setView("profile"); }}/>;
  if(view==="terms") return <TermsPage onBack={function(){ setView("profile"); }}/>;
  if(view==="cards") return <CardsPage onBack={function(){ setView("profile"); }}/>;
  if(view==="invite") return <InvitePage onBack={function(){ setView("profile"); }} user={loggedUser}/>;
  if(view==="support") return <SupportPage onBack={function(){ setView("profile"); }} user={loggedUser}/>;
  if(restPage) return <RestPage rest={restPage} cart={cart} add={addToCart} rem={remFromCart}
    onBack={function(){ setRestPage(null); }} cartCount={cartCount} cartTotal={cartTotal}
    cartOpen={cartOpen} setCartOpen={setCartOpen} setCart={setCart}/>;

  var filtered = RESTAURANTS.filter(function(r){
    if(searchQ) return r.name.includes(searchQ)||r.cat.includes(searchQ);
    if(cat==="all") return true;
    var m = {chicken:"עוף",burger:"המבורגר",shawarma:"שווארמה",pizza:"פיצה",sushi:"סושי",drinks:"מיצים",sweets:"קפה"};
    return r.cat.includes(m[cat]||"");
  });

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",overflowX:"hidden"}}>
      {/* TOP BAR */}
      <div style={{background:C.white,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        {searchOpen ? (
          <div style={{flex:1,display:"flex",gap:8,alignItems:"center"}}>
            <input autoFocus value={searchQ} onChange={function(e){ setSearchQ(e.target.value); }}
              placeholder="חיפוש מסעדה..."
              style={{flex:1,border:"1.5px solid "+C.lightGray,borderRadius:24,padding:"8px 14px",fontSize:13,outline:"none",background:C.ultra,direction:"rtl"}}/>
            <button onClick={function(){ setSearchOpen(false); setSearchQ(""); }}
              style={{background:C.ultra,border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <IcoClose/>
            </button>
          </div>
        ) : (
          <>
            <button onClick={function(){ setSearchOpen(true); }}
              style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"}}>
              <IcoSearch/>
            </button>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.ultra,borderRadius:24,padding:"7px 14px",cursor:"pointer"}}>
              <IcoHome s={18} c={C.red}/>
              <div style={{flex:1,textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:700,color:C.dark}}>בית</div>
                <div style={{fontSize:10,color:C.gray}}>אלפורסאן 0, ראמה</div>
              </div>
              <IcoChevDown/>
            </div>
            <button onClick={function(){ setView("admin"); }}
              style={{background:C.red,color:"white",border:"none",borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 2px 8px rgba(200,16,46,0.35)"}}>
              <IcoShield s={13}/> ניהול
            </button>
          </>
        )}
      </div>

      {/* TABS */}
      <div style={{background:C.white,display:"flex",borderBottom:"1px solid "+C.lightGray}}>
        {[{id:"restaurants",label:"מסעדות",I:IcoFork},{id:"market",label:"מרקט",I:IcoStore}].map(function(t){
          return(
            <button key={t.id} onClick={function(){ setTab(t.id); }}
              style={{flex:1,background:"none",border:"none",padding:"11px 0 8px",fontSize:13,fontWeight:700,
                color:tab===t.id?C.red:C.gray,
                borderBottom:tab===t.id?"2.5px solid "+C.red:"2.5px solid transparent",
                cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <t.I s={18} c={tab===t.id?C.red:C.gray}/>{t.label}
            </button>
          );
        })}
      </div>

      {tab==="restaurants" ? (
        <RestTab banner={banner} setBanner={setBanner} cat={cat} setCat={setCat} filtered={filtered} setRestPage={setRestPage} searchQ={searchQ}/>
      ) : (
        <MarketTab mktCat={mktCat} setMktCat={setMktCat}/>
      )}

      {cartCount>0 && (
        <button onClick={function(){ setCartOpen(true); }}
          style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:C.red,color:"white",border:"none",borderRadius:30,padding:"12px 22px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",boxShadow:"0 6px 24px rgba(200,16,46,0.45)",zIndex:200,fontSize:13,fontWeight:700,minWidth:250,justifyContent:"space-between"}}>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:20,padding:"2px 10px",fontSize:12}}>{cartCount} פריטים</span>
          <span style={{display:"flex",alignItems:"center",gap:6}}><IcoCart s={17} c="white"/> הצג עגלה</span>
          <span style={{fontWeight:900}}>₪{cartTotal}</span>
        </button>
      )}

      {cartOpen && <CartModal cart={cart} total={cartTotal} add={addToCart} rem={remFromCart} onClose={function(){ setCartOpen(false); }} setCart={setCart}/>}

      <BottomNav tab={tab} setTab={setTab} cartCount={cartCount} view={view} setView={setView}/>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ── REST TAB ───────────────────────────────────────────────────────────────────
function RestTab({banner,setBanner,cat,setCat,filtered,setRestPage,searchQ}){
  return(
    <div style={{paddingBottom:90}}>
      {!searchQ && (
        <div style={{padding:"14px 16px 8px"}}>
          <div style={{borderRadius:22,overflow:"hidden",position:"relative",height:165}}>
            <div style={{display:"flex",transition:"transform .55s ease",transform:"translateX("+banner*100+"%)"}} >
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
                return(<div key={i} onClick={function(){ setBanner(i); }} style={{width:i===banner?22:7,height:7,borderRadius:3.5,background:i===banner?"white":"rgba(255,255,255,0.4)",transition:"all .3s",cursor:"pointer"}}/>);
              })}
            </div>
          </div>
        </div>
      )}

      {!searchQ && (
        <div style={{padding:"4px 0 6px"}}>
          <div style={{display:"flex",gap:8,overflowX:"auto",padding:"4px 16px",scrollbarWidth:"none"}}>
            {CATS.map(function(c){
              var active = cat===c.id;
              return(
                <button key={c.id} onClick={function(){ setCat(c.id); }}
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
          {!searchQ && <IcoFire/>}
          {searchQ ? "תוצאות: "+searchQ : cat==="all" ? "הכי פופולרי" : CATS.find(function(c){ return c.id===cat; }).label}
        </span>
        <span style={{fontSize:12,color:C.gray}}>{filtered.length} מסעדות</span>
      </div>

      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:14}}>
        {filtered.map(function(r,i){ return <RestCard key={r.id} r={r} onClick={function(){ setRestPage(r); }} delay={i*60}/>; })}
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"50px 0",color:C.gray}}>
            <IcoSearch s={48} c={C.lightGray}/>
            <div style={{fontSize:14,marginTop:10,fontWeight:600}}>לא נמצאו תוצאות</div>
          </div>
        )}
      </div>

      {!searchQ && (
        <div style={{margin:"20px 16px 0",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",borderRadius:20,padding:"18px 20px",display:"flex",alignItems:"center",gap:14}}>
          <IcoGift s={36}/>
          <div>
            <div style={{color:"white",fontWeight:900,fontSize:15}}>שלחו כרטיס מתנה!</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,marginTop:2}}>אפשרויות תשלום מרובות</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── REST CARD ──────────────────────────────────────────────────────────────────
function RestCard({r,onClick,delay}){
  var Logo = LOGO_MAP[r.logo];
  return(
    <div onClick={onClick}
      style={{background:C.white,borderRadius:22,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",animation:"fadeIn .4s ease "+delay+"ms both",transition:"transform .15s,box-shadow .15s"}}>
      <div style={{height:115,background:"linear-gradient(135deg,"+hexA(r.color,"22")+","+hexA(r.color,"44")+")",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <Logo size={80}/>
        {!r.open && (
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontSize:12,fontWeight:700,background:"rgba(0,0,0,0.5)",padding:"4px 14px",borderRadius:20}}>סגור כעת</span>
          </div>
        )}
        {r.tags.map(function(t,i){
          return(<span key={t} style={{position:"absolute",top:8,right:i===0?8:84,background:t==="חדש"?C.green:C.gold,color:"white",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20}}>{t}</span>);
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
          <div style={{display:"flex",alignItems:"center",gap:3,background:"#FFF9EB",borderRadius:20,padding:"3px 9px"}}>
            <IcoStar/><span style={{fontSize:12,fontWeight:700,color:"#B45309"}}>{r.rating}</span>
            <span style={{fontSize:10,color:C.gray}}>(+{r.reviews})</span>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {[{I:IcoClock,t:r.time+" דק'"},{I:IcoTruck,t:"₪"+r.fee+" משלוח"},{I:IcoOrders,t:"מינ' ₪"+r.min}].map(function(x,i){
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:4,background:C.ultra,borderRadius:20,padding:"4px 10px"}}>
                <x.I s={12}/><span style={{fontSize:11,fontWeight:600,color:C.dark}}>{x.t}</span>
              </div>
            );
          })}
        </div>
        <div style={{marginTop:8,display:"flex",alignItems:"center",gap:4}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:r.open?C.green:"#EF4444",display:"inline-block"}}/>
          <span style={{fontSize:12,color:r.open?C.green:"#EF4444",fontWeight:700}}>{r.open?"פתוח":"סגור"}</span>
          <span style={{fontSize:11,color:C.gray}}>עד {r.close}</span>
        </div>
      </div>
    </div>
  );
}

// ── MARKET TAB ─────────────────────────────────────────────────────────────────
function MarketTab({mktCat,setMktCat}){
  return(
    <div style={{paddingBottom:90}}>
      <div style={{margin:"14px 16px 0",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",borderRadius:22,padding:"22px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:16,bottom:10,opacity:0.1}}><YougoLogo size={70} white={true}/></div>
        <span style={{color:"rgba(255,255,220,0.9)",fontSize:11,fontWeight:700,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"2px 10px",display:"inline-flex",alignItems:"center",gap:5}}>
          <IcoStore s={12} c="white"/> Yougo מרקט
        </span>
        <div style={{color:"white",fontSize:20,fontWeight:900,marginTop:8}}>הבית תמיד מוכן</div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:3}}>כל מה שחסר בבית מגיע בחצי שעה</div>
      </div>

      <div style={{padding:"14px 0 4px"}}>
        <div style={{display:"flex",gap:10,overflowX:"auto",padding:"4px 16px",scrollbarWidth:"none"}}>
          {MKTCATS.map(function(c){
            var active = mktCat===c.id;
            return(
              <button key={c.id} onClick={function(){ setMktCat(c.id); }}
                style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,background:active?C.red:C.white,border:active?"none":"1.5px solid "+C.lightGray,borderRadius:18,padding:"10px 14px",cursor:"pointer",flexShrink:0,transition:"all .2s",minWidth:76,boxShadow:active?"0 4px 14px rgba(200,16,46,0.3)":"0 1px 4px rgba(0,0,0,0.05)"}}>
                <c.Cmp active={active}/>
                <span style={{fontSize:10,fontWeight:700,color:active?"white":C.dark,whiteSpace:"nowrap",textAlign:"center"}}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{padding:"8px 16px 6px",display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:15,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:6}}><IcoStore s={16} c={C.red}/> חנויות קרובות</span>
        <span style={{fontSize:12,color:C.gray}}>{MARKET_STORES.length} חנויות</span>
      </div>

      <div style={{padding:"0 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
        {MARKET_STORES.map(function(s,i){
          var SLogo = LOGO_MAP[s.logo];
          return(
            <div key={s.id}
              style={{background:C.white,borderRadius:18,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",animation:"fadeIn .4s ease "+(i*60)+"ms both"}}>
              <div style={{height:84,background:"linear-gradient(135deg,"+hexA(s.color,"22")+","+hexA(s.color,"44")+")",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <SLogo size={56}/>
                {s.self && (
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(20,20,20,0.75)",padding:"3px 8px",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                    <span style={{color:"white",fontSize:9,fontWeight:700}}>איסוף עצמי בלבד</span>
                  </div>
                )}
              </div>
              <div style={{padding:"10px 10px 12px"}}>
                <div style={{fontWeight:800,fontSize:12,color:C.dark}}>{s.name}</div>
                <div style={{fontSize:10,color:C.gray,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:2}}>
                  <IcoPin s={9}/>{s.location}
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:2}}>
                    <IcoStar s={10}/><span style={{fontSize:10,fontWeight:700,color:"#B45309"}}>{s.rating}</span>
                    <span style={{fontSize:9,color:C.gray}}>(+{s.reviews})</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:2}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:s.open?C.green:"#EF4444",display:"inline-block"}}/>
                    <span style={{fontSize:9,color:s.open?C.green:"#EF4444",fontWeight:700}}>{s.open?"פתוח עד "+s.close:"סגור"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── REST PAGE ──────────────────────────────────────────────────────────────────
function RestPage({rest,cart,add,rem,onBack,cartCount,cartTotal,cartOpen,setCartOpen,setCart}){
  var r = rest;
  var Logo = LOGO_MAP[r.logo];
  function qty(id){ var f = cart.find(function(c){ return c.id===id && c.rid===r.id; }); return f ? f.qty : 0; }
  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:110}}>
      <div style={{height:200,background:"linear-gradient(135deg,"+hexA(r.color,"33")+","+hexA(r.color,"66")+")",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <Logo size={110}/>
        <button onClick={onBack}
          style={{position:"absolute",top:14,right:14,background:"white",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.13)"}}>
          <IcoClose/>
        </button>
        <div style={{position:"absolute",top:14,left:14,background:"white",borderRadius:20,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:r.open?C.green:"#EF4444",display:"inline-block"}}/>
          <span style={{fontSize:11,fontWeight:700,color:r.open?C.green:"#EF4444"}}>{r.open?"פתוח":"סגור"}</span>
        </div>
      </div>

      <div style={{margin:"0 16px",marginTop:-30,background:"white",borderRadius:22,padding:"16px",boxShadow:"0 4px 22px rgba(0,0,0,0.09)",position:"relative",zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontWeight:900,fontSize:18,color:C.dark}}>{r.name}</div>
            <div style={{fontSize:12,color:C.gray,marginTop:2,display:"flex",alignItems:"center",gap:3}}>
              <IcoPin s={11}/>{r.location}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,background:"#FFF9EB",borderRadius:20,padding:"4px 10px"}}>
            <IcoStar s={13}/><span style={{fontWeight:800,color:"#B45309",fontSize:14}}>{r.rating}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          {[{I:IcoClock,t:r.time+" דק'"},{I:IcoTruck,t:"₪"+r.fee},{I:IcoOrders,t:"מינ' ₪"+r.min}].map(function(x,i){
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:4,background:C.ultra,borderRadius:20,padding:"5px 10px",flex:1,justifyContent:"center"}}>
                <x.I s={12}/><span style={{fontSize:10,fontWeight:700,color:C.dark}}>{x.t}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{padding:"18px 16px 0"}}>
        <div style={{fontWeight:900,fontSize:16,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
          <IcoFork s={18} c={C.red}/> תפריט
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {r.menu.map(function(item){
            var q = qty(item.id);
            return(
              <div key={item.id} style={{background:"white",borderRadius:18,padding:"14px",display:"flex",gap:14,boxShadow:"0 1px 8px rgba(0,0,0,0.05)",alignItems:"center",position:"relative"}}>
                {item.hot && (
                  <div style={{position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#F97316,#EF4444)",borderRadius:20,padding:"2px 9px",display:"flex",alignItems:"center",gap:3}}>
                    <IcoFire s={11}/><span style={{color:"white",fontSize:9,fontWeight:800}}>הכי מבוקש</span>
                  </div>
                )}
                <div style={{width:62,height:62,borderRadius:16,flexShrink:0,background:"linear-gradient(135deg,"+hexA(r.color,"22")+","+hexA(r.color,"44")+")",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Logo size={46}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:C.dark}}>{item.name}</div>
                  <div style={{fontSize:11,color:C.gray,marginTop:3,lineHeight:1.4}}>{item.desc}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:10}}>
                    <span style={{fontWeight:900,fontSize:17,color:C.red}}>₪{item.price}</span>
                    {q===0 ? (
                      <button onClick={function(){ add(item,r); }}
                        style={{background:C.red,color:"white",border:"none",borderRadius:22,padding:"7px 16px",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:"0 3px 10px rgba(200,16,46,0.3)"}}>
                        <IcoPlus s={14}/> הוסף
                      </button>
                    ) : (
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <button onClick={function(){ rem(item.id,r.id); }}
                          style={{background:C.lightGray,border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <IcoMinus s={14}/>
                        </button>
                        <span style={{fontWeight:900,fontSize:15,minWidth:18,textAlign:"center"}}>{q}</span>
                        <button onClick={function(){ add(item,r); }}
                          style={{background:C.red,color:"white",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <IcoPlus s={14}/>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {cartCount>0 && (
        <button onClick={function(){ setCartOpen(true); }}
          style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:C.red,color:"white",border:"none",borderRadius:30,padding:"13px 24px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",boxShadow:"0 6px 24px rgba(200,16,46,0.45)",zIndex:200,fontSize:13,fontWeight:700,minWidth:250,justifyContent:"space-between"}}>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:20,padding:"2px 10px",fontSize:12}}>{cartCount}</span>
          <span style={{display:"flex",alignItems:"center",gap:6}}><IcoCart s={16} c="white"/> הצג עגלה</span>
          <span style={{fontWeight:900}}>₪{cartTotal}</span>
        </button>
      )}
      {cartOpen && <CartModal cart={cart} total={cartTotal} add={add} rem={rem} onClose={function(){ setCartOpen(false); }} setCart={setCart}/>}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}`}</style>
    </div>
  );
}

// ── CART MODAL ─────────────────────────────────────────────────────────────────
function CartModal({cart,total,add,rem,onClose,setCart}){
  var fee = total>0 ? 15 : 0;
  return(
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
      <div style={{position:"relative",background:"white",borderRadius:"26px 26px 0 0",padding:"20px 16px 32px",maxHeight:"78vh",overflowY:"auto",direction:"rtl"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:17,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:8}}>
            <IcoCart s={20} c={C.red}/> העגלה שלי
          </div>
          <button onClick={onClose} style={{background:C.ultra,border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <IcoClose/>
          </button>
        </div>
        {cart.length===0 ? (
          <div style={{textAlign:"center",padding:"30px 0",color:C.gray}}>
            <IcoCart s={52} c={C.lightGray}/>
            <div style={{marginTop:10,fontWeight:700}}>העגלה ריקה</div>
          </div>
        ) : (
          <>
            {cart.map(function(item){
              return(
                <div key={item.id+"-"+item.rid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #F0F0F0"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:38,height:38,borderRadius:10,background:C.ultra,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <IcoFork s={20} c={C.red}/>
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:13}}>{item.name}</div>
                      <div style={{fontSize:11,color:C.gray}}>{item.rname}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:900,color:C.red,fontSize:14}}>₪{item.price*item.qty}</span>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={function(){ rem(item.id,item.rid); }}
                        style={{background:C.lightGray,border:"none",borderRadius:"50%",width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoMinus s={12}/>
                      </button>
                      <span style={{fontWeight:800,minWidth:16,textAlign:"center"}}>{item.qty}</span>
                      <button onClick={function(){ add({id:item.id,name:item.name,price:item.price},{id:item.rid,name:item.rname}); }}
                        style={{background:C.red,border:"none",borderRadius:"50%",width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoPlus s={12}/>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{marginTop:16,padding:"14px",background:C.ultra,borderRadius:14}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.gray,marginBottom:7}}>
                <span>סה"כ</span><span>₪{total}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.gray,marginBottom:7}}>
                <span>דמי משלוח</span><span>₪{fee}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:900,color:C.dark,borderTop:"1px solid "+C.lightGray,paddingTop:9}}>
                <span>סה"כ לתשלום</span><span style={{color:C.red}}>₪{total+fee}</span>
              </div>
            </div>
            <button style={{width:"100%",background:C.red,color:"white",border:"none",borderRadius:22,padding:"15px",fontSize:15,fontWeight:900,cursor:"pointer",marginTop:14,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 18px rgba(200,16,46,0.35)"}}>
              <IcoCheck s={18}/> אישור הזמנה — ₪{total+fee}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── BOTTOM NAV ─────────────────────────────────────────────────────────────────
function BottomNav({tab,setTab,cartCount,view,setView}){
  var items = [
    {id:"profile",label:"פרופיל",I:IcoUser},
    {id:"myorders",label:"ההזמנות שלי",I:IcoOrders},
    {id:"cartpage",label:"העגלה שלי",I:IcoCart},
    {id:"market",label:"מרקט",I:IcoStore},
    {id:"restaurants",label:"מסעדות",I:IcoFork},
  ];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"white",borderTop:"1px solid #F0F0F0",display:"flex",padding:"8px 4px 14px",zIndex:300,boxShadow:"0 -2px 18px rgba(0,0,0,0.07)"}}>
      {items.map(function(t){
        var active;
        if(t.id==="market") active = tab==="market" && view==="app";
        else if(t.id==="restaurants") active = tab==="restaurants" && view==="app";
        else active = view===t.id;
        return(
          <button key={t.id}
            onClick={function(){
              if(t.id==="market"){ setView("app"); setTab("market"); }
              else if(t.id==="restaurants"){ setView("app"); setTab("restaurants"); }
              else setView(t.id);
            }}
            style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"4px 0",position:"relative"}}>
            {t.id==="cartpage" && cartCount>0 && (
              <span style={{position:"absolute",top:-2,right:"50%",transform:"translateX(8px)",background:C.red,color:"white",fontSize:9,fontWeight:800,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>
            )}
            <t.I s={21} c={active?C.red:C.gray}/>
            <span style={{fontSize:9,fontWeight:active?700:500,color:active?C.red:C.gray,textAlign:"center",lineHeight:1.2}}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── ADMIN ──────────────────────────────────────────────────────────────────────
function AdminDashboard({onBack}){
  var [sec,setSec] = useState("dashboard");
  var [editBiz,setEditBiz] = useState(null);
  var [bizList,setBizList] = useState(RESTAURANTS.map(function(r){ return Object.assign({},r,{active:true,verified:r.id%2===0}); }));
  var [ads,setAds] = useState([
    {id:1,title:"ורונה קריספי - 20% הנחה",target:"כל המשתמשים",budget:"₪500",status:"פעיל",imp:"12,400",clicks:"847"},
    {id:2,title:"Yougo פרמיום - הצטרף",target:"משתמשים חדשים",budget:"₪1,200",status:"פעיל",imp:"34,200",clicks:"2,130"},
    {id:3,title:"לימון פרש - משלוח חינם",target:"ראמה + נחף",budget:"₪300",status:"מושהה",imp:"8,900",clicks:"412"},
    {id:4,title:"רמדאן מברק",target:"כולם",budget:"₪2,000",status:"פעיל",imp:"67,800",clicks:"5,210"},
  ]);
  var [banners2,setBanners2] = useState(BANNERS.map(function(b,i){ return Object.assign({},b,{active:i<3}); }));
  var [settings,setSettings] = useState({appName:"Yougo",deliveryFee:10,freeDelivery:150,commission:15,vat:17,support:"972501234567",maintenance:false,bonus:true});

  var users = [
    {id:1,name:"חמדאן",phone:"972546980606",orders:14,total:"₪1,240",joined:"15/08/2025",active:true},
    {id:2,name:"מוחמד חמדאן",phone:"972524123456",orders:8,total:"₪720",joined:"20/09/2025",active:true},
    {id:3,name:"אחמד מחמוד",phone:"972523456789",orders:22,total:"₪2,180",joined:"01/07/2025",active:true},
    {id:4,name:"יוסף סלאח",phone:"972526543210",orders:5,total:"₪380",joined:"10/11/2025",active:false},
    {id:5,name:"ראמי עלי",phone:"972507654321",orders:31,total:"₪3,400",joined:"05/06/2025",active:true},
    {id:6,name:"נאדיה קסם",phone:"972508765432",orders:12,total:"₪990",joined:"22/10/2025",active:true},
  ];

  var ADMIN_STATS = [
    {label:"הזמנות היום",value:"347",change:"+12%",up:true,color:C.blue},
    {label:"הכנסות היום",value:"₪18,420",change:"+8%",up:true,color:C.green},
    {label:"משתמשים פעילים",value:"1,284",change:"+23%",up:true,color:C.purple},
    {label:"מסעדות פעילות",value:"42",change:"-2",up:false,color:C.orange},
    {label:"זמן ממוצע",value:"28 דק'",change:"-3 דק'",up:true,color:C.gold},
    {label:"דירוג ממוצע",value:"4.7",change:"+0.1",up:true,color:"#F59E0B"},
  ];

  var sideNav = [
    {id:"dashboard",I:IcoChart,label:"לוח בקרה"},
    {id:"orders",I:IcoPkg,label:"הזמנות",badge:3},
    {id:"businesses",I:IcoStore,label:"עסקים"},
    {id:"ads",I:IcoMeg,label:"מודעות"},
    {id:"banners",I:IcoImg,label:"באנרים"},
    {id:"users",I:IcoUsers,label:"משתמשים"},
    {id:"analytics",I:IcoChart,label:"אנליטיקס"},
    {id:"settings",I:IcoCog,label:"הגדרות"},
  ];

  return(
    <div style={{display:"flex",minHeight:"100vh",background:C.adminBg,direction:"rtl",fontFamily:"Arial,sans-serif"}}>
      {/* SIDEBAR */}
      <div style={{width:200,background:C.adminSide,display:"flex",flexDirection:"column",padding:"0 0 20px",borderLeft:"1px solid "+C.adminBorder,flexShrink:0}}>
        <div style={{padding:"20px 16px 16px",borderBottom:"1px solid "+C.adminBorder,display:"flex",alignItems:"center",gap:10}}>
          <YougoLogo size={38}/>
          <div>
            <div style={{color:C.adminText,fontWeight:900,fontSize:15}}>Yougo</div>
            <div style={{color:C.adminMuted,fontSize:10}}>מערכת ניהול</div>
          </div>
        </div>
        <div style={{flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2}}>
          {sideNav.map(function(s){
            return(
              <button key={s.id} onClick={function(){ setSec(s.id); }}
                style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:10,border:"none",cursor:"pointer",textAlign:"right",background:sec===s.id?"rgba(200,16,46,0.14)":"transparent",color:sec===s.id?C.red:C.adminMuted,fontWeight:sec===s.id?700:400,fontSize:12,transition:"all .15s",position:"relative",fontFamily:"Arial,sans-serif"}}>
                <s.I s={16} c={sec===s.id?C.red:C.adminMuted}/>
                {s.label}
                {s.badge && <span style={{marginRight:"auto",background:C.red,color:"white",fontSize:9,fontWeight:800,borderRadius:10,padding:"1px 6px"}}>{s.badge}</span>}
              </button>
            );
          })}
        </div>
        <button onClick={onBack}
          style={{margin:"0 8px",display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:10,border:"1px solid "+C.adminBorder,background:"transparent",color:C.adminMuted,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"Arial,sans-serif"}}>
          <IcoBack s={14} c={C.adminMuted}/> חזרה לאפליקציה
        </button>
      </div>

      {/* MAIN */}
      <div style={{flex:1,overflowY:"auto",padding:"22px 20px 40px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <div style={{color:C.adminText,fontSize:18,fontWeight:900}}>{sideNav.find(function(s){ return s.id===sec; }).label}</div>
            <div style={{color:C.adminMuted,fontSize:12,marginTop:2}}>יום שלישי, 10 מרץ 2026</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <div style={{background:C.adminCard,borderRadius:10,padding:"8px 12px",border:"1px solid "+C.adminBorder,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
              <IcoBell s={16}/>
              <span style={{background:C.red,color:"white",fontSize:9,fontWeight:800,borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>2</span>
            </div>
            <div style={{background:C.adminCard,borderRadius:10,padding:"8px 12px",color:C.adminText,fontSize:12,border:"1px solid "+C.adminBorder,display:"flex",alignItems:"center",gap:7}}>
              <IcoShield s={14} c={C.red}/> מנהל ראשי
            </div>
          </div>
        </div>

        {sec==="dashboard" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
              {ADMIN_STATS.map(function(s){
                return(
                  <div key={s.label} style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder,borderTop:"3px solid "+s.color}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{width:28,height:28,borderRadius:8,background:hexA(s.color,"22"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoChart s={16} c={s.color}/>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,color:s.up?C.green:"#EF4444",background:s.up?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)",borderRadius:8,padding:"2px 7px"}}>{s.up?"↑":"↓"} {s.change}</span>
                    </div>
                    <div style={{color:C.adminText,fontSize:20,fontWeight:900,marginTop:8}}>{s.value}</div>
                    <div style={{color:C.adminMuted,fontSize:11,marginTop:2}}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder,marginBottom:16}}>
              <div style={{color:C.adminText,fontWeight:800,fontSize:13,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                <IcoPkg s={15} c={C.red}/> הזמנות אחרונות
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead>
                  <tr style={{borderBottom:"1px solid "+C.adminBorder}}>
                    {["מזהה","לקוח","מסעדה","סכום","סטטוס","שעה"].map(function(h){ return(<th key={h} style={{color:C.adminMuted,fontWeight:600,padding:"6px 8px",textAlign:"right"}}>{h}</th>); })}
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_ORDERS.map(function(o){
                    return(
                      <tr key={o.id} style={{borderBottom:"1px solid rgba(37,42,58,0.5)"}}>
                        <td style={{color:C.blue,padding:"9px 8px",fontWeight:700}}>{o.id}</td>
                        <td style={{color:C.adminText,padding:"9px 8px"}}>{o.customer}</td>
                        <td style={{color:C.adminMuted,padding:"9px 8px"}}>{o.restaurant}</td>
                        <td style={{color:C.adminText,fontWeight:700,padding:"9px 8px"}}>{o.amount}</td>
                        <td style={{padding:"9px 8px"}}>
                          <span style={{background:hexA(o.sc,"22"),color:o.sc,borderRadius:20,padding:"3px 10px",fontWeight:700,fontSize:10}}>{o.status}</span>
                        </td>
                        <td style={{color:C.adminMuted,padding:"9px 8px"}}>{o.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder}}>
                <div style={{color:C.adminText,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
                  <IcoFork s={14} c={C.red}/> מסעדות מובילות
                </div>
                {RESTAURANTS.slice(0,4).map(function(r,i){
                  var RL = LOGO_MAP[r.logo];
                  return(
                    <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <div style={{width:26,height:26,borderRadius:7,overflow:"hidden",flexShrink:0,background:hexA(r.color,"22"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <RL size={20}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{color:C.adminText,fontSize:11,fontWeight:600}}>{r.name}</div>
                        <div style={{background:"rgba(200,16,46,0.2)",height:4,borderRadius:2,marginTop:3,overflow:"hidden"}}>
                          <div style={{height:"100%",background:C.red,borderRadius:2,width:(90-i*14)+"%"}}/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder}}>
                <div style={{color:C.adminText,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
                  <IcoChart s={14} c={C.red}/> הזמנות לפי שעה
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:3,height:80,justifyContent:"space-around"}}>
                  {[30,45,60,80,95,70,55,88,100,75,50,40].map(function(h,i){
                    return(<div key={i} style={{flex:1,background:"rgba(200,16,46,"+(0.25+h/200)+")",height:h+"%",borderRadius:"3px 3px 0 0",minWidth:6}}/>);
                  })}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                  {["08","11","14","17","20"].map(function(t){ return(<span key={t} style={{color:C.adminMuted,fontSize:9}}>{t}:00</span>); })}
                </div>
              </div>
            </div>
          </div>
        )}

        {sec==="orders" && (
          <div style={{background:C.adminCard,borderRadius:16,padding:"18px",border:"1px solid "+C.adminBorder}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{color:C.adminText,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",gap:6}}><IcoPkg s={15} c={C.red}/> כל ההזמנות</div>
              <div style={{display:"flex",gap:6}}>
                {["הכל","פעיל","הושלם","בוטל"].map(function(f){ return(<button key={f} style={{background:"rgba(200,16,46,0.1)",color:C.adminMuted,border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,cursor:"pointer"}}>{f}</button>); })}
              </div>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{borderBottom:"1px solid "+C.adminBorder}}>
                {["מזהה","לקוח","מסעדה","סכום","סטטוס","שעה"].map(function(h){ return(<th key={h} style={{color:C.adminMuted,fontWeight:600,padding:"8px",textAlign:"right"}}>{h}</th>); })}
              </tr></thead>
              <tbody>
                {ADMIN_ORDERS.concat(ADMIN_ORDERS).map(function(o,i){
                  return(
                    <tr key={o.id+i} style={{borderBottom:"1px solid rgba(37,42,58,0.4)"}}>
                      <td style={{color:C.blue,padding:"9px 8px",fontWeight:700}}>{o.id}</td>
                      <td style={{color:C.adminText,padding:"9px 8px"}}>{o.customer}</td>
                      <td style={{color:C.adminMuted,padding:"9px 8px"}}>{o.restaurant}</td>
                      <td style={{color:C.adminText,fontWeight:700,padding:"9px 8px"}}>{o.amount}</td>
                      <td style={{padding:"9px 8px"}}><span style={{background:hexA(o.sc,"22"),color:o.sc,borderRadius:20,padding:"3px 10px",fontWeight:700,fontSize:10}}>{o.status}</span></td>
                      <td style={{color:C.adminMuted,padding:"9px 8px"}}>{o.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {sec==="businesses" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <div style={{color:C.adminText,fontSize:12}}>{bizList.length} עסקים רשומים</div>
              <button style={{background:C.red,color:"white",border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><IcoPlus s={12}/> הוסף עסק</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {bizList.map(function(b){
                var BL = LOGO_MAP[b.logo];
                return(
                  <div key={b.id} style={{background:C.adminCard,borderRadius:16,padding:"14px",border:"1px solid "+C.adminBorder,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:48,height:48,background:hexA(b.color,"22"),borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
                      <BL size={40}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{color:C.adminText,fontWeight:800,fontSize:13}}>{b.name}</span>
                        {b.verified && <span style={{background:"rgba(16,185,129,0.14)",color:C.green,fontSize:9,fontWeight:800,borderRadius:8,padding:"2px 6px"}}>מאומת</span>}
                      </div>
                      <div style={{color:C.adminMuted,fontSize:11,marginTop:1}}>{b.location}</div>
                      <div style={{display:"flex",gap:6,marginTop:4}}>
                        <span style={{background:"rgba(245,166,35,0.14)",color:C.gold,fontSize:10,borderRadius:8,padding:"2px 7px"}}>{b.rating} ★</span>
                        <span style={{color:C.adminMuted,fontSize:10}}>{b.cat}</span>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end",flexShrink:0}}>
                      <span style={{color:b.active?C.green:"#EF4444",fontSize:11,fontWeight:700}}>{b.active?"פעיל":"לא פעיל"}</span>
                      <div style={{display:"flex",gap:5}}>
                        <button onClick={function(){ setEditBiz(b); }} style={{background:"rgba(59,130,246,0.12)",color:C.blue,border:"none",borderRadius:7,padding:"4px 10px",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}><IcoEdit s={10} c={C.blue}/> עריכה</button>
                        <button onClick={function(){ setBizList(function(p){ return p.map(function(x){ return x.id===b.id ? Object.assign({},x,{active:!x.active}) : x; }); }); }}
                          style={{background:b.active?"rgba(239,68,68,0.1)":"rgba(16,185,129,0.1)",color:b.active?"#EF4444":C.green,border:"none",borderRadius:7,padding:"4px 10px",fontSize:10,cursor:"pointer"}}>{b.active?"השהה":"הפעל"}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {editBiz && (
              <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div onClick={function(){ setEditBiz(null); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}}/>
                <div style={{position:"relative",background:C.adminCard,borderRadius:20,padding:"22px",width:460,maxWidth:"95vw",border:"1px solid "+C.adminBorder,zIndex:1,direction:"rtl"}}>
                  <div style={{color:C.adminText,fontSize:15,fontWeight:900,marginBottom:16,display:"flex",alignItems:"center",gap:7}}><IcoEdit s={15} c={C.red}/> עריכת עסק</div>
                  {[{l:"שם העסק",k:"name"},{l:"קטגוריה",k:"cat"},{l:"מיקום",k:"location"},{l:"שעת סגירה",k:"close"}].map(function(f){
                    return(
                      <div key={f.k} style={{marginBottom:10}}>
                        <label style={{color:C.adminMuted,fontSize:11,display:"block",marginBottom:3}}>{f.l}</label>
                        <input value={editBiz[f.k]||""} onChange={function(e){ var v=e.target.value; setEditBiz(function(p){ return Object.assign({},p,{[f.k]:v}); }); }}
                          style={{width:"100%",background:C.adminBg,border:"1px solid "+C.adminBorder,borderRadius:9,padding:"8px 11px",color:C.adminText,fontSize:12,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
                      </div>
                    );
                  })}
                  <div style={{display:"flex",gap:10,marginTop:14}}>
                    <button onClick={function(){ setBizList(function(p){ return p.map(function(x){ return x.id===editBiz.id ? editBiz : x; }); }); setEditBiz(null); }}
                      style={{flex:1,background:C.red,color:"white",border:"none",borderRadius:10,padding:"10px",fontWeight:700,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><IcoCheck s={14}/> שמור</button>
                    <button onClick={function(){ setEditBiz(null); }}
                      style={{flex:1,background:"transparent",color:C.adminMuted,border:"1px solid "+C.adminBorder,borderRadius:10,padding:"10px",cursor:"pointer",fontSize:13}}>ביטול</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {sec==="ads" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:16}}>
              {[{l:"הופעות",v:"123,300",c:C.blue},{l:"קליקים",v:"8,599",c:C.green},{l:"CTR",v:"6.97%",c:C.purple},{l:"תקציב",v:"₪2,800",c:C.gold}].map(function(s){
                return(<div key={s.l} style={{background:C.adminCard,borderRadius:14,padding:"14px",border:"1px solid "+C.adminBorder,borderTop:"2px solid "+s.c}}>
                  <div style={{color:C.adminText,fontSize:18,fontWeight:900}}>{s.v}</div>
                  <div style={{color:C.adminMuted,fontSize:11,marginTop:2}}>{s.l}</div>
                </div>);
              })}
            </div>
            <div style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder}}>
              {ads.map(function(ad){
                return(
                  <div key={ad.id} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 0",borderBottom:"1px solid rgba(37,42,58,0.5)"}}>
                    <div style={{width:38,height:38,background:"rgba(200,16,46,0.1)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><IcoMeg s={18} c={C.red}/></div>
                    <div style={{flex:1}}>
                      <div style={{color:C.adminText,fontWeight:700,fontSize:12}}>{ad.title}</div>
                      <div style={{color:C.adminMuted,fontSize:10,marginTop:1}}>יעד: {ad.target} | {ad.budget} | {ad.imp} הופעות</div>
                    </div>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{background:ad.status==="פעיל"?"rgba(16,185,129,0.14)":"rgba(245,166,35,0.14)",color:ad.status==="פעיל"?C.green:C.gold,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>{ad.status}</span>
                      <button onClick={function(){ setAds(function(p){ return p.map(function(a){ return a.id===ad.id ? Object.assign({},a,{status:a.status==="פעיל"?"מושהה":"פעיל"}) : a; }); }); }}
                        style={{background:"rgba(59,130,246,0.1)",color:C.blue,border:"none",borderRadius:7,padding:"3px 8px",fontSize:10,cursor:"pointer"}}>{ad.status==="פעיל"?"השהה":"הפעל"}</button>
                      <button onClick={function(){ setAds(function(p){ return p.filter(function(a){ return a.id!==ad.id; }); }); }}
                        style={{background:"rgba(239,68,68,0.1)",color:"#EF4444",border:"none",borderRadius:7,padding:"3px 8px",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center"}}><IcoTrash s={10}/></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sec==="banners" && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {banners2.map(function(b){
              return(
                <div key={b.id} style={{background:C.adminCard,borderRadius:16,padding:"14px",border:"1px solid "+C.adminBorder,display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:68,height:44,background:b.bg,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
                    <YougoLogo size={26} white={true}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{color:C.adminText,fontWeight:700,fontSize:13}}>{b.title}</div>
                    <div style={{color:C.adminMuted,fontSize:11,marginTop:1}}>{b.sub}</div>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <span style={{background:b.active?"rgba(16,185,129,0.14)":"rgba(100,116,139,0.14)",color:b.active?C.green:C.adminMuted,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700}}>{b.active?"פעיל":"כבוי"}</span>
                    <button onClick={function(){ setBanners2(function(p){ return p.map(function(x){ return x.id===b.id ? Object.assign({},x,{active:!x.active}) : x; }); }); }}
                      style={{background:"rgba(59,130,246,0.1)",color:C.blue,border:"none",borderRadius:7,padding:"5px 10px",fontSize:10,cursor:"pointer"}}>{b.active?"כבה":"הפעל"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {sec==="users" && (
          <div style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder}}>
            <div style={{color:C.adminText,fontWeight:800,fontSize:13,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><IcoUsers s={15} c={C.red}/> כל המשתמשים</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{borderBottom:"1px solid "+C.adminBorder}}>
                {["שם","טלפון","הזמנות","סה\"כ","הצטרף","סטטוס","פעולות"].map(function(h){ return(<th key={h} style={{color:C.adminMuted,fontWeight:600,padding:"8px",textAlign:"right"}}>{h}</th>); })}
              </tr></thead>
              <tbody>
                {users.map(function(u){
                  return(
                    <tr key={u.id} style={{borderBottom:"1px solid rgba(37,42,58,0.4)"}}>
                      <td style={{padding:"10px 8px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:26,height:26,background:"rgba(200,16,46,0.1)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoUser s={13} c={C.red}/></div><span style={{color:C.adminText,fontWeight:600}}>{u.name}</span></div></td>
                      <td style={{color:C.adminMuted,padding:"10px 8px"}}>{u.phone}</td>
                      <td style={{color:C.adminText,padding:"10px 8px",fontWeight:700}}>{u.orders}</td>
                      <td style={{color:C.green,padding:"10px 8px",fontWeight:700}}>{u.total}</td>
                      <td style={{color:C.adminMuted,padding:"10px 8px"}}>{u.joined}</td>
                      <td style={{padding:"10px 8px"}}><span style={{background:u.active?"rgba(16,185,129,0.14)":"rgba(239,68,68,0.1)",color:u.active?C.green:"#EF4444",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>{u.active?"פעיל":"חסום"}</span></td>
                      <td style={{padding:"10px 8px"}}><button style={{background:"rgba(200,16,46,0.08)",color:C.red,border:"none",borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer"}}>{u.active?"חסום":"שחרר"}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {sec==="analytics" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:16}}>
              {[{title:"הזמנות שבועי",vals:[42,55,38,71,88,95,102],color:C.red},{title:"הכנסות (₪)",vals:[1200,1800,1400,2200,2800,3100,3400],color:C.green},{title:"משתמשים חדשים",vals:[5,8,3,12,9,15,11],color:C.blue},{title:"ביטולים",vals:[3,2,5,1,4,2,3],color:C.orange}].map(function(chart){
                var mx = Math.max.apply(null,chart.vals);
                return(
                  <div key={chart.title} style={{background:C.adminCard,borderRadius:16,padding:"16px",border:"1px solid "+C.adminBorder}}>
                    <div style={{color:C.adminText,fontWeight:800,marginBottom:12,fontSize:13}}>{chart.title}</div>
                    <div style={{display:"flex",alignItems:"flex-end",gap:4,height:70}}>
                      {chart.vals.map(function(v,i){
                        return(
                          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                            <div style={{height:Math.round((v/mx)*100)+"%",minHeight:4,background:hexA(chart.color,"99"),borderRadius:"3px 3px 0 0",width:"100%"}}/>
                            <span style={{color:C.adminMuted,fontSize:8}}>{["א","ב","ג","ד","ה","ו","ש"][i]}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{color:chart.color,fontWeight:900,fontSize:17,marginTop:6}}>
                      {chart.vals.reduce(function(a,b){ return a+b; },0).toLocaleString()}
                      <span style={{color:C.adminMuted,fontSize:10,fontWeight:400,marginRight:4}}>סה"כ</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sec==="settings" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{background:C.adminCard,borderRadius:16,padding:"18px",border:"1px solid "+C.adminBorder}}>
              <div style={{color:C.adminText,fontWeight:800,fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:6}}><IcoCog s={15} c={C.red}/> הגדרות אפליקציה</div>
              {[{l:"שם האפליקציה",k:"appName"},{l:"טלפון תמיכה",k:"support"}].map(function(f){
                return(
                  <div key={f.k} style={{marginBottom:10}}>
                    <label style={{color:C.adminMuted,fontSize:11,display:"block",marginBottom:3}}>{f.l}</label>
                    <input value={settings[f.k]||""} onChange={function(e){ var v=e.target.value; setSettings(function(p){ return Object.assign({},p,{[f.k]:v}); }); }}
                      style={{width:"100%",background:C.adminBg,border:"1px solid "+C.adminBorder,borderRadius:9,padding:"8px 11px",color:C.adminText,fontSize:12,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
                  </div>
                );
              })}
            </div>
            <div style={{background:C.adminCard,borderRadius:16,padding:"18px",border:"1px solid "+C.adminBorder}}>
              <div style={{color:C.adminText,fontWeight:800,fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:6}}><IcoShield s={15} c={C.red}/> הגדרות מערכת</div>
              {[{l:"מצב תחזוקה",k:"maintenance"},{l:"בונוס לחדשים",k:"bonus"}].map(function(t){
                return(
                  <div key={t.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.adminBg,borderRadius:10,padding:"11px 12px",border:"1px solid "+C.adminBorder,marginBottom:8}}>
                    <span style={{color:C.adminText,fontSize:12}}>{t.l}</span>
                    <div onClick={function(){ setSettings(function(p){ return Object.assign({},p,{[t.k]:!p[t.k]}); }); }}
                      style={{width:40,height:22,borderRadius:11,background:settings[t.k]?C.red:"rgba(100,116,139,0.3)",position:"relative",cursor:"pointer",transition:"background .2s"}}>
                      <div style={{position:"absolute",width:18,height:18,background:"white",borderRadius:"50%",top:2,left:settings[t.k]?2:20,transition:"left .2s"}}/>
                    </div>
                  </div>
                );
              })}
              <button style={{width:"100%",background:C.red,color:"white",border:"none",borderRadius:10,padding:"11px",fontWeight:700,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:4}}><IcoCheck s={14}/> שמור הגדרות</button>
            </div>
          </div>
        )}
      </div>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(200,16,46,0.3);border-radius:2px}`}</style>
    </div>
  );
}

// ── SHARED PAGE WRAPPER ────────────────────────────────────────────────────────
function PageWrap({title,onBack,cartCount,setView,children}){
  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:90}}>
      {/* Header */}
      <div style={{background:C.white,position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px"}}>
          <button onClick={onBack} style={{background:C.ultra,border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <IcoBack s={17} c={C.dark}/>
          </button>
          <div style={{flex:1,fontSize:17,fontWeight:900,color:C.dark}}>{title}</div>
          {cartCount>0 && (
            <button onClick={function(){ setView("cartpage"); }} style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:4}}>
              <IcoCart s={24} c={C.red}/>
              <span style={{position:"absolute",top:-2,right:-4,background:C.red,color:"white",fontSize:9,fontWeight:800,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>
            </button>
          )}
        </div>
      </div>
      {children}
      <style>{`*{box-sizing:border-box}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ── PROFILE PAGE פרופיל ────────────────────────────────────────────────────────
function ProfilePage({onBack,cartCount,setView,user,onLogout}){
  var u = user || {name:"חמדאן",phone:"0546980606",email:"hamdan@example.com",city:"ראמה",street:"אלפורסאן 0",gender:"male",age:"28",authMethod:"phone"};
  var [editMode,setEditMode] = useState(false);
  var [profile,setProfile] = useState({name:u.name||"",phone:u.phone||"",email:u.email||"hamdan@example.com",city:u.city||"ראמה",street:u.street||"אלפורסאן 0"});
  var [draft,setDraft] = useState(profile);
  var [showLogoutConfirm,setShowLogoutConfirm] = useState(false);
  var [showAddressModal,setShowAddressModal] = useState(false);
  var [showCoupons,setShowCoupons] = useState(false);
  var [showNotifications,setShowNotifications] = useState(false);
  var [showSecurity,setShowSecurity] = useState(false);
  var [showSettings,setShowSettings] = useState(false);
  var [notifSettings,setNotifSettings] = useState({orders:true,promos:true,news:false,sms:true});
  var [appSettings,setAppSettings] = useState({lang:"he",darkMode:false,accessibility:false});

  var coupons = [
    {code:"NAAT10",desc:"10% הנחה על כל הזמנה",exp:"31/12/2026",color:C.red,used:false},
    {code:"FREE15",desc:"משלוח חינם להזמנות מעל ₪80",exp:"30/06/2026",color:C.green,used:false},
    {code:"SUMMER25",desc:"25% הנחה - מבצע קיץ",exp:"31/08/2025",color:C.gray,used:true},
  ];

  var addresses = [
    {id:1,label:"בית",icon:"🏠",addr:"אלפורסאן 0, ראמה",default:true},
    {id:2,label:"עבודה",icon:"🏢",addr:"רחוב הראשי 12, כרמיאל",default:false},
  ];

  var menuItems = [
    {ico:IcoPin,    label:"הכתובות שלי",    sub:"ראמה - אלפורסאן 0",      color:C.blue,   action:function(){ setShowAddressModal(true); }},
    {ico:IcoOrders, label:"ההזמנות שלי",    sub:"14 הזמנות בסך הכל",      color:C.green,  action:function(){ setView("myorders"); }},
    {ico:IcoCart,   label:"העגלה שלי",      sub:"צפה בפריטים בעגלה",       color:C.red,    action:function(){ setView("cartpage"); }},
    {ico:IcoGift,   label:"קופונים שלי",    sub:"2 קופונים פעילים",        color:C.gold,   action:function(){ setShowCoupons(true); }},
    {ico:IcoShield, label:"כרטיסים",        sub:"נהל אמצעי תשלום",         color:"#1D3557",action:function(){ setView("cards"); }},
    {ico:IcoUsers,  label:"הזמינו חברים",   sub:"הרוויח ₪30 לכל חבר",     color:C.purple, action:function(){ setView("invite"); }, badge:"חדש!"},
    {ico:IcoShield, label:"אבטחה",          sub:"אימות ואבטחת חשבון",      color:C.purple, action:function(){ setShowSecurity(true); }},
    {ico:IcoBell,   label:"הגדרות התראות",  sub:"פיקוח על ההתראות",        color:C.orange, action:function(){ setShowNotifications(true); }},
    {ico:IcoCog,    label:"הגדרות",         sub:"שפה, מטבע, נגישות",       color:C.gray,   action:function(){ setShowSettings(true); }},
    {ico:IcoOrders, label:"תנאים והגבלות",  sub:"קרא את תנאי השימוש",     color:"#64748B", action:function(){ setView("terms"); }},
    {ico:IcoShield, label:"מדיניות פרטיות", sub:"כיצד אנו מגנים עליך",   color:"#64748B", action:function(){ setView("privacy"); }},
    {ico:IcoUser,   label:"צור קשר",        sub:"תמיכה ושירות לקוחות",    color:C.blue,   action:function(){ setView("support"); }},
  ];

  var authBadge = u.authMethod==="google" ? {label:"Google",bg:"#4285F4"} :
                  u.authMethod==="apple"  ? {label:"Apple",bg:"#000"} :
                  {label:"טלפון",bg:C.red};

  return(
    <PageWrap title="פרופיל" onBack={onBack} cartCount={cartCount} setView={setView}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#C8102E,#7B0D1E)",padding:"28px 20px 50px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:-30,top:-30,width:180,height:180,background:"rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{position:"relative"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",border:"3px solid rgba(255,255,255,0.4)"}}>
              <IcoUser s={36} c="white"/>
            </div>
            <div style={{position:"absolute",bottom:0,left:0,width:22,height:22,borderRadius:"50%",background:C.gold,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <IcoEdit s={10} c="white"/>
            </div>
          </div>
          <div>
            <div style={{color:"white",fontSize:20,fontWeight:900}}>{profile.name}</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:2}}>{profile.phone}</div>
            <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
              <span style={{background:"rgba(255,255,255,0.15)",color:"white",fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px",display:"flex",alignItems:"center",gap:4}}>
                <IcoStar s={10}/> 4.9
              </span>
              <span style={{background:"rgba(255,255,255,0.15)",color:"white",fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>14 הזמנות</span>
              <span style={{background:authBadge.bg,color:"white",fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>{authBadge.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{margin:"0 16px",marginTop:-24,background:C.white,borderRadius:18,padding:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)",display:"flex",zIndex:10,position:"relative"}}>
        {[{v:"14",l:"הזמנות"},{v:"₪1,240",l:"סך הכל"},{v:"4.9",l:"דירוג"}].map(function(s,i){
          return(
            <div key={i} style={{flex:1,textAlign:"center",borderLeft:i>0?"1px solid "+C.lightGray:"none"}}>
              <div style={{fontSize:18,fontWeight:900,color:C.red}}>{s.v}</div>
              <div style={{fontSize:11,color:C.gray,marginTop:2}}>{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* Personal Info */}
      <div style={{margin:"14px 16px 0",background:C.white,borderRadius:18,padding:"16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}>
            <IcoUser s={17} c={C.red}/> פרטים אישיים
          </div>
          <button onClick={function(){
            if(editMode){ setProfile(draft); }
            else { setDraft(profile); }
            setEditMode(!editMode);
          }}
            style={{background:editMode?"rgba(16,185,129,0.1)":C.ultra,color:editMode?C.green:C.gray,border:"none",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            {editMode ? <><IcoCheck s={13} c={C.green}/> שמור</> : <><IcoEdit s={13} c={C.gray}/> עריכה</>}
          </button>
        </div>
        {[{l:"שם מלא",k:"name"},{l:"טלפון",k:"phone"},{l:"אימייל",k:"email"},{l:"עיר",k:"city"},{l:"כתובת",k:"street"}].map(function(f){
          return(
            <div key={f.k} style={{marginBottom:11}}>
              <div style={{fontSize:11,color:C.gray,marginBottom:3}}>{f.l}</div>
              {editMode ? (
                <input value={draft[f.k]||""} onChange={function(e){ var v=e.target.value; setDraft(function(p){ return Object.assign({},p,{[f.k]:v}); }); }}
                  style={{width:"100%",background:C.ultra,border:"1.5px solid "+C.lightGray,borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
              ) : (
                <div style={{fontSize:14,fontWeight:600,color:C.dark,background:C.ultra,borderRadius:10,padding:"9px 12px"}}>{profile[f.k]||"—"}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Menu */}
      <div style={{margin:"14px 16px 0",background:C.white,borderRadius:18,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        {menuItems.map(function(item,i){
          return(
            <div key={i} onClick={item.action}
              style={{display:"flex",alignItems:"center",gap:13,padding:"13px 16px",borderBottom:i<menuItems.length-1?"1px solid "+C.ultra:"none",cursor:"pointer"}}
              onMouseEnter={function(e){ e.currentTarget.style.background=C.ultra; }}
              onMouseLeave={function(e){ e.currentTarget.style.background=""; }}>
              <div style={{width:40,height:40,borderRadius:12,background:hexA(item.color,"18"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <item.ico s={19} c={item.color}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.dark,display:"flex",alignItems:"center",gap:6}}>
                  {item.label}
                  {item.badge && <span style={{background:"rgba(200,16,46,0.12)",color:C.red,fontSize:9,fontWeight:800,borderRadius:8,padding:"2px 7px"}}>{item.badge}</span>}
                </div>
                <div style={{fontSize:11,color:C.gray,marginTop:1}}>{item.sub}</div>
              </div>
              <IcoChevDown s={15} c={C.lightGray}/>
            </div>
          );
        })}
      </div>

      {/* Logout btn */}
      <div style={{margin:"14px 16px 24px"}}>
        <button onClick={function(){ setShowLogoutConfirm(true); }}
          style={{width:"100%",background:"rgba(239,68,68,0.07)",color:"#EF4444",border:"1.5px solid rgba(239,68,68,0.2)",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <IcoClose s={16} c="#EF4444"/> התנתק
        </button>
      </div>

      {/* ── LOGOUT CONFIRM MODAL ── */}
      {showLogoutConfirm && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={function(){ setShowLogoutConfirm(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:22,padding:"28px 22px",width:"100%",maxWidth:380,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{width:62,height:62,borderRadius:"50%",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <IcoClose s={28} c="#EF4444"/>
            </div>
            <div style={{fontSize:18,fontWeight:900,color:C.dark,marginBottom:8}}>התנתקות</div>
            <div style={{fontSize:13,color:C.gray,marginBottom:22,lineHeight:1.6}}>
              האם אתה בטוח שברצונך להתנתק מחשבונך?
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={function(){ setShowLogoutConfirm(false); }}
                style={{flex:1,background:C.ultra,color:C.dark,border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
                ביטול
              </button>
              <button onClick={function(){ setShowLogoutConfirm(false); onLogout(); }}
                style={{flex:1,background:"#EF4444",color:"white",border:"none",borderRadius:12,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
                התנתק
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADDRESS MODAL ── */}
      {showAddressModal && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowAddressModal(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",padding:"20px 0 36px",direction:"rtl"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 16px",borderBottom:"1px solid "+C.lightGray}}>
              <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}><IcoPin s={18} c={C.red}/> הכתובות שלי</div>
              <button onClick={function(){ setShowAddressModal(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose s={13}/></button>
            </div>
            <div style={{padding:"10px 18px"}}>
              {addresses.map(function(a){
                return(
                  <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid "+C.ultra}}>
                    <div style={{fontSize:24}}>{a.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:14,display:"flex",alignItems:"center",gap:6}}>
                        {a.label}
                        {a.default && <span style={{background:"rgba(200,16,46,0.1)",color:C.red,fontSize:9,fontWeight:800,borderRadius:8,padding:"2px 7px"}}>ברירת מחדל</span>}
                      </div>
                      <div style={{fontSize:12,color:C.gray,marginTop:1}}>{a.addr}</div>
                    </div>
                    <button style={{background:C.ultra,border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",color:C.blue,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                      <IcoEdit s={11} c={C.blue}/> עריכה
                    </button>
                  </div>
                );
              })}
              <button style={{width:"100%",background:"rgba(200,16,46,0.06)",color:C.red,border:"1.5px dashed rgba(200,16,46,0.3)",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",marginTop:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <IcoPlus s={14} c={C.red}/> הוסף כתובת חדשה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COUPONS MODAL ── */}
      {showCoupons && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowCoupons(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",padding:"20px 0 36px",direction:"rtl"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 16px",borderBottom:"1px solid "+C.lightGray}}>
              <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}><IcoGift s={18} c={C.gold}/> הקופונים שלי</div>
              <button onClick={function(){ setShowCoupons(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose s={13}/></button>
            </div>
            <div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:10}}>
              {coupons.map(function(cp){
                return(
                  <div key={cp.code} style={{borderRadius:14,border:"2px dashed "+(cp.used?C.lightGray:hexA(cp.color,"66")),padding:"14px",background:cp.used?"rgba(0,0,0,0.02)":hexA(cp.color,"08"),opacity:cp.used?0.6:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontFamily:"monospace",fontSize:18,fontWeight:900,color:cp.used?C.gray:cp.color,letterSpacing:2}}>{cp.code}</div>
                      {cp.used
                        ? <span style={{background:C.ultra,color:C.gray,fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>הומש</span>
                        : <button style={{background:cp.color,color:"white",border:"none",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer"}}>העתק</button>
                      }
                    </div>
                    <div style={{fontSize:12,color:C.dark,fontWeight:600,marginTop:6}}>{cp.desc}</div>
                    <div style={{fontSize:10,color:C.gray,marginTop:3}}>תוקף עד: {cp.exp}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SECURITY MODAL ── */}
      {showSecurity && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowSecurity(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",padding:"20px 0 36px",direction:"rtl"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 16px",borderBottom:"1px solid "+C.lightGray}}>
              <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}><IcoShield s={18} c={C.purple}/> אבטחה וסיסמה</div>
              <button onClick={function(){ setShowSecurity(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose s={13}/></button>
            </div>
            <div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:10}}>
              {[
                {l:"שנה מספר טלפון",sub:"הטלפון הנוכחי: "+profile.phone,I:IcoUser,c:C.blue},
                {l:"אימות דו-שלבי (SMS)",sub:"קוד אימות בכל כניסה",I:IcoCheck,c:C.green},
                {l:"מכשירים מחוברים",sub:"נהל את ההתחברויות שלך",I:IcoShield,c:C.purple},
                {l:"מחק חשבון",sub:"פעולה בלתי הפיכה",I:IcoTrash,c:"#EF4444"},
              ].map(function(item,i){
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px",background:C.ultra,borderRadius:12,cursor:"pointer"}}>
                    <div style={{width:38,height:38,borderRadius:10,background:hexA(item.c,"18"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <item.I s={18} c={item.c}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:item.c==="EF4444"?"#EF4444":C.dark}}>{item.l}</div>
                      <div style={{fontSize:11,color:C.gray,marginTop:1}}>{item.sub}</div>
                    </div>
                    <IcoChevDown s={14} c={C.lightGray}/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── NOTIFICATIONS MODAL ── */}
      {showNotifications && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowNotifications(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",padding:"20px 0 36px",direction:"rtl"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 16px",borderBottom:"1px solid "+C.lightGray}}>
              <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}><IcoBell s={18} c={C.orange}/> הגדרות התראות</div>
              <button onClick={function(){ setShowNotifications(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose s={13}/></button>
            </div>
            <div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:2}}>
              {[{k:"orders",l:"עדכוני הזמנות",sub:"סטטוס המשלוח שלך",c:C.green},
                {k:"promos",l:"מבצעים והנחות",sub:"הצעות אישיות",c:C.gold},
                {k:"news",l:"חדשות ועדכונים",sub:"מסעדות חדשות",c:C.blue},
                {k:"sms",l:"SMS",sub:"הודעות טקסט",c:C.purple},
              ].map(function(n){
                return(
                  <div key={n.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:"1px solid "+C.ultra}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:36,height:36,borderRadius:10,background:hexA(n.c,"18"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <IcoBell s={17} c={n.c}/>
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{n.l}</div>
                        <div style={{fontSize:11,color:C.gray}}>{n.sub}</div>
                      </div>
                    </div>
                    <div onClick={function(){ setNotifSettings(function(p){ return Object.assign({},p,{[n.k]:!p[n.k]}); }); }}
                      style={{width:44,height:24,borderRadius:12,background:notifSettings[n.k]?C.red:"rgba(100,116,139,0.25)",position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0}}>
                      <div style={{position:"absolute",width:20,height:20,background:"white",borderRadius:"50%",top:2,left:notifSettings[n.k]?2:22,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowSettings(false); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"24px 24px 0 0",padding:"20px 0 36px",direction:"rtl"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 16px",borderBottom:"1px solid "+C.lightGray}}>
              <div style={{fontSize:16,fontWeight:900,color:C.dark,display:"flex",alignItems:"center",gap:7}}><IcoCog s={18} c={C.gray}/> הגדרות אפליקציה</div>
              <button onClick={function(){ setShowSettings(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose s={13}/></button>
            </div>
            <div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:2}}>
              {/* Language */}
              <div style={{padding:"12px 0",borderBottom:"1px solid "+C.ultra}}>
                <div style={{fontWeight:700,fontSize:13,color:C.dark,marginBottom:8}}>שפת הממשק</div>
                <div style={{display:"flex",gap:8}}>
                  {[{v:"he",l:"עברית"},{v:"ar",l:"العربية"},{v:"en",l:"English"}].map(function(lang){
                    return(
                      <button key={lang.v} onClick={function(){ setAppSettings(function(p){ return Object.assign({},p,{lang:lang.v}); }); }}
                        style={{flex:1,padding:"8px 4px",borderRadius:10,border:"2px solid "+(appSettings.lang===lang.v?C.red:C.lightGray),background:appSettings.lang===lang.v?"rgba(200,16,46,0.06)":"white",color:appSettings.lang===lang.v?C.red:C.gray,fontSize:12,fontWeight:appSettings.lang===lang.v?700:500,cursor:"pointer"}}>
                        {lang.l}
                      </button>
                    );
                  })}
                </div>
              </div>
              {[{k:"darkMode",l:"מצב כהה",sub:"ממשק בצבעים כהים"},{k:"accessibility",l:"נגישות",sub:"גדל טקסט, ניגודיות"}].map(function(s){
                return(
                  <div key={s.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:"1px solid "+C.ultra}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{s.l}</div>
                      <div style={{fontSize:11,color:C.gray}}>{s.sub}</div>
                    </div>
                    <div onClick={function(){ setAppSettings(function(p){ return Object.assign({},p,{[s.k]:!p[s.k]}); }); }}
                      style={{width:44,height:24,borderRadius:12,background:appSettings[s.k]?C.red:"rgba(100,116,139,0.25)",position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0}}>
                      <div style={{position:"absolute",width:20,height:20,background:"white",borderRadius:"50%",top:2,left:appSettings[s.k]?2:22,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{marginTop:16,padding:"12px 14px",background:"rgba(200,16,46,0.05)",borderRadius:12,fontSize:12,color:C.gray,textAlign:"center"}}>
                גרסה 1.0.0 • Yougo © 2026
              </div>
            </div>
          </div>
        </div>
      )}

    </PageWrap>
  );
}

// ── MY ORDERS PAGE ההזמנות שלי ────────────────────────────────────────────────
function MyOrdersPage({onBack,cartCount,setView}){
  var [activeTab,setActiveTab] = useState("all");

  var orders = [
    {id:"#18541",rest:"ורונה קריספי",logo:"Verona",color:"#C8102E",date:"היום 18:42",items:"המבורגר קריספי, כנפי עוף",total:93,status:"הושלם",sc:C.green},
    {id:"#18520",rest:"לימון פרש",logo:"Lemon",color:"#F59E0B",date:"אתמול 14:10",items:"מיץ לימון עם נענע x2",total:56,status:"הושלם",sc:C.green},
    {id:"#18498",rest:"וואלה קריספי",logo:"Wala",color:"#F5A623",date:"09/03 20:30",items:"שווארמה עוף, טורטייה שווארמה",total:67,status:"הושלם",sc:C.green},
    {id:"#18476",rest:"סושי טיים",logo:"SushiTime",color:"#1D3557",date:"08/03 13:15",items:"רול סלמון, קליפורניה רול",total:97,status:"בוטל",sc:"#EF4444"},
    {id:"#18445",rest:"קאקאו קרמיאל",logo:"Kakao",color:"#6B3F1A",date:"06/03 11:00",items:"לאטה קרמל, עוגת שוקולד",total:52,status:"הושלם",sc:C.green},
    {id:"#18390",rest:"פפרוני פיצה",logo:"Peperoni",color:"#E63946",date:"03/03 19:45",items:"פיצה פפרוני, פיצה ירקות",total:145,status:"הושלם",sc:C.green},
  ];

  var tabs = ["all","active","done","cancelled"];
  var tabLabels = {all:"הכל",active:"פעיל",done:"הושלם",cancelled:"בוטל"};
  var filtered = orders.filter(function(o){
    if(activeTab==="all") return true;
    if(activeTab==="done") return o.status==="הושלם";
    if(activeTab==="cancelled") return o.status==="בוטל";
    if(activeTab==="active") return o.status==="בדרך"||o.status==="בהכנה";
    return true;
  });

  return(
    <PageWrap title="ההזמנות שלי" onBack={onBack} cartCount={cartCount} setView={setView}>
      {/* Tabs */}
      <div style={{background:C.white,display:"flex",padding:"0 16px",borderBottom:"1px solid "+C.lightGray,gap:4}}>
        {tabs.map(function(t){
          var active = activeTab===t;
          return(
            <button key={t} onClick={function(){ setActiveTab(t); }}
              style={{background:"none",border:"none",padding:"12px 12px 10px",fontSize:12,fontWeight:active?700:500,color:active?C.red:C.gray,borderBottom:active?"2.5px solid "+C.red:"2.5px solid transparent",cursor:"pointer"}}>
              {tabLabels[t]}
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"60px 0",color:C.gray}}>
            <IcoOrders s={52} c={C.lightGray}/>
            <div style={{fontSize:14,marginTop:12,fontWeight:600}}>אין הזמנות</div>
          </div>
        )}
        {filtered.map(function(o,i){
          var Logo = LOGO_MAP[o.logo];
          return(
            <div key={o.id} style={{background:C.white,borderRadius:20,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",animation:"fadeIn .35s ease "+(i*60)+"ms both"}}>
              {/* Header */}
              <div style={{background:"linear-gradient(135deg,"+hexA(o.color,"18")+","+hexA(o.color,"35")+")",padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:46,height:46,borderRadius:13,overflow:"hidden",background:hexA(o.color,"22"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Logo size={38}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:14,color:C.dark}}>{o.rest}</div>
                  <div style={{fontSize:11,color:C.gray,marginTop:1,display:"flex",alignItems:"center",gap:4}}>
                    <IcoClock s={11}/>{o.date}
                  </div>
                </div>
                <span style={{background:hexA(o.sc,"22"),color:o.sc,borderRadius:20,padding:"4px 11px",fontSize:11,fontWeight:800}}>{o.status}</span>
              </div>
              {/* Body */}
              <div style={{padding:"12px 14px"}}>
                <div style={{fontSize:12,color:C.gray,marginBottom:8,display:"flex",alignItems:"flex-start",gap:5}}>
                  <IcoFork s={12} c={C.gray}/>{o.items}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:16,fontWeight:900,color:C.red}}>₪{o.total}</div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{background:C.ultra,color:C.dark,border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                      פרטים
                    </button>
                    {o.status==="הושלם" && (
                      <button style={{background:C.red,color:"white",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                        <IcoPlus s={11}/> הזמן שוב
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

// ── CART PAGE העגלה שלי ────────────────────────────────────────────────────────
function CartPage({cart,add,rem,onBack,setCart,cartCount,setView}){
  var total = cart.reduce(function(s,c){ return s+c.price*c.qty; },0);
  var fee = total>0 ? (total>=150 ? 0 : 12) : 0;
  var [promo,setPromo] = useState("");
  var [promoApplied,setPromoApplied] = useState(false);
  var discount = promoApplied ? Math.round(total*0.1) : 0;
  var finalTotal = total + fee - discount;

  function applyPromo(){
    if(promo.toUpperCase()==="NAAT10") setPromoApplied(true);
  }

  return(
    <PageWrap title="העגלה שלי" onBack={onBack} cartCount={cartCount} setView={setView}>
      {cart.length===0 ? (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px",textAlign:"center"}}>
          <div style={{width:100,height:100,borderRadius:"50%",background:C.ultra,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
            <IcoCart s={44} c={C.lightGray}/>
          </div>
          <div style={{fontSize:18,fontWeight:900,color:C.dark}}>העגלה ריקה</div>
          <div style={{fontSize:13,color:C.gray,marginTop:8}}>הוסף מנות מהמסעדות האהובות שלך</div>
          <button onClick={onBack} style={{marginTop:22,background:C.red,color:"white",border:"none",borderRadius:22,padding:"13px 30px",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(200,16,46,0.35)"}}>
            גלה מסעדות
          </button>
        </div>
      ) : (
        <div style={{padding:"12px 16px"}}>
          {/* Items */}
          <div style={{background:C.white,borderRadius:20,padding:"6px 4px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,padding:"10px 12px 6px",display:"flex",alignItems:"center",gap:7}}>
              <IcoFork s={15} c={C.red}/> פריטים ({cartCount})
            </div>
            {cart.map(function(item,i){
              return(
                <div key={item.id+"-"+item.rid}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 12px",borderTop:i>0?"1px solid "+C.ultra:"none"}}>
                  <div style={{width:50,height:50,borderRadius:14,background:C.ultra,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
                    <IcoFork s={24} c={C.red}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                    <div style={{fontSize:11,color:C.gray,marginTop:1}}>{item.rname}</div>
                    <div style={{fontSize:14,fontWeight:900,color:C.red,marginTop:3}}>₪{item.price}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
                    <button onClick={function(){ rem(item.id,item.rid); }}
                      style={{width:30,height:30,borderRadius:"50%",background:C.ultra,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <IcoMinus s={13}/>
                    </button>
                    <span style={{fontWeight:900,fontSize:15,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={function(){ add({id:item.id,name:item.name,price:item.price},{id:item.rid,name:item.rname}); }}
                      style={{width:30,height:30,borderRadius:"50%",background:C.red,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <IcoPlus s={13}/>
                    </button>
                  </div>
                </div>
              );
            })}
            <div style={{padding:"8px 12px"}}>
              <button onClick={function(){ setCart([]); }}
                style={{color:"#EF4444",background:"rgba(239,68,68,0.07)",border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                <IcoTrash s={12}/> נקה עגלה
              </button>
            </div>
          </div>

          {/* Delivery info */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
              <IcoPin s={15} c={C.red}/> כתובת משלוח
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,background:C.ultra,borderRadius:12,padding:"11px 13px"}}>
              <IcoHome s={18} c={C.red}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.dark}}>בית</div>
                <div style={{fontSize:11,color:C.gray}}>אלפורסאן 0, ראמה</div>
              </div>
              <button style={{background:"none",border:"none",color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>
                <IcoEdit s={12} c={C.blue}/> שנה
              </button>
            </div>
          </div>

          {/* Promo code */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:7}}>
              <IcoGift s={15} c={C.red}/> קוד קופון
            </div>
            {promoApplied ? (
              <div style={{background:"rgba(16,185,129,0.1)",borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:8}}>
                <IcoCheck s={16} c={C.green}/>
                <div>
                  <div style={{color:C.green,fontWeight:700,fontSize:13}}>קופון NAAT10 הופעל!</div>
                  <div style={{color:C.green,fontSize:11,marginTop:1}}>10% הנחה - חסכת ₪{discount}</div>
                </div>
              </div>
            ) : (
              <div style={{display:"flex",gap:8}}>
                <input value={promo} onChange={function(e){ setPromo(e.target.value); }}
                  placeholder="הכנס קוד קופון..."
                  style={{flex:1,border:"1.5px solid "+C.lightGray,borderRadius:12,padding:"10px 13px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif"}}/>
                <button onClick={applyPromo}
                  style={{background:C.red,color:"white",border:"none",borderRadius:12,padding:"10px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  החל
                </button>
              </div>
            )}
            <div style={{fontSize:10,color:C.gray,marginTop:6}}>נסה: NAAT10 לקבלת 10% הנחה</div>
          </div>

          {/* Summary */}
          <div style={{background:C.white,borderRadius:20,padding:"16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:12,display:"flex",alignItems:"center",gap:7}}>
              <IcoOrders s={15} c={C.red}/> סיכום הזמנה
            </div>
            {[
              {l:"סכום מוצרים",v:"₪"+total},
              {l:"דמי משלוח",v:fee===0?"חינם":"₪"+fee,vColor:fee===0?C.green:C.dark},
              promoApplied && {l:"הנחה (NAAT10)",v:"-₪"+discount,vColor:C.green},
            ].filter(Boolean).map(function(row,i){
              return(
                <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.gray,marginBottom:8}}>
                  <span>{row.l}</span>
                  <span style={{fontWeight:600,color:row.vColor||C.dark}}>{row.v}</span>
                </div>
              );
            })}
            {fee===0 && total>0 && (
              <div style={{background:"rgba(16,185,129,0.08)",borderRadius:10,padding:"6px 10px",marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
                <IcoCheck s={12} c={C.green}/>
                <span style={{fontSize:11,color:C.green,fontWeight:600}}>זכית במשלוח חינם!</span>
              </div>
            )}
            {fee>0 && total<150 && (
              <div style={{background:"rgba(245,166,35,0.08)",borderRadius:10,padding:"6px 10px",marginBottom:8}}>
                <span style={{fontSize:11,color:C.gold,fontWeight:600}}>הוסף ₪{150-total} לקבלת משלוח חינם</span>
              </div>
            )}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:17,fontWeight:900,color:C.dark,borderTop:"2px solid "+C.ultra,paddingTop:12,marginTop:4}}>
              <span>סה"כ לתשלום</span>
              <span style={{color:C.red}}>₪{finalTotal}</span>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{background:C.white,borderRadius:20,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10}}>אמצעי תשלום</div>
            {[{l:"כרטיס אשראי",sub:"**** **** **** 4521",I:IcoShield,c:"#1D3557"},
              {l:"Google Pay",sub:"מוכן לשימוש",I:IcoCheck,c:C.green},
              {l:"תשלום במזומן",sub:"בעת המסירה",I:IcoCart,c:C.gold}].map(function(p,i){
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<2?"1px solid "+C.ultra:"none",cursor:"pointer"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:hexA(p.c,"18"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <p.I s={18} c={p.c}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{p.l}</div>
                    <div style={{fontSize:11,color:C.gray}}>{p.sub}</div>
                  </div>
                  <div style={{width:20,height:20,borderRadius:"50%",border:"2px solid "+(i===0?C.red:C.lightGray),display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {i===0 && <div style={{width:10,height:10,borderRadius:"50%",background:C.red}}/>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm button */}
          <button style={{width:"100%",background:"linear-gradient(135deg,#C8102E,#9B0B22)",color:"white",border:"none",borderRadius:22,padding:"16px",fontSize:15,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 24px rgba(200,16,46,0.4)",marginBottom:8}}>
            <IcoCheck s={18}/> אישור הזמנה — ₪{finalTotal}
          </button>
          <div style={{textAlign:"center",fontSize:11,color:C.gray,marginBottom:8}}>
            ההזמנה תגיע תוך 20-30 דקות
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── AUTH FLOW ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function AuthFlow({onDone}){
  // steps: "splash" -> "phone" -> "otp" -> "register" -> "done"
  var [step,setStep] = useState("splash");
  var [phone,setPhone] = useState("");
  var [otp,setOtp] = useState(["","","","",""]);
  var [otpError,setOtpError] = useState(false);
  var [countdown,setCountdown] = useState(60);
  var [canResend,setCanResend] = useState(false);
  var [phoneError,setPhoneError] = useState("");
  var [form,setForm] = useState({firstName:"",lastName:"",gender:"",age:""});
  var [formErrors,setFormErrors] = useState({});
  var [loading,setLoading] = useState(false);
  var [success,setSuccess] = useState(false);

  // Fake OTP code
  var FAKE_CODE = "12345";

  // Countdown timer for OTP
  useEffect(function(){
    if(step!=="otp") return;
    setCountdown(60); setCanResend(false);
    var t = setInterval(function(){
      setCountdown(function(p){
        if(p<=1){ clearInterval(t); setCanResend(true); return 0; }
        return p-1;
      });
    },1000);
    return function(){ clearInterval(t); };
  },[step]);

  // Auto-advance splash
  useEffect(function(){
    if(step!=="splash") return;
    var t = setTimeout(function(){ setStep("phone"); },2600);
    return function(){ clearTimeout(t); };
  },[step]);

  function handlePhoneSubmit(){
    var cleaned = phone.replace(/\D/g,"");
    if(cleaned.length < 9){ setPhoneError("יש להזין מספר טלפון תקין"); return; }
    setPhoneError("");
    setLoading(true);
    setTimeout(function(){ setLoading(false); setStep("otp"); }, 1200);
  }

  function handleOtpChange(idx,val){
    if(!/^\d*$/.test(val)) return;
    var next = otp.slice();
    next[idx] = val.slice(-1);
    setOtp(next);
    setOtpError(false);
    if(val && idx<4){
      var el = document.getElementById("otp-"+( idx+1));
      if(el) el.focus();
    }
    // Auto-verify
    var code = next.join("");
    if(code.length===5){
      setTimeout(function(){
        if(code===FAKE_CODE){
          setLoading(true);
          setTimeout(function(){ setLoading(false); setStep("register"); },800);
        } else {
          setOtpError(true);
          setOtp(["","","","",""]);
          setTimeout(function(){ var el=document.getElementById("otp-0"); if(el) el.focus(); },100);
        }
      },300);
    }
  }

  function handleOtpKey(idx,e){
    if(e.key==="Backspace" && !otp[idx] && idx>0){
      var el = document.getElementById("otp-"+(idx-1));
      if(el) el.focus();
    }
  }

  function validateForm(){
    var errs = {};
    if(!form.firstName.trim()) errs.firstName = "שדה חובה";
    if(!form.lastName.trim()) errs.lastName = "שדה חובה";
    if(!form.gender) errs.gender = "שדה חובה";
    var age = parseInt(form.age);
    if(!form.age || isNaN(age) || age<13 || age>100) errs.age = "גיל לא תקין (13-100)";
    return errs;
  }

  function handleRegister(){
    var errs = validateForm();
    if(Object.keys(errs).length>0){ setFormErrors(errs); return; }
    setLoading(true);
    setTimeout(function(){
      setLoading(false);
      setSuccess(true);
      setTimeout(function(){
        onDone({name:form.firstName+" "+form.lastName, phone:phone, gender:form.gender, age:form.age});
      },1600);
    },1000);
  }

  // ── SPLASH ─────────────────────────────────────────────────────────────────
  if(step==="splash"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:"linear-gradient(160deg,#C8102E 0%,#7B0D1E 60%,#3D0511 100%)",minHeight:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",direction:"rtl"}}>
        {/* Background circles */}
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)",top:-100,left:-100}}/>
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.08)",bottom:-80,right:-80}}/>
        <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.04)",top:"30%",left:"60%"}}/>

        {/* Logo */}
        <div style={{animation:"splashPop .7s cubic-bezier(.34,1.56,.64,1) both"}}>
          <YougoLogo size={100}/>
        </div>
        <div style={{color:"white",fontSize:38,fontWeight:900,marginTop:16,letterSpacing:2,animation:"splashPop .7s .15s cubic-bezier(.34,1.56,.64,1) both"}}>
          NAAT
        </div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:15,marginTop:6,animation:"splashFade 1s .4s both"}}>
          הכל מגיע אליך
        </div>

        {/* Tagline icons */}
        <div style={{display:"flex",gap:24,marginTop:40,animation:"splashFade 1s .6s both"}}>
          {[{I:IcoFork,l:"מסעדות"},{I:IcoStore,l:"מרקט"},{I:IcoTruck,l:"משלוח מהיר"}].map(function(x,i){
            return(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{width:52,height:52,borderRadius:16,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <x.I s={24} c="white"/>
                </div>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{x.l}</span>
              </div>
            );
          })}
        </div>

        {/* Loading dots */}
        <div style={{position:"absolute",bottom:60,display:"flex",gap:8}}>
          {[0,1,2].map(function(i){
            return(<div key={i} style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,255,255,"+(i===0?0.9:0.35)+")",animation:"dotPulse 1.2s "+(i*0.2)+"s infinite"}}/>);
          })}
        </div>

        <style>{`
          @keyframes splashPop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
          @keyframes splashFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
          @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
          *{box-sizing:border-box}
        `}</style>
      </div>
    );
  }

  // ── PHONE STEP ─────────────────────────────────────────────────────────────
  if(step==="phone"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",display:"flex",flexDirection:"column"}}>
        {/* Top wave */}
        <div style={{background:"linear-gradient(160deg,#C8102E,#9B0B22)",padding:"40px 24px 60px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:-30,left:0,right:0,height:60,background:C.bg,borderRadius:"50% 50% 0 0"}}/>
          <div style={{position:"absolute",right:-40,top:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
          <div style={{marginBottom:16}}><YougoLogo size={44}/></div>
          <div style={{color:"white",fontSize:26,fontWeight:900,lineHeight:1.2}}>ברוך הבא!</div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:6}}>הזן את מספר הטלפון שלך להמשך</div>
        </div>

        <div style={{flex:1,padding:"30px 24px"}}>
          <div style={{fontSize:13,color:C.gray,marginBottom:6,fontWeight:600}}>מספר טלפון</div>
          <div style={{display:"flex",gap:10,marginBottom:4}}>
            {/* Country code */}
            <div style={{background:C.white,border:"1.5px solid "+C.lightGray,borderRadius:14,padding:"13px 14px",display:"flex",alignItems:"center",gap:6,flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
              <span style={{fontSize:18}}>🇮🇱</span>
              <span style={{fontSize:13,fontWeight:700,color:C.dark}}>+972</span>
            </div>
            <input
              value={phone}
              onChange={function(e){ setPhone(e.target.value); setPhoneError(""); }}
              onKeyDown={function(e){ if(e.key==="Enter") handlePhoneSubmit(); }}
              placeholder="05X-XXX-XXXX"
              maxLength={12}
              style={{flex:1,background:C.white,border:"1.5px solid "+(phoneError?C.red:C.lightGray),borderRadius:14,padding:"13px 16px",fontSize:16,outline:"none",direction:"ltr",textAlign:"left",fontFamily:"Arial,sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",color:C.dark,letterSpacing:1}}
            />
          </div>
          {phoneError && (
            <div style={{color:C.red,fontSize:12,marginBottom:12,display:"flex",alignItems:"center",gap:4}}>
              <IcoClose s={11} c={C.red}/>{phoneError}
            </div>
          )}
          <div style={{color:C.gray,fontSize:11,marginBottom:28,marginTop:8}}>
            נשלח לך קוד אימות ב-SMS לאישור זהותך
          </div>

          <button onClick={handlePhoneSubmit} disabled={loading}
            style={{width:"100%",background:loading?"rgba(200,16,46,0.5)":C.red,color:"white",border:"none",borderRadius:16,padding:"15px",fontSize:15,fontWeight:900,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 20px rgba(200,16,46,0.35)",transition:"all .2s"}}>
            {loading ? (
              <><LoadSpinner/> שולח קוד...</>
            ) : (
              <><IcoCheck s={18}/> המשך</>
            )}
          </button>

          {/* Divider */}
          <div style={{display:"flex",alignItems:"center",gap:10,margin:"24px 0"}}>
            <div style={{flex:1,height:1,background:C.lightGray}}/>
            <span style={{color:C.gray,fontSize:12}}>או המשך עם</span>
            <div style={{flex:1,height:1,background:C.lightGray}}/>
          </div>

          {/* Social buttons */}
          <button onClick={function(){ setLoading(true); setTimeout(function(){ setLoading(false); onDone({name:"משתמש Google",phone:phone||"050-0000000",gender:"",age:"",authMethod:"google"}); },1000); }}
            style={{width:"100%",background:"white",color:C.dark,border:"1.5px solid "+C.lightGray,borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.3 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.9 6.1C12.5 13.1 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/><path fill="#FBBC05" d="M10.6 28.6C10.2 27.5 10 26.3 10 25s.2-2.5.6-3.6L2.7 15.3C1 18.4 0 21.6 0 25s1 6.6 2.7 9.7l7.9-6.1z"/><path fill="#34A853" d="M24 50c6.2 0 11.5-2 15.3-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-3.6-13.4-8.8l-7.9 6.1C6.7 44.6 14.7 50 24 50z"/></svg>
            המשך עם Google
          </button>
          <button onClick={function(){ setLoading(true); setTimeout(function(){ setLoading(false); onDone({name:"משתמש Apple",phone:phone||"050-0000000",gender:"",age:"",authMethod:"apple"}); },1000); }}
            style={{width:"100%",background:"#000",color:"white",border:"none",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <svg width="18" height="22" viewBox="0 0 814 1000"><path fill="white" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.1 269-317.1 70.6 0 133.1 46.5 178.8 46.5 43.6 0 113-49.2 192.4-49.2 30.8 0 110.7 2.6 165.7 78.8zm-170.5-276c28.7-35 49.7-83.4 49.7-131.8 0-6.7-.6-13.5-1.9-19.5-46.8 1.9-101.8 31.3-134.7 69.4-25.3 28.7-49.7 74-49.7 123.1 0 7.4 1.3 14.9 1.9 17.2 3.2.6 8.4 1.3 13.6 1.3 43 0 95.6-27.7 121.1-60.7z"/></svg>
            המשך עם Apple
          </button>

          <div style={{textAlign:"center",color:C.gray,fontSize:11,marginTop:16,lineHeight:1.6}}>
            בהמשך אתה מסכים ל<span style={{color:C.red,fontWeight:700}}>תנאי השימוש</span> ול<span style={{color:C.red,fontWeight:700}}>מדיניות הפרטיות</span> של Yougo
          </div>
        </div>
        <style>{`*{box-sizing:border-box}`}</style>
      </div>
    );
  }

  // ── OTP STEP ───────────────────────────────────────────────────────────────
  if(step==="otp"){
    return(
      <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:"linear-gradient(160deg,#C8102E,#9B0B22)",padding:"40px 24px 60px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:-30,left:0,right:0,height:60,background:C.bg,borderRadius:"50% 50% 0 0"}}/>
          <button onClick={function(){ setStep("phone"); setOtp(["","","","",""]); setOtpError(false); }}
            style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:16}}>
            <IcoBack s={18} c="white"/>
          </button>
          <div style={{color:"white",fontSize:26,fontWeight:900}}>אימות מספר</div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:6}}>
            שלחנו קוד אימות ל-<span style={{fontWeight:700,direction:"ltr",display:"inline-block"}}>{phone}</span>
          </div>
        </div>

        <div style={{flex:1,padding:"30px 24px"}}>
          <div style={{fontSize:14,color:C.dark,fontWeight:700,marginBottom:20,textAlign:"center"}}>
            הזן את הקוד בן 5 הספרות
          </div>

          {/* OTP boxes */}
          <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:8,direction:"ltr"}}>
            {otp.map(function(digit,idx){
              return(
                <input
                  key={idx}
                  id={"otp-"+idx}
                  value={digit}
                  onChange={function(e){ handleOtpChange(idx,e.target.value); }}
                  onKeyDown={function(e){ handleOtpKey(idx,e); }}
                  maxLength={1}
                  style={{
                    width:52,height:60,textAlign:"center",fontSize:24,fontWeight:900,
                    border:"2px solid "+(otpError?C.red:digit?C.red:C.lightGray),
                    borderRadius:14,outline:"none",
                    background:digit?"rgba(200,16,46,0.05)":C.white,
                    color:otpError?"#EF4444":C.dark,
                    fontFamily:"Arial,sans-serif",
                    transition:"all .15s",
                    boxShadow:digit?"0 2px 10px rgba(200,16,46,0.15)":"none"
                  }}
                />
              );
            })}
          </div>

          {/* Error message */}
          {otpError && (
            <div style={{textAlign:"center",color:"#EF4444",fontSize:13,fontWeight:600,marginBottom:12,animation:"shake .4s ease"}}>
              הקוד שגוי, נסה שוב
            </div>
          )}

          {/* Loading spinner */}
          {loading && (
            <div style={{textAlign:"center",marginBottom:16}}>
              <LoadSpinner size={24} color={C.red}/>
            </div>
          )}

          {/* Hint */}
          <div style={{textAlign:"center",color:C.gray,fontSize:12,marginBottom:24}}>
            לצורך הדגמה, הקוד הוא: <span style={{fontWeight:900,color:C.red,letterSpacing:2}}>12345</span>
          </div>

          {/* Resend */}
          <div style={{textAlign:"center",marginBottom:24}}>
            {canResend ? (
              <button onClick={function(){ setStep("otp"); setOtp(["","","","",""]); }}
                style={{background:"none",border:"none",color:C.red,fontSize:13,fontWeight:700,cursor:"pointer",textDecoration:"underline"}}>
                שלח קוד חדש
              </button>
            ) : (
              <div style={{color:C.gray,fontSize:12}}>
                שלח קוד חדש בעוד{" "}
                <span style={{color:C.red,fontWeight:700}}>{countdown}</span>
                {" "}שניות
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:12}}>
            {["טלפון","אימות","פרטים"].map(function(s,i){
              var done = i<1 || (i===1 && false);
              var active = i===1;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:i<1?C.green:active?C.red:C.lightGray,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
                      {i<1 ? <IcoCheck s={14} c="white"/> : <span style={{color:"white",fontSize:11,fontWeight:800}}>{i+1}</span>}
                    </div>
                    <span style={{fontSize:9,color:active?C.red:C.gray,fontWeight:active?700:400}}>{s}</span>
                  </div>
                  {i<2 && <div style={{width:30,height:2,background:i<1?C.green:C.lightGray,marginBottom:16,transition:"all .3s"}}/>}
                </div>
              );
            })}
          </div>
        </div>
        <style>{`*{box-sizing:border-box}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
      </div>
    );
  }

  // ── REGISTER STEP ──────────────────────────────────────────────────────────
  if(step==="register"){
    if(success){
      return(
        <div style={{fontFamily:"Arial,sans-serif",background:"linear-gradient(160deg,#C8102E,#7B0D1E)",minHeight:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",direction:"rtl"}}>
          <div style={{animation:"successPop .6s cubic-bezier(.34,1.56,.64,1)"}}>
            <div style={{width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,marginLeft:"auto",marginRight:"auto"}}>
              <IcoCheck s={50} c="white"/>
            </div>
          </div>
          <div style={{color:"white",fontSize:26,fontWeight:900,marginTop:4,animation:"splashFade .5s .2s both"}}>
            ברוך הבא, {form.firstName}!
          </div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:8,animation:"splashFade .5s .35s both"}}>
            החשבון שלך נוצר בהצלחה
          </div>
          <div style={{marginTop:24,animation:"splashFade .5s .5s both"}}>
            <YougoLogo size={60}/>
          </div>
          <style>{`@keyframes successPop{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:scale(1)}}@keyframes splashFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}`}</style>
        </div>
      );
    }

    return(
      <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:"linear-gradient(160deg,#C8102E,#9B0B22)",padding:"36px 24px 55px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:-30,left:0,right:0,height:60,background:C.bg,borderRadius:"50% 50% 0 0"}}/>
          <button onClick={function(){ setStep("otp"); }}
            style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:16}}>
            <IcoBack s={18} c="white"/>
          </button>
          <div style={{color:"white",fontSize:26,fontWeight:900}}>כמעט סיימנו!</div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:6}}>ספר לנו קצת על עצמך</div>
        </div>

        <div style={{flex:1,padding:"28px 24px",overflowY:"auto"}}>
          {/* Progress */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}}>
            {["טלפון","אימות","פרטים"].map(function(s,i){
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:i<2?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {i<2 ? <IcoCheck s={14} c="white"/> : <span style={{color:"white",fontSize:11,fontWeight:800}}>3</span>}
                    </div>
                    <span style={{fontSize:9,color:i===2?C.red:C.gray,fontWeight:i===2?700:400}}>{s}</span>
                  </div>
                  {i<2 && <div style={{width:30,height:2,background:C.green,marginBottom:16}}/>}
                </div>
              );
            })}
          </div>

          {/* Avatar picker */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{position:"relative"}}>
              <div style={{width:84,height:84,borderRadius:"50%",background:"linear-gradient(135deg,#C8102E,#7B0D1E)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 20px rgba(200,16,46,0.35)"}}>
                <IcoUser s={40} c="white"/>
              </div>
              <div style={{position:"absolute",bottom:0,left:0,width:26,height:26,borderRadius:"50%",background:C.red,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <IcoEdit s={12} c="white"/>
              </div>
            </div>
          </div>

          {/* Name fields */}
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            {[{l:"שם פרטי",k:"firstName",ph:"כגון: חמדאן"},{l:"שם משפחה",k:"lastName",ph:"כגון: אחמד"}].map(function(f){
              return(
                <div key={f.k} style={{flex:1}}>
                  <div style={{fontSize:12,color:C.gray,fontWeight:600,marginBottom:5}}>{f.l} *</div>
                  <input value={form[f.k]}
                    onChange={function(e){ var v=e.target.value; setForm(function(p){ return Object.assign({},p,{[f.k]:v}); }); setFormErrors(function(p){ return Object.assign({},p,{[f.k]:""}); }); }}
                    placeholder={f.ph}
                    style={{width:"100%",background:C.white,border:"1.5px solid "+(formErrors[f.k]?C.red:C.lightGray),borderRadius:13,padding:"12px 13px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}/>
                  {formErrors[f.k] && <div style={{color:C.red,fontSize:10,marginTop:3}}>{formErrors[f.k]}</div>}
                </div>
              );
            })}
          </div>

          {/* Gender */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12,color:C.gray,fontWeight:600,marginBottom:8}}>מגדר *</div>
            <div style={{display:"flex",gap:10}}>
              {[{v:"male",l:"זכר",I:function(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="14" r="6" stroke="currentColor" strokeWidth="2"/><path d="M15 9l5-5M20 4h-5M20 4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}},
                {v:"female",l:"נקבה",I:function(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="2"/><path d="M12 16v6M9 19h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}},
                {v:"other",l:"אחר",I:function(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/></svg>);}}
              ].map(function(g){
                var sel = form.gender===g.v;
                return(
                  <button key={g.v} onClick={function(){ setForm(function(p){ return Object.assign({},p,{gender:g.v}); }); setFormErrors(function(p){ return Object.assign({},p,{gender:""}); }); }}
                    style={{flex:1,padding:"12px 8px",borderRadius:14,border:"2px solid "+(sel?C.red:C.lightGray),background:sel?"rgba(200,16,46,0.06)":C.white,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:sel?C.red:C.gray,transition:"all .15s"}}>
                    <g.I/>
                    <span style={{fontSize:12,fontWeight:sel?700:500}}>{g.l}</span>
                  </button>
                );
              })}
            </div>
            {formErrors.gender && <div style={{color:C.red,fontSize:10,marginTop:4}}>{formErrors.gender}</div>}
          </div>

          {/* Age */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:12,color:C.gray,fontWeight:600,marginBottom:5}}>גיל *</div>
            <div style={{position:"relative"}}>
              <input
                value={form.age}
                onChange={function(e){ var v=e.target.value.replace(/\D/g,""); setForm(function(p){ return Object.assign({},p,{age:v}); }); setFormErrors(function(p){ return Object.assign({},p,{age:""}); }); }}
                placeholder="הזן גיל (13-100)"
                maxLength={3}
                style={{width:"100%",background:C.white,border:"1.5px solid "+(formErrors.age?C.red:C.lightGray),borderRadius:13,padding:"12px 13px",fontSize:14,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}/>
              <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:C.gray,fontSize:13}}>
                שנים
              </div>
            </div>
            {formErrors.age && <div style={{color:C.red,fontSize:10,marginTop:3}}>{formErrors.age}</div>}
          </div>

          {/* Terms */}
          <div style={{background:C.ultra,borderRadius:14,padding:"12px 14px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
            <IcoShield s={18} c={C.red}/>
            <div style={{fontSize:11,color:C.gray,lineHeight:1.6}}>
              המידע שלך מאובטח ולא יועבר לצדדים שלישיים. ראה את <span style={{color:C.red,fontWeight:700}}>מדיניות הפרטיות</span> שלנו.
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleRegister} disabled={loading}
            style={{width:"100%",background:loading?"rgba(200,16,46,0.5)":C.red,color:"white",border:"none",borderRadius:16,padding:"15px",fontSize:15,fontWeight:900,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 20px rgba(200,16,46,0.35)",transition:"all .2s"}}>
            {loading ? (
              <><LoadSpinner/> יוצר חשבון...</>
            ) : (
              <><IcoCheck s={18}/> יצירת חשבון</>
            )}
          </button>
        </div>
        <style>{`*{box-sizing:border-box}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  return null;
}

// ── LOADING SPINNER ────────────────────────────────────────────────────────────
function LoadSpinner({size=18,color="white"}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{animation:"spin .8s linear infinite"}}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round"/>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── CARDS PAGE כרטיסים ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function CardsPage({onBack}){
  var [cards,setCards] = useState([
    {id:1,type:"visa",num:"4521",name:"חמדאן",exp:"12/28",color:"linear-gradient(135deg,#1D3557,#457B9D)",default:true},
  ]);
  var [showAdd,setShowAdd] = useState(false);
  var [addType,setAddType] = useState("credit");
  var [newCard,setNewCard] = useState({num:"",name:"",exp:"",cvv:""});
  var [cardErrors,setCardErrors] = useState({});
  var [showDelete,setShowDelete] = useState(null);

  var digitalWallets = [
    {id:"applepay",  label:"Apple Pay",  bg:"#000",  textColor:"white",
     logo:(<svg width="20" height="24" viewBox="0 0 814 1000"><path fill="white" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.1 269-317.1 70.6 0 133.1 46.5 178.8 46.5 43.6 0 113-49.2 192.4-49.2 30.8 0 110.7 2.6 165.7 78.8zm-170.5-276c28.7-35 49.7-83.4 49.7-131.8 0-6.7-.6-13.5-1.9-19.5-46.8 1.9-101.8 31.3-134.7 69.4-25.3 28.7-49.7 74-49.7 123.1 0 7.4 1.3 14.9 1.9 17.2 3.2.6 8.4 1.3 13.6 1.3 43 0 95.6-27.7 121.1-60.7z"/></svg>)},
    {id:"googlepay", label:"Google Pay", bg:"white", textColor:"#3C4043", border:"1.5px solid #E0E0E0",
     logo:(<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.3 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.9 6.1C12.5 13.1 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/><path fill="#FBBC05" d="M10.6 28.6C10.2 27.5 10 26.3 10 25s.2-2.5.6-3.6L2.7 15.3C1 18.4 0 21.6 0 25s1 6.6 2.7 9.7l7.9-6.1z"/><path fill="#34A853" d="M24 50c6.2 0 11.5-2 15.3-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-3.6-13.4-8.8l-7.9 6.1C6.7 44.6 14.7 50 24 50z"/></svg>)},
    {id:"paypal",    label:"PayPal",     bg:"#003087",textColor:"white",
     logo:(<svg width="20" height="24" viewBox="0 0 24 24" fill="white"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.824l-1.17 7.412h3.44l.803-5.088h2.19c4.302 0 7.29-2.05 8.135-5.119z"/></svg>)},
  ];

  var [connectedWallets,setConnectedWallets] = useState({applepay:false,googlepay:false,paypal:false});

  function formatCardNum(v){
    return v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  }
  function formatExp(v){
    var d = v.replace(/\D/g,"").slice(0,4);
    return d.length>2 ? d.slice(0,2)+"/"+d.slice(2) : d;
  }

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:40}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1D3557,#457B9D)",padding:"44px 20px 28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:150,height:150,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",left:-20,bottom:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:18}}>
          <IcoBack s={18} c="white"/>
        </button>
        <div style={{color:"white",fontSize:24,fontWeight:900}}>כרטיסים ותשלום</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:13,marginTop:4}}>נהל את אמצעי התשלום שלך</div>
      </div>

      <div style={{padding:"16px"}}>
        {/* My Cards */}
        <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <IcoShield s={16} c="#1D3557"/> הכרטיסים שלי
        </div>

        {cards.length===0 ? (
          <div style={{background:C.white,borderRadius:20,padding:"32px",textAlign:"center",boxShadow:"0 1px 8px rgba(0,0,0,0.06)",marginBottom:14}}>
            <div style={{fontSize:48,marginBottom:10}}>💳</div>
            <div style={{fontWeight:700,color:C.dark,fontSize:14}}>אין עדיין כרטיסים</div>
            <div style={{color:C.gray,fontSize:12,marginTop:4}}>הוסף כרטיס לתשלום מהיר</div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:14}}>
            {cards.map(function(card){
              return(
                <div key={card.id} style={{borderRadius:20,padding:"20px 22px",background:card.color,position:"relative",overflow:"hidden",boxShadow:"0 6px 24px rgba(0,0,0,0.18)"}}>
                  <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
                  <div style={{position:"absolute",left:-10,bottom:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      {card.default && <span style={{background:"rgba(255,255,255,0.2)",color:"white",fontSize:9,fontWeight:700,borderRadius:8,padding:"2px 8px",display:"inline-block",marginBottom:8}}>ברירת מחדל</span>}
                      <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,marginTop:4}}>מספר כרטיס</div>
                      <div style={{color:"white",fontSize:17,fontWeight:800,letterSpacing:2,marginTop:2}}>•••• •••• •••• {card.num}</div>
                    </div>
                    <div style={{color:"white",fontSize:22,fontWeight:900,opacity:0.9}}>
                      {card.type==="visa" ? "VISA" : card.type==="mastercard" ? "MC" : "AMEX"}
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:16}}>
                    <div>
                      <div style={{color:"rgba(255,255,255,0.6)",fontSize:10}}>שם בעל הכרטיס</div>
                      <div style={{color:"white",fontWeight:700,fontSize:13,marginTop:2}}>{card.name}</div>
                    </div>
                    <div style={{textAlign:"left"}}>
                      <div style={{color:"rgba(255,255,255,0.6)",fontSize:10}}>תוקף</div>
                      <div style={{color:"white",fontWeight:700,fontSize:13,marginTop:2}}>{card.exp}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:14}}>
                    {!card.default && (
                      <button onClick={function(){ setCards(function(p){ return p.map(function(c){ return Object.assign({},c,{default:c.id===card.id}); }); }); }}
                        style={{background:"rgba(255,255,255,0.15)",color:"white",border:"none",borderRadius:10,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                        הגדר כברירת מחדל
                      </button>
                    )}
                    <button onClick={function(){ setShowDelete(card.id); }}
                      style={{background:"rgba(239,68,68,0.2)",color:"#FCA5A5",border:"none",borderRadius:10,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer",marginRight:"auto",display:"flex",alignItems:"center",gap:4}}>
                      <IcoTrash s={11} c="#FCA5A5"/> הסר
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Card Button */}
        <button onClick={function(){ setShowAdd(true); }}
          style={{width:"100%",background:"rgba(200,16,46,0.06)",color:C.red,border:"1.5px dashed rgba(200,16,46,0.3)",borderRadius:16,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <IcoPlus s={15} c={C.red}/> הוספת כרטיס חדש
        </button>

        {/* Digital Wallets */}
        <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <IcoShield s={16} c={C.green}/> ארנקים דיגיטליים
        </div>
        <div style={{background:C.white,borderRadius:18,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:20}}>
          {digitalWallets.map(function(w,i){
            var connected = connectedWallets[w.id];
            return(
              <div key={w.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderBottom:i<digitalWallets.length-1?"1px solid "+C.ultra:"none"}}>
                <div style={{width:44,height:44,borderRadius:12,background:w.bg,border:w.border||"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {w.logo}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:C.dark}}>{w.label}</div>
                  <div style={{fontSize:11,color:connected?C.green:C.gray,marginTop:1}}>
                    {connected ? "✓ מחובר ופעיל" : "לחץ לחיבור"}
                  </div>
                </div>
                <button onClick={function(){ setConnectedWallets(function(p){ return Object.assign({},p,{[w.id]:!p[w.id]}); }); }}
                  style={{background:connected?"rgba(16,185,129,0.1)":"rgba(200,16,46,0.08)",color:connected?C.green:C.red,border:"none",borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {connected ? "נתק" : "חבר"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Security note */}
        <div style={{background:"linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.04))",borderRadius:14,padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start",border:"1px solid rgba(16,185,129,0.2)"}}>
          <IcoShield s={20} c={C.green}/>
          <div>
            <div style={{fontWeight:700,fontSize:13,color:C.dark,marginBottom:3}}>התשלומים שלך מאובטחים</div>
            <div style={{fontSize:11,color:C.gray,lineHeight:1.6}}>כל פרטי הכרטיסים מוצפנים ומאובטחים בהצפנה PCI DSS רמה 1. איננו שומרים את ה-CVV שלך.</div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={function(){ setShowAdd(false); setNewCard({num:"",name:"",exp:"",cvv:""}); setCardErrors({}); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:"26px 26px 0 0",padding:"22px 20px 40px",direction:"rtl",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:17,fontWeight:900,color:C.dark}}>הוסף כרטיס</div>
              <button onClick={function(){ setShowAdd(false); }} style={{background:C.ultra,border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IcoClose/></button>
            </div>
            {/* Card type tabs */}
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {[{v:"credit",l:"כרטיס אשראי"},{v:"debit",l:"דביט"},{v:"prepaid",l:"נטען"}].map(function(t){
                return(
                  <button key={t.v} onClick={function(){ setAddType(t.v); }}
                    style={{flex:1,padding:"8px",borderRadius:10,border:"2px solid "+(addType===t.v?C.red:C.lightGray),background:addType===t.v?"rgba(200,16,46,0.06)":"white",color:addType===t.v?C.red:C.gray,fontSize:11,fontWeight:addType===t.v?700:500,cursor:"pointer"}}>
                    {t.l}
                  </button>
                );
              })}
            </div>
            {/* Card preview */}
            <div style={{borderRadius:16,padding:"18px 20px",background:"linear-gradient(135deg,#1D3557,#2A5298)",marginBottom:18,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:-20,top:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:10}}>מספר כרטיס</div>
              <div style={{color:"white",fontSize:16,fontWeight:700,letterSpacing:2,marginTop:2}}>
                {newCard.num||"•••• •••• •••• ••••"}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:14}}>
                <div>
                  <div style={{color:"rgba(255,255,255,0.6)",fontSize:9}}>שם בעל הכרטיס</div>
                  <div style={{color:"white",fontSize:12,fontWeight:600,marginTop:1}}>{newCard.name||"שמך כאן"}</div>
                </div>
                <div>
                  <div style={{color:"rgba(255,255,255,0.6)",fontSize:9}}>תוקף</div>
                  <div style={{color:"white",fontSize:12,fontWeight:600,marginTop:1}}>{newCard.exp||"MM/YY"}</div>
                </div>
              </div>
            </div>
            {/* Form fields */}
            {[
              {l:"מספר כרטיס",k:"num",ph:"1234 5678 9012 3456",type:"tel",fmt:formatCardNum},
              {l:"שם בעל הכרטיס",k:"name",ph:"כפי שמופיע על הכרטיס",type:"text",fmt:null},
              {l:"תאריך תוקף",k:"exp",ph:"MM/YY",type:"tel",fmt:formatExp},
              {l:"CVV",k:"cvv",ph:"3 ספרות",type:"tel",fmt:function(v){ return v.replace(/\D/g,"").slice(0,4); }},
            ].map(function(f){
              return(
                <div key={f.k} style={{marginBottom:13}}>
                  <div style={{fontSize:12,color:C.gray,marginBottom:4,fontWeight:600}}>{f.l}</div>
                  <input
                    value={newCard[f.k]}
                    onChange={function(e){ var v = f.fmt ? f.fmt(e.target.value) : e.target.value; setNewCard(function(p){ return Object.assign({},p,{[f.k]:v}); }); }}
                    placeholder={f.ph}
                    type={f.type}
                    style={{width:"100%",border:"1.5px solid "+(cardErrors[f.k]?C.red:C.lightGray),borderRadius:12,padding:"12px 14px",fontSize:14,outline:"none",direction:f.k==="name"?"rtl":"ltr",textAlign:f.k==="name"?"right":"left",fontFamily:"Arial,sans-serif",background:C.white}}/>
                  {cardErrors[f.k] && <div style={{color:C.red,fontSize:10,marginTop:3}}>{cardErrors[f.k]}</div>}
                </div>
              );
            })}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
              <IcoShield s={14} c={C.green}/>
              <span style={{fontSize:11,color:C.gray}}>מאובטח בהצפנה SSL 256-bit</span>
            </div>
            <button onClick={function(){
              var errs={};
              var cleaned = newCard.num.replace(/\s/g,"");
              if(cleaned.length<16) errs.num="מספר כרטיס לא תקין";
              if(!newCard.name.trim()) errs.name="שדה חובה";
              if(newCard.exp.length<5) errs.exp="תוקף לא תקין";
              if(newCard.cvv.length<3) errs.cvv="CVV לא תקין";
              if(Object.keys(errs).length>0){ setCardErrors(errs); return; }
              var last4 = cleaned.slice(-4);
              setCards(function(p){ return p.concat([{id:Date.now(),type:"visa",num:last4,name:newCard.name,exp:newCard.exp,color:"linear-gradient(135deg,#C8102E,#7B0D1E)",default:p.length===0}]); });
              setShowAdd(false); setNewCard({num:"",name:"",exp:"",cvv:""}); setCardErrors({});
            }}
              style={{width:"100%",background:C.red,color:"white",border:"none",borderRadius:14,padding:"14px",fontSize:15,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 16px rgba(200,16,46,0.35)"}}>
              <IcoCheck s={17}/> הוסף כרטיס
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDelete && (
        <div style={{position:"fixed",inset:0,zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div onClick={function(){ setShowDelete(null); }} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
          <div style={{position:"relative",background:"white",borderRadius:22,padding:"26px 22px",width:"100%",maxWidth:360,textAlign:"center"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><IcoTrash s={24} c="#EF4444"/></div>
            <div style={{fontSize:17,fontWeight:900,marginBottom:8}}>הסר כרטיס?</div>
            <div style={{fontSize:13,color:C.gray,marginBottom:20}}>האם אתה בטוח שברצונך להסיר כרטיס זה?</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={function(){ setShowDelete(null); }} style={{flex:1,background:C.ultra,border:"none",borderRadius:12,padding:"11px",fontWeight:700,cursor:"pointer",fontSize:13}}>ביטול</button>
              <button onClick={function(){ setCards(function(p){ return p.filter(function(c){ return c.id!==showDelete; }); }); setShowDelete(null); }} style={{flex:1,background:"#EF4444",color:"white",border:"none",borderRadius:12,padding:"11px",fontWeight:700,cursor:"pointer",fontSize:13}}>הסר</button>
            </div>
          </div>
        </div>
      )}
      <style>{`*{box-sizing:border-box}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── INVITE PAGE הזמינו חברים ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function InvitePage({onBack,user}){
  var name = (user&&user.name)||"חמדאן";
  var refCode = "YOUGO-"+name.replace(/\s/g,"").toUpperCase().slice(0,4)+"30";
  var [copied,setCopied] = useState(false);
  var [invitedCount] = useState(0);
  var [totalEarned] = useState(0);

  function copyCode(){
    setCopied(true);
    setTimeout(function(){ setCopied(false); },2000);
  }

  var steps = [
    {n:1,title:"שתפו את הקישור שלכם",desc:"שלחו לחברים את קישור ההפניה האישי שלכם."},
    {n:2,title:"החבר נרשם דרך הקישור",desc:"החבר חייב ללחוץ על הקישור ולהשלים הרשמה כדי להיות זכאי."},
    {n:3,title:"חבר משלים הרשמה",desc:"החבר מקבל קופון של ₪30 לשימוש בהזמנה הראשונה. סכום מינימלי: ₪80."},
    {n:4,title:"החבר מבצע הזמנה ראשונה",desc:"לאחר שהחבר משלים הזמנה תקפה, תקבלו קופון של ₪30."},
    {n:5,title:"מימוש הקופון",desc:"ניתן לממש את הקופון בהזמנה הבאה לפני תום התוקף (90 ימים)."},
  ];

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:40}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#C8102E,#7B0D1E)",padding:"44px 20px 32px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",left:-20,bottom:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:18}}>
          <IcoBack s={18} c="white"/>
        </button>
        <div style={{fontSize:28,marginBottom:4}}>🎁</div>
        <div style={{color:"white",fontSize:24,fontWeight:900}}>הזמינו חברים</div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:4}}>הרוויחו ₪30 על כל חבר שמבצע הזמנה ראשונה</div>
      </div>

      <div style={{padding:"16px"}}>
        {/* Stats */}
        <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:16,display:"flex",gap:0}}>
          <div style={{flex:1,textAlign:"center",paddingLeft:16,borderLeft:"1px solid "+C.lightGray}}>
            <div style={{fontSize:28,fontWeight:900,color:C.red}}>{invitedCount}</div>
            <div style={{fontSize:12,color:C.gray,marginTop:2}}>חברים שהוזמנו</div>
          </div>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:28,fontWeight:900,color:C.green}}>₪{totalEarned}</div>
            <div style={{fontSize:12,color:C.gray,marginTop:2}}>סה"כ תגמולים</div>
          </div>
        </div>

        {/* Referral code */}
        <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:14,display:"flex",alignItems:"center",gap:7}}>
            <IcoGift s={16} c={C.red}/> הקישור האישי שלך
          </div>
          <div style={{background:"rgba(200,16,46,0.05)",borderRadius:14,padding:"14px 16px",border:"2px dashed rgba(200,16,46,0.25)",marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:11,color:C.gray,marginBottom:4}}>קוד ההפניה שלך</div>
            <div style={{fontSize:22,fontWeight:900,color:C.red,letterSpacing:2}}>{refCode}</div>
            <div style={{fontSize:11,color:C.gray,marginTop:4}}>yougo.app/invite/{refCode.toLowerCase()}</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={copyCode}
              style={{flex:1,background:copied?"rgba(16,185,129,0.1)":C.ultra,color:copied?C.green:C.dark,border:"none",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all .2s"}}>
              {copied ? <><IcoCheck s={15} c={C.green}/> הועתק!</> : <><IcoEdit s={15} c={C.gray}/> העתק קישור</>}
            </button>
            <button style={{flex:1,background:C.red,color:"white",border:"none",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:"0 3px 12px rgba(200,16,46,0.3)"}}>
              <IcoGift s={15}/> שתף
            </button>
          </div>
          <div style={{marginTop:10,display:"flex",gap:10}}>
            {["WhatsApp","SMS","Email"].map(function(s){
              return(
                <button key={s} style={{flex:1,background:s==="WhatsApp"?"#25D366":s==="SMS"?C.blue:"#EA4335",color:"white",border:"none",borderRadius:10,padding:"8px 4px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                  {s}
                </button>
              );
            })}
          </div>
          <div style={{marginTop:8,fontSize:11,color:C.gray,textAlign:"center"}}>
            חברים יקבלו ₪30 הנחה • אתם תצברו ₪30 זיכוי
          </div>
        </div>

        {/* How it works */}
        <div style={{background:C.white,borderRadius:20,padding:"18px 20px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:14}}>איך זה עובד</div>
          {steps.map(function(s){
            return(
              <div key={s.n} style={{display:"flex",gap:13,marginBottom:s.n<steps.length?16:0,alignItems:"flex-start"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                  <span style={{color:"white",fontSize:11,fontWeight:900}}>{s.n}</span>
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{s.title}</div>
                  <div style={{fontSize:11,color:C.gray,marginTop:3,lineHeight:1.5}}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent invites */}
        <div style={{background:C.white,borderRadius:20,padding:"18px 20px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:12}}>הזמנות אחרונות ({invitedCount})</div>
          {invitedCount===0 ? (
            <div style={{textAlign:"center",padding:"28px 0",color:C.gray}}>
              <IcoUsers s={44} c={C.lightGray}/>
              <div style={{fontSize:13,fontWeight:600,marginTop:10}}>עדיין אין הזמנות</div>
              <div style={{fontSize:11,marginTop:4}}>שתפו את הקישור למעלה כדי להתחיל לצבור תגמולים</div>
            </div>
          ) : null}
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── SUPPORT PAGE צור קשר ──────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function SupportPage({onBack,user}){
  var name = (user&&user.name)||"חמדאן";
  var [msg,setMsg] = useState("");
  var [sent,setSent] = useState(false);
  var [topic,setTopic] = useState("");

  var faqs = [
    {q:"איך אני עוקב אחר ההזמנה שלי?",a:"לאחר ביצוע הזמנה תקבל עדכונים בזמן אמת. כניסה להזמנות שלי לצפייה בסטטוס."},
    {q:"מה מדיניות הביטולים?",a:"ניתן לבטל הזמנה תוך 5 דקות מרגע הביצוע ללא עלות. לאחר מכן ייתכן חיוב."},
    {q:"יש בעיה עם הקופון שלי?",a:"ודא שהקופון בתוקף ומינימום ההזמנה עומד בתנאים. צור קשר אם הבעיה נמשכת."},
    {q:"איך אני מוסיף כתובת?",a:"כנס לפרופיל > הכתובות שלי > הוסף כתובת חדשה."},
  ];
  var [openFaq,setOpenFaq] = useState(null);

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1D3557,#2A5298)",padding:"44px 20px 30px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:18}}>
          <IcoBack s={18} c="white"/>
        </button>
        <div style={{color:"white",fontSize:24,fontWeight:900}}>👋 שלום {name}!</div>
        <div style={{color:"rgba(255,255,255,0.8)",fontSize:14,marginTop:4}}>איך אפשר לעזור?</div>
      </div>

      <div style={{padding:"16px"}}>
        {/* Quick contact */}
        <div style={{background:C.white,borderRadius:20,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.06)",marginBottom:16}}>
          {[
            {I:IcoBell,l:"הודעות",sub:"צ'אט עם תמיכה",c:C.red,action:null},
            {I:IcoTruck,l:"כתבו לנו",sub:"נענה תוך 24 שעות",c:C.blue,action:null},
          ].map(function(item,i){
            return(
              <div key={i} onClick={function(){ if(i===1) document.getElementById("contact-form").scrollIntoView({behavior:"smooth"}); }}
                style={{display:"flex",alignItems:"center",gap:13,padding:"16px 18px",borderBottom:i===0?"1px solid "+C.ultra:"none",cursor:"pointer"}}
                onMouseEnter={function(e){ e.currentTarget.style.background=C.ultra; }}
                onMouseLeave={function(e){ e.currentTarget.style.background=""; }}>
                <div style={{width:44,height:44,borderRadius:12,background:hexA(item.c,"18"),display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <item.I s={22} c={item.c}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:C.dark}}>{item.l}</div>
                  <div style={{fontSize:12,color:C.gray,marginTop:1}}>{item.sub}</div>
                </div>
                <IcoChevDown s={16} c={C.lightGray}/>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:10}}>שאלות נפוצות</div>
        <div style={{background:C.white,borderRadius:20,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",marginBottom:16}}>
          {faqs.map(function(f,i){
            var open = openFaq===i;
            return(
              <div key={i} style={{borderBottom:i<faqs.length-1?"1px solid "+C.ultra:"none"}}>
                <div onClick={function(){ setOpenFaq(open?null:i); }}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",cursor:"pointer"}}
                  onMouseEnter={function(e){ e.currentTarget.style.background=C.ultra; }}
                  onMouseLeave={function(e){ e.currentTarget.style.background=""; }}>
                  <div style={{fontWeight:700,fontSize:13,color:C.dark,flex:1,paddingLeft:10}}>{f.q}</div>
                  <div style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform .2s",flexShrink:0}}>
                    <IcoChevDown s={16} c={C.gray}/>
                  </div>
                </div>
                {open && (
                  <div style={{padding:"0 18px 14px",fontSize:12,color:C.gray,lineHeight:1.7,background:"rgba(200,16,46,0.02)"}}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact form */}
        <div id="contact-form" style={{background:C.white,borderRadius:20,padding:"18px 20px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:14}}>כתבו לנו</div>
          {sent ? (
            <div style={{textAlign:"center",padding:"28px 0"}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(16,185,129,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                <IcoCheck s={28} c={C.green}/>
              </div>
              <div style={{fontSize:15,fontWeight:800,color:C.dark}}>ההודעה נשלחה!</div>
              <div style={{fontSize:12,color:C.gray,marginTop:6}}>נחזור אליך תוך 24 שעות</div>
              <button onClick={function(){ setSent(false); setMsg(""); setTopic(""); }}
                style={{marginTop:16,background:C.ultra,color:C.dark,border:"none",borderRadius:10,padding:"9px 20px",fontWeight:600,cursor:"pointer",fontSize:13}}>
                שלח הודעה נוספת
              </button>
            </div>
          ) : (
            <>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:12,color:C.gray,marginBottom:5,fontWeight:600}}>נושא</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {["בעיה בהזמנה","תשלום","קופון","אחר"].map(function(t){
                    return(
                      <button key={t} onClick={function(){ setTopic(t); }}
                        style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid "+(topic===t?C.red:C.lightGray),background:topic===t?"rgba(200,16,46,0.07)":"white",color:topic===t?C.red:C.gray,fontSize:12,fontWeight:topic===t?700:400,cursor:"pointer"}}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:C.gray,marginBottom:5,fontWeight:600}}>הודעה</div>
                <textarea value={msg} onChange={function(e){ setMsg(e.target.value); }}
                  placeholder="תארו את הבעיה בפירוט..."
                  rows={4}
                  style={{width:"100%",border:"1.5px solid "+C.lightGray,borderRadius:12,padding:"11px 13px",fontSize:13,outline:"none",direction:"rtl",fontFamily:"Arial,sans-serif",resize:"none"}}/>
              </div>
              <button onClick={function(){ if(msg.trim()) setSent(true); }}
                style={{width:"100%",background:msg.trim()?C.red:"rgba(200,16,46,0.3)",color:"white",border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:msg.trim()?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <IcoCheck s={16}/> שלח הודעה
              </button>
            </>
          )}
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PRIVACY PAGE מדיניות פרטיות ───────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function PrivacyPage({onBack}){
  var sections = [
    {title:"1. מבוא",icon:"🔒",content:"Yougo מחויבת להגן על פרטיות המשתמשים שלה. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך. השימוש בשירותינו מהווה הסכמה למדיניות זו."},
    {title:"2. מידע שאנו אוספים",icon:"📋",content:"• מידע זיהוי: שם, מספר טלפון, כתובת אימייל\n• מידע מיקום: כתובת למשלוח ומיקום גאוגרפי (בהסכמה)\n• מידע תשלום: פרטי כרטיס אשראי (מוצפנים)\n• מידע שימוש: היסטוריית הזמנות, העדפות, פעילות באפליקציה\n• מידע מכשיר: דגם המכשיר, מערכת הפעלה, מזהה ייחודי"},
    {title:"3. כיצד אנו משתמשים במידע",icon:"⚙️",content:"• עיבוד והשלמת הזמנות\n• שיפור חווית המשתמש\n• שליחת עדכונים ומבצעים (בהסכמה)\n• אבטחת החשבון ומניעת הונאות\n• ניתוח נתונים לשיפור השירות\n• עמידה בדרישות חוקיות"},
    {title:"4. שיתוף מידע",icon:"🤝",content:"איננו מוכרים את המידע האישי שלך. אנו עשויים לשתף מידע עם:\n• מסעדות ועסקים שותפים (לצורך ביצוע הזמנות בלבד)\n• ספקי שירות טכנולוגי (אחסון, עיבוד תשלומים)\n• רשויות אכיפת החוק (בהתאם לדרישה חוקית)"},
    {title:"5. אבטחת מידע",icon:"🛡️",content:"אנו מיישמים אמצעי אבטחה מתקדמים:\n• הצפנת SSL 256-bit לכל התקשורת\n• אחסון מוצפן לפרטי תשלום (PCI DSS)\n• אימות דו-שלבי (אופציונלי)\n• גישה מוגבלת לנתונים אישיים\n• ביקורות אבטחה תקופתיות"},
    {title:"6. זכויות המשתמש",icon:"⚖️",content:"בהתאם לתקנות הגנת הפרטיות, יש לך זכות:\n• לעיין במידע שנאסף עליך\n• לבקש תיקון מידע שגוי\n• לבקש מחיקת נתונים\n• לבטל הסכמה לשיווק\n• להגביל עיבוד נתונים"},
    {title:"7. עוגיות ומעקב",icon:"🍪",content:"אנו משתמשים בעוגיות לשיפור חוויית המשתמש וניתוח שימוש. ניתן לנהל הגדרות עוגיות דרך הגדרות הדפדפן שלך."},
    {title:"8. שינויים במדיניות",icon:"📝",content:"אנו עשויים לעדכן מדיניות זו מעת לעת. במקרה של שינויים מהותיים, נודיע לך דרך האפליקציה או בדוא\"ל. שימוש מתמשך בשירות מהווה הסכמה לשינויים."},
    {title:"9. יצירת קשר",icon:"📧",content:"לשאלות בנוגע למדיניות הפרטיות: privacy@yougo.app\nכתובת: רחוב הטכנולוגיה 1, ראמה, ישראל\nטלפון: 1-800-YOUGO-1"},
  ];

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1D3557,#0A1628)",padding:"44px 20px 30px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:18}}>
          <IcoBack s={18} c="white"/>
        </button>
        <div style={{fontSize:24,marginBottom:6}}>🔒</div>
        <div style={{color:"white",fontSize:24,fontWeight:900}}>מדיניות פרטיות</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:12,marginTop:5}}>עדכון אחרון: ינואר 2026 | גרסה 3.1</div>
        <div style={{marginTop:12,background:"rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 13px"}}>
          <div style={{color:"rgba(255,255,255,0.9)",fontSize:12,lineHeight:1.6}}>
            Yougo מחויבת לשקיפות מלאה. מסמך זה מסביר בדיוק כיצד אנו משתמשים בנתוניך.
          </div>
        </div>
      </div>

      <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:10}}>
        {sections.map(function(sec,i){
          return(
            <div key={i} style={{background:C.white,borderRadius:18,padding:"18px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:15,fontWeight:900,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18}}>{sec.icon}</span>{sec.title}
              </div>
              <div style={{fontSize:13,color:"#374151",lineHeight:1.8,whiteSpace:"pre-line"}}>{sec.content}</div>
            </div>
          );
        })}
        <div style={{background:"rgba(200,16,46,0.05)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(200,16,46,0.15)",textAlign:"center"}}>
          <div style={{fontSize:12,color:C.red,fontWeight:700}}>Yougo © 2026 | כל הזכויות שמורות</div>
          <div style={{fontSize:11,color:C.gray,marginTop:3}}>privacy@yougo.app</div>
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── TERMS PAGE תנאים והגבלות ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function TermsPage({onBack}){
  var sections = [
    {title:"1. קבלת התנאים",icon:"✅",content:"השימוש בשירותי Yougo מהווה הסכמה מלאה לתנאים אלה. אם אינך מסכים לתנאים, אנא הפסק את השימוש בשירות. גיל מינימום לשימוש: 13 שנים."},
    {title:"2. תיאור השירות",icon:"🍽️",content:"Yougo הינה פלטפורמה דיגיטלית המאפשרת הזמנת מזון ממסעדות ועסקים שותפים. אנו משמשים כמתווכים בין המשתמש לבין העסקים. Yougo אינה אחראית לאיכות האוכל, אריזה או עיכובים ממסעדות."},
    {title:"3. חשבון משתמש",icon:"👤",content:"• ניתן לפתוח חשבון אחד בלבד לכל מספר טלפון\n• אחראי לשמירת פרטי הגישה שלך\n• יש לדווח מיידית על גישה לא מורשית\n• חשבונות שנפתחו לרעה ייחסמו ללא הודעה מוקדמת\n• לא ניתן להעביר חשבון לאחר"},
    {title:"4. הזמנות ותשלום",icon:"💳",content:"• מחירים כוללים מע\"מ אלא אם צוין אחרת\n• ניתן לבטל הזמנה עד 5 דקות לאחר ביצועה\n• ביטול לאחר 5 דקות כפוף לעמלת ביטול\n• Yougo רשאית לבטל הזמנה בשל גורמים שאינם בשליטתה\n• החיוב מתבצע מיד עם אישור ההזמנה"},
    {title:"5. משלוחים",icon:"🛵",content:"• זמני משלוח הינם הערכה בלבד ואינם מחייבים\n• Yougo אינה אחראית לעיכובים עקב תנועה, מזג אוויר או גורמים חיצוניים\n• שינוי כתובת לאחר שהשליח יצא אינו אפשרי\n• לא ניתן לתבוע פיצוי עקב עיכוב בלבד"},
    {title:"6. מדיניות החזרים",icon:"💰",content:"החזר כספי יינתן במקרים הבאים:\n• הזמנה שלא התקבלה עקב תקלה טכנית\n• מוצר חסר או שגוי שנשלח\n• איכות מזון לקויה מוכחת\n\nהחזר לא יינתן עבור: שינוי דעה, עיכוב משלוח בלבד, טעות בהזמנה מצד המשתמש"},
    {title:"7. קניין רוחני",icon:"©️",content:"כל התוכן באפליקציה, כולל לוגואים, עיצוב, קוד ותוכן, הינו רכוש Yougo ומוגן בזכויות יוצרים. אין להעתיק, לשכפל או להפיץ תוכן ללא אישור מפורש."},
    {title:"8. הגבלת אחריות",icon:"⚠️",content:"Yougo לא תהיה אחראית לנזקים עקיפים, מיוחדים או תוצאתיים. האחריות המרבית של Yougo מוגבלת לסכום ההזמנה הספציפית שבמחלוקת."},
    {title:"9. שינויים בתנאים",icon:"📝",content:"Yougo רשאית לשנות תנאים אלה בכל עת עם הודעה של 30 יום. המשך שימוש בשירות לאחר השינוי מהווה הסכמה לתנאים החדשים."},
    {title:"10. סמכות שיפוטית",icon:"⚖️",content:"תנאים אלה כפופים לדיני מדינת ישראל. כל סכסוך יידון בבתי המשפט המוסמכים בחיפה, ישראל."},
  ];

  return(
    <div style={{fontFamily:"Arial,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",direction:"rtl",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#374151,#111827)",padding:"44px 20px 30px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:18}}>
          <IcoBack s={18} c="white"/>
        </button>
        <div style={{fontSize:24,marginBottom:6}}>📋</div>
        <div style={{color:"white",fontSize:24,fontWeight:900}}>תנאים והגבלות</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:12,marginTop:5}}>עדכון אחרון: ינואר 2026 | גרסה 5.2</div>
        <div style={{marginTop:12,background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 13px"}}>
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:12,lineHeight:1.6}}>
            אנא קרא תנאים אלה בעיון לפני השימוש בשירות. שימוש בשירות מהווה הסכמה מלאה.
          </div>
        </div>
      </div>

      <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:10}}>
        {sections.map(function(sec,i){
          return(
            <div key={i} style={{background:C.white,borderRadius:18,padding:"18px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:15,fontWeight:900,color:C.dark,marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18}}>{sec.icon}</span>{sec.title}
              </div>
              <div style={{fontSize:13,color:"#374151",lineHeight:1.8,whiteSpace:"pre-line"}}>{sec.content}</div>
            </div>
          );
        })}
        <div style={{background:"rgba(55,65,81,0.05)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(55,65,81,0.15)",textAlign:"center"}}>
          <div style={{fontSize:12,color:"#374151",fontWeight:700}}>Yougo © 2026 | כל הזכויות שמורות</div>
          <div style={{fontSize:11,color:C.gray,marginTop:3}}>legal@yougo.app</div>
        </div>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}
