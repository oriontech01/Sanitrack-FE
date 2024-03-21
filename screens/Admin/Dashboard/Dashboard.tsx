import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useMemo } from "react";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import colors from "../../../util/colors";
import HomeCard from "../../Home/components/HomeCard";
import {
  ActiveIcon,
  FacilitiesIcon,
  HamburgerMenu,
  PerformanceIcon,
} from "../../../assets/svg/Index";
import AppText from "../../../components/AppText";
import { UserContext } from "../../../context/UserContext";
import useWorkHistory from "../hooks/useWorkHistory";
import useTaskDetails from "../hooks/useTaskDetails";
import MssTabularOverview from "../components/MssTabularOverview";

export default function Dashboard({ navigation }) {
  const axesSvg = { fontSize: 14, fill: "grey", textAlign: "center" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 50;
  const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data = [50, 30];
  const fill = "rgba(17, 28, 178, 0.7)";
  const contentInset = { top: 20, bottom: 20 };
  const user = useContext(UserContext);
  const { getCleanerSummary, cleanerSummary, isLoading } = useWorkHistory();
  const { getAllTasks, pendingTasks, completedTasks, allTasks, loading } =
    useTaskDetails();

  const randomColor = useMemo(() => {
    return () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
        0,
        7
      );
  }, []);
  const pieData = cleanerSummary.map((value, index) => ({
    value: value.totalRoomsCleaned,
    svg: {
      fill: randomColor(),
      onPress: () => console.log('press', index),
    },
    key: `pie-${index}`,
  }));
  useEffect(() => {
    getCleanerSummary();
    getAllTasks();
  }, []);

  console.log(cleanerSummary);
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
      <AppText style={styles.heading}>Total Rooms Cleaned Per Cleaner</AppText>
      {!isLoading && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            transform: [{ translateY: 20 }],
          }}
        >
          {cleanerSummary.map((data, index) => (
            <Text style={{ fontWeight: "bold" }} key={index}>
              {data.totalRoomsCleaned}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.chartContainer}>
        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        {!isLoading && (
          <BarChart
            style={{ flex: 1 }}
            data={cleanerSummary.map((data) => data.totalRoomsCleaned)}
            svg={{ fill }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </BarChart>
        )}
      </View>
      {!isLoading && (
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
                textTransform: 'capitalize',
                fontWeight: 'bold',
                width: 40,
              }}
              key={index}
            >
              {data.cleanerUsername}
            </Text>
          ))}
        </View>
      )}
      <MssTabularOverview />
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
});
