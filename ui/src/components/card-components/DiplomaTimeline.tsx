import { Box } from '@mui/material';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckIcon from '@mui/icons-material/Check';

const DiplomaTimeline = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <BorderColorIcon />
        28.03 - Alegere Coordonator
      </div>
      <div>
        <PersonAddAltIcon />
        28.03 - Coordonatorul acceptă studenți
      </div>
      <div>
        <CalendarMonthIcon />
        25.05 - Notare Periodică
      </div>
      <div>
        <MenuBookIcon />
        26.06 - Predarea Lucrării Scrise Provizorii
      </div>
      <div>
        <CheckIcon />
        01.07 - Predarea Lucrării Scrise
      </div>
    </Box>
  );
};

export default DiplomaTimeline;
