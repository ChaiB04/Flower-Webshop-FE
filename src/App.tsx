"use client";

import "./index.css";
import "./App.css";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import Navigation from "./pages/navigation";
import CustomerView from "./pages/customer-view";
import AdminView from "./pages/admin-view";
import { ToastContainer } from "react-toastify";

export default function FlowerShop() {
  const [currentView, setCurrentView] = useState<"customer" | "admin">(
    "customer"
  );

  return (
    <div className="min-h-screen">
      <Analytics/>
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {currentView === "customer" ? (
        <CustomerView />
      ) : (
        <AdminView />
      )}
      <ToastContainer
        position="bottom-center"
        
      />
    </div>
  );
}
