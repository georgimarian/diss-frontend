import {Box, CircularProgress, Link, Typography, useTheme} from '@mui/material';
import ProfileIcon from './ProfileIcon';
import {useContext, useEffect, useState} from 'react';
import {Colors} from '../../mock_data/theme';
import PublishedPapersList from './PublishedPapersList';
import ProfileCompletion from './ProfileCompletion';
import {areasToString, RequestStatus, Roles} from "../../utils/models/common.enums";
import {Admin, Student, Teacher, ThesisRequest} from "../../utils/models/common";
import {RequestAPI} from "../../utils/connection.config";
import {TeacherContext} from "../../App";
import TeacherTextfields from "./TeacherTextfields";
import StudentTextfield from "./StudentTextfield";

type GenericProfileProps = {
    user: Teacher | Admin | Student;
};

const GenericProfile = ({user}: GenericProfileProps) => {
    const theme = useTheme();

    const [customProfileFunctionality, setCustomProfileFunctionality] =
        useState<JSX.Element>();
    const [seeMore, setSeeMore] = useState(false);
    const [update, setUpdate] = useState(false)
    const [currentUser, setCurrentUser] = useState<Teacher | Admin | Student>()

    const {teachers} = useContext(TeacherContext);

    useEffect(() => {
        setCurrentUser(user)
    }, [])

    const setCustomContent = (studentsProffessor?: Teacher) => {
        if (user) {
            switch (user.type) {
                case Roles.STUDENT:
                    const teachersList = (
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant={'h6'} sx={{textTransform: 'uppercase'}}>
                                Profesorul tau
                            </Typography>
                            {studentsProffessor ? (
                                <Typography
                                    variant={'body1'}>{studentsProffessor.firstName + " " + studentsProffessor.lastName}</Typography>
                            ) : (
                                <Typography variant={'body2'}>
                                    <Link
                                        variant={'body2'}
                                        href={'/teachers'}
                                        sx={{
                                            textTransform: 'uppercase',
                                            color: Colors.WARNING,
                                        }}
                                    >
                                        nu ai ales inca un profesor!
                                    </Link>
                                </Typography>
                            )}
                        </Box>
                    );
                    setCustomProfileFunctionality(teachersList);
                    break;
                case Roles.TEACHER:
                    const studentsList = (
                        <Typography variant={'body2'}>
                            <Link
                                variant={'body2'}
                                href={'/students'}
                                sx={{
                                    textTransform: 'uppercase',
                                    color: Colors.WARNING,
                                }}
                            >
                                Lista dvs de studenti
                            </Link>
                        </Typography>
                    );
                    setCustomProfileFunctionality(studentsList);
                    break;
                case Roles.ADMIN:
                    setCustomProfileFunctionality(<div/>);
                    break;
                default:
                    return;
            }
        }
    }

    useEffect(() => {
        if (user.type === Roles.STUDENT) {
            const foundTeacher: ThesisRequest | undefined = (user as Student).requests.find(req => req.status === RequestStatus.APPROVED)
            if (foundTeacher) {
                setCustomContent(teachers?.find((teacher: Teacher) => teacher.id === foundTeacher.teacherId))
            } else setCustomContent()
        } else {
            setCustomContent()
        }
    }, [currentUser, teachers])

    const onSave = async () => {
        if (update) {
            if (currentUser) {
                RequestAPI.Update(currentUser)
                    .then(user => {
                        setCurrentUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                    })
                    .catch(e => console.error(e))
            }
        }
        setUpdate(!update)
    }

    return <>
        {
            !currentUser ? <CircularProgress/> :
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '90%',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: theme.palette.secondary.dark,
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            px: 5,
                            borderRadius: 10,
                            py: 5
                        }}
                    >
                        <ProfileIcon
                            firstName={user.firstName || 'John'}
                            lastName={user.lastName || 'Doe'}
                            iconSize={'15rem'}
                            variant={'h1'}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                pl: 5,
                                py: 5,
                                width: '70%',
                            }}
                        >
                            <div>
                                <Typography variant={'h4'}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        pt: 0.5,
                                    }}
                                >
                                    <Typography variant={'body1'}>{Roles[currentUser.type].toLowerCase()}</Typography>
                                    <Typography variant={'body1'} sx={{px: 2}}>
                                        |
                                    </Typography>
                                    {[Roles.STUDENT, Roles.TEACHER].includes(currentUser.type) &&
                                        <>
                                            <Typography
                                                variant={'body1'}>{areasToString((currentUser as Teacher | Student).areaOfInterest).toLowerCase()}</Typography>
                                            <Typography variant={'body1'} sx={{px: 2}}>
                                                |
                                            </Typography>
                                        </>
                                    }
                                    <Typography variant={'body1'}>{user.email}</Typography>
                                </Box>
                            </div>

                            <Box sx={{pt: 2}}>{customProfileFunctionality}</Box>

                            <Box sx={{pb: 2}}/>

                            {currentUser.type === Roles.TEACHER ?
                                <TeacherTextfields
                                    currentUser={currentUser as Teacher}
                                    user={user as Teacher}
                                    update={update}
                                    setCurrentUser={setCurrentUser}
                                    seeMore={seeMore}
                                    setSeeMore={setSeeMore}
                                    setUpdate={setUpdate}
                                    onSave={onSave}
                                /> : currentUser.type === Roles.STUDENT ?
                                    <StudentTextfield
                                        currentUser={currentUser as Student}
                                        user={user as Student}
                                        update={update}
                                        setCurrentUser={setCurrentUser}
                                        seeMore={seeMore}
                                        setSeeMore={setSeeMore}
                                        setUpdate={setUpdate}
                                        onSave={onSave}
                                    /> : null
                            }
                        </Box>
                    </Box>

                    {currentUser.type === Roles.TEACHER ? (
                        <PublishedPapersList/>
                    ) : currentUser.type === Roles.STUDENT ? (
                        <ProfileCompletion/>
                    ) : (
                        <div/>
                    )}
                </Box>
        }
    </>
};

export default GenericProfile;
