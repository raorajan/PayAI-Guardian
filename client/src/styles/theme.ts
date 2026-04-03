// PayAI Guardian - Main Theme Object (Updated v2)
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,

  // ── Animation ─────────────────────────────────────────────
  animation: {
    duration: {
      instant:  '100ms',
      fast:     '150ms',
      normal:   '200ms',
      moderate: '300ms',
      slow:     '500ms',
      glacial:  '1000ms',
    },
    easing: {
      ease:      'ease',
      easeIn:    'ease-in',
      easeOut:   'ease-out',
      easeInOut: 'ease-in-out',
      spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    // Named keyframes used throughout the app
    keyframes: {
      spinSlow:   'spin-slow  22s linear infinite',
      spinRev:    'spin-rev   14s linear infinite',
      pulseGlow:  'pulse-glow  3s ease-in-out infinite',
      float:      'orb-float   4s ease-in-out infinite',
    },
  },

  // ── Breakpoints ───────────────────────────────────────────
  breakpoints: {
    xs:  '480px',
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },

  // ── Z-index Layers ────────────────────────────────────────
  zIndex: {
    base:     0,
    above:    1,
    dropdown: 1000,
    sticky:   1020,
    fixed:    1030,
    overlay:  1035,
    modal:    1040,
    popover:  1050,
    tooltip:  1060,
  },

  // ── Blur Levels ───────────────────────────────────────────
  blur: {
    sm:   'blur(8px)',
    md:   'blur(12px)',
    lg:   'blur(24px)',   // Glass card
    xl:   'blur(40px)',   // Background orbs
    '2xl':'blur(60px)',
  },

  // ── Gradients ─────────────────────────────────────────────
  gradients: {
    // Button / CTA
    primaryCta:    'linear-gradient(135deg, #0A66C2 0%, #00C8FF 100%)',
    // AI Shield icon
    shieldStroke:  'linear-gradient(135deg, #00C8FF 0%, #4060FF 50%, #8040FF 100%)',
    // Background orbs
    orbBlue:   'radial-gradient(circle, rgba(20,70,190,0.3) 0%, transparent 70%)',
    orbPurple: 'radial-gradient(circle, rgba(100,40,200,0.22) 0%, transparent 70%)',
    orbCyan:   'radial-gradient(circle, rgba(0,160,255,0.12) 0%, transparent 70%)',
    // Dot grid overlay
    grid: [
      'linear-gradient(rgba(0,200,255,0.035) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(0,200,255,0.035) 1px, transparent 1px)',
    ],
    // Card top glow line
    cardTopLine: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.7), transparent)',
    // Logo badge
    logoBadge: 'linear-gradient(135deg, #0A66C2, #00C8FF)',
  },
} as const;

export type Theme = typeof theme;

// ── Semantic token helpers ────────────────────────────────────
// Use these shortcuts in components for better readability
export const t = {
  color: theme.colors,
  space: theme.spacing,
  font:  theme.typography,
  anim:  theme.animation,
  grad:  theme.gradients,
  z:     theme.zIndex,
} as const;