"use client";

import { useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Search,
  User,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: "Home", href: "#" },
    {
      name: "Explore",
      href: "#explore",
      submenu: [
        { name: "Destinations", href: "/destinations" },
        { name: "Cultural Trails", href: "/cultural-trails" },
        { name: "Adventure Activities", href: "/adventure" },
        { name: "Hidden Gems", href: "/hidden-gems" },
      ],
    },
    {
      name: "Experience",
      href: "#experience",
      submenu: [
        { name: "Heritage & Monuments", href: "/heritage" },
        { name: "Spiritual & Festivals", href: "/spiritual" },
        { name: "Cuisine & Customs", href: "/cuisine" },
      ],
    },
    {
      name: "Plan Your Trip",
      href: "#plan",
      submenu: [
        { name: "Itineraries", href: "/itineraries" },
        { name: "Transportation", href: "/transportation" },
        { name: "Accommodation", href: "/accommodation" },
      ],
    },
    { name: "Stories & Insights", href: "/stories" },
    { name: "About & Community", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleDropdownClick = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
              Konkan Explorer
            </span>
          </div>

          {/* Desktop Navigation - Only show on large screens */}
          <div className="hidden xl:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className="text-slate-700 hover:text-teal-600 font-medium transition-colors duration-200 relative group flex items-center space-x-1"
                      onClick={() => handleDropdownClick(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-teal-100 py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                            onClick={closeDropdown}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-slate-700 hover:text-teal-600 font-medium transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Utility Icons - Show on desktop */}
          <div className="hidden xl:flex items-center space-x-4">
            <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
              <User className="h-5 w-5" />
            </button>
            <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
              <Globe className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button - Show on medium and small screens */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-teal-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="xl:hidden bg-white border-t border-teal-100">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        className="w-full text-left px-3 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors flex items-center justify-between"
                        onClick={() => handleDropdownClick(item.name)}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors text-sm"
                              onClick={(e) => {
                                // Let the navigation happen first
                                setTimeout(() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                }, 0);
                              }}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile Utility Icons */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-teal-100 mt-4">
                <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
                  <User className="h-5 w-5" />
                </button>
                <button className="text-slate-700 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50">
                  <Globe className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeDropdown && !isOpen && (
        <div className="fixed inset-0 z-40" onClick={closeDropdown}></div>
      )}
    </nav>
  );
}
