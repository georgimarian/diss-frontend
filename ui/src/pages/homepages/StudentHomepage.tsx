import { Box } from '@mui/material';

import Card from '../../components/Card';
import { GradeChart } from '../../components/card-components';
import DiplomaTimeline from '../../components/card-components/DiplomaTimeline';

const StudentHomePage = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          justifyContent: 'space-between',
        }}
      >
        <Card title='Statistici'>{}</Card>
        <Card title='Note'>
          <GradeChart />
        </Card>
        <Card title='Teza ta'>{}</Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '35%',
          height: '100%',
        }}
      >
        <Card title='Calendar Licențe'>
          <DiplomaTimeline />
        </Card>
      </Box>
    </Box>
  );
};

export default StudentHomePage;
