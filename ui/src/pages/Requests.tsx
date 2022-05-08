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

import { getEmptyStudent } from 'utils/studentUtils';
import { Student, Teacher, ThesisRequest } from 'models/common';
import { RequestStatus } from 'models/common.enums';

const Requests = (props: {
  students: Student[];
  teacher: Teacher;
  answerRequest: (s: Student, t: Teacher, r: ThesisRequest, a: boolean) => void;
}) => {
  const theme = useTheme();

  return (
    <AppPage title='Requests'>
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
            {props.teacher.requests.map((row: ThesisRequest) => (
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
                          props.answerRequest(
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
                          props.answerRequest(
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
