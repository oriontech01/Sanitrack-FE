import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import colors from "../../util/colors";
import useLoading from "../general_hooks/useLoading";
import useCourses from "../Admin/hooks/useCourses";

const dummyData = [
  {
    id: "1",
    title: "Investing In Stocks The Complete Course",
    imageUri: "https://via.placeholder.com/150",
    students: "265.7K students",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Investing In Stocks The Complete Course",
    imageUri: "https://via.placeholder.com/150",
    students: "265.7K students",
    level: "Beginner",
  },
];

const LearningOverview = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const { getPublishedCourses, allPublishedCourses } = useCourses();

  useEffect(() => {
    const fetchCoursesData = async () => {
      startLoading();
      await getPublishedCourses();
      stopLoading();
    };
    fetchCoursesData();
  }, []);

  // console.log('Loading courses', allPublishedCourses)
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          color={colors.blue}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          <View style={styles.profileSection}>
            <Text style={styles.profileTitle}>Training</Text>
            <Text style={styles.addIcon}>+</Text>
          </View>
          <View style={styles.statisticsSection}>
            <View style={styles.statisticBox}>
              <Text style={styles.statisticValue}>5</Text>
              <Text style={styles.statisticLabel}>
                ALL TASKS FOR CLEANERS/INSPECTORS
              </Text>
            </View>
            <View style={styles.statisticBox}>
              <Text style={styles.statisticValue}>5</Text>
              <Text style={styles.statisticLabel}>
                ALL TASKS FOR CLEANERS/INSPECTORS
              </Text>
            </View>
            <View style={styles.statisticBox}>
              <Text style={styles.statisticValue}>5</Text>
              <Text style={styles.statisticLabel}>
                TOTAL NUMBER OF ACTIVE INSPECTORS
              </Text>
            </View>
          </View>
          <View style={styles.tabs}>
            <Text style={styles.activeTab}>Created Courses</Text>
          </View>
          <FlatList
            data={allPublishedCourses}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.courseCard}>
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  style={styles.courseImage}
                />
                <View style={styles.courseInfo}>
                  <Text style={styles.courseLabel}>CLEANER</Text>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.authorName}>
                    Author: {item.authorName}
                  </Text>
                  <Text>{item.group}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.blue,
  },
  addIcon: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.blue,
  },
  statisticsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  statisticBox: {
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 110, // Adjust the width as necessary
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statisticLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingHorizontal: 20,
  },
  activeTab: {
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: colors.blue,
    color: colors.blue,
  },
  tab: {
    paddingBottom: 10,
    fontSize: 16,
    color: "grey",
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  courseImage: {
    width: 100,
    height: "100%",
  },
  courseInfo: {
    flex: 1,
    padding: 10,
  },
  courseLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF6347", // Adjust the color to match your design
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  authorName: {
    fontSize: 14,
    color: colors.black,
  },
});

export default LearningOverview;
