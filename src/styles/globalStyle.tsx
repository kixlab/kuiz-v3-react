import { css } from '@emotion/react'
import raleway from '../asset/Raleway-ExtraBold.ttf'
import interR from '../asset/Inter-Regular.ttf'
import interM from '../asset/Inter-Medium.ttf'
import interSb from '../asset/Inter-SemiBold.ttf'

export const GlobalStyles = css`
  @font-face {
    font-family: 'raleway';
    src: url(${raleway});
  }
  @font-face {
    font-family: 'inter-r';
    src: url(${interR});
  }
  @font-face {
    font-family: 'inter-m';
    src: url(${interM});
  }
  @font-face {
    font-family: 'inter-sb';
    src: url(${interSb});
  }
  body {
    background-color: #e6eaef;
    display: flex;
    justify-content: center;
  }
  .Box {
    width: 70vw;
    position: absolute;
    top: 80px;
    margin: 0 auto 0 auto;
    box-sizing: border-box;
  }
  @media (max-width: 599px) {
    body {
      flex-direction: column;
    }
    .Box {
      width: calc(100vw - 40px);
      margin: 0 20px 0 20px;
      top: 50px;
    }
  }
`
