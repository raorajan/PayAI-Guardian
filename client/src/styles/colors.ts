// PayAI Guardian - Color Design Tokens
export const colors = {
  // Primary Colors - Banking Trust
  primary: {
    DEFAULT: '#0A66C2', // Trust blue
    dark: '#084A8F',    // Hover states
    light: '#3B82F6',   // Active states
  },

  // AI Accent - Neon
  accent: {
    DEFAULT: '#00F5FF', // Cyan - AI interactions
    glow: 'rgba(0, 245, 255, 0.3)', // Glow effect
  },

  // Status Colors
  danger: '#FF3B5C',    // Red - fraud blocks
  warning: '#FFA500',   // Orange - suspicious
  success: '#00C851',   // Green - approved
  security: '#6366F1',  // Purple - blockchain

  // Neutral Colors
  neutral: {
    // Dark Mode (Default)
    bg: {
      primary: '#0A0A0F',   // Main background
      secondary: '#1A1A24', // Card background
      tertiary: '#2A2A35',  // Input backgrounds
    },
    // Light Mode (Optional)
    light: {
      bg: '#F8FAFF',
      text: '#1A1A2E',
    },
  },

  // Glass Effects
  glass: {
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    blur: 'blur(12px)',
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
  },
} as const;