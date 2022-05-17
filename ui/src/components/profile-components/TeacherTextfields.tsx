import {Box, Button, TextField, Typography} from "@mui/material";
import {Teacher} from "../../utils/models/common";

type TeacherTextfieldsProps = {
    currentUser: Teacher
    user: Teacher
    update: boolean
    setCurrentUser: (currentUser: Teacher) => void
    seeMore: boolean
    setSeeMore: (seeMore: boolean) => void
    setUpdate: (update: boolean) => void
    onSave: () => void
}

const TeacherTextfields = ({
                               currentUser,
                               user,
                               update,
                               setCurrentUser,
                               seeMore,
                               setSeeMore,
                               setUpdate,
                               onSave
                           }: TeacherTextfieldsProps) => {
    return <Box>
        {update ?
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
                        currentUser.description.length > 0 && currentUser.description !== " " &&
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
                update &&
                <Button
                    onClick={() => {
                        setCurrentUser({...currentUser, description: user.description})
                        setUpdate(false)
                    }
                    } sx={{pr: 3}}>Renunta</Button>
            }

            <Button
                onClick={onSave}>{update ? 'Salveaza' : 'Editeaza'}</Button>
        </Box>
    </Box>
}

export default TeacherTextfields;