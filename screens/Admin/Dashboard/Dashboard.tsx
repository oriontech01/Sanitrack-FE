import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useMemo } from 'react';
// import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import colors from '../../../util/colors';
import HomeCard from '../../Home/components/HomeCard';
import {
  ActiveIcon,
  ArrowRightIcon,
  FacilitiesIcon,
  HamburgerMenu,
  PerformanceIcon,
} from "../../../assets/svg/Index";
import AppText from "../../../components/AppText";
import { UserContext } from "../../../context/UserContext";
import useWorkHistory from "../hooks/useWorkHistory";
import useTaskDetails from "../hooks/useTaskDetails";
import MssTabularOverview from "../MasterSchedule/MssTabularOverview";
export default function Dashboard({ navigation }) {
  const axesSvg = { fontSize: 14, fill: "grey", textAlign: "center" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 50;
  const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data2 = [1, 2, 3, 4, 5, 6, 7, 8];
  const data = [50, 30];
  const fill = "rgba(17, 28, 178, 0.7)";
  const contentInset = { top: 20, bottom: 20 };
  const user = useContext(UserContext);
  const { getCleanerSummary, cleanerSummary, isLoading } = useWorkHistory();
  const { getAllTasks, pendingTasks, completedTasks, allTasks, loading } =
    useTaskDetails();

  const randomColor = useMemo(() => {
    return () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );
  }, []);
  const pieData = cleanerSummary.map((value, index) => ({
    name: value.cleanerUsername,
    population: value.totalRoomsCleaned,
    color: randomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));
  useEffect(() => {
    getCleanerSummary();
    getAllTasks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <HamburgerMenu />
        </TouchableOpacity>
        <AppText style={styles.heading}>Welcome {user.name}</AppText>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        horizontal
        style={styles.cardsSlider}
      >
        <HomeCard
          Icon={() => <ActiveIcon />}
          label="NUMBER OF ACTIVE TASK"
          loading={loading}
          value={pendingTasks.length}
          color="0, 172, 108"
        />
        <HomeCard
          loading={loading}
          color="193, 163, 55"
          Icon={() => <FacilitiesIcon />}
          label="TOTAL TASK DONE"
          value={completedTasks.length}
        />
        <HomeCard
          loading={loading}
          color="255, 64, 55"
          Icon={() => <PerformanceIcon />}
          label="TOTAL  TASK"
          value={allTasks.length}
        />
      </ScrollView>
      <ScrollView style={{ flex: 1 }}>
        <AppText style={styles.heading}>
          Total Rooms Cleaned Per Cleaner
        </AppText>

        {/* {!isLoading && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              transform: [{ translateY: 20 }],
            }}>
            {cleanerSummary.map((data, index) => (
              <Text style={{ fontWeight: 'bold' }} key={index}>
                {data.totalRoomsCleaned}
              </Text>
            ))}
          </View>
        )} */}

        <View style={styles.chartContainer}>
          {isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}>
              <ActivityIndicator color={colors.blue} />
            </View>
          )}
          {!isLoading && (
            <BarChart
              verticalLabelRotation={50}
              yAxisLabel=""
              yAxisSuffix=""
              showValuesOnTopOfBars
              data={{
                labels: cleanerSummary.map(
                  (data, index) => data.cleanerUsername
                ),
                datasets: [
                  {
                    data: cleanerSummary.map((data) => data.totalRoomsCleaned),
                  },
                ],
              }}
              width={Dimensions.get('window').width}
              height={420}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => colors.blue,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
              }}
            />
            // <BarChart
            //   style={{ flex: 1 }}
            //   data={cleanerSummary.map((data) => data.totalRoomsCleaned)}
            //   svg={{ fill }}
            //   contentInset={{ top: 30, bottom: 30 }}>
            //   <Grid />
            // </BarChart>
          )}
        </View>
        {/* {!isLoading && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {cleanerSummary.map((data, index) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 10,
                textTransform: "capitalize",
                fontWeight: "bold",
                width: 40,
              }}
              key={index}
            >
              {data.cleanerUsername}
            </Text>
          ))}
        </View>
      )} */}
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MasterSchedule')}
            style={styles.menuItem}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Master Sanitation Schedule
            </Text>
            <ArrowRightIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AdminTimer')}
            style={styles.menuItem}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Facility Cleaner
            </Text>
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cardsSlider: {
    maxHeight: 170,
    width: "100%",
    marginVertical: 20,
    minHeight: 170,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  heading: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: "bold",

    textTransform: "capitalize",
    marginLeft: 20,
  },
  menuItem: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 28, 178, 0.7)",
    borderRadius: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
