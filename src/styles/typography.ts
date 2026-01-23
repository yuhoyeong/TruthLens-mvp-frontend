/**
 * TruthLens Design System - Typography
 * 디자인 시스템의 타이포그래피를 정의합니다.
 * Font: Pretendard
 */

export const typography = {
  title1: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '48px',
    letterSpacing: '-2%',
  },
  title2: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '38px',
    letterSpacing: '-2%',
  },
  title3: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    letterSpacing: '-2%',
  },
  heading1: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '-2%',
  },
  heading2: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '-2%',
  },
  headline1: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '26px',
    letterSpacing: '-2%',
  },
  headline2: {
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '-2%',
  },
  body1: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-2%',
  },
  body1Regular: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '-2%',
  },
  body2: {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-2%',
  },
  body2Regular: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-2%',
  },
  label1Normal: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-2%',
  },
  label1Regular: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-2%',
  },
  label2: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-2%',
  },
  caption1: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-2%',
  },
  caption2: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '-2%',
  },
} as const;

export type TypographyKey = keyof typeof typography;
