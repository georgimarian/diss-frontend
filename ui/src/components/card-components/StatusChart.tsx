import { PieChart, Pie, Cell, Legend } from 'recharts';
import { STATUS_DATA } from '../../mock_data/dashboard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatusChart = () => {
  return (
    <PieChart width={430} height={250}>
      <Legend verticalAlign='top' height={36} />
      <Pie
        data={STATUS_DATA}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={50}
        fill='#0f1a85'
        label={renderCustomizedLabel}
        labelLine={false}
        legendType='square'
      >
        {STATUS_DATA.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default StatusChart;
