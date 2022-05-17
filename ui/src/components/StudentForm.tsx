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
import {Grade, parseCriterias, Student} from "../utils/models/common";
import {initializedStudent} from "../mock_data/users";
import {Actions, AreaOfInterest, areasToString} from "../utils/models/common.enums";
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
    const [grades, setGrades] = useState<Grade[]>([]);


    useEffect(() => {
        console.log(values)
        let criterias = parseCriterias()
        if (criterias) {
            setGrades(criterias?.map(crt => ({
                criteria: crt.name,
                value: values.grades.find(gr => gr.criteria === crt.name)?.value ?? 0
            })))
        }
    }, [])

    useEffect(() => {
        setValues({...values, grades: grades.filter(grade => grade.value !== 0)})
    }, [grades])

    useEffect(() => {
        setValues({...user})
    }, [user])

    const handleChange =
        (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    function keepInRange(value: number) {
        if (value >= 10) return 10;
        if (value <= 0) return 0;
        return value;
    }

    const verifyFields = () => action === Actions.EDIT ?
        (values.lastName !== "" && values.firstName !== ""
            && (values.lastName !== user.lastName || values.firstName !== user.firstName)) :
        action === Actions.ADD ?
            (values.lastName !== "" &&
                values.firstName !== "" &&
                values.username !== "" &&
                values.email !== "" &&
                values.password !== "") : true

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
            } else {
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
        <DialogTitle>{Actions.EDIT === action ? 'Editeaza studentul' : Actions.ADD === action ? 'Adauga un student' : 'Notează un student'}</DialogTitle>
        <DialogContent>
            {Actions.GRADE !== action && <>
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
            </>
            }
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
                </>}

            {Actions.GRADE === action &&
                <>
                    {grades?.map((crt, index) => (
                        <TextField
                            type={"number"}
                            sx={{width: '100%', mb: 2}}
                            required
                            label={crt.criteria}
                            value={grades[index].value}
                            onChange={(e) => setGrades(grades.map(oldGrade => oldGrade.criteria === crt.criteria ? {
                                criteria: crt.criteria,
                                value: keepInRange(+e.target.value)
                            } : oldGrade))}
                        />))}
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