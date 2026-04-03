// PayAI Guardian - Color Design Tokens (Updated v2)
export const colors = {
  // ── Brand Primary (Trust Blue) ──────────────────────────
  primary: {
    DEFAULT:  '#0A66C2', // Main CTA blue
    dark:     '#084A8F', // Hover / pressed
    light:    '#4060FF', // Accent / gradient end
    gradient: 'linear-gradient(135deg, #0A66C2 0%, #00C8FF 100%)',
  },

  // ── AI Accent (Neon Cyan) ────────────────────────────────
  accent: {
    DEFAULT:  '#00C8FF', // Primary neon — inputs, links, badges
    glow:     'rgba(0, 200, 255, 0.3)',  // Box-shadow glow
    focus:    'rgba(0, 200, 255, 0.12)', // Focus ring fill
    subtle:   'rgba(0, 200, 255, 0.04)', // Very faint tint
  },

  // ── Security & Status ────────────────────────────────────
  security: '#8040FF',         // Purple — blockchain / security
  danger:   '#FF3B5C',         // Red — fraud block / error
  warning:  '#FFA500',         // Orange — suspicious activity
  success:  '#00C851',         // Green — approved / confirmed

  // ── Background Scale (Dark-first) ───────────────────────
  bg: {
    base:       '#050810', // Deepest — page root
    surface:    '#080C1E', // Cards, glass surfaces
    elevated:   '#0F1320', // Tooltips, popovers
    secondary:  '#1A1A24', // Sub-panels
    tertiary:   '#2A2A35', // Input fills, hover states
  },

  // ── Glass Effects ────────────────────────────────────────
  glass: {
    bg:     'rgba(8, 12, 30, 0.88)',        // Card background
    border: 'rgba(0, 200, 255, 0.18)',      // Cyan border
    white:  'rgba(255, 255, 255, 0.04)',    // White-tint bg
    blur:   'blur(24px)',
  },

  // ── Text Scale ───────────────────────────────────────────
  text: {
    primary:   '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.70)',
    muted:     'rgba(255, 255, 255, 0.45)',
    faint:     'rgba(255, 255, 255, 0.30)',
    disabled:  'rgba(255, 255, 255, 0.20)',
  },

  // ── Dividers / Borders ───────────────────────────────────
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.08)',
    subtle:  'rgba(255, 255, 255, 0.05)',
    strong:  'rgba(255, 255, 255, 0.15)',
  },

  // ── Orbit ring colors (for AI visual components) ─────────
  orbit: {
    cyan:   '#00C8FF',
    purple: '#8040FF',
    blue:   '#4060FF',
  },
} as const;