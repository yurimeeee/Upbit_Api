'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import theme from '@styles/theme';

import LogoImg from '@assets/images/coninlab_logo.png';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Logo href="/">
          <Img src={LogoImg} alt="로고" />
        </Logo>
      </Container>
    </Wrapper>
  );
};

export default Header;

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: ${theme.colors.whiteColor};
  margin: 0 auto;
  transition: 0.5s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1920px; */
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
`;

export const Logo = styled(Link)`
  width: 108px;
`;
export const Img = styled(Image)``;
export const GnbItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${theme.devices.desktop} {
    gap: 32px;
  }
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & > a:first-child {
    position: relative;
    padding-right: 0;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 4px;
      width: 1px;
      height: 16px;
      display: none;

      ${theme.devices.desktop} {
        display: block;
      }
    }

    ${theme.devices.desktop} {
      padding-right: 12px;
    }
  }
`;
export const GnbItem = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
`;
export const GnbText = styled.span`
  color: ${theme.colors.lightGrayFontColor};
  font-size: 14px;
  line-height: 24px;
  display: none;

  ${theme.devices.desktop} {
    display: flex;
  }
`;
