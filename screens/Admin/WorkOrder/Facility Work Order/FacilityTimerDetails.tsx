import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import colors from "../../../../util/colors";
import moment from "moment"; // Ensure moment is installed

const FacilityTimerDetails = ({ route, navigation }) => {
  const { facilityTimerData } = route.params;

  console.log("DCBJZBVJDBDK" ,facilityTimerData)

  const formatDate = (date) => moment(date).format("DD - MM - YYYY");
  const formatTime = (date) => moment(date).format("h:mm a");

  const plannedStagesAndTime = facilityTimerData.stages.reduce((acc, stage) => {
    acc[stage.name] = formatTime(stage.start_time);
    return acc;
  }, {});

  const actualStagesAndTime = { ...plannedStagesAndTime };

  return (
    <ScrollView style={styles.container}>
      <Header
        withAdd={false}
        withBack={true}
        navigation={navigation}
        label={facilityTimerData.facility_id?.facility_name || 'N/A'}
      />
      <Detail
        title="Facility Name"
        content={facilityTimerData.facility_id?.facility_name || 'N/A'}
      />
      <Detail
        title="Location"
        content={facilityTimerData.facility_id ? `${facilityTimerData.facility_id.city}, ${facilityTimerData.facility_id.state}, ${facilityTimerData.facility_id.country}` : 'N/A'}
      />
      <Detail
        title="Scheduled Date"
        content={formatDate(facilityTimerData.scheduled_date)}
      />
      <Detail
        title="Status of Timing"
        content={facilityTimerData.completed ? "Completed" : "Pending"}
      />
      <Detail
        title="Current Cleaning Stage"
        content={
          facilityTimerData.stages[facilityTimerData.stages.length - 1]?.name || 'N/A'
        }
      />

      <StageDetails
        title="Planned Stages And Time"
        stages={plannedStagesAndTime}
      />
      <StageDetails
        title="Actual Stages And Time"
        stages={actualStagesAndTime}
      />

      <Detail
        title="Assigned Supervisor"
        content={facilityTimerData.assigned_supervisors.map((supervisor) => supervisor.username).join(", ") || 'N/A'}
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