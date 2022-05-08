import AppPage from '../components/AppPage';
import { Student, Teacher } from '../models/common';
import TeachersTable from '../components/TeachersTable';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RequestStatus } from 'models/common.enums';
import { Roles } from 'utils/roles';

const Teachers = (props: {
  s: Student;
  teachers: Teacher[];
  createRequest: (student: Student, teacher: Teacher) => void;
}) => {
  const user = JSON.parse(localStorage.getItem('user') || '');

  const studentContent = () => {
    if (
      props.s.requestsLeft > 0 ||
      props.s.requests
        .map((r) => r.status)
        .find((x) => x !== RequestStatus.DENIED)
    )
      return (
        <>
          <TeachersTable
            rows={props.teachers}
            student={props.s}
            createRequest={(s: Student, t: Teacher) =>
              props.createRequest(s, t)
            }
            view={user.role}
          />
          <Typography variant='h6' sx={{ padding: '2px' }} align='left'>
            Mai ai{' '}
            <Typography
              sx={{
                color: props.s.requestsLeft < 1 ? 'red' : 'green',
                display: 'inline',
              }}
            >
              {props.s.requestsLeft}
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
          startIcon={<AddIcon sx={{ color: 'green' }} />}
        >
          Cere ajutorul adminilor{' '}
        </Button>
      </>
    );
  };
  return (
    <AppPage title='Profesori'>
      {user.role === Roles.Student ? (
        studentContent()
      ) : (
        <TeachersTable
          rows={props.teachers}
          student={props.s}
          createRequest={(s: Student, t: Teacher) => props.createRequest(s, t)}
          view={user.ROLE}
        />
      )}
    </AppPage>
  );
};

export default Teachers;
