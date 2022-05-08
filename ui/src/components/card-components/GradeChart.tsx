import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { GRADE_DATA } from '../../mock_data/dashboard';

const GradeChart = () => {
  return (
    <BarChart width={500} height={250} data={GRADE_DATA}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='grade' fill='#1f41ed' />
    </BarChart>
  );
};

export default GradeChart;
