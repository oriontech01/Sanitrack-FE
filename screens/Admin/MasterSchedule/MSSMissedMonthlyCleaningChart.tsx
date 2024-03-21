import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import colors from '../../../util/colors';

const MonthlyMissedCleaningsChart = ({monthlyMissed}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const data = {
    labels: monthlyMissed.map(item => months[item._id - 1]),
    datasets: [{
      data: monthlyMissed.map(item => item.missed_cleanings),
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, padding: 16, color: colors.blue, fontWeight: 'bold' }}>
        Number of Monthly Missed Cleanings
      </Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix="" // Added to satisfy TypeScript requirements
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </View>
  );
};

export default MonthlyMissedCleaningsChart;
