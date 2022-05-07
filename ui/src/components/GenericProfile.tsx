import {Box, Link, Typography} from "@mui/material";
import {theme} from "../mock_data/theme";
import ProfileIcon from "./ProfileIcon";
import {ROLES} from "../utils/roles";
import {useEffect, useState} from "react";

type GenericProfileProps = {
    user: any; //TODO
}

const GenericProfile = ({user}: GenericProfileProps) => {
    const hasProfessor = false;
    const _user = JSON.parse(localStorage.getItem('user') || '')

    const [customProfileFunctionality, setCustomProfileFunctionality] = useState<JSX.Element>()

    useEffect(() => {
        switch (_user.role) {
            case ROLES.Student:
                const teachersList = <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant={"h6"} sx={{textTransform: 'uppercase'}}>Profesorul tau</Typography>
                    {hasProfessor ? <Typography variant={"body1"}>Dr. English Doe (todo)</Typography> :
                        <Typography variant={"body2"}>
                            <Link
                                variant={"body2"}
                                href={'/teachers'}
                                sx={{
                                    textTransform: 'uppercase',
                                    color: theme.accentColors.warning
                                }}>nu ai ales inca un profesor!</Link>
                        </Typography>}
                </Box>
                setCustomProfileFunctionality(teachersList)
                break
            case ROLES.Teacher:
                const studentsList = <Typography variant={"body2"}>
                    <Link
                        variant={"body2"}
                        href={'/students'}
                        sx={{
                            textTransform: 'uppercase',
                            color: theme.accentColors.warning
                        }}>Lista dvs de studenti</Link>
                </Typography>
                setCustomProfileFunctionality(studentsList)
                break;
            case ROLES.Admin:
                setCustomProfileFunctionality(<div/>)
                break;
            default:
                return;
        }
    }, [])

    return <Box
        sx={{
            height: '30%',
            width: '100%',
            bgcolor: theme.userColors[_user.role],
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            px: 5
        }}>
        <ProfileIcon
            firstName={user.firstName || 'John'}
            lastName={user.lastName || 'Doe'}
            iconSize={'15rem'}
            variant={'h1'}/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pl: 5
            }}>
            <div>
                <Typography variant={"h4"}>{user.name}</Typography>
                <Box
                    sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5}}>
                    <Typography variant={"body1"}>{_user.role}</Typography>
                    <Typography variant={"body1"} sx={{px: 2}}>|</Typography>
                    <Typography variant={"body1"}>Psychologist (todo)</Typography>
                    <Typography variant={"body1"} sx={{px: 2}}>|</Typography>
                    <Typography variant={"body1"}>{user.email}</Typography>
                </Box>
            </div>

            <Box sx={{pt: 2}}>
                {customProfileFunctionality}
            </Box>

        </Box>
    </Box>
}

export default GenericProfile;