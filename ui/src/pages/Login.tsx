import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, IconButton, InputAdornment, TextField} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import CustomForm from '../components/CustomForm';
import {studentList, teacherList} from "../mock_data/users";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        username: '',
        password: '',
        role: 'Admin',
    });
    const navigate = useNavigate();

    const handleChange =
        (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const login = () => {
        localStorage.setItem('user', JSON.stringify(values));
        if (localStorage.getItem('students') == null) {
            localStorage.setItem('students', JSON.stringify(studentList))
            localStorage.setItem('teachers', JSON.stringify(teacherList))
        }
        navigate('/home');
    };

    return (
        <CustomForm
            accentColor={'pink'}
            title={'LOGIN'}
            buttonLabel={'LOGIN'}
            buttonAction={() => login()}
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
                        value={values.username}
                        onChange={handleChange('username')}
                    />

                    <TextField
                        sx={{width: '100%', mt: 2}}
                        required
                        id='outlined-required'
                        label='Parola'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
