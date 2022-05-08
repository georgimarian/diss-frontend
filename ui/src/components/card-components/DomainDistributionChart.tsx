import {
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

import { TEACHER_DISTRIBUTION_DATA } from '../../mock_data/dashboard';

const DomainDistributionChart = () => {
  console.log('help');
  return (
    <RadarChart
      outerRadius={90}
      width={730}
      height={250}
      data={TEACHER_DISTRIBUTION_DATA}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey='subject' />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar
        name='Nr Profesori'
        dataKey='A'
        stroke='#8884d8'
        fill='#8884d8'
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  );
};

export default DomainDistributionChart;
