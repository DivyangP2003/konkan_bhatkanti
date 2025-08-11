"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Images,
  Compass,
  Globe,
  User,
  MapPin,
  PanelLeft,
  X,
  Home,
  MessageSquare,
  Leaf,
  Film,
  BookOpenText,
  Sparkles,
  Route,
  ShieldCheck,
  PenLine,
  Star,
  Mail,
  HelpCircle,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Transparent, collapsible left sidebar + transparent top navbar.
// - JS only (no TypeScript)
// - Smooth animations via framer-motion
// - Collapsed sidebar shows icons only with tooltips
// - Mobile: off-canvas overlay; Desktop: expand/collapse width
// - Navbar contains only: logo+name, map, gallery, browse, language toggle, sign-in/profile
// - Sidebar items link to placeholder routes (pages not created)

export default function Navigation() {
  // Responsive breakpoint (md ~ 768px)
  const LG_BREAKPOINT = 768;

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= LG_BREAKPOINT : true
  );
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarLocked, setSidebarLocked] = useState(false); // NEW
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false); // mobile open/close
  const [lang, setLang] = useState("EN");

  // Keep sidebar default: expanded on desktop; closed on mobile
  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= LG_BREAKPOINT;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // const toggleSidebar = useCallback(() => {
  //   if (isDesktop) {
  //     setSidebarExpanded((v) => !v);
  //   } else {
  //     setSidebarMobileOpen((v) => !v);
  //   }
  // }, [isDesktop]);

  const closeMobileSidebar = useCallback(() => setSidebarMobileOpen(false), []);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "EN" ? "KN" : "EN"));
  }, []);

  // Hover handlers
  const handleSidebarEnter = useCallback(() => {
    if (isDesktop && !sidebarLocked) {
      setSidebarExpanded(true);
    }
  }, [isDesktop, sidebarLocked]);

  const handleSidebarLeave = useCallback(() => {
    if (isDesktop && !sidebarLocked) {
      setSidebarExpanded(false);
    }
  }, [isDesktop, sidebarLocked]);

  const handleSidebarToggleClick = useCallback(() => {
    if (isDesktop) {
      // Toggle locked state
      setSidebarLocked((locked) => {
        const newLocked = !locked;
        setSidebarExpanded(newLocked); // Always match expanded state to lock state
        return newLocked;
      });
    } else {
      // Mobile: just open/close
      setSidebarMobileOpen((v) => !v);
    }
  }, [isDesktop]);

  const navItems = useMemo(
    () => [
      { label: "Home", href: "/", icon: Home },
      { label: "Chat", href: "/chat", icon: MessageSquare },
      { label: "Smart Picks", href: "/recommendations", icon: Sparkles },
      { label: "Trip Planner", href: "/itinerary", icon: Route },
      { label: "Maps", href: "/maps", icon: Map },
      { label: "Travel Safety", href: "/safety", icon: ShieldCheck },
      { label: "Photo Gallery", href: "/gallery", icon: Images },
      { label: "Community Blog", href: "/blog", icon: PenLine },
      { label: "Reviews", href: "/reviews", icon: Star },
      { label: "FAQs", href: "/faqs", icon: HelpCircle },
      { label: "Contact Us", href: "/contact", icon: Mail },
      { label: "Konkani Heritage", href: "/scholars", icon: BookOpenText },
      { label: "Life in Konkan", href: "/daily-life", icon: Leaf },
      { label: "Scenes of Konkan", href: "/konkani-scenes", icon: Film },
    ],
    []
  );

  // Sidebar width values
  const expandedWidth = 288; // 18rem
  const collapsedWidth = 72; // 4.5rem
  const mobileWidth = 300;

  // Shared styles
  const glass =
    "backdrop-transparent-md bg-white/0 border border-white/0 shadow-[0_8px_32px_rgba(0,0,0,0.15)]";
  const nav =
    "backdrop-blur-md bg-white/0 border border-white/0 shadow-[0_8px_32px_rgba(0,0,0,0.15)]";

  return (
    <>
      {/* Transparent Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${nav}`}
        style={{
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
        aria-label="Top Navigation"
      >
        <div className="px-4 sm:px-6 lg:px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Sidebar toggle + Logo/Name */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSidebarToggleClick}
                onMouseEnter={
                  isDesktop && !sidebarLocked ? handleSidebarEnter : undefined
                }
                aria-label="Toggle sidebar"
                className="mr-20 p-2 rounded-md hover:bg-white/10 transition-colors"
              >
                <PanelLeft className="h-6 w-6 text-white" />
              </button>

              <div className="flex items-center gap-2">
                <MapPin className="h-8 w-8 text-teal-300" />
                <span className="text-2xl font-bold text-white">
                  Konkan Explorer
                </span>
              </div>
            </div>

            {/* Right: icons only per request */}
            <TooltipProvider delayDuration={0}>
              <div className="flex items-center gap-1 sm:gap-2">
                <IconButton
                  href="/maps"
                  // label="Map"
                  icon={Map}
                  className="text-white"
                />
                <IconButton
                  href="/gallery"
                  // label="Gallery"
                  icon={Images}
                  className="text-white"
                />
                <IconButton
                  href="/browse"
                  // label="Browse"
                  icon={Compass}
                  className="text-white"
                />

                {/* Language toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleLang}
                      aria-label={`Language: ${lang}`}
                      className="relative px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white flex items-center gap-2"
                    >
                      <Globe className="h-6 w-6 text-white " />
                      <span className="hidden sm:block text-xm font-medium">
                        {lang}
                      </span>
                    </button>
                  </TooltipTrigger>
                </Tooltip>

                {/* Sign in / Profile */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="/signin"
                      className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white flex items-center gap-2"
                      aria-label="Sign in / Profile"
                    >
                      <User className="h-6 w-6 text-white" />
                      <span className="hidden sm:block text-xm font-medium">
                        Sign in
                      </span>
                    </a>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </nav>

      {/* Transparent Collapsible Sidebar */}
      {/* Desktop: collapsed/expanded; Mobile: off-canvas */}
      <TooltipProvider delayDuration={0}>
        <motion.aside
          onMouseEnter={handleSidebarEnter}
          onMouseLeave={handleSidebarLeave}
          initial={false}
          animate={{
            width: isDesktop
              ? sidebarExpanded
                ? expandedWidth
                : collapsedWidth
              : sidebarMobileOpen
              ? mobileWidth
              : 0,
            x: isDesktop ? 0 : sidebarMobileOpen ? 0 : -mobileWidth,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
          className={`fixed left-0 top-0 z-40 h-screen overflow-hidden ${glass} ${
            isDesktop ? "" : "max-w-[80vw]"
          }`}
          style={{ paddingTop: 64 }}
          aria-label="Sidebar"
          aria-expanded={isDesktop ? sidebarExpanded : sidebarMobileOpen}
        >
          {/* Close on mobile */}
          <div className="absolute top-2 right-2 lg:hidden">
            <button
              onClick={closeMobileSidebar}
              aria-label="Close sidebar"
              className="p-2 rounded-md hover:bg-white/10 transition-colors text-white"
            ></button>
          </div>

          <div className="h-full flex flex-col">
            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={item.href}
                            className={`group flex items-center rounded-md transition-colors hover:bg-white/10 text-white/90 hover:text-white px-4 py-2`}
                          >
                            {/* Icon stays fixed in place */}
                            <Icon className="h-6 w-6 text-white shrink-0" />

                            {/* Label: fade in/out but space remains reserved */}
                            <span
                              className={`ml-3 truncate transition-opacity duration-200 ${
                                isDesktop
                                  ? sidebarExpanded
                                    ? "opacity-100"
                                    : "opacity-0"
                                  : "opacity-100"
                              }`}
                              style={{
                                visibility:
                                  isDesktop && !sidebarExpanded
                                    ? "hidden"
                                    : "visible",
                              }}
                            >
                              {item.label}
                            </span>
                          </a>
                        </TooltipTrigger>
                        {/* Show tooltip only when collapsed on desktop
                        {isDesktop && !sidebarExpanded ? (
                          <TooltipContent side="right">
                            {item.label}
                          </TooltipContent>
                        ) : null} */}
                      </Tooltip>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer hint */}
            <div
              className={`border-t border-white/10 p-3 text-xs text-white/70 transition-opacity ${
                isDesktop && !sidebarExpanded ? "opacity-0" : "opacity-100"
              }`}
              style={{
                display: isDesktop && !sidebarExpanded ? "none" : "block",
              }}
            ></div>
          </div>
        </motion.aside>
      </TooltipProvider>

      {/* Mobile overlay when sidebar is open */}
      <AnimatePresence>
        {!isDesktop && sidebarMobileOpen ? (
          <motion.div
            className="fixed inset-0 z-30 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileSidebar}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function IconButton({ href = "#", label, icon: Icon, className = "" }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          aria-label={label}
          className={`px-3 py-2 rounded-md hover:bg-white/10 transition-colors flex items-center justify-center ${className}`}
          title={label}
        >
          <Icon className="h-6 w-6 text-white" />
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}
