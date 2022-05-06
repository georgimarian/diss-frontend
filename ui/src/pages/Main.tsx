import { Route, Routes, Navigate } from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: 240,
  width: `calc(100% - ${240}px)`,
}));

const Main = () => {
  return localStorage.getItem('user') ? (
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
              <Teachers />
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
