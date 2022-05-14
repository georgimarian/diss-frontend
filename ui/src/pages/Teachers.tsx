import { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AppPage from '../components/AppPage';
import { Student, Teacher, ThesisRequest } from '../utils/models/common';
import TeachersTable from '../components/TeachersTable';
import {RequestStatus, Roles} from 'utils/models/common.enums';
import { StudentContext, TeacherContext } from 'App';

const Teachers = (props: { s: Student; teachers: Teacher[] }) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
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

  console.log(props.s);

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
            createRequest={(s: Student, t: Teacher) => createRequest(s, t)}
            view={user.type}
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
      {user.type === Roles.STUDENT ? (
        studentContent()
      ) : (
        <TeachersTable
          rows={props.teachers}
          student={props.s}
          createRequest={(s: Student, t: Teacher) => createRequest(s, t)}
          view={user.type}
        />
      )}
    </AppPage>
  );
};

export default Teachers;
