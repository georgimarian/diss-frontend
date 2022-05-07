import { FC, ReactNode, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type AppCardProps = {
  title: string;
  background?: string;
  children: ReactNode;
};

const AppCard: FC<AppCardProps> = ({
  title,
  background = '#ffffff',
  children,
}) => {
  return (
    <Card
      sx={{
        background: background,
        marginBottom: '10px',
      }}
      raised
    >
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default AppCard;
