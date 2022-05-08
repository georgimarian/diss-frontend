import {Cell, Legend, Pie, PieChart} from "recharts";
import {PROFILE_COMPLETION_DATA} from "../../mock_data/dashboard";
import {renderCustomizedLabel} from "../card-components/StatusChart";
import {Colors} from "../../mock_data/theme";
import {Box} from "@mui/material";

const COLORS = [Colors.YELLOW, Colors.WARNING]

const ProfileCompletion = () => {
    return <Box sx={{
        bgcolor: Colors.LIGHT_YELLOW,
        borderRadius: 5,
        width: 'fit-content',
        p: 4,
        mt: 3
    }}>
        <PieChart width={240} height={320}>
            <Legend verticalAlign='top' height={72}/>
            <Pie
                data={PROFILE_COMPLETION_DATA}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
                fill='#0f1a85'
                label={renderCustomizedLabel}
                labelLine={false}
                legendType='square'
            >
                {PROFILE_COMPLETION_DATA.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
        </PieChart>
    </Box>
}

export default ProfileCompletion;