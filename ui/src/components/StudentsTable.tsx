import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import ProfileIcon from './profile-components/ProfileIcon';
import { Roles } from 'utils/roles';
import { Actions, initializedStudent } from 'mock_data/users';
import StudentForm from './StudentForm';
import { Student } from 'models/common';
import SearchBar from './SearchBar';
import { StudentContext, TeacherContext } from '../App';

const StudentsTable = () => {
  const { students, setStudents } = useContext(StudentContext);
  const { teachers, setTeachers } = useContext(TeacherContext);

  const [searchValue, setSearchValue] = useState('');
  const [chosenUser, setChosenUser] = useState<Student>(initializedStudent);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<number>(-1);
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  const theme = useTheme();
  const _user = JSON.parse(localStorage.getItem('user') || '');
  console.log((teachers || []).find((x) => x.username === _user.username));

  useEffect(() => {
    _user.role === Roles.Admin
      ? setStudentsList(students || [])
      : setStudentsList(
          (teachers || []).find((x) => x.username === _user.username)
            ?.enrolledStudents || []
        );
  }, []);

  return (
    <>
      <StudentForm
        studentsList={studentsList || []}
        setStudentsList={setStudents}
        user={chosenUser}
        open={open}
        setOpen={setOpen}
        action={action}
      />
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 10,
          bgcolor: theme.palette.secondary.dark,
        }}
      >
        <SearchBar searchValue={searchValue} onSearch={setSearchValue} />
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Numele studentului</TableCell>
              <TableCell align='left'>Aria de Interes</TableCell>
              <TableCell align='left'>Email</TableCell>
              {_user.role === Roles.Admin && <TableCell align='center' />}
            </TableRow>
          </TableHead>
          <TableBody>
            {(studentsList || []).map((user: Student, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ProfileIcon
                    firstName={user.firstName}
                    lastName={user.lastName}
                    iconSize={'4rem'}
                    variant={'h6'}
                  />
                  <Typography
                    sx={{ pl: 2 }}
                    variant={'h6'}
                    color={theme.palette.primary.main}
                  >
                    {user.firstName + ' ' + user.lastName}
                  </Typography>
                </TableCell>
                <TableCell align='left'>{user.areaOfInterest}</TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                {_user.role === Roles.Admin && (
                  <TableCell align='center'>
                    <Button
                      onClick={() => {
                        setChosenUser(user);
                        setAction(Actions.EDIT);
                        setOpen(true);
                      }}
                    >
                      Editeaza
                    </Button>
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
            setChosenUser(initializedStudent);
            setAction(Actions.ADD);
            setOpen(true);
          }}
        >
          Adauga
        </Button>
      )}
    </>
  );
};

export default StudentsTable;
