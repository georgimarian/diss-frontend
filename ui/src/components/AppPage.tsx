import {ReactNode} from 'react';
import {Box, Typography, useTheme} from '@mui/material';

const AppPage = (props: {
    title: string;
    children: ReactNode;
}): JSX.Element => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                p: 3,
                width: '90%',
                height: '90%',
                overflowX: 'clip',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                bgcolor: theme.palette.secondary.main,
            }}
        >
            <Typography variant={'h2'}>{props.title}</Typography>
            {props.children}
        </Box>
    );
};

export default AppPage;
