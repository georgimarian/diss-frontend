import { useContext } from 'react';
import {
  Paper,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
} from '@mui/material';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AppPage from 'components/AppPage';

import {getEmptyStudent, Student, Teacher, ThesisRequest} from 'utils/models/common';
import { RequestStatus } from 'utils/models/common.enums';
import { StudentContext, TeacherContext } from '../App';

const Requests = (props: { students: Student[]; teacher: Teacher }) => {
  const theme = useTheme();
  const { teachers, setTeachers } = useContext(TeacherContext);
  const { students, setStudents } = useContext(StudentContext);

  const _user = JSON.parse(localStorage.getItem('user') || '');
  const teacher = (teachers || []).find((x) => x.username === _user.username);

  const answerRequest = (
    s: Student,
    t: Teacher,
    r: ThesisRequest,
    a: boolean
  ) => {
    let newR = { ...r };
    newR.status = a ? RequestStatus.APPROVED : RequestStatus.DENIED;
    let newS = { ...s };
    let newT = { ...t };
    newT.enrolledStudents.push(newS);
    newS.requests = newS.requests.map((req) =>
      req.studentId === newR.studentId && req.teacherId === newR.teacherId
        ? newR
        : req
    );
    newT.requests = newT.requests.map((req) =>
      req.studentId === newR.studentId && req.teacherId === newR.teacherId
        ? newR
        : req
    );
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

  return (
    <AppPage title='Cereri'>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 10, bgcolor: theme.palette.secondary.dark }}
      >
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Nume Student</TableCell>
              <TableCell align='center'>Descrierea tezei</TableCell>
              <TableCell align='center'>Statusul Cererii</TableCell>
              <TableCell align='center'>Răspunde</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacher?.requests.map((row: ThesisRequest) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>
                  {props.students.find(
                    (student) => student.id === row.studentId
                  )?.username ?? ''}
                </TableCell>
                <TableCell align='center'>
                  {props.students.find(
                    (student) => student.id === row.studentId
                  )?.thesisDescription ?? ''}
                </TableCell>
                <TableCell align='center'>{row.status}</TableCell>
                <TableCell align='center'>
                  {props.teacher.totalPlaces !==
                    props.teacher.enrolledStudents.length &&
                  row.status === RequestStatus.IN_PROGRESS ? (
                    <>
                      <Button
                        variant='outlined'
                        startIcon={<CheckIcon />}
                        onClick={() =>
                          answerRequest(
                            props.students.find(
                              (student) => student.id === row.studentId
                            ) ?? getEmptyStudent(),
                            props.teacher,
                            row,
                            true
                          )
                        }
                      ></Button>
                      <Button
                        variant='outlined'
                        startIcon={<CloseIcon />}
                        onClick={() =>
                          answerRequest(
                            props.students.find(
                              (student) => student.id === row.studentId
                            ) ?? getEmptyStudent(),
                            props.teacher,
                            row,
                            false
                          )
                        }
                      ></Button>
                    </>
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppPage>
  );
};

export default Requests;
