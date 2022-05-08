import { Box } from '@mui/material';

import AppCard from 'components/Card';
import {
  DomainDistributionChart,
  GradeChart,
  RequestLine,
} from 'components/card-components';

import { MOCK_REQUESTS } from 'mock_data/requests';

const activeRequests = () => (
  <div>
    {MOCK_REQUESTS.map((request) => (
      <RequestLine key={request.studentName} request={request} />
    ))}
  </div>
);

const AdminHomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <AppCard title='Distribuția Profesorilor pe domenii'>
        <DomainDistributionChart />
      </AppCard>
      <AppCard title='Media Notelor'>
        <GradeChart />
      </AppCard>
      <AppCard title='Cereri active'>{activeRequests()}</AppCard>
    </Box>
  );
};

export default AdminHomePage;
