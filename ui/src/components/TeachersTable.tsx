import { useState, useEffect, useContext } from 'react';
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

import {parseUser, Student, Teacher, ThesisRequest} from '../utils/models/common';
import {RequestStatus, Roles} from '../utils/models/common.enums';
import SearchBar from 'components/SearchBar';
import ProfileIcon from 'components/profile-components/ProfileIcon';
import { TeacherContext } from '../App';

function CanRequest(s: Student) {
  return (
    s.requestsLeft > 0 &&
    s.requests.every((r) => r.status === RequestStatus.DENIED)
  );
}

type TeachersTableProps = {
  createRequest: (student: Student, teacher: Teacher) => void;
  view: number;
};

const TeachersTable = (props: TeachersTableProps): JSX.Element => {
  const theme = useTheme();
  const { teachers, setTeachers } = useContext(TeacherContext);
  const [teacherList, setTeacherList] = useState<Teacher[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const _user = parseUser()

  useEffect(() => {
    setTeacherList(teachers || []);
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
              {props.view === Roles.STUDENT && (
                <TableCell align='center'>Statusul Cererii</TableCell>
              )}
              {props.view === Roles.STUDENT && (
                <TableCell align='center'>Aplică</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers?.map((row: Teacher) => (
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
                {props.view === Roles.STUDENT && (
                  <TableCell align='center'>
                    {_user.requests.find((r: ThesisRequest) => r.teacherId === row.id)
                      ?.status ?? RequestStatus.NO_REQUEST}
                  </TableCell>
                )}
                {props.view === Roles.STUDENT && (
                  <TableCell align='center'>
                    {CanRequest(_user) &&
                    !_user.requests.map((r: ThesisRequest)  => r.teacherId)
                      .find((x: number)  => x === row.id) ? (
                      <Button
                        variant='outlined'
                        startIcon={<CheckIcon />}
                        onClick={() => props.createRequest(_user, row)}
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
      {_user.role === Roles.ADMIN && (
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
