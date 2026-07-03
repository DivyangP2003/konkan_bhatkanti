'use client';

import { useRef, useEffect, useState } from 'react';
import { useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';

/**
 * Scroll animation hook system for immersive page experiences
 * Provides utilities for parallax, reveal, sticky scroll, and progress tracking
 */

// Hook to get overall scroll progress (0-1)
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(scrolled, 1));
    };

    const throttled = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  }, []);

  return scrollProgress;
}

// Hook to trigger animations when element enters viewport
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only observe once
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.margin || '0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.once, options.threshold, options.margin]);

  return { ref, isVisible };
}

// Hook for parallax effect based on scroll position
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, (latest) => latest * speed);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const elementBottom = elementTop + ref.current.offsetHeight;
        const windowCenter = window.scrollY + window.innerHeight / 2;

        // Calculate distance from center
        const distance = windowCenter - (elementTop + ref.current.offsetHeight / 2);
        y.set(distance);
      }
    };

    const throttled = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  }, [y]);

  return { ref, parallaxY };
}

// Hook for staggered animation of child elements
export function useStaggerAnimation(delay = 0.1) {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay,
          delayChildren: 0.2,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      },
    },
  };
}

// Hook to track element visibility for conditional rendering
export function useElementVisibility(threshold = 0.5) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Utility: Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Utility: Get scroll direction
export function useScrollDirection() {
  const [direction, setDirection] = useState('none');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    const throttled = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  }, []);

  return direction;
}
