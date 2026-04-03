// PayAI Guardian - Spacing & Layout Design Tokens (Updated v2)
export const spacing = {
  // ── Base 4px Grid ────────────────────────────────────────
  space: {
    0:   '0',
    0.5: '0.125rem',  // 2px
    1:   '0.25rem',   // 4px
    1.5: '0.375rem',  // 6px
    2:   '0.5rem',    // 8px
    2.5: '0.625rem',  // 10px
    3:   '0.75rem',   // 12px
    3.5: '0.875rem',  // 14px
    4:   '1rem',      // 16px
    5:   '1.25rem',   // 20px
    6:   '1.5rem',    // 24px
    7:   '1.75rem',   // 28px
    8:   '2rem',      // 32px
    9:   '2.25rem',   // 36px
    10:  '2.5rem',    // 40px
    12:  '3rem',      // 48px
    14:  '3.5rem',    // 56px
    16:  '4rem',      // 64px
    20:  '5rem',      // 80px
    24:  '6rem',      // 96px
  },

  // ── Border Radius ─────────────────────────────────────────
  borderRadius: {
    none: '0',
    sm:   '0.375rem',  //  6px — small chips
    md:   '0.5rem',    //  8px — buttons, badges
    lg:   '0.625rem',  // 10px — inputs, cards
    xl:   '0.75rem',   // 12px — modals
    '2xl':'1rem',      // 16px — glass panels
    '3xl':'1.25rem',   // 20px — full cards (auth card)
    full: '9999px',    // pill / circle
  },

  // ── Box Shadows ───────────────────────────────────────────
  boxShadow: {
    // Standard elevation
    sm:  '0 1px 2px 0 rgba(0,0,0,0.05)',
    md:  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    lg:  '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    xl:  '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    // Glow shadows (brand)
    'glow-cyan':   '0 0 0 3px rgba(0,200,255,0.12)',           // Input focus ring
    'glow-primary':'0 4px 20px rgba(0,150,255,0.4)',            // Button resting
    'glow-primary-hover': '0 6px 28px rgba(0,150,255,0.65)',   // Button hover
    'glow-card':   '0 0 50px rgba(0,100,220,0.18), 0 0 100px rgba(80,30,180,0.1)', // Auth card
    'glow-logo':   '0 0 14px rgba(0,100,220,0.5)',             // Logo badge
    'glow-orbit':  '0 0 12px rgba(0,200,255,0.9)',             // Orbit dot
  },
} as const;