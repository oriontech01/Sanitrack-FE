import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import colors from "../../../../util/colors";
import moment from "moment"; // You might need to install moment if not already

const FacilityTimerDetails = ({ route, navigation }) => {
  const { facilityTimerData } = route.params;

  // Assuming that the facilityTimerData is correctly passed to this component
  // Format the dates with moment.js or any other library/method you prefer
  const formatDate = (date) => moment(date).format("DD - MM - YYYY");
  const formatTime = (date) => moment(date).format("h:mm a");

  // Transforming stages into an object with keys for planned stages
  const plannedStagesAndTime = facilityTimerData.stages.reduce((acc, stage) => {
    acc[stage.name] = formatTime(stage.start_time);
    return acc;
  }, {});

  // Dummy data for actual stages and time, replace with real data when available
  const actualStagesAndTime = { ...plannedStagesAndTime }; // This should be actual times

  return (
    <ScrollView style={styles.container}>
      <Header
        withAdd={false}
        withBack={true}
        navigation={navigation}
        label={facilityTimerData.facility_id.facility_name ? facilityTimerData.facility_id.facility_name: 'N/A'}
      />
      <Detail
        title="Facility Name"
        content={facilityTimerData.facility_id.facility_name ? facilityTimerData.facility_id.facility_name: 'N/A'}
      />
      <Detail
        title="Location"
        content={ facilityTimerData.facility_id ?`${facilityTimerData.facility_id.city}, ${facilityTimerData.facility_id.state}, ${facilityTimerData.facility_id.country}`: 'N/A'}
      />
      <Detail
        title="Scheduled Date"
        content={formatDate(facilityTimerData.scheduled_date)}
      />
      <Detail
        title="Status of Timing"
        content={facilityTimerData.completed ? "Completed" : "Pending"}
      />
      {/* The currentCleaningStage is not provided in the facilityTimerData, assuming the last stage as current */}
      <Detail
        title="Current Cleaning Stage"
        content={
          facilityTimerData.stages[facilityTimerData.stages.length - 1].name
        }
      />

      <StageDetails
        title="Planned Stages And Time"
        stages={plannedStagesAndTime}
      />
      <StageDetails
        title="Actual Stages And Time" // Replace with actual data when available
        stages={actualStagesAndTime}
      />

      {/* Assuming that assigned_supervisors[0] contains the ID of the supervisor */}
      <Detail
        title="Assigned Supervisor"
        content={facilityTimerData.assigned_supervisors.map((name) => {
           return name
        })} // Replace with name when available
      />
    </ScrollView>
  );
};

const Detail = ({ title, content }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const StageDetails = ({ title, stages }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.title}>{title}</Text>
    {Object.entries(stages).map(([stage, time], index) => (
      <Text key={index} style={styles.content}>
        {`${stage.charAt(0).toUpperCase() + stage.slice(1)} - ${time}`}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  detailContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    color: colors.blue,
  },
  content: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default FacilityTimerDetails;
