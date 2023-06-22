import { StyleSheet, View, Text, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";

interface Props {
  screenWidth: number;
  maxValue: number;
  minData: number[];
  midData: number[];
  maxData: number[];
  data: number[];
  title: string;
}

const chartConfig = {
  backgroundGradientFrom: Colors.darkBlue,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: Colors.active,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  barPercentage: 0.5,
};

const dataChart = (
  maxValue: number,
  minData: number[],
  midData: number[],
  maxData: number[],
  data: number[]
) => {
  return {
    labels: ["0", "3", "6", "9", "12", "15", "18", "21", "24"],
    datasets: [
      {
        data: [maxValue, maxValue, maxValue, maxValue, maxValue, maxValue, maxValue, maxValue, maxValue],
        strokeWidth: 0,
        withDots: false,
      },
      {
        data: [maxValue],
        withDots: false,
      },
      {
        data: data,
        strokeWidth: 4,
      },
      {
        data: minData,
        color: (opacity = 1) => `rgba(232, 100, 124, ${opacity})`,
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: maxData,
        color: (opacity = 1) => `rgba(232, 100, 124, ${opacity})`,
        strokeWidth: 3,
        withDots: false,
      },
      {
        data: midData,
        color: (opacity = 1) => `rgba(114, 237, 116, ${opacity})`,
        strokeWidth: 3,
        withDots: false,
      },
    ],
  };
};

const Chart = ({
  screenWidth,
  maxValue,
  minData,
  midData,
  maxData,
  data,
  title,
}: Props) => {
  return (
    <View>
      <Text style={styles.titre}>{title}</Text>
      <LineChart
        data={dataChart(maxValue, minData, midData, maxData, data)}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        withShadow={false}
      />
      <View style={styles.container}>
        <View style={[styles.circle, { backgroundColor: "#72ed74" }]} />
        <Text style={styles.label}>Médiane</Text>
        <View style={[styles.circle, { backgroundColor: "#e8647c" }]} />
        <Text style={styles.label}>Moyenne haute/basse</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  label: {
    fontSize: FontSize.xs,
    marginRight: 8,
  },
  
  titre: {
    fontSize: FontSize.medium,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Chart;
