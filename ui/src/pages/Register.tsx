import CustomForm from "../components/CustomForm";
import {Box, IconButton, InputAdornment, TextField, useTheme} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Register = () => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    };

    return <CustomForm
        accentColor={theme.palette.primary.main}
        title={"REGISTER"}
        buttonLabel={"REGISTER"}
        buttonAction={() => console.log(values)}
        path={'/login'}
        pathLabel={'login'}
        info={'Aveti cont?'}
        content={
            <Box sx={{p: 4}}>
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
            </Box>
        }/>
}

export default Register;