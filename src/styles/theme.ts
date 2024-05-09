"use client";

import { DefaultTheme } from "styled-components";
// import media from './media';
export type ColorsTypes = typeof colors;
export type DeviceTypes = typeof devices;
export type TypographyTypes = typeof typography;

const typography = {
  cp: {
    fontSize: "12px",
    lineHeight: "18px",
  },
  bp: {
    fontSize: "18px",
    lineHeight: "26px",
  },
  bm: {
    fontSize: "14px",
    lineHeight: "22px",
  },
  h2: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  h1: {
    fontSize: "20px",
    lineHeight: "28px",
  },
  t1: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  lt: {
    fontSize: "28px",
    lineHeight: "36px",
  },
};

const colors = {
  // General
  whiteColor: "#FFFFFF",
  blackColor: "#000000",
  activeRed: "#D61111",
  activeBlue: "#265FCA",
  primaryColor: "#729BF1",

  // Font
  grayFontColor: "#6D737F",
  deepGrayFontColor: "#6E6E6E",
  darkGrayFontColor: "#333333",
  lightGrayFontColor: "#B3B3B3",
  ultraLightGrayFontColor: "#8A8A8A",
  darkFontColor: "#1D2433",
  // darkFontColor: "#1D2433",

  // Border
  grayBorderColor: "#E1E6EF",

  // Icon
  grayIconColor: "#AAAAAA",

  // Background
  // deepNavyBlueBgColor: "#2F3644",
  // footerBgColor: "#F9F9F9",
  lightGrayBgColor: "#F1F3F9",
  ultralightBlueBgColor: "#FAFCFF",
  lightBlueBgColor: "#F5F7F9",
};

const deviceSizes = {
  mobile: 320,
  tablet: 720,
  desktop: 1080,
};
const devices = {
  mobile: `@media screen and (max-width: ${deviceSizes.tablet - 1}px)`,
  tablet: `@media screen and (min-width: ${deviceSizes.tablet}px) and (max-width: ${deviceSizes.desktop}px)`,
  desktop: `@media screen and (min-width: ${deviceSizes.desktop}px)`,
};

const theme: DefaultTheme = {
  colors,
  typography,
  devices
};

export default theme;
