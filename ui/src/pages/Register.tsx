import CustomForm from "../components/CustomForm";
import {Box, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, useTheme} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Admin, storeUser, Student, Teacher, User} from "../utils/models/common";
import {Roles, rolesToString} from "../utils/models/common.enums";
import {RequestAPI} from "../utils/connection.config";
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false)
    const [values, setValues] = useState<User>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        type: Roles.STUDENT,
        email: '',
        id: -1
    });
    let navigate = useNavigate()

    const handleChange = (prop: string) => (event: any) => {
        setValues({...values, [prop]: event.target.value});
    };

    const register = () => {
        RequestAPI.Register(values).then(loggedUser => {
            console.log(loggedUser)
            if (loggedUser) {
                storeUser(loggedUser)
                navigate('/home');
            }
        })
    };

    return <CustomForm
        accentColor={theme.palette.primary.main}
        title={"REGISTER"}
        buttonLabel={"REGISTER"}
        buttonAction={() => register()}
        path={'/login'}
        pathLabel={'login'}
        info={'Aveti cont?'}
        content={
            <Box sx={{
                p: 4,
            }}>
                <TextField
                    sx={{width: '100%'}}
                    required
                    id="outlined-required"
                    label="Username"
                    value={values.username}
                    onChange={handleChange('username')}
                />

                <TextField
                    sx={{width: '100%', mt: 2}}
                    required
                    id="outlined-required"
                    label="Parola"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>,
                    }}
                />

                <TextField
                    sx={{width: '100%', mt: 2}}
                    type={"email"}
                    required
                    id="outlined-required"
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                />

                <TextField
                    sx={{width: '100%', mt: 2}}
                    required
                    id="outlined-required"
                    label="Prenume"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                />

                <TextField
                    sx={{width: '100%', mt: 2}}
                    required
                    id="outlined-required"
                    label="Nume"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                />
                <Select
                    labelId={"demo-simple-select-helper-label"}
                    sx={{width: '100%', mt: 2}}
                    id="outlined-required"
                    value={values.type}
                    label="Tip"
                    onChange={handleChange('type')}
                >
                    <MenuItem value={0}>{rolesToString(Roles.STUDENT)}</MenuItem>
                    <MenuItem value={1}>{rolesToString(Roles.TEACHER)}</MenuItem>
                    <MenuItem value={2}>{rolesToString(Roles.ADMIN)}</MenuItem>
                </Select>

            </Box>
        }/>
}

export default Register;