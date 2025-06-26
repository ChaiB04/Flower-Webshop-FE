"use client"

import { Facebook, Instagram, Twitter, User, Settings } from "lucide-react"
import { Button } from "../components/ui/button"

interface NavigationProps {
  currentView: "customer" | "admin"
  onViewChange: (view: "customer" | "admin") => void
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Social icons */}
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>

          {/* Center - Brand name */}
          <div className="text-center">
            <h1 className="text-4xl font-serif text-slate-700 italic">Liora</h1>
            <p className="text-sm text-slate-500 italic">Find out what it means</p>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors">
                Homepage
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors">
                Flowers
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors">
                About
              </a>
            </nav>

            {/* View toggle */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant={currentView === "customer" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange("customer")}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
              >
                <User className="h-4 w-4 mr-1" />
                Customer
              </Button>
              <Button
                variant={currentView === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange("admin")}
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
