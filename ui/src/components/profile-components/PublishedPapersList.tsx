import {Box, Typography, useTheme} from "@mui/material";
import {publishedPapers} from "../../mock_data/users";

const PublishedPapersList = () => { //TODO get published papers from back
    const theme = useTheme()
    return <Box
        sx={{
            mt: 4,
            bgcolor: theme.palette.secondary.dark,
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

export default PublishedPapersList;