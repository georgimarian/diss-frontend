import {useContext, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Box, styled, Typography, useTheme} from '@mui/material';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';

import Home from './Home';
import Teachers from './Teachers';
import Students from './Students';
import Requests from './Requests';
import Profile from './Profile';
import Settings from './Settings';
import Menu from 'components/Menu';
import PrivateRoute from 'utils/PrivateRoute';
import {Roles} from '../utils/models/common.enums';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
}));

const Main = () => {
    const theme = useTheme();
    return localStorage.getItem('user') ? (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
                        <PrivateRoute roles={[Roles.STUDENT, Roles.ADMIN]}>
                            <Teachers/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/students'
                    element={
                        <PrivateRoute roles={[Roles.TEACHER, Roles.ADMIN]}>
                            <Students/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/requests'
                    element={
                        <PrivateRoute roles={[Roles.TEACHER, Roles.ADMIN]}>
                            <Requests/>
                        </PrivateRoute>
                    }
                />
                <Route path='/profile' element={<Profile/>}/>
                <Route
                    path='/settings'
                    element={
                        <PrivateRoute roles={[Roles.TEACHER, Roles.ADMIN]}>
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
