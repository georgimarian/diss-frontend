import AppPage from '../components/AppPage';
import {Student, Teacher} from "../models/common";
import TeachersTable from "../components/TeachersTable";
import {Button, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {RequestStatus} from "../models/common.enums";


const Teachers = (props: {s: Student, teachers:Teacher[], createRequest:(student:Student,teacher:Teacher)=>void}) => {

    if (props.s.requestsLeft > 0 || props.s.requests.map(r => r.status).find(x => x!== RequestStatus.DENIED))
        return (
            <AppPage title='Teachers'>

                <TeachersTable rows={props.teachers} student={props.s} createRequest={(s:Student,t:Teacher)=>props.createRequest(s,t)}/>
                <Typography variant="h6" sx={{padding: "2px"}} align="left">
                    Mai ai <Typography sx={
                    {
                        color: props.s.requestsLeft < 1 ? "red" : "green"
                        , display: "inline"
                    }}>{props.s.requestsLeft}</Typography> cereri rămase
                </Typography>
            </AppPage>
        );
    return (
        <AppPage title='Teachers'>
            <Typography variant="h5" sx={{padding: "2px"}} align="left">
                Mai ai <Typography variant="h5" sx={{color: "red", display: "inline"}}>0</Typography> cereri rămase. Te
                rugăm să ceri adminilor să îți aleagă un profesor.
            </Typography>
            <Button variant="outlined" sx={{color: "red"}} startIcon={<AddIcon sx={{color: "green"}}/>}>
                Cere ajutorul adminilor </Button>

        </AppPage>
    )
}

export default Teachers;