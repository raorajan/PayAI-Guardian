import type { Config } from 'tailwindcss';
import { colors } from './src/styles/colors';
import { spacing } from './src/styles/spacing';
import { typography } from './src/styles/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary.DEFAULT,
        'primary-dark': colors.primary.dark,
        'primary-light': colors.primary.light,
        accent: colors.accent.DEFAULT,
        'accent-glow': colors.accent.glow,
        danger: colors.danger,
        warning: colors.warning,
        success: colors.success,
        security: colors.security,
        bg: {
          base: colors.bg.base,
          surface: colors.bg.surface,
          elevated: colors.bg.elevated,
          secondary: colors.bg.secondary,
          tertiary: colors.bg.tertiary,
        },
      },
      spacing: spacing.space,
      borderRadius: spacing.borderRadius,
      boxShadow: spacing.boxShadow,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
    },
  },
  plugins: [],
};

export default config;