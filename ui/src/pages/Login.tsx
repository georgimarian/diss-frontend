import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, IconButton, InputAdornment, TextField, useTheme,} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import CustomForm from '../components/CustomForm';
import {Roles} from "../utils/models/common.enums";
import {RequestAPI} from "../utils/connection.config";
import {Admin, getEmptyStudent, getEmptyTeacher, getEmptyUser, Student, Teacher} from "../utils/models/common";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<Student | Teacher | Admin>();
    const navigate = useNavigate();
    const theme = useTheme();
    //let role = Roles.ADMIN;
    // if (username === 'denis') {
    //   console.log('caca');
    //   role = Roles.STUDENT;
    // } else if (username === 'Ion Ionescu') {
    //   role = Roles.TEACHER;
    // }

    const handleUsernameChange =
        (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
        };

    const handlePasswordChange =
        (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        };
    //
    // useEffect(() => {
    //     console.log("use-effect - ", user)
    //     if (user && user.id !== -1) {
    //         console.log("use-effect - in if", user)
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }
    // }, [user]);

    const login = () => {
        RequestAPI.Login({email: username, password: password}).then(loggedUser => {
            console.log(loggedUser)
            if (loggedUser) {
                let userVar: Admin | Teacher | Student;
                if (loggedUser.type === Roles.STUDENT) {
                    userVar = loggedUser as Student;

                } else if (loggedUser.type === Roles.TEACHER) {
                    userVar = loggedUser as Teacher;

                } else {
                    userVar = loggedUser as Admin;
                }
                console.log(userVar)
                localStorage.setItem('user', JSON.stringify(userVar));
                //setUser(userVar)

                navigate('/home');
            }
        })
    };

    return (
        <CustomForm
            accentColor={theme.palette.primary.dark}
            title={'LOGIN'}
            buttonLabel={'LOGIN'}
            buttonAction={login}
            path={'/register'}
            pathLabel={'register'}
            info={'Nu aveti cont?'}
            content={
                <Box sx={{p: 4}}>
                    <TextField
                        sx={{width: '100%'}}
                        required
                        id='outlined-required'
                        label='Username'
                        value={username}
                        onChange={handleUsernameChange('username')}
                    />

                    <TextField
                        sx={{width: '100%', mt: 2}}
                        required
                        id='outlined-required'
                        label='Parola'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            }
        />
    );
};

export default Login;
