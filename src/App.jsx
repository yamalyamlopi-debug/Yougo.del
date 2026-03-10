import { Routes, Route, Navigate } from "react-router-dom";
import { useCart } from "./useCart"; // تأكد أنه في نفس مجلد src
import { AdminAuthGuard } from "./adminAuth";

// Pages
import HomePage       from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage       from "./pages/CartPage";
import OrdersPage     from "./pages/OrdersPage";
import ProfilePage    from "./pages/ProfilePage";
import AuthPage       from "./pages/AuthPage";
import PrivacyPage    from "./pages/PrivacyPage";
import TermsPage      from "./pages/termsPage"; // لاحظ حرف t صغير كما في ملفك
import CardsPage      from "./pages/CardsPage";
import InvitePage     from "./pages/InvitePage";
import SupportPage    from "./pages/SupportPage";
import MarketPage     from "./pages/MarketPage";
import BusinessPortal from "./BusinessPortal";   
import AdminReal      from "./AdminReal";         

import { useState } from "react";

export default function App() {
  const { cart, setCart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();
  const [user, setUser]     = useState(null);
  const [authed, setAuthed] = useState(false);

  if (!authed) return (
    <AuthPage
      onDone={u => { setUser(u); setAuthed(true); }}
      onBack={() => {}} 
    />
  );

  return (
    <Routes>
      <Route path="/"            element={<HomePage cart={cart} add={addToCart} rem={removeFromCart} cartCount={cartCount}/>}/>
      <Route path="/restaurant/:id" element={<RestaurantPage cart={cart} add={addToCart} rem={removeFromCart} cartCount={cartCount} cartTotal={cartTotal} setCart={setCart}/>}/>
      <Route path="/cart"        element={<CartPage cart={cart} add={addToCart} rem={removeFromCart} setCart={setCart} cartCount={cartCount}/>}/>
      <Route path="/orders"      element={<OrdersPage cartCount={cartCount}/>}/>
      <Route path="/profile"     element={<ProfilePage user={user} cartCount={cartCount} onLogout={() => { setAuthed(false); setUser(null); setCart([]); }}/>}/>
      <Route path="/market"      element={<MarketPage cartCount={cartCount}/>}/>
      <Route path="/privacy"     element={<PrivacyPage/>}/>
      <Route path="/terms"       element={<TermsPage/>}/>
      <Route path="/cards"       element={<CardsPage/>}/>
      <Route path="/invite"      element={<InvitePage user={user}/>}/>
      <Route path="/support"     element={<SupportPage user={user}/>}/>
      <Route path="/business"    element={<BusinessPortal onBack={() => window.history.back()}/>}/>
      <Route path="/admin"       element={
        <AdminAuthGuard onBack={() => window.history.back()}>
          {({ onLogout }) => <AdminReal onBack={onLogout}/>}
        </AdminAuthGuard>
      }/>
      <Route path="*"            element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}
