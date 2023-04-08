import { css } from '@emotion/react'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export const palette = {
  common: {
    black: '#000000',
    white: '#ffffff',
    transparent: 'rgba(0,0,0,0)',
  },
  black: '#000000',
  white: '#ffffff',
  primaryLight: '#C6DAED',
  primaryMain: '#3d8add',
  primaryDark: '#346191',
  background: {
    main: '#e6eaef',
    light: '#EEF2F6',
    dark: '#C4CFDD',
  },
  tags: {
    answer: '#0F9C50',
    distractor: '#CF3434',
    contrastText: '#ffffff',
  },
  grey100: '#121212',
  grey200: '#323232',
  grey300: '#616161',
  grey400: '#919191',
  grey500: '#bdbdbd',
  grey600: '#f1f1f1',
} as const

export const typography = {
  logo: css`
    font-family: 'raleway';
    font-size: 20px;
    color: ${palette.primaryMain};
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 18px;
    }
  `,
  hStem: css`
    font-family: 'inter-sb';
    font-size: 18px;
    color: ${palette.grey100};
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 16px;
    }
  `,
  hLabel: css`
    font-family: 'inter-sb';
    font-size: 17px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 15px;
    }
  `,
  b01: css`
    font-family: 'inter-r';
    font-size: 16px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 14px;
    }
  `,
  b02: css`
    font-family: 'inter-r';
    font-size: 15px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 14px;
    }
  `,
  b02b: css`
    font-family: 'inter-m';
    font-size: 15px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 14px;
    }
  `,
  b03: css`
    font-family: 'inter-r';
    font-size: 14px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 13px;
    }
  `,
  b03b: css`
    font-family: 'inter-m';
    font-size: 1rem;
  `,
  button: css`
    font-family: 'inter-m';
    font-size: 1rem;
  `,
  smallbutton: css`
    font-family: 'inter-m';
    font-size: 12px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 14px;
    }
  `,
  overline: css`
    font-family: 'inter-r';
    font-size: 12px;
    @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
      font-size: 11px;
    }
  `,
}
