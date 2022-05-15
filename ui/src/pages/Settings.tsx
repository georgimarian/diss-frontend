import { useEffect, useState } from 'react';

import { Box, Divider, TextField, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from '@mui/icons-material';

import AppPage from 'components/AppPage';
import {Criterion, parseCriterias, storeCriterias} from "../utils/models/common";
import {RequestAPI} from "../utils/connection.config";



const Settings = () => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [criteria, setCriteria] = useState<Criterion[] | undefined>(
    parseCriterias
  );

  useEffect(() => {
      if(criteria){
          storeCriterias(criteria)
          RequestAPI.setCriterias(criteria)
      }
  }, [criteria]);

    function setNewCriteriaName(value: string, index: number) {
        if (criteria) {
            let crr = criteria[index]

        let oldName = crr.name;
        crr.name = value;
        setCriteria(criteria?.map(cr => cr.name === oldName ? crr : cr))
        }
    }
    function setNewCriteriaValue(value: number, index: number) {
        if (criteria) {
            let crr = criteria[index]
            crr.value = value;
            setCriteria(criteria?.map(cr => cr.name === crr.name ? crr : cr))
        }
    }

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
          >{index + 1}. {!isEditing ? (
              <span>{criterion.name}</span>
          ) : (
              <TextField
                  variant='standard'
                  size='small'
                  defaultValue={criterion.name}
                  onChange={(e) => setNewCriteriaName(e.target.value,index)}
              />
          )}
              : Pondere notă:{' '}
            {!isEditing ? (
              <span>{criterion.value} %</span>
            ) : (
              <TextField
                variant='standard'
                size='small'
                type={"number"}
                defaultValue={criterion.value}
                onChange={(e) => setNewCriteriaValue(+e.target.value,index)}
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
