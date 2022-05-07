import {Box, Link, Typography} from "@mui/material";
import {theme} from "../mock_data/theme";
import ProfileIcon from "./ProfileIcon";
import {ROLES} from "../utils/roles";
import {useEffect, useState} from "react";
import {aboutMe, publishedPapers} from "../mock_data/users";

type GenericProfileProps = {
    user: any; //TODO
}

const GenericProfile = ({user}: GenericProfileProps) => {
    const hasProfessor = false;
    const _user = JSON.parse(localStorage.getItem('user') || '')

    const [customProfileFunctionality, setCustomProfileFunctionality] = useState<JSX.Element>()
    const [seeMore, setSeeMore] = useState(false)

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

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%'
    }}>
        <Box
            sx={{
                bgcolor: theme.userColors[_user.role],
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                px: 5,
                borderRadius: 10
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
                    pl: 5,
                    py: 5,
                    width: '70%'
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

                <Box>
                    <Typography variant={'body1'} sx={{fontWeight: '700', pt: 3}}>About me</Typography>
                    {
                        aboutMe.length < 300 ?
                            <Typography variant={'body1'}>{aboutMe}</Typography> :
                            (
                                <>
                                    <Typography
                                        variant={'body1'}>{aboutMe.substring(0, 300) + (seeMore ? aboutMe.substring(300) : '')}</Typography>
                                    <Box onClick={() => setSeeMore(!seeMore)}
                                         sx={{pt: 1, width: 'fit-content', cursor: 'pointer'}}>
                                        <Typography
                                            fontWeight={'700'}>{!seeMore ? '...vezi mai mult' : 'vezi mai putin'}</Typography>
                                    </Box>
                                </>
                            )
                    }
                </Box>
            </Box>
        </Box>

        {/*TODO research interests for teachers?*/}

        {
            _user.role === ROLES.Teacher &&
            <Box
                sx={{
                    mt: 4,
                    bgcolor: theme.userColors[_user.role],
                    display: 'flex',
                    flexDirection: 'column',
                    px: 5,
                    py: 2,
                    borderRadius: 10,
                }}
            >
                <Typography variant={"body1"} fontWeight={"700"}>Lucrări Publicate</Typography>
                {
                    publishedPapers
                        .sort((item1, item2) => item1.year < item2.year ? 1 : -1)
                        .map(item => <Box
                                sx={{
                                    py: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                }}
                            >
                                <Typography variant={"body1"} fontWeight={"700"}>{item.year}</Typography>
                                {
                                    item.titles.map(paper => <Typography variant={"body2"}
                                                                         sx={{pt: 0.5}}>{paper}</Typography>)
                                }
                            </Box>
                        )
                }
            </Box>
        }
    </Box>
}

export default GenericProfile;