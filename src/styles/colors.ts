/**
 * TruthLens Design System - Colors
 * 디자인 시스템의 컬러 팔레트를 정의합니다.
 */

export const colors = {
  // Main
  primary: '#2121E5', // French Ultramarine

  // Grayscale
  white: '#FFFFFF',
  neutral: {
    99: '#F7F7F7',
    98: '#F4F4F5',
    96: '#E1E2E4',
    95: '#DBDCDF',
    90: '#C2C4C8',
    80: '#AEB0B6',
    70: '#989BA2',
    60: '#878A93',
    50: '#70737C',
    40: '#5A5C63',
    30: '#46474C',
    25: '#37383C',
    23: '#333438',
    22: '#2E2F33',
    20: '#292A2D',
    17: '#212225',
    15: '#1B1C1E',
    10: '#171719',
    7: '#141415',
    5: '#0F0F10',
  },
  background: '#FCFCFC',
} as const;

export type ColorKey = keyof typeof colors;
export type NeutralKey = keyof typeof colors.neutral;
