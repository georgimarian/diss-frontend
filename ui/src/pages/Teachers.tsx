import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AppPage from '../components/AppPage';
import {createThesisRequest, parseUser, storeUser, ThesisRequest} from '../utils/models/common';
import TeachersTable from '../components/TeachersTable';
import {RequestStatus, Roles} from 'utils/models/common.enums';
import {RequestAPI} from "../utils/connection.config";

const Teachers = () => {
  const user = parseUser();
  function createAdminRequest(){
      RequestAPI.Request(createThesisRequest(user, -1)).then(req => {
          if (req) {
              user.requests.push(req);
              user.requestsLeft -= 1;
              storeUser(user)
              window.location.reload()
          }
      });
    }

  const studentContent = () => {
    if (
      user.requestsLeft > 0 ||
      user.requests
        .map((r: ThesisRequest) => r.status)
        .find((x : RequestStatus) => x !== RequestStatus.DENIED)
    )
      return (
        <>
          <TeachersTable
            view={user.type}
          />
          <Typography variant='h6' sx={{ padding: '2px' }} align='left'>
            Mai ai{' '}
            <Typography
              sx={{
                color: user.requestsLeft < 1 ? 'red' : 'green',
                display: 'inline',
              }}
            >
              {user.requestsLeft}
            </Typography>{' '}
            cereri rămase
          </Typography>
        </>
      );

    return (
      <>
        <Typography variant='h5' sx={{ padding: '2px' }} align='left'>
          Mai ai <p style={{ color: 'red', display: 'inline' }}>0</p> cereri
          rămase. Te rugăm să ceri adminilor să îți aleagă un profesor.
        </Typography>
        <Button
          variant='outlined'
          sx={{ color: 'red' }}
          onClick={createAdminRequest}
          startIcon={<AddIcon sx={{ color: 'green' }} />}
        >
          Cere ajutorul adminilor{' '}
        </Button>
      </>
    );
  };
  return (
    <AppPage title='Profesori'>
      {user.type === Roles.STUDENT ? (
        studentContent()
      ) : (
        <TeachersTable
          view={user.type}
        />
      )}
    </AppPage>
  );
};

export default Teachers;
