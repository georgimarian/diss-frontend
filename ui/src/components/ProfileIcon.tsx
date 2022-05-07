import {Box, Typography} from "@mui/material";

type ProfileIconProps = {
    firstName: string,
    lastName: string
}

const ProfileIcon = ({firstName, lastName}: ProfileIconProps) => {
    return <Box sx={{
        borderRadius: 10,
        bgcolor: 'pink',
        height: '4rem',
        width: '4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography variant={"h6"} color={'white'}>{firstName[0].toUpperCase() + lastName[0].toUpperCase()}</Typography>
    </Box>
}

export default ProfileIcon;