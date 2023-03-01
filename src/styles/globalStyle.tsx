import { css } from '@emotion/react'

export const GlobalStyles = css`
  @font-face {
    font-family: 'raleway';
    src: url('/Raleway-ExtraBold.ttf');
  }
  @font-face {
    font-family: 'inter-r';
    src: url('/Inter-Regular.ttf');
  }
  @font-face {
    font-family: 'inter-m';
    src: url('/Inter-Medium.ttf');
  }
  @font-face {
    font-family: 'inter-sb';
    src: url('Inter-SemiBold.ttf');
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
