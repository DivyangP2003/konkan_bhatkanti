"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Compass,
  MapPin,
  Images,
  BookOpenText,
  Leaf,
  Film,
  Utensils,
  Users,
  Mountain,
  Waves,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

export default function Navigation() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const LG_BREAKPOINT = 1024;

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= LG_BREAKPOINT;
      setIsDesktop(desktop);
      if (desktop) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Explore", href: "#", icon: Compass, main: true },
      { label: "Heritage", href: "#", icon: BookOpenText },
      { label: "Culture & Art", href: "#", icon: Leaf },
      { label: "Flora & Fauna", href: "#", icon: Mountain },
      { label: "Cuisine", href: "#", icon: Utensils },
      { label: "Village Life", href: "#", icon: Users },
      { label: "Monsoon Magic", href: "#", icon: Waves },
      { label: "Gallery", href: "#", icon: Images },
      { label: "Scenes", href: "#", icon: Film },
      { label: "Travel Guide", href: "#", icon: MapPin },
    ],
    []
  );

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* Modern Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo & Brand */}
            <motion.a
              href="/"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900">Konkan</h1>
                <p className="text-xs text-slate-500">Explorer</p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            {isDesktop && (
              <div className="hidden lg:flex items-center gap-1">
                {navItems.slice(0, 6).map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2 group"
                      whileHover={{ y: -2 }}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
                <div className="w-px h-6 bg-slate-200 mx-2" />
                {navItems.slice(6, 9).map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2 group"
                      whileHover={{ y: -2 }}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {isDesktop && (
                <>
                  <motion.a
                    href="/chat"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2"
                    whileHover={{ y: -2 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </motion.a>
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Plan Trip
                  </motion.button>
                </>
              )}

              {/* Mobile Menu Button */}
              {!isDesktop && (
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-slate-900" />
                  ) : (
                    <Menu className="w-6 h-6 text-slate-900" />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {!isDesktop && mobileMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2"
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
                <motion.a
                  href="/chat"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2 col-span-2"
                  whileHover={{ x: 4 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </motion.a>
                <motion.button
                  onClick={closeMenu}
                  className="col-span-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plan Trip
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {!isDesktop && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 top-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}
