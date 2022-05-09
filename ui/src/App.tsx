import { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import { Roles } from './utils/roles';
import { Student, Teacher } from 'models/common';
import { studentList, teacherList } from 'mock_data/users';

import './App.css';

type StudentContextType = {
  students?: Student[];
  setStudents?: any;
};

type TeacherContextType = {
  teachers?: Teacher[];
  setTeachers?: any;
};
export const StudentContext = createContext<StudentContextType>({});
export const TeacherContext = createContext<TeacherContextType>({});

function App() {
  const theme = useTheme();
  const [students, setStudents] = useState(studentList);
  const [teachers, setTeachers] = useState(teacherList);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      <TeacherContext.Provider value={{ teachers, setTeachers }}>
        <Router>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            <Routes>
              <Route
                path='*'
                element={
                  <PrivateRoute
                    roles={[Roles.Teacher, Roles.Admin, Roles.Student]}
                  >
                    <Main />
                  </PrivateRoute>
                }
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Box>
        </Router>
      </TeacherContext.Provider>
    </StudentContext.Provider>
  );
}

export default App;
