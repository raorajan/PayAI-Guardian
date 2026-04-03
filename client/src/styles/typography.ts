// PayAI Guardian - Typography Design Tokens (Updated v2)
export const typography = {
  // ── Font Families ────────────────────────────────────────
  fontFamily: {
    primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
    heading: ['Inter', 'SF Pro Display', 'sans-serif'],
  },

  // ── Font Sizes ───────────────────────────────────────────
  fontSize: {
    '2xs': ['0.6875rem', { lineHeight: '1rem' }],     // 11px — labels, badges, caps
    xs:    ['0.75rem',   { lineHeight: '1rem' }],     // 12px — helper text
    sm:    ['0.8125rem', { lineHeight: '1.25rem' }],  // 13px — secondary text
    base:  ['0.875rem',  { lineHeight: '1.5rem' }],   // 14px — body text
    md:    ['1rem',      { lineHeight: '1.5rem' }],   // 16px — standard
    lg:    ['1.125rem',  { lineHeight: '1.75rem' }],  // 18px — card titles
    xl:    ['1.25rem',   { lineHeight: '1.75rem' }],  // 20px — section headers
    '2xl': ['1.5rem',    { lineHeight: '2rem' }],     // 24px — page titles / h2
    '3xl': ['1.875rem',  { lineHeight: '2.25rem' }],  // 30px — dashboard numbers
    '4xl': ['2.25rem',   { lineHeight: '2.5rem' }],   // 36px — hero / balance
    '5xl': ['3rem',      { lineHeight: '1' }],        // 48px — big stats
  },

  // ── Font Weights ─────────────────────────────────────────
  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold: 800,
  },

  // ── Line Heights ─────────────────────────────────────────
  lineHeight: {
    none:     1,
    tight:    1.25,
    snug:     1.375,
    normal:   1.5,
    relaxed:  1.625,
    loose:    1.8,
  },

  // ── Letter Spacing ───────────────────────────────────────
  letterSpacing: {
    tightest: '-0.04em',
    tight:    '-0.025em',
    normal:   '0',
    wide:     '0.025em',
    wider:    '0.05em',
    widest:   '0.1em',
    caps:     '0.15em',  // for ALL CAPS labels like "GUARDIAN"
  },
} as const;