import React from 'react';
import { Typography } from '@mui/material';
import { CompanyList } from './CompanyList';

export const CompanyScreen: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Typography variant="h6" gutterBottom className='pt-4'>
        Compañías
      </Typography>
      <CompanyList />
    </div>
  );
};