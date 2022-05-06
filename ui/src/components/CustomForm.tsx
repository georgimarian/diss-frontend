import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

type CustomFormProps = {
    accentColor: string
    title: string
    content: JSX.Element
    buttonLabel: string
    buttonAction: () => void,
    path: string,
    pathLabel: string,
    info: string
}

const CustomForm = ({
                        accentColor,
                        title,
                        content,
                        buttonLabel,
                        buttonAction,
                        path,
                        pathLabel,
                        info
                    }: CustomFormProps) => (
    <Box
        sx={{
            height: '40%',
            width: '24%',
            borderRadius: 5,
            bgcolor: accentColor,
            p: 2
        }}>
        <Box sx={{pb: 1}}>
            <Typography variant='h6' align="left" color='white'>{title}</Typography>
        </Box>
        <Box
            sx={{
                height: '88%',
                borderRadius: 5,
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                px: 2
            }}>
            {content}
            <Box sx={{display: 'flex', justifyContent: 'center', pb: 2}}>
                <Button onClick={buttonAction} sx={{bgcolor: accentColor}}>{buttonLabel}</Button>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                color: accentColor,
                pr: 2
            }}>
                <Typography variant='body2' align="left">{info}</Typography>
                <Link to={path} style={{textTransform: 'uppercase', color: accentColor, fontSize: '0.8rem'}}>{pathLabel}</Link>
            </Box>
        </Box>
    </Box>
)

export default CustomForm;