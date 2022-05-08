import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import { ROLES } from './utils/roles';
import './App.css';

function App() {
  const theme = useTheme();
  return (
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
              <PrivateRoute roles={[ROLES.Teacher, ROLES.Admin, ROLES.Student]}>
                <Main />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
