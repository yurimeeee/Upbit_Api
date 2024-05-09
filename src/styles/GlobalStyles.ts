"use client";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
  
  @font-face {
    font-family: 'PretendardRegular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'PretendardMedium';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'PretendardSemiBold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'PretendardBold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }


  /* @font-face {
    font-family: 'AppleSDGothicNeoEB';
    src: local("AppleSDGothicNeoEB"), url('/fonts/AppleSDGothicNeoEB.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoB';
    src: local("AppleSDGothicNeoB"), url('/fonts/AppleSDGothicNeoB.woff') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoSB';
    src: local("AppleSDGothicNeoSB"), url('/fonts/AppleSDGothicNeoSB.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoM';
    src: local("AppleSDGothicNeoM"), url('/fonts/AppleSDGothicNeoM.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'AppleSDGothicNeoR';
    src: local("AppleSDGothicNeoR"), url('/fonts/AppleSDGothicNeoR.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  } */

  * {
    box-sizing: border-box;
    
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  body {
    font-family: 'PretendardRegular', sans-serif;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* background-color: ${({ theme }) => theme.colors.whiteColor}; */
    background-color: #F5F7F9;

    body::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.blackColor};
    text-decoration: none;
  }

  textarea {
    resize: none;
  }

  input,
  textarea {
    font-size: 16px;
    font-family: 'PretendardRegular';
    border: none;
    outline: none;
    background-color: inherit;

    &::placeholder {
      font-size: 14px;
      font-family: 'PretendardRegular', 'Roboto', sans-serif;
    }
    
    &:disabled {
      color: ${({ theme }) => theme.colors.blackColor};
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  button {
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.whiteColor};
  }

  select {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

`;
