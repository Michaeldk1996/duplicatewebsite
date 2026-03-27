// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const primaryFont = 'Public Sans, sans-serif';
const secondaryFont = 'sans-serif';

// ----------------------------------------------------------------------

const typography = {
  fontFamily: primaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(28),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 28, md: 48, lg: 48 }),
  },
  h1_extra: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 40, md: 40, lg: 40 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 48 / 36,
    fontSize: pxToRem(28),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 28, md: 28, lg: 36 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 24, md: 30, lg: 32 }),
  },
  h3_extra: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(26),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 26, md: 26, lg: 26 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 400,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  h7: {
    fontWeight: 400,
    lineHeight: 20 / 16,
    fontSize: pxToRem(17),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

export default typography;
