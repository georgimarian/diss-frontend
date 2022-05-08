import {Box, Typography} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

type ProfileIconProps = {
    firstName: string,
    lastName: string,
    iconSize: string,
    variant: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

const ProfileIcon = ({firstName, lastName, iconSize, variant}: ProfileIconProps) => {
    return <Box sx={{
        borderRadius: 50,
        bgcolor: 'pink',
        height: iconSize,
        width: iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography variant={variant} color={'white'}>{firstName[0].toUpperCase() + lastName[0].toUpperCase()}</Typography>
    </Box>
}

export default ProfileIcon;