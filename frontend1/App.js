import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Dimensions
} from 'react-native';
import ModalSaleButton from './components/SaleButton';
import ModalBuyButton from './components/BuyButton';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default function App() {
  // Function to make a GET request to your Django API
  // getSaleData = async () => {
  //   try {
  //     const response = await axios.get('http://http://127.0.0.1:8000/sale/');
  //     console.log(response.data);
  //     // response data as needed
  //   } catch (error) {
  //     console.error(error); // Handle errors
  //   }
  // };

  const data = {
    labels: ["Monday", "Tuesday"],
    legend: ["Spent", "Sold"],
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

  return (
    <View style={styles.container}>

      <ModalSaleButton />
      <ModalBuyButton />
      {/* <Button
        onPress={getSaleData}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>
          Sold and Spent Throughout the Day
        </Text>

        <StackedBarChart
          style={styles.chart} // Apply the style here
          yAxisLabel="$"
          data={data}
          width={screenWidth - 30}
          height={screenHeight / 2}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    alignItems: 'center', // Center horizontally
  },
  chartContainer: {
    flex: 4,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    margin: 1,
    padding: 1,
  },
  chart: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
});