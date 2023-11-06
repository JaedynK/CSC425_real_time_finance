import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const data = {
  labels: ["Monday", "Tuesday"],
  legend: ["Spent", "sold",],
  data: [
    [60, 60],
    [30, 30],
    [30, 30],
    [30, 30],
    [30, 30],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 18, margin: 10, padding: 1 }}>
        Sold and Spent Throughout the Day
      </Text>

      <StackedBarChart
      style={styles.chart}
  yAxisLabel="$"
  data={data}
  width={screenWidth -30}
  height={screenHeight/2}
  chartConfig={chartConfig}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
  },
  chart: {
    paddingHorizontal: 5,
    marginLeft:5,
  },
});