import {Navigate, Route, Routes} from "react-router-dom";
import {Box, styled, Typography} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';


import Home from './Home';
import Teachers from './Teachers';
import Students from './Students';
import Requests from './Requests';
import Profile from './Profile';
import Settings from './Settings';
import Menu from '../components/Menu';
import PrivateRoute from '../utils/PrivateRoute';
import { ROLES } from '../utils/roles';
import {RequestStatus, Student, Teacher, ThesisRequest} from "../components/Models";
import {useState} from "react";
import {studentList, teacherList } from "../mock_data/users";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: 240,
  width: `calc(100% - ${240}px)`,
}));

function getEmptyStudent() : Student{
    return {
        name:"",
        id:-1,
        description:"",
        thesisDescription:"",
        email:"",
        password:"",
        requestsLeft:0,
        type:"student",
        requests:[]
    };
}

const Main = () => {
    const [teachers, setTeachers] = useState(teacherList)
    const [students, setStudents] = useState(studentList)
    const userTeacher: Teacher | undefined = teachers.find(x=> x.name == JSON.parse(localStorage.getItem('user')??"").username)
    const userStudent: Student | undefined = students.find(x=> x.name == JSON.parse(localStorage.getItem('user')??"").username)

    function createRequest(s:Student,t:Teacher){
        let req:ThesisRequest = {
            id : 1,
            teacherId : t.id,
            studentId : s.id,
            description : s.thesisDescription,
            status : RequestStatus.IN_PROGRESS
        }
        let newS = { ...s }
        let newT ={...t}
        newS.requests.push(req)
        newT.requests.push(req)
        let newStudents = students
        let newTeachers = teachers
        newStudents = newStudents.map(student => student.email == newS.email ? newS : student);
        newTeachers = newTeachers.map(teacher => teacher.email == newT.email ? newT : teacher)
        setTeachers(newTeachers)
        setStudents(newStudents)
    }
    
  return localStorage.getItem('user')
  ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background:
          'linear-gradient(90deg, rgba(81,62,183,1) 0%, rgba(0,212,255,1) 100%)',
      }}
    >
      <AppBar position='absolute'>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Licen&#539;e
        </Typography>
      </AppBar>
      <Menu />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route
          path='/teachers'
          element={
            <PrivateRoute roles={[ROLES.Student, ROLES.Admin]}>
                <Teachers teachers={teachers} s={userStudent??getEmptyStudent()} createRequest={createRequest} />
            </PrivateRoute>
          }
        />
        <Route
          path='/students'
          element={
            <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin]}>
              <Students />
            </PrivateRoute>
          }
        />
        <Route path='/requests' element={<Requests />} />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/settings'
          element={
            <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin]}>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  ) : (
    <Navigate to='/login' replace />
  );
};

export default Main;
