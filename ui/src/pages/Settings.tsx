import { useEffect, useState } from 'react';

import { Box, Divider, TextField, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from '@mui/icons-material';

import AppPage from 'components/AppPage';

type Criterion = {
  name: string;
  value: number;
};

const MOCK_CRITERIA: Array<Criterion> = [
  {
    name: 'Introducere',
    value: 10,
  },
  {
    name: 'Cercetare Bibliografică',
    value: 20,
  },
  {
    name: 'Aspecte Teoretice',
    value: 30,
  },
  {
    name: 'Studii de cercetare',
    value: 20,
  },
  {
    name: 'Concluzie',
    value: 10,
  },
];

const Settings = () => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [criteria, setCriteria] = useState<Array<Criterion> | undefined>(
    undefined
  );

  useEffect(() => {
    setCriteria(MOCK_CRITERIA);
  }, []);

  const criteriaArea = () => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: 10,
          bgcolor: theme.palette.secondary.dark,
          padding: '20px',
        }}
      >
        <Typography variant='h5'>Criterii de notare</Typography>
        {(criteria || []).map((criterion: Criterion, index: number) => (
          <span
            key={criterion.name}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              minHeight: '50px',
            }}
          >
            {index + 1}. <b>{criterion.name}</b> : Pondere notă:{' '}
            {!isEditing ? (
              <span>{criterion.value} %</span>
            ) : (
              <TextField
                id={criterion.name}
                variant='standard'
                size='small'
                defaultValue={criterion.value}
              />
            )}
          </span>
        ))}
        {isEditing ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '50px',
            }}
          >
            Salvezi? Da <CheckIcon onClick={() => setIsEditing(false)} />
            Nu <RemoveCircleOutlineIcon onClick={() => setIsEditing(false)} />
          </span>
        ) : (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '50px',
            }}
          >
            Modifica? <EditIcon onClick={() => setIsEditing(true)} />
          </span>
        )}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
          }}
        >
          Adaugă un criteriu nou
          <AddCircleOutline />
        </span>
      </Box>
    );
  };

  return <AppPage title='Setări'>{criteriaArea()}</AppPage>;
};

export default Settings;
