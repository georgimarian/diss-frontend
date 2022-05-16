import {Box, Button, CircularProgress, Link, TextField, Typography, useTheme} from '@mui/material';
import ProfileIcon from './ProfileIcon';
import {useEffect, useState} from 'react';
import {Colors} from '../../mock_data/theme';
import PublishedPapersList from './PublishedPapersList';
import ProfileCompletion from './ProfileCompletion';
import {areasToString, Roles} from "../../utils/models/common.enums";
import {Admin, Student, Teacher} from "../../utils/models/common";
import {RequestAPI} from "../../utils/connection.config";

type GenericProfileProps = {
    user: Teacher | Admin | Student;
};

const GenericProfile = ({user}: GenericProfileProps) => {
    const theme = useTheme();
    const hasProfessor = false; //TODO

    const [customProfileFunctionality, setCustomProfileFunctionality] =
        useState<JSX.Element>();
    const [seeMore, setSeeMore] = useState(false);
    const [updateAboutMe, setUpdateAboutMe] = useState(false)
    const [currentUser, setCurrentUser] = useState<Teacher | Admin | Student>()

    const setCustomContent = () => {
        if (user) {
            switch (user.type) {
                case Roles.STUDENT:
                    const teachersList = (
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant={'h6'} sx={{textTransform: 'uppercase'}}>
                                Profesorul tau
                            </Typography>
                            {hasProfessor ? (
                                <Typography variant={'body1'}>Dr. English Doe (todo)</Typography>
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
        setCurrentUser(user)
        setCustomContent()
    }, []);

    const onSave = async () => {
        if (updateAboutMe) {
            if (currentUser) {
                RequestAPI.Update(currentUser)
                    .then(user => {
                        setCurrentUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                    })
                    .catch(e => console.error(e))
            }
        }
        setUpdateAboutMe(!updateAboutMe)
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

                            {currentUser.type !== Roles.ADMIN &&
                                <Box>
                                    {updateAboutMe ?
                                        <TextField
                                            label='Despre mine'
                                            variant='outlined'
                                            value={currentUser.description}
                                            onChange={(e) => setCurrentUser({
                                                ...currentUser,
                                                description: e.target.value
                                            })}
                                            sx={{width: '100%', mt: 3}}
                                        /> : (
                                            <>
                                                {
                                                    currentUser.description.length > 0 &&
                                                    <Typography variant={'body1'} sx={{fontWeight: '700', pt: 3}}>
                                                        Despre mine
                                                    </Typography>
                                                }
                                                {currentUser.description.length < 300 ?
                                                    <Typography
                                                        variant={'body1'}>{currentUser.description}</Typography> :
                                                    <>
                                                        <Typography variant={'body1'}>
                                                            {currentUser.description.substring(0, 300) +
                                                                (seeMore ? currentUser.description.substring(300) : '')}
                                                        </Typography>
                                                        <Box
                                                            onClick={() => setSeeMore(!seeMore)}
                                                            sx={{pt: 1, width: 'fit-content', cursor: 'pointer'}}
                                                        >
                                                            <Typography fontWeight={'700'}>
                                                                {!seeMore ? '...vezi mai mult' : 'vezi mai putin'}
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                }
                                            </>
                                        )
                                    }

                                    <Box sx={{display: 'flex', justifyContent: 'end', mt: 2}}>
                                        {
                                            updateAboutMe &&
                                            <Button
                                                onClick={() => {
                                                    setCurrentUser({...currentUser, description: user.description})
                                                    setUpdateAboutMe(false)
                                                }
                                                } sx={{pr: 3}}>Renunta</Button>
                                        }

                                        <Button
                                            onClick={onSave}>{updateAboutMe ? 'Salveaza' : 'Editeaza descrierea'}</Button>
                                    </Box>

                                </Box>
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
