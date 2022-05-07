import { FC, ReactNode, useState } from 'react';
import { styled } from '@mui/material';

type CardDivProps = {
  props: {
    background: string;
  };
};
const CardDiv = styled('div')<CardDivProps>(({ props, theme }) => ({
  padding: '8px',
  margin: '8px',
  width: '100%',
  border: '1px',
  background: props.background,
  borderRadius: '5px',
}));

type CardProps = {
  title: string;
  background?: string;
  children: ReactNode;
};

const Card: FC<CardProps> = ({ title, background = '#b3d7f5', children }) => {
  return (
    <CardDiv props={{ background: background }}>
      <h5>{title}</h5>
      {children}
    </CardDiv>
  );
};

export default Card;
