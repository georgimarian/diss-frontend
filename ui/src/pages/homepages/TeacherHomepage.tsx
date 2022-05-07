import { Box } from '@mui/material';

import Card from '../../components/Card';
import {
  GradeChart,
  StatusChart,
  RequestLine,
} from '../../components/card-components';
import { MOCK_REQUESTS } from '../../mock_data/requests';
import DiplomaTimeline from '../../components/card-components/DiplomaTimeline';

const activeRequests = () => (
  <div>
    {MOCK_REQUESTS.map((request) => (
      <RequestLine request={request} />
    ))}
  </div>
);

const TeacherHomePage = () => {
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
        <Card title='Statistici Studenți'>
          <StatusChart />
        </Card>
        <Card title='Note Acordate'>
          <GradeChart />
        </Card>
        <Card title='Tezele dumneavoastră'>{activeRequests()}</Card>
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

export default TeacherHomePage;
