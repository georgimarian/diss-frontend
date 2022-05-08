import { Box } from '@mui/material';

import Card from '../../components/Card';
import {
  DomainDistributionChart,
  GradeChart,
  RequestLine,
} from '../../components/card-components';

import { MOCK_REQUESTS } from '../../mock_data/requests';

const activeRequests = () => (
  <div>
    {MOCK_REQUESTS.map((request) => (
      <RequestLine request={request} />
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
      <Card title='Distribuția Profesorilor pe domenii'>
        <DomainDistributionChart />
      </Card>
      <Card title='Media Notelor'>
        <GradeChart />
      </Card>
      <Card title='Cereri active'>{activeRequests()}</Card>
    </Box>
  );
};

export default AdminHomePage;
