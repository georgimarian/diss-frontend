import { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

const AppPage = (props: {title: string, children: ReactElement | Array<ReactElement>}) : JSX.Element => {
  return (
    <Box
      sx={{
        p: 3,
        width: "90%",
        height: "90%",
        overflowX: "clip",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        bgcolor: "white",
      }}
    >
      <Typography variant={"h2"}>{props.title}</Typography>
      {props.children}
    </Box>
  );
}

export default AppPage;