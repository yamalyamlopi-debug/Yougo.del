import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eppsgrewrxdjdctlrebf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcHNncmV3cnhkamRjdGxyZWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzM1OTcsImV4cCI6MjA4ODcwOTU5N30.IRs4mGsMYFG9VRPH7zPHvnWbXTANnaen9Ky-2dNDQSA";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MOCK_ORDERS = [
  { id:"1", customer_name:"حمدان أحمد", restaurant_name:"ورونا كريسبي", total:93, status:"مكتمل", items_count:3, created_at:new Date(Date.now()-5*60000).toISOString() },
  { id:"2", customer_name:"محمد حمدان", restaurant_name:"ليمون فريش", total:56, status:"في الطريق", items_count:2, created_at:new Date(Date.now()-12*60000).toISOString() },
  { id:"3", customer_name:"أحمد محمود", restaurant_name:"والا كريسبي", total:120, status:"قيد التحضير", items_count:4, created_at:new Date(Date.now()-20*60000).toISOString() },
  { id:"4", customer_name:"يوسف صالح", restaurant_name:"ورونا كريسبي", total:78, status:"مكتمل", items_count:2, created_at:new Date(Date.now()-35*60000).toISOString() },
  { id:"5", customer_name:"رامي علي", restaurant_name:"بيبيروني بيتزا", total:145, status:"ملغي", items_count:1, created_at:new Date(Date.now()-60*60000).toISOString() },
  { id:"6", customer_name:"نادية قاسم", restaurant_name:"ليمون فريش", total:44, status:"جديد", items_count:2, created_at:new Date(Date.now()-2*60000).toISOString() },
  { id:"7", customer_name:"سمير خليل", restaurant_name:"والا كريسبي", total:67, status:"جديد", items_count:3, created_at:new Date(Date.now()-1*60000).toISOString() },
];
const MOCK_RESTAURANTS = [
  { id:"1", name:"ورونا كريسبي", category:"دجاج مقلي", location:"رامة", active:true, rating:4.8, orders_count:240 },
  { id:"2", name:"ليمون فريش", category:"عصائر طازجة", location:"الناصرة", active:true, rating:4.9, orders_count:410 },
  { id:"3", name:"والا كريسبي", category:"شاورما", location:"نحف", active:true, rating:4.7, orders_count:320 },
  { id:"4", name:"بيبيروني بيتزا", category:"بيتزا", location:"رامة", active:false, rating:4.6, orders_count:150 },
];
const MOCK_USERS = [
  { id:"1", name:"حمدان أحمد", phone:"0546980606", active:true, orders_count:14, created_at:"2025-08-15" },
  { id:"2", name:"محمد حمدان", phone:"0524123456", active:true, orders_count:8, created_at:"2025-09-20" },
  { id:"3", name:"أحمد محمود", phone:"0523456789", active:true, orders_count:22, created_at:"2025-07-01" },
  { id:"4", name:"يوسف صالح", phone:"0526543210", active:false, orders_count:5, created_at:"2025-11-10" },
];
const CHART_DATA = [42,55,38,71,88,95,102,89,76,110,98,115];
const CHART_LABELS = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const STATUS_META = {
  "جديد":        { color:"#38BDF8", bg:"rgba(56,189,248,0.12)" },
  "قيد التحضير": { color:"#FBBF24", bg:"rgba(251,191,36,0.12)" },
  "في الطريق":   { color:"#A78BFA", bg:"rgba(167,139,250,0.12)" },
  "مكتمل":       { color:"#34D399", bg:"rgba(52,211,153,0.12)" },
  "ملغي":        { color:"#F87171", bg:"rgba(248,113,113,0.12)" },
};

function timeAgo(iso) {
  const d = Math.floor((Date.now()-new Date(iso))/1000);
  if(d<60) return "الآن";
  if(d<3600) return Math.floor(d/60)+" د";
  if(d<86400) return Math.floor(d/3600)+" س";
  return Math.floor(d/86400)+" ي";
}

function Sparkline({data,color,width=100,height=36}){
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*width},${height-((v-min)/range)*(height-4)-2}`).join(" ");
  const id="sg"+color.replace(/[^a-z0-9]/gi,"");
  return(
    <svg width={width} height={height} style={{overflow:"visible"}}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </linearGradient></defs>
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#${id})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BarChart({data,labels,color}){
  const max=Math.max(...data);
  const [hov,setHov]=useState(null);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90,padding:"0 2px"}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}
          onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
          {hov===i&&<div style={{background:"#1E2535",border:"1px solid #2A3347",borderRadius:6,padding:"2px 6px",fontSize:10,color:"#E2E8F0",fontWeight:700,whiteSpace:"nowrap",marginBottom:2}}>{v}</div>}
          <div style={{width:"100%",borderRadius:"4px 4px 0 0",height:`${(v/max)*72}px`,background:hov===i?color:color+"77",transition:"all .2s",minHeight:3}}/>
          <span style={{fontSize:8,color:"#374151",fontWeight:600}}>{labels[i]?.slice(0,3)}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({segs,size=110}){
  const total=segs.reduce((s,x)=>s+x.value,0)||1;
  let cum=-90;
  const r=40,cx=size/2,cy=size/2;
  const toRad=a=>a*Math.PI/180;
  const paths=segs.map(seg=>{
    const angle=(seg.value/total)*360;
    const start=cum; cum+=angle;
    const x1=cx+r*Math.cos(toRad(start)),y1=cy+r*Math.sin(toRad(start));
    const x2=cx+r*Math.cos(toRad(cum-0.01)),y2=cy+r*Math.sin(toRad(cum-0.01));
    return{path:`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${angle>180?1:0},1 ${x2},${y2} Z`,color:seg.color,value:seg.value};
  });
  return(
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="#0F1117"/>
      {paths.map((p,i)=><path key={i} d={p.path} fill={p.color} opacity="0.85"/>)}
      <circle cx={cx} cy={cy} r={27} fill="#141824"/>
      <text x={cx} y={cy-3} textAnchor="middle" fill="#E2E8F0" fontSize="15" fontWeight="900">{total}</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill="#374151" fontSize="9">طلب</text>
    </svg>
  );
}

function Toast({msg,type,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[]);
  const c={success:"#34D399",error:"#F87171",info:"#38BDF8"}[type]||"#38BDF8";
  return(
    <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1A2035",border:`1px solid ${c}33`,borderRadius:12,padding:"11px 20px",display:"flex",alignItems:"center",gap:9,zIndex:9999,boxShadow:`0 0 30px ${c}22`,color:"#E2E8F0",fontSize:13,fontWeight:600,animation:"toastIn .3s ease",whiteSpace:"nowrap"}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:c,boxShadow:`0 0 8px ${c}`,flexShrink:0}}/>
      {msg}
    </div>
  );
}

export default function AdminReal({onBack}){
  const [sec,setSec]=useState("dashboard");
  const [orders,setOrders]=useState(MOCK_ORDERS);
  const [restaurants,setRestaurants]=useState(MOCK_RESTAURANTS);
  const [users,setUsers]=useState(MOCK_USERS);
  const [loading,setLoading]=useState(true);
  const [toast,setToast]=useState(null);
  const [orderFilter,setOrderFilter]=useState("الكل");
  const [editRest,setEditRest]=useState(null);
  const [showAddRest,setShowAddRest]=useState(false);
  const [newRest,setNewRest]=useState({name:"",category:"",location:"",phone:""});
  const [saving,setSaving]=useState(false);
  const [cfg,setCfg]=useState({deliveryFee:"10",minOrder:"40",freeAt:"150"});
  const [cfgSaved,setCfgSaved]=useState(false);

  const notify=(msg,type="success")=>setToast({msg,type});

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try{
        const[o,r,u]=await Promise.all([
          supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(200),
          supabase.from("restaurants").select("*").order("name"),
          supabase.from("users").select("*").order("created_at",{ascending:false}),
        ]);
        if(o.data?.length) setOrders(o.data);
        if(r.data?.length) setRestaurants(r.data);
        if(u.data?.length) setUsers(u.data);
      }catch(_){}
      setLoading(false);
    }
    load();
    const ch=supabase.channel("rt")
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"orders"},p=>{
        setOrders(prev=>[p.new,...prev]);
        notify(`🔔 طلب جديد — ${p.new.customer_name}`,"info");
      })
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"orders"},p=>{
        setOrders(prev=>prev.map(o=>o.id===p.new.id?p.new:o));
      })
      .subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  const today=new Date().toISOString().split("T")[0];
  const todayOrders=orders.filter(o=>o.created_at?.startsWith(today));
  const todayRev=todayOrders.reduce((s,o)=>s+(o.total||0),0);
  const pending=orders.filter(o=>["جديد","قيد التحضير","في الطريق"].includes(o.status)).length;
  const completed=orders.filter(o=>o.status==="مكتمل").length;
  const totalRev=orders.filter(o=>o.status==="مكتمل").reduce((s,o)=>s+(o.total||0),0);
  const newCount=orders.filter(o=>o.status==="جديد").length;
  const filteredOrders=orderFilter==="الكل"?orders:orders.filter(o=>o.status===orderFilter);

  async function updateStatus(id,status){
    setOrders(p=>p.map(o=>o.id===id?{...o,status}:o));
    try{await supabase.from("orders").update({status}).eq("id",id);}catch(_){}
    notify("تم تحديث الطلب");
  }
  async function deleteOrder(id){
    setOrders(p=>p.filter(o=>o.id!==id));
    try{await supabase.from("orders").delete().eq("id",id);}catch(_){}
    notify("تم حذف الطلب");
  }
  async function toggleRest(id,active){
    setRestaurants(p=>p.map(r=>r.id===id?{...r,active:!active}:r));
    try{await supabase.from("restaurants").update({active:!active}).eq("id",id);}catch(_){}
    notify(!active?"تم تفعيل المطعم":"تم إيقاف المطعم");
  }
  async function saveRest(){
    if(!editRest?.name?.trim()) return;
    setSaving(true);
    setRestaurants(p=>p.map(r=>r.id===editRest.id?editRest:r));
    try{await supabase.from("restaurants").update(editRest).eq("id",editRest.id);}catch(_){}
    setSaving(false); setEditRest(null); notify("تم حفظ المطعم");
  }
  async function addRest(){
    if(!newRest.name.trim()){notify("أدخل اسم المطعم","error");return;}
    setSaving(true);
    const obj={...newRest,id:Date.now().toString(),active:true,rating:5.0,orders_count:0};
    setRestaurants(p=>[obj,...p]);
    try{await supabase.from("restaurants").insert([{...newRest,active:true}]);}catch(_){}
    setSaving(false); setShowAddRest(false); setNewRest({name:"",category:"",location:"",phone:""}); notify("تم إضافة المطعم");
  }
  async function toggleUser(id,active){
    setUsers(p=>p.map(u=>u.id===id?{...u,active:!active}:u));
    try{await supabase.from("users").update({active:!active}).eq("id",id);}catch(_){}
    notify(!active?"تم تفعيل المستخدم":"تم حظر المستخدم");
  }
  async function saveCfg(){
    try{await supabase.from("settings").upsert([
      {key:"delivery_fee",value:cfg.deliveryFee},
      {key:"min_order",value:cfg.minOrder},
      {key:"free_delivery_threshold",value:cfg.freeAt},
    ]);}catch(_){}
    setCfgSaved(true); notify("تم حفظ الإعدادات"); setTimeout(()=>setCfgSaved(false),2500);
  }

  const NAV=[
    {id:"dashboard",label:"لوحة التحكم",emoji:"⬡"},
    {id:"orders",label:"الطلبات",emoji:"◈",badge:newCount},
    {id:"restaurants",label:"المطاعم",emoji:"◉"},
    {id:"users",label:"المستخدمون",emoji:"◎"},
    {id:"analytics",label:"الإحصائيات",emoji:"◇"},
    {id:"settings",label:"الإعدادات",emoji:"◈"},
  ];

  const donutSegs=Object.entries(STATUS_META)
    .map(([label,meta])=>({label,color:meta.color,value:orders.filter(o=>o.status===label).length}))
    .filter(s=>s.value>0);

  const inp={width:"100%",background:"#141824",border:"1px solid #1E2535",borderRadius:9,padding:"10px 13px",color:"#E2E8F0",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};

  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#0A0D14",fontFamily:"'Segoe UI',Tahoma,sans-serif",direction:"rtl",color:"#E2E8F0"}}>

      {/* ── SIDEBAR ───────────────────────────────────────────────────────────── */}
      <aside style={{width:224,background:"#0F1117",borderLeft:"1px solid #1E2535",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        {/* Logo */}
        <div style={{padding:"22px 18px 18px",borderBottom:"1px solid #1E2535"}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{width:42,height:42,borderRadius:13,background:"linear-gradient(135deg,#C8102E,#8B0020)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(200,16,46,0.4)",flexShrink:0}}>
              <svg width="24" height="24" viewBox="0 0 60 60" fill="none">
                <path d="M10 42V18l14 14V18" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 28h18M39 22l9 6-9 6" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{fontWeight:900,fontSize:18,letterSpacing:1.5,color:"#F1F5F9",lineHeight:1}}>YOUGO</div>
              <div style={{fontSize:9,color:"#374151",fontWeight:600,letterSpacing:1.5,marginTop:3}}>ADMIN PANEL</div>
            </div>
          </div>
          {/* Live dot */}
          <div style={{marginTop:14,display:"flex",alignItems:"center",gap:8,background:"rgba(52,211,153,0.07)",border:"1px solid rgba(52,211,153,0.14)",borderRadius:9,padding:"7px 11px"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#34D399",boxShadow:"0 0 6px #34D399",animation:"pulse 2s infinite",flexShrink:0}}/>
            <span style={{fontSize:11,color:"#34D399",fontWeight:600}}>بيانات حية — متصل</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:"12px 10px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto"}}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setSec(n.id)} style={{
              display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
              borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",
              background:sec===n.id?"rgba(200,16,46,0.13)":"transparent",
              color:sec===n.id?"#FC8181":"#4B5568",
              fontWeight:sec===n.id?700:500,fontSize:13,
              transition:"all .15s",
              borderRight:sec===n.id?"3px solid #C8102E":"3px solid transparent",
            }}
              onMouseEnter={e=>{if(sec!==n.id){e.currentTarget.style.background="#141824";e.currentTarget.style.color="#64748B";}}}
              onMouseLeave={e=>{if(sec!==n.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#4B5568";}}}>
              <span style={{fontSize:15,lineHeight:1,opacity:sec===n.id?1:0.4}}>{n.emoji}</span>
              {n.label}
              {n.badge>0&&<span style={{marginRight:"auto",background:"#C8102E",color:"white",fontSize:9,fontWeight:800,borderRadius:20,padding:"1px 7px",boxShadow:"0 0 8px rgba(200,16,46,0.5)"}}>{n.badge}</span>}
            </button>
          ))}
        </nav>

        {/* Back */}
        <div style={{padding:"12px 10px",borderTop:"1px solid #1E2535"}}>
          <button onClick={onBack} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"10px 12px",borderRadius:10,border:"1px solid #1E2535",background:"transparent",color:"#374151",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#141824";e.currentTarget.style.color="#64748B";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#374151";}}>
            ← رجوع للتطبيق
          </button>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────────────────────────────────────────── */}
      <main style={{flex:1,overflowY:"auto",minWidth:0,display:"flex",flexDirection:"column"}}>

        {/* Header */}
        <header style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,13,20,0.94)",backdropFilter:"blur(14px)",borderBottom:"1px solid #1E2535",padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <h1 style={{margin:0,fontSize:19,fontWeight:800,color:"#F1F5F9",letterSpacing:0.2}}>{NAV.find(n=>n.id===sec)?.label}</h1>
            <p style={{margin:"2px 0 0",fontSize:11,color:"#2A3347"}}>{new Date().toLocaleDateString("ar-IL",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {loading&&<div style={{width:18,height:18,borderRadius:"50%",border:"2px solid #1E2535",borderTopColor:"#C8102E",animation:"spin .7s linear infinite"}}/>}
            <div style={{position:"relative",cursor:"pointer"}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#141824",border:"1px solid #1E2535",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🔔</div>
              {newCount>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#C8102E",color:"white",fontSize:9,fontWeight:800,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 8px rgba(200,16,46,0.6)"}}>{newCount}</div>}
            </div>
            <div style={{background:"#141824",border:"1px solid #1E2535",borderRadius:10,padding:"7px 14px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C8102E,#8B0020)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>👑</div>
              <span style={{fontSize:12,fontWeight:700,color:"#64748B"}}>مدير النظام</span>
            </div>
          </div>
        </header>

        <div style={{padding:"24px 28px 52px",flex:1}}>

          {/* ── DASHBOARD ──────────────────────────────────────────────── */}
          {sec==="dashboard"&&(
            <div>
              {/* KPI row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20}}>
                {[
                  {label:"طلبات اليوم",value:todayOrders.length,sub:`${pending} معلقة`,color:"#38BDF8",spark:CHART_DATA.slice(-7)},
                  {label:"إيرادات اليوم",value:`₪${todayRev}`,sub:"شيكل",color:"#34D399",spark:CHART_DATA.slice(-7).map(v=>v*1.4)},
                  {label:"إجمالي مكتمل",value:completed,sub:`من ${orders.length} طلب`,color:"#A78BFA",spark:CHART_DATA.slice(-7)},
                  {label:"كل الإيرادات",value:`₪${totalRev}`,sub:"مجمّع",color:"#FBBF24",spark:CHART_DATA.slice(-7).map(v=>v*2)},
                ].map((card,i)=>(
                  <div key={i} style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"18px 20px",position:"relative",overflow:"hidden",transition:"transform .2s,box-shadow .2s",cursor:"default"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 10px 30px ${card.color}15`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${card.color},transparent)`}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <p style={{margin:0,fontSize:10,color:"#374151",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{card.label}</p>
                        <p style={{margin:"7px 0 3px",fontSize:27,fontWeight:900,color:"#F1F5F9",letterSpacing:-0.5,lineHeight:1}}>{card.value}</p>
                        <p style={{margin:0,fontSize:11,color:card.color,fontWeight:500}}>{card.sub}</p>
                      </div>
                      <Sparkline data={card.spark} color={card.color} width={76} height={36}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 320px",gap:13,marginBottom:20}}>
                {/* Bar */}
                <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <p style={{margin:0,fontWeight:700,fontSize:14,color:"#CBD5E1"}}>الطلبات الشهرية</p>
                    <span style={{background:"rgba(200,16,46,0.1)",color:"#F87171",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>2026</span>
                  </div>
                  <BarChart data={CHART_DATA} labels={CHART_LABELS} color="#C8102E"/>
                  <p style={{margin:"10px 0 0",fontSize:21,fontWeight:900,color:"#F1F5F9"}}>{CHART_DATA.reduce((a,b)=>a+b,0)}<span style={{fontSize:11,color:"#374151",fontWeight:400,marginRight:6}}>إجمالي</span></p>
                </div>
                {/* Revenue */}
                <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <p style={{margin:0,fontWeight:700,fontSize:14,color:"#CBD5E1"}}>الإيرادات الشهرية</p>
                    <span style={{background:"rgba(52,211,153,0.1)",color:"#34D399",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>₪</span>
                  </div>
                  <BarChart data={CHART_DATA.map(v=>v*50)} labels={CHART_LABELS} color="#34D399"/>
                  <p style={{margin:"10px 0 0",fontSize:21,fontWeight:900,color:"#F1F5F9"}}>₪{(CHART_DATA.reduce((a,b)=>a+b,0)*50).toLocaleString()}<span style={{fontSize:11,color:"#374151",fontWeight:400,marginRight:6}}>إجمالي</span></p>
                </div>
                {/* Donut */}
                <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"20px"}}>
                  <p style={{margin:"0 0 14px",fontWeight:700,fontSize:14,color:"#CBD5E1"}}>توزيع الطلبات</p>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <DonutChart segs={donutSegs.length?donutSegs:[{label:"",color:"#1E2535",value:1}]} size={110}/>
                    <div style={{display:"flex",flexDirection:"column",gap:8,flex:1}}>
                      {Object.entries(STATUS_META).map(([label,meta])=>{
                        const count=orders.filter(o=>o.status===label).length;
                        return(
                          <div key={label} style={{display:"flex",alignItems:"center",gap:7}}>
                            <div style={{width:7,height:7,borderRadius:"50%",background:meta.color,boxShadow:`0 0 5px ${meta.color}`,flexShrink:0}}/>
                            <span style={{fontSize:11,color:"#4B5568",flex:1}}>{label}</span>
                            <span style={{fontSize:11,fontWeight:700,color:meta.color}}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",overflow:"hidden"}}>
                <div style={{padding:"15px 20px",borderBottom:"1px solid #1E2535",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <p style={{margin:0,fontWeight:700,fontSize:14,color:"#CBD5E1"}}>آخر الطلبات</p>
                  <button onClick={()=>setSec("orders")} style={{background:"transparent",border:"none",color:"#38BDF8",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>عرض الكل ←</button>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid #141824",background:"#0A0D14"}}>
                      {["العميل","المطعم","المبلغ","الحالة","الوقت"].map(h=>(
                        <th key={h} style={{padding:"10px 16px",textAlign:"right",fontSize:10,color:"#2A3347",fontWeight:600,letterSpacing:0.5}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0,7).map((o,i)=>{
                      const sm=STATUS_META[o.status]||STATUS_META["جديد"];
                      return(
                        <tr key={o.id} style={{borderBottom:i<6?"1px solid #141824":"none",transition:"background .12s"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#141824"}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <td style={{padding:"12px 16px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:9}}>
                              <div style={{width:30,height:30,borderRadius:8,background:sm.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
                              <span style={{fontSize:13,fontWeight:600,color:"#CBD5E1"}}>{o.customer_name||"—"}</span>
                            </div>
                          </td>
                          <td style={{padding:"12px 16px",fontSize:12,color:"#4B5568"}}>{o.restaurant_name||"—"}</td>
                          <td style={{padding:"12px 16px",fontSize:13,fontWeight:800,color:"#34D399"}}>₪{o.total||0}</td>
                          <td style={{padding:"12px 16px"}}>
                            <span style={{background:sm.bg,color:sm.color,borderRadius:20,padding:"3px 11px",fontSize:11,fontWeight:700}}>{o.status||"جديد"}</span>
                          </td>
                          <td style={{padding:"12px 16px",fontSize:11,color:"#374151"}}>{timeAgo(o.created_at)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ORDERS ─────────────────────────────────────────────────── */}
          {sec==="orders"&&(
            <div>
              <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
                {["الكل","جديد","قيد التحضير","في الطريق","مكتمل","ملغي"].map(f=>{
                  const cnt=f==="الكل"?orders.length:orders.filter(o=>o.status===f).length;
                  const active=orderFilter===f;
                  const sm=f!=="الكل"?STATUS_META[f]:null;
                  return(
                    <button key={f} onClick={()=>setOrderFilter(f)} style={{
                      padding:"7px 15px",borderRadius:10,cursor:"pointer",
                      border:`1px solid ${active?(sm?.color||"#C8102E")+"44":"#1E2535"}`,
                      background:active?(sm?sm.bg:"rgba(200,16,46,0.12)"):"transparent",
                      color:active?(sm?.color||"#F87171"):"#4B5568",
                      fontWeight:active?700:500,fontSize:12,fontFamily:"inherit",transition:"all .15s",
                    }}>
                      {f} {cnt>0&&<span style={{opacity:0.6}}>({cnt})</span>}
                    </button>
                  );
                })}
              </div>
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid #1E2535",background:"#0A0D14"}}>
                      {["#","العميل","المطعم","عناصر","المبلغ","الحالة","الوقت","إجراء"].map(h=>(
                        <th key={h} style={{padding:"11px 14px",textAlign:"right",fontSize:10,color:"#2A3347",fontWeight:600,letterSpacing:0.5}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length===0?(
                      <tr><td colSpan={8} style={{textAlign:"center",padding:"60px 0",color:"#1E2535",fontSize:14}}>لا توجد طلبات</td></tr>
                    ):filteredOrders.map((o,i)=>{
                      const sm=STATUS_META[o.status]||STATUS_META["جديد"];
                      return(
                        <tr key={o.id} style={{borderBottom:i<filteredOrders.length-1?"1px solid #141824":"none",transition:"background .12s"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#141824"}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <td style={{padding:"12px 14px",fontSize:11,color:"#2A3347",fontFamily:"monospace"}}>#{i+1}</td>
                          <td style={{padding:"12px 14px",fontSize:13,fontWeight:600,color:"#CBD5E1"}}>{o.customer_name||"—"}</td>
                          <td style={{padding:"12px 14px",fontSize:12,color:"#4B5568"}}>{o.restaurant_name||"—"}</td>
                          <td style={{padding:"12px 14px",fontSize:12,color:"#374151",textAlign:"center"}}>{o.items_count||1}</td>
                          <td style={{padding:"12px 14px",fontSize:14,fontWeight:800,color:"#34D399"}}>₪{o.total||0}</td>
                          <td style={{padding:"12px 14px"}}>
                            <select value={o.status||"جديد"} onChange={e=>updateStatus(o.id,e.target.value)}
                              style={{background:sm.bg,color:sm.color,border:`1px solid ${sm.color}33`,borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",outline:"none"}}>
                              {["جديد","قيد التحضير","في الطريق","مكتمل","ملغي"].map(s=><option key={s} value={s} style={{background:"#141824",color:"#E2E8F0"}}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{padding:"12px 14px",fontSize:11,color:"#374151"}}>{timeAgo(o.created_at)}</td>
                          <td style={{padding:"12px 14px"}}>
                            <button onClick={()=>deleteOrder(o.id)}
                              style={{background:"rgba(248,113,113,0.08)",color:"#F87171",border:"1px solid rgba(248,113,113,0.14)",borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}
                              onMouseEnter={e=>e.currentTarget.style.background="rgba(248,113,113,0.18)"}
                              onMouseLeave={e=>e.currentTarget.style.background="rgba(248,113,113,0.08)"}>
                              حذف
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── RESTAURANTS ────────────────────────────────────────────── */}
          {sec==="restaurants"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <p style={{margin:0,color:"#374151",fontSize:13}}>{restaurants.length} مطعم</p>
                <button onClick={()=>setShowAddRest(!showAddRest)}
                  style={{background:"linear-gradient(135deg,#C8102E,#8B0020)",color:"white",border:"none",borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 15px rgba(200,16,46,0.3)"}}>
                  + إضافة مطعم
                </button>
              </div>
              {showAddRest&&(
                <div style={{background:"#0F1117",borderRadius:16,border:"1px solid rgba(200,16,46,0.2)",padding:"20px",marginBottom:16}}>
                  <p style={{margin:"0 0 15px",fontWeight:700,color:"#CBD5E1",fontSize:14}}>➕ مطعم جديد</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[["name","اسم المطعم *"],["category","الفئة"],["location","الموقع"],["phone","الهاتف"]].map(([k,l])=>(
                      <div key={k}>
                        <label style={{fontSize:11,color:"#374151",display:"block",marginBottom:4}}>{l}</label>
                        <input value={newRest[k]} onChange={e=>setNewRest(p=>({...p,[k]:e.target.value}))} style={{...inp}} onFocus={e=>e.target.style.borderColor="#C8102E44"} onBlur={e=>e.target.style.borderColor="#1E2535"}/>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:14}}>
                    <button onClick={addRest} disabled={saving} style={{background:"linear-gradient(135deg,#C8102E,#8B0020)",color:"white",border:"none",borderRadius:10,padding:"10px 22px",fontWeight:700,cursor:"pointer",fontSize:13,fontFamily:"inherit",opacity:saving?0.6:1}}>
                      {saving?"جاري الحفظ...":"حفظ"}
                    </button>
                    <button onClick={()=>setShowAddRest(false)} style={{background:"transparent",color:"#4B5568",border:"1px solid #1E2535",borderRadius:10,padding:"10px 18px",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>إلغاء</button>
                  </div>
                </div>
              )}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
                {restaurants.map(r=>(
                  <div key={r.id} style={{background:"#0F1117",borderRadius:16,border:`1px solid ${r.active!==false?"#1E2535":"rgba(248,113,113,0.14)"}`,overflow:"hidden",transition:"transform .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform=""}>
                    <div style={{padding:"15px 16px 11px",borderBottom:"1px solid #141824",display:"flex",alignItems:"center",gap:11}}>
                      <div style={{width:44,height:44,borderRadius:12,background:r.active!==false?"rgba(200,16,46,0.1)":"rgba(248,113,113,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🍽️</div>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{margin:0,fontWeight:700,fontSize:14,color:"#E2E8F0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</p>
                        <p style={{margin:"2px 0 0",fontSize:11,color:"#374151"}}>{r.category||"—"} • {r.location||"—"}</p>
                      </div>
                      <span style={{background:r.active!==false?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",color:r.active!==false?"#34D399":"#F87171",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,flexShrink:0}}>
                        {r.active!==false?"نشط":"متوقف"}
                      </span>
                    </div>
                    {editRest?.id===r.id?(
                      <div style={{padding:"12px 16px"}}>
                        {[["name","الاسم"],["category","الفئة"],["location","الموقع"]].map(([k,l])=>(
                          <input key={k} value={editRest[k]||""} placeholder={l}
                            onChange={e=>setEditRest(p=>({...p,[k]:e.target.value}))}
                            style={{...inp,marginBottom:8,fontSize:12,padding:"8px 10px"}}/>
                        ))}
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={saveRest} style={{flex:1,background:"#34D399",color:"#0A0D14",border:"none",borderRadius:8,padding:"8px",fontWeight:800,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>{saving?"...":"حفظ"}</button>
                          <button onClick={()=>setEditRest(null)} style={{flex:1,background:"transparent",color:"#4B5568",border:"1px solid #1E2535",borderRadius:8,padding:"8px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>إلغاء</button>
                        </div>
                      </div>
                    ):(
                      <div style={{padding:"10px 16px 13px",display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:12,color:"#FBBF24"}}>{"★".repeat(Math.round(r.rating||4))} {r.rating||"4.5"}</span>
                        <span style={{marginRight:"auto",fontSize:11,color:"#2A3347"}}>{r.orders_count||0} طلب</span>
                        <button onClick={()=>setEditRest({...r})} style={{background:"rgba(56,189,248,0.09)",color:"#38BDF8",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>تعديل</button>
                        <button onClick={()=>toggleRest(r.id,r.active!==false)} style={{background:r.active!==false?"rgba(248,113,113,0.09)":"rgba(52,211,153,0.09)",color:r.active!==false?"#F87171":"#34D399",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                          {r.active!==false?"إيقاف":"تفعيل"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── USERS ──────────────────────────────────────────────────── */}
          {sec==="users"&&(
            <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",overflow:"hidden"}}>
              <div style={{padding:"15px 20px",borderBottom:"1px solid #1E2535",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <p style={{margin:0,fontWeight:700,fontSize:14,color:"#CBD5E1"}}>المستخدمون</p>
                <span style={{background:"rgba(167,139,250,0.1)",color:"#A78BFA",fontSize:12,fontWeight:700,padding:"3px 12px",borderRadius:20}}>{users.length} مستخدم</span>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #141824",background:"#0A0D14"}}>
                    {["المستخدم","الهاتف","الطلبات","التسجيل","الحالة","إجراء"].map(h=>(
                      <th key={h} style={{padding:"11px 16px",textAlign:"right",fontSize:10,color:"#2A3347",fontWeight:600,letterSpacing:0.5}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length===0?(
                    <tr><td colSpan={6} style={{textAlign:"center",padding:"60px 0",color:"#1E2535",fontSize:14}}>لا يوجد مستخدمون</td></tr>
                  ):users.map((u,i)=>(
                    <tr key={u.id} style={{borderBottom:i<users.length-1?"1px solid #141824":"none",transition:"background .12s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#141824"}
                      onMouseLeave={e=>e.currentTarget.style.background=""}>
                      <td style={{padding:"13px 16px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:33,height:33,borderRadius:10,background:u.active!==false?"rgba(167,139,250,0.1)":"rgba(248,113,113,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>👤</div>
                          <span style={{fontSize:13,fontWeight:600,color:"#CBD5E1"}}>{u.name||u.full_name||"—"}</span>
                        </div>
                      </td>
                      <td style={{padding:"13px 16px",fontSize:12,color:"#374151",fontFamily:"monospace"}}>{u.phone||"—"}</td>
                      <td style={{padding:"13px 16px",fontSize:13,fontWeight:700,color:"#CBD5E1"}}>{u.orders_count||0}</td>
                      <td style={{padding:"13px 16px",fontSize:11,color:"#2A3347"}}>{u.created_at?new Date(u.created_at).toLocaleDateString("ar"):"—"}</td>
                      <td style={{padding:"13px 16px"}}>
                        <span style={{background:u.active!==false?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",color:u.active!==false?"#34D399":"#F87171",borderRadius:20,padding:"3px 11px",fontSize:11,fontWeight:700}}>
                          {u.active!==false?"نشط":"محظور"}
                        </span>
                      </td>
                      <td style={{padding:"13px 16px"}}>
                        <button onClick={()=>toggleUser(u.id,u.active!==false)}
                          style={{background:u.active!==false?"rgba(248,113,113,0.07)":"rgba(52,211,153,0.07)",color:u.active!==false?"#F87171":"#34D399",border:`1px solid ${u.active!==false?"rgba(248,113,113,0.14)":"rgba(52,211,153,0.14)"}`,borderRadius:8,padding:"5px 14px",fontSize:11,cursor:"pointer",fontWeight:700,fontFamily:"inherit",transition:"all .15s"}}>
                          {u.active!==false?"حظر":"تفعيل"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── ANALYTICS ──────────────────────────────────────────────── */}
          {sec==="analytics"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
                {[
                  {l:"إجمالي الطلبات",v:orders.length,c:"#38BDF8"},
                  {l:"مكتملة",v:completed,c:"#34D399"},
                  {l:"ملغاة",v:orders.filter(o=>o.status==="ملغي").length,c:"#F87171"},
                  {l:"إجمالي الإيرادات",v:`₪${totalRev}`,c:"#FBBF24"},
                ].map((s,i)=>(
                  <div key={i} style={{background:"#0F1117",borderRadius:14,border:"1px solid #1E2535",padding:"16px 18px",borderTop:`2px solid ${s.c}`}}>
                    <p style={{margin:0,fontSize:25,fontWeight:900,color:"#F1F5F9"}}>{s.v}</p>
                    <p style={{margin:"4px 0 0",fontSize:11,color:"#374151"}}>{s.l}</p>
                  </div>
                ))}
              </div>
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"20px",marginBottom:14}}>
                <p style={{margin:"0 0 18px",fontWeight:700,fontSize:14,color:"#CBD5E1"}}>تفاصيل حالات الطلبات</p>
                {Object.entries(STATUS_META).map(([label,meta])=>{
                  const count=orders.filter(o=>o.status===label).length;
                  const pct=orders.length?Math.round((count/orders.length)*100):0;
                  return(
                    <div key={label} style={{marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:meta.color,boxShadow:`0 0 5px ${meta.color}`,flexShrink:0}}/>
                          <span style={{fontSize:13,color:"#CBD5E1",fontWeight:500}}>{label}</span>
                        </div>
                        <div style={{display:"flex",gap:12}}>
                          <span style={{fontSize:13,fontWeight:700,color:meta.color}}>{count}</span>
                          <span style={{fontSize:12,color:"#2A3347"}}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{height:6,background:"#141824",borderRadius:3,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${meta.color}77,${meta.color})`,borderRadius:3,transition:"width 1s ease"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"20px"}}>
                <p style={{margin:"0 0 16px",fontWeight:700,fontSize:14,color:"#CBD5E1"}}>الطلبات الشهرية</p>
                <BarChart data={CHART_DATA} labels={CHART_LABELS} color="#C8102E"/>
              </div>
            </div>
          )}

          {/* ── SETTINGS ───────────────────────────────────────────────── */}
          {sec==="settings"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"22px"}}>
                <p style={{margin:"0 0 18px",fontWeight:700,fontSize:14,color:"#CBD5E1"}}>⚙️ إعدادات التطبيق</p>
                {[{l:"رسوم التوصيل (₪)",k:"deliveryFee"},{l:"الحد الأدنى للطلب (₪)",k:"minOrder"},{l:"مجاني عند (₪)",k:"freeAt"}].map(f=>(
                  <div key={f.k} style={{marginBottom:14}}>
                    <label style={{fontSize:11,color:"#374151",display:"block",marginBottom:5}}>{f.l}</label>
                    <input value={cfg[f.k]} onChange={e=>setCfg(p=>({...p,[f.k]:e.target.value}))}
                      style={{...inp,fontSize:14,padding:"11px 14px"}}
                      onFocus={e=>e.target.style.borderColor="#C8102E44"}
                      onBlur={e=>e.target.style.borderColor="#1E2535"}/>
                  </div>
                ))}
                <button onClick={saveCfg}
                  style={{width:"100%",background:cfgSaved?"#34D399":"linear-gradient(135deg,#C8102E,#8B0020)",color:cfgSaved?"#0A0D14":"white",border:"none",borderRadius:10,padding:"12px",fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"inherit",transition:"all .3s",boxShadow:"0 4px 15px rgba(200,16,46,0.2)"}}>
                  {cfgSaved?"✓ تم الحفظ":"حفظ الإعدادات"}
                </button>
              </div>
              <div style={{background:"#0F1117",borderRadius:16,border:"1px solid #1E2535",padding:"22px"}}>
                <p style={{margin:"0 0 18px",fontWeight:700,fontSize:14,color:"#CBD5E1"}}>🗄️ قاعدة البيانات</p>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
                  {[{l:"الطلبات",v:orders.length,c:"#38BDF8"},{l:"المطاعم",v:restaurants.length,c:"#34D399"},{l:"المستخدمون",v:users.length,c:"#A78BFA"}].map(item=>(
                    <div key={item.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#141824",border:"1px solid #1E2535",borderRadius:10,padding:"12px 15px"}}>
                      <span style={{fontSize:13,color:"#4B5568"}}>{item.l}</span>
                      <span style={{fontSize:18,fontWeight:900,color:item.c}}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.13)",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:"#34D399",boxShadow:"0 0 6px #34D399",animation:"pulse 2s infinite",flexShrink:0}}/>
                  <span style={{fontSize:12,color:"#34D399",fontWeight:600}}>Supabase — متصل وجاهز</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}

      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0A0D14}
        ::-webkit-scrollbar-thumb{background:#1E2535;border-radius:3px}
        select option{background:#141824;color:#E2E8F0}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @media(max-width:860px){aside{display:none!important}}
      `}</style>
    </div>
  );
}
