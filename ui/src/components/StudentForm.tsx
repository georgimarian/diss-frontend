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
import {Student} from "../utils/models/common";
import {Actions, initializedStudent} from "../mock_data/users";
import {AreaOfInterest, areasToString} from "../utils/models/common.enums";
import {RequestAPI} from "../utils/connection.config";

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

    const verifyFields = () => action === Actions.EDIT ?
        (values.lastName !== "" && values.firstName !== ""
            && (values.lastName !== user.lastName || values.firstName !== user.firstName)) :
        (values.lastName !== "" &&
            values.firstName !== "" &&
            values.username !== "" &&
            values.email !== "" &&
            values.password !== "")

    const onSave = async () => {
        if (verifyFields()) {
            const _studentsList = studentsList

            if (Actions.ADD === action) {
                _studentsList.push(values)
                setStudentsList(_studentsList)
                setValues(initializedStudent)

                RequestAPI.Add(values)
                    .then(response => {
                        console.log('new user ', response, ' has been created')
                    })
                    .catch(e => console.error(e))
            } else if (Actions.EDIT === action) {
                const index = studentsList.indexOf(user)
                _studentsList[index] = values
                setStudentsList(_studentsList)

                RequestAPI.Update(values)
                    .then(response => {
                        console.log('user', user, ' now is ', response)
                    })
                    .catch(e => console.error(e))
            }

            setOpen(false);
        }
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
                                {areasToString(AreaOfInterest.PSYCHOLOGY)}
                            </MenuItem>
                            <MenuItem value={AreaOfInterest.APPLIED_PSYCHOLOGY}>
                                {areasToString(AreaOfInterest.APPLIED_PSYCHOLOGY)}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                setValues(user);
                setOpen(false)
            }}>Renunta</Button>
            <Button
                onClick={onSave}
            >
                Salveaza
            </Button>
        </DialogActions>
    </Dialog>
}

export default StudentForm;