// PayAI Guardian - Typography Design Tokens
export const typography = {
  // Font Families
  fontFamily: {
    primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    heading: ['Inter', 'SF Pro Display', 'sans-serif'],
  },

  // Font Sizes (Scaled System)
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px - Labels, badges
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - Secondary text
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px - Body text
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - Card titles
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px - Section headers
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px - Page titles
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - Dashboard numbers
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px - Hero/Balance
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px - Big stats
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,   // Headings
    normal: 1.5,   // Body
    relaxed: 1.625, // Long text
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;