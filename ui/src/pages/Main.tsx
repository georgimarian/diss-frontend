import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, styled, Typography, useTheme } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import Home from './Home';
import Teachers from './Teachers';
import Students from './Students';
import Requests from './Requests';
import Profile from './Profile';
import Settings from './Settings';
import Menu from '../components/Menu';
import PrivateRoute from '../utils/PrivateRoute';
import { ROLES } from '../utils/roles';
import {
  RequestStatus,
  Student,
  Teacher,
  ThesisRequest,
} from '../components/Models';
import { useState } from 'react';
import { studentList, teacherList } from '../mock_data/users';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: 240,
  width: `calc(100% - ${240}px)`,
}));

function parseStudents (): Student[]{
    try {
        return JSON.parse(localStorage.getItem("students") || "")
    } catch (err) {
        return studentList
    }
}

function parseTeachers (): Teacher[]{
    try {
        return JSON.parse(localStorage.getItem("teachers") || "")
    } catch (err) {
        return teacherList
    }
}

function storeStudents (students: Student[]){
    return localStorage.setItem("students",JSON.stringify(students))
}

function storeTeachers (teachers: Teacher[]){
    return localStorage.setItem("teachers",JSON.stringify(teachers))
}

function parseUser(){
    try {
        return JSON.parse(localStorage.getItem("user") || "")
    } catch (err) {
        return getEmptyStudent()
    }
}

export function getEmptyStudent(): Student {
    return {
        name: "",
        id: -1,
        description: "",
        thesisDescription: "",
        email: "",
        password: "",
        requestsLeft: 0,
        type: "student",
        requests: [],
        grades: []
    };
}

export function getEmptyTeacher(): Teacher {
    return {
        name: "",
        id: -1,
        email: "",
        password: "",
        totalPlaces: 0,
        type: "teacher",
        requests: [],
        enrolledStudents: [],
        interest: ""
    };
}

const Main = () => {
    const theme = useTheme();
    const [teachers, setTeachers] = useState(parseTeachers())
    const [students, setStudents] = useState(parseStudents())
    const userTeacher: Teacher | undefined = teachers.find(x => x.name === parseUser().username)
    const userStudent: Student | undefined = students.find(x => x.name === parseUser().username)

    function createRequest(s: Student, t: Teacher) {
        let req: ThesisRequest = {
            id: 1,
            teacherId: t.id,
            studentId: s.id,
            description: s.thesisDescription,
            status: RequestStatus.IN_PROGRESS
        }
        let newS = {...s}
        let newT = {...t}
        newS.requests.push(req)
        newS.requestsLeft -= 1
        newT.requests.push(req)
        let newStudents = [...students]
        let newTeachers = [...teachers]
        newStudents = newStudents.map(student => student.email === newS.email ? newS : student);
        newTeachers = newTeachers.map(teacher => teacher.email === newT.email ? newT : teacher)
        setTeachers(newTeachers)
        setStudents(newStudents)
        storeStudents(newStudents)
        storeTeachers(newTeachers)
    }

    function answerRequest(s: Student, t: Teacher, r: ThesisRequest, a: boolean) {
        let newR = {...r}
        newR.status = a ? RequestStatus.APPROVED : RequestStatus.DENIED;
        let newS = {...s}
        let newT = {...t}
        newS.requests = newS.requests.map(req => req.studentId === newR.studentId && req.teacherId === newR.teacherId ? newR : req)
        newT.requests = newT.requests.map(req => req.studentId === newR.studentId && req.teacherId === newR.teacherId ? newR : req)
        let newStudents = [...students]
        let newTeachers = [...teachers]
        newStudents = newStudents.map(student => student.email === newS.email ? newS : student);
        newTeachers = newTeachers.map(teacher => teacher.email === newT.email ? newT : teacher)
        setTeachers(newTeachers)
        setStudents(newStudents)
        storeStudents(newStudents)
        storeTeachers(newTeachers)
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
                        sx={{flexGrow: 1}}
                    >
                        Licen&#539;e
                    </Typography>
                </AppBar>
                <Menu/>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route
                        path='/teachers'
                        element={
                            <PrivateRoute roles={[ROLES.Student, ROLES.Admin]}>
                                <Teachers teachers={teachers} s={userStudent ?? getEmptyStudent()}
                                          createRequest={createRequest}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/students'
                        element={
                            <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin]}>
                                <Students/>
                            </PrivateRoute>
                        }
                    />
                    <Route path='/requests' element={
                        <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin]}>
                            <Requests students={students} teacher={userTeacher ?? getEmptyTeacher()}
                                      answerRequest={answerRequest}/>
                        </PrivateRoute>
                    }/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route
                        path='/settings'
                        element={
                            <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin]}>
                                <Settings/>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Box>
        ) : (
            <Navigate to='/login' replace/>
        );
};

export default Main;
