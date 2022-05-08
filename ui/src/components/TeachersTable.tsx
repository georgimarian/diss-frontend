import { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { Student, Teacher } from '../models/common';
import { RequestStatus } from '../models/common.enums';
import { Roles } from 'utils/roles';
import SearchBar from 'components/SearchBar';
import ProfileIcon from 'components/profile-components/ProfileIcon';

function CanRequest(s: Student) {
  return (
    s.requestsLeft > 0 &&
    s.requests.every((r) => r.status === RequestStatus.DENIED)
  );
}

type TeachersTableProps = {
  rows: Teacher[];
  student: Student;
  createRequest: (student: Student, teacher: Teacher) => void;
  view: string;
};

const TeachersTable = (props: TeachersTableProps): JSX.Element => {
  const theme = useTheme();
  const [teacherList, setTeacherList] = useState<Teacher[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const _user = JSON.parse(localStorage.getItem('user') || '');

  useEffect(() => {
    setTeacherList(props.rows);
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 10, bgcolor: theme.palette.secondary.dark }}
      >
        <SearchBar searchValue={searchValue} onSearch={setSearchValue} />
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Nume</TableCell>
              <TableCell align='center'>Subiect de Interes</TableCell>
              <TableCell align='center'>Nr Studenți Înscriși</TableCell>
              <TableCell align='center'>Nr Locuri Libere</TableCell>
              {props.view === Roles.Student && (
                <TableCell align='center'>Statusul Cererii</TableCell>
              )}
              {props.view === Roles.Student && (
                <TableCell align='center'>Aplică</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: Teacher) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align='center'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ProfileIcon
                    firstName={row.firstName}
                    lastName={row.lastName}
                    iconSize={'4rem'}
                    variant={'h6'}
                  />
                  <Typography
                    sx={{ pl: 2 }}
                    variant={'h6'}
                    color={theme.palette.primary.main}
                  >
                    {row.firstName} {row.lastName}
                  </Typography>
                </TableCell>
                <TableCell align='center'>{row.areaOfInterest}</TableCell>
                <TableCell align='center'>
                  {row.enrolledStudents.length}
                </TableCell>
                <TableCell align='center'>
                  {row.totalPlaces - row.enrolledStudents.length}
                </TableCell>
                {props.view === Roles.Student && (
                  <TableCell align='center'>
                    {props.student.requests.find((r) => r.teacherId === row.id)
                      ?.status ?? RequestStatus.NO_REQUEST}
                  </TableCell>
                )}
                {props.view === Roles.Student && (
                  <TableCell align='center'>
                    {CanRequest(props.student) &&
                    !props.student.requests
                      .map((r) => r.teacherId)
                      .find((x) => x === row.id) ? (
                      <Button
                        variant='outlined'
                        startIcon={<CheckIcon />}
                        onClick={() => props.createRequest(props.student, row)}
                      >
                        Aplică{' '}
                      </Button>
                    ) : (
                      ''
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {_user.role === Roles.Admin && (
        <Button
          sx={{
            width: '50%',
            borderRadius: 10,
            color: theme.palette.secondary.main,
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              color: theme.palette.secondary.main,
              background: theme.palette.primary.dark,
            },
            mt: 3,
          }}
          onClick={() => {
            alert('You will add teachers soon!');
          }}
        >
          Adauga
        </Button>
      )}
    </>
  );
};

export default TeachersTable;
