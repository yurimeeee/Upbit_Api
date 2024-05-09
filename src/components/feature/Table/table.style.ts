'use client';

import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import { RegularFont } from '@components/styled/StyledComponents';
import { keyframes } from 'styled-components';
import Image from 'next/image';

export const TableBody = styled.div<{ $minHeight?: number }>`
  min-height: ${({ $minHeight }) => ($minHeight ? `${$minHeight}px` : '300px')};
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.grayBorderColor};
`;
export const TableRow = styled.div<{ $disabled?: boolean; $height?: number }>`
  /* height: 45px; */
  height: ${({ $height }) => ($height ? `${$height}px` : '45px')};
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.grayBorderColor};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      &:hover {
        background-color: ${theme.colors.whiteColor};
      }

      & * {
        color: ${theme.colors.lightGrayFontColor};
      }
    `};
`;
export const TableCell = styled.div<{ $minWidth?: number; $width: number }>`
  min-width: ${({ $minWidth }) => $minWidth ? `${$minWidth}px` : 'auto'};
  width: ${({ $width }) => $width}%;
  font-family: 'PretendardRegular';
`;
export const TableText = styled.div<{ $textAlign?: string; $priceChange?: string; $justifyContent?: string }>`
  width: 92%;
  height: 100%;
  white-space: nowrap;
  margin: 0 auto;
  text-align: ${({ $textAlign }) => $textAlign ? $textAlign : 'center'};
  display: flex;
  align-items:center;
  justify-content: ${({ $justifyContent }) => $justifyContent ? $justifyContent : 'center'};
  font-size: 13px;
  position: relative;

  color: ${({ $priceChange }) => {
    if ($priceChange === 'RISE') {
      return `${theme.colors.activeRed} !important`; // 0보다 큰 경우 레드컬러
    } else if ($priceChange === 'FALL') {
      return `${theme.colors.activeBlue} !important`; // 0보다 작은 경우 블루컬러
    } else {
      return theme.colors.blackColor; // 0인 경우 블랙컬러
    }
  }};

* {
  color: ${({ $priceChange }) => {
    if ($priceChange === 'RISE') {
      return `${theme.colors.activeRed} !important`
    } else if ($priceChange === 'FALL') {
      return `${theme.colors.activeBlue} !important`;
    } else {
      return theme.colors.blackColor;
    }
  }};
}

/* &::after{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  width: 100%;
  padding: 10px;
  border: ${({ $priceChange }) => {
    if ($priceChange === 'RISE') {
      return `1px solid ${theme.colors.activeRed}`;
    } else if ($priceChange === 'FALL') {
      return `1px solid ${theme.colors.activeBlue}`;
    } else {
      return 'none';
    }
  }};
} */
&.price-changed::after{
  content:'';
    display:block;
    position: absolute;
  width: 80%;
  height: 100%;
  top:-12px;
  right: -6px;
  width: 100%;
  padding: 10px;
  border: ${({ $priceChange }) => {
    if ($priceChange === 'RISE') {
      return `1px solid ${theme.colors.activeRed}`;
    } else if ($priceChange === 'FALL') {
      return `1px solid ${theme.colors.activeBlue}`;
    } else {
      return 'none';
    }
  }};
/* background:pink; */
}

`;
export const SymbolImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
export const Favorite = styled(Image)`
  width: 14px;
  height: 14px;
  margin-right: 6px;
`;
const blinkAnimation = keyframes
  `
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const Loader = styled.div<{ $minWidth?: number }>`
  width: 70%;
  min-width: ${({ $minWidth }) => $minWidth}px;
  height: 20px;
  margin: auto 10px;
  background: ${theme.colors.lightGrayBgColor};
  border-radius: 3px;
  animation: ${blinkAnimation} 1s infinite;
`;
