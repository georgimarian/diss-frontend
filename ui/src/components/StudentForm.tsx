import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {Student} from "../models/common";
import {Actions, initializedStudent} from "../mock_data/users";
import {AreaOfInterest} from "../models/common.enums";

type StudentFormProps = {
    studentsList: Student[]
    setStudentsList: (studentsList: Student[]) => void
    user: Student
    open: boolean
    setOpen: (open: boolean) => void
    action: number
}

const StudentForm = ({studentsList, setStudentsList, user, open, setOpen, action}: StudentFormProps) => {
    const [values, setValues] = useState<Student>({...user});

    useEffect(() => {
        setValues({...user})
    }, [user])

    const handleChange =
        (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const onSave = () => {
        const _studentsList = studentsList

        if (Actions.ADD === action) {
            _studentsList.push(values)
            setStudentsList(_studentsList)
            setValues(initializedStudent)
        } else if (Actions.EDIT === action) {
            const index = studentsList.indexOf(user)
            console.log(index)

            _studentsList[index] = values
            setStudentsList(_studentsList)
        }

        setOpen(false);
    }

    return <Dialog
        open={open}
        onClose={setOpen}
    >
        <DialogTitle>{Actions.EDIT === action ? 'Editeaza studentul' : 'Adauga un student'}</DialogTitle>
        <DialogContent>
            <TextField
                sx={{width: '100%', my: 2}}
                required
                label='Nume'
                value={values.lastName}
                onChange={handleChange('lastName')}
            />
            <TextField
                sx={{width: '100%'}}
                required
                label='Prenume'
                value={values.firstName}
                onChange={handleChange('firstName')}
            />
            {
                Actions.ADD === action &&
                <>
                    <TextField
                        sx={{width: '100%', my: 2}}
                        required
                        label='Username'
                        value={values.username}
                        onChange={handleChange('username')}
                    />
                    <TextField
                        sx={{width: '100%', mb: 2}}
                        required
                        label='Email'
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        sx={{width: '100%', mb: 2}}
                        required
                        label='Parola'
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Aria de Interes</InputLabel>
                        <Select
                            value={values.areaOfInterest}
                            onChange={(e) => {
                                setValues({...values, areaOfInterest: e.target.value as AreaOfInterest})
                            }}
                        >
                            <MenuItem value={AreaOfInterest.PSYCHOLOGY}>
                                {AreaOfInterest.PSYCHOLOGY}
                            </MenuItem>
                            <MenuItem value={AreaOfInterest.APPLIED_PSYCHOLOGY}>
                                {AreaOfInterest.APPLIED_PSYCHOLOGY}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                setValues(initializedStudent);
                setOpen(false)
            }}>Renunta</Button>
            <Button
                onClick={onSave}
                disabled={Object.values(values).filter(item => item === '').length > 0}
            >
                Salveaza
            </Button>
        </DialogActions>
    </Dialog>
}

export default StudentForm;