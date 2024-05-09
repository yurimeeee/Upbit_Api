'use client';

import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import { sortByColumn } from '@recoil/atoms';
import { useRecoilState } from 'recoil';

export type HeaderType = {
  label: string;
  minWidth?: number;
  width: number;
  sort: string;
};

type TableRowProps = {
  headers: HeaderType[];
};

const TableHeader = ({ headers = [] }: TableRowProps) => {
  const [sortBy, setSortBy] = useRecoilState(sortByColumn);

  const onHeaderClick = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <Wrapper>
      {headers.map((header: HeaderType, index: number) => {
        return (
          <TableCell key={`${index}-table-header`} $minWidth={header?.minWidth} $width={header.width} onClick={() => onHeaderClick(header?.sort)}>
            {header.label}
          </TableCell>
        );
      })}
    </Wrapper>
  );
};

export default TableHeader;

const Wrapper = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.grayBorderColor};
  border-bottom: 1px solid ${theme.colors.grayBorderColor};
  width: 100%;
  max-width: 400px;
  background: ${theme.colors.lightGrayBgColor};
`;
const TableCell = styled.div<{ $minWidth?: number; $width: number; $fontColor?: string }>`
  min-width: ${({ $minWidth }) => ($minWidth ? `${$minWidth}px` : 'auto')};
  width: ${({ $width }) => $width}%;
  text-align: center;
  font-family: 'PretendardRegular';
  color: ${({ $fontColor }) => ($fontColor ? $fontColor : theme.colors.blackColor)};
  font-size: 13px;
`;
