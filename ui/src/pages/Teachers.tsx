import { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AppPage from '../components/AppPage';
import {parseUser, Student, Teacher, ThesisRequest} from '../utils/models/common';
import TeachersTable from '../components/TeachersTable';
import {RequestStatus, Roles} from 'utils/models/common.enums';
import { StudentContext, TeacherContext } from 'App';

const Teachers = () => {
  const user = parseUser()
  const { students, setStudents } = useContext(StudentContext);
  const { teachers, setTeachers } = useContext(TeacherContext);

  const createRequest = (s: Student, t: Teacher) => {
    let req: ThesisRequest = {
      id: 1,
      teacherId: t.id,
      studentId: s.id,
      description: s.thesisDescription,
      status: RequestStatus.IN_PROGRESS,
    };
    let newS = { ...s };
    let newT = { ...t };
    newS.requests.push(req);
    newS.requestsLeft -= 1;
    newT.requests.push(req);
    let newStudents = students ? [...students] : [];
    let newTeachers = teachers ? [...teachers] : [];
    newStudents = newStudents.map((student) =>
      student.email === newS.email ? newS : student
    );
    newTeachers = newTeachers.map((teacher) =>
      teacher.email === newT.email ? newT : teacher
    );
    setTeachers(newTeachers);
    setStudents(newStudents);
  };

  console.log(user);

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
            createRequest={(s: Student, t: Teacher) => createRequest(s, t)}
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
          createRequest={(s: Student, t: Teacher) => createRequest(s, t)}
          view={user.type}
        />
      )}
    </AppPage>
  );
};

export default Teachers;
