import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
  View,
  Text,
  Dimensions,
} from "react-native";
import DurationInput from "../../components/DurationInput";
import Button from "../../../../components/general/Button";
import Header from "../../components/Header";
import DateInput from "../../components/DateInput";
import useInspector from "../../hooks/useInspector";
import useLoading from "../../../general_hooks/useLoading";
import colors from "../../../../util/colors";
import MultipleSelect from "../../../../components/general/MultippleSelect";
import { useSharedValue, withTiming } from "react-native-reanimated";
import useTask from "../../hooks/useTask";
import useCleaner from "../../hooks/useCleaner";
import Select from "../../../../components/general/Select";

const { width, height } = Dimensions.get("window");
function formatDateTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getUTCHours(); // Gets the hours in UTC
  const minutes = date.getUTCMinutes(); // Gets the minutes in UTC

  // Construct the string with "hr" and "mins"
  const formattedString = `${hours}hr ${
    minutes < 10 ? "0" + minutes : minutes
  } mins`;

  return formattedString;
}
const StageDetails = ({ stages }) => (
  <View style={styles.detailContainer}>
    {stages.map((stage, index) => (
      <>
        <Text style={styles.title}>
          {stage.name.charAt(0).toUpperCase() + stage.name.slice(1)}
        </Text>
        <Text key={index} style={styles.content}>
          {`Planned time: ${formatDateTime(stage.start_time)}`}
        </Text>
      </>
    ))}
  </View>
);

const SelectInspectorsWorkOrder = ({ navigation, route }) => {
  const { id, presavedData } = route.params;
  if (presavedData) {
    console.log("Template", presavedData);
  }
  // console.log("New ID GEYAS", id);
  const { getInspectors, allInspectors } = useInspector();
  const { getCleaners, allCleaner } = useCleaner();
  const { startLoading, stopLoading, loading } = useLoading();
  const [selectedSupervisor, setSelectedSupervisor] = useState([]);
  const [inspectorLoading, setInspectorLoading] = useState(false);
  const defaultStageTime = (stageName) => {
    const foundStage = presavedData?.stages?.find(
      (stage) => stage.name === stageName
    );
    const defaultTime = foundStage
      ? new Date(foundStage.start_time)
      : new Date();
    return {
      stage_hour: defaultTime.getHours(),
      stage_minute: defaultTime.getMinutes(),
    };
  };

  function formatHours(seconds) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hr`;
  }

  function formatMinutes(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${minutes} min`;
  }

  // Set initial state with presavedData if available
  const [cleanTime, setCleanTime] = useState(defaultStageTime("clean"));
  const [preOpTime, setPreOpTime] = useState(defaultStageTime("preop"));
  const [releaseTime, setReleaseTime] = useState(defaultStageTime("release"));
  const [inspectTime, setInspectTime] = useState(defaultStageTime("inspect"));
  const [date, setDate] = useState(
    presavedData ? new Date(presavedData.stages[0].start_time) : new Date()
  );

  const borderWidthValue = useSharedValue(0);
  const { assignInspectorsForFacility, workOrderFacilityId, saveWorkOrder } =
    useTask();
  const [show, setShow] = useState(false);
  const [frequency, setFrequency] = useState("");

  useEffect(() => {
    const getAllSupervisors = async () => {
      startLoading();
      try {
        await getInspectors();
        await getCleaners();
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    getAllSupervisors();
  }, []);
  const supervisors = allInspectors.concat(allCleaner);
  const supervisorOptions = supervisors.map((supervisor) => {
    return {
      value: supervisor._id,
      label: `${supervisor.username} - ${supervisor.role_name}`,
    };
  });

  const frequencyOptions = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const handleSelectInspector = (selected) => {
    console.log("Selected inspector:", selected);
    const inspectorIds = selected.values.map((inspect) => {
      return inspect.value;
    });
    console.log("QUICK FIX", inspectorIds);
    setSelectedSupervisor([...inspectorIds]);
  };

  const handleSelectFrequency = (selected) => {
    setFrequency(selected.value);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Keep the picker open on iOS after selection
    setDate(currentDate);
  };
  // Function to handle the "Next" button press
  const handleNextPress = async () => {
    const data = {
      facility_id: id,
      assigned_supervisors: selectedSupervisor,
      scheduled_date: date,
      repeat: frequency,
      stages: [
        {
          name: "clean",
          stage_hour: cleanTime.stage_hour,
          stage_minute: cleanTime.stage_minute,
        },
        {
          name: "preop",
          stage_hour: preOpTime.stage_hour,
          stage_minute: preOpTime.stage_minute,
        },
        {
          name: "release",
          stage_hour: releaseTime.stage_hour,
          stage_minute: releaseTime.stage_minute,
        },
        {
          name: "inspect",
          stage_hour: inspectTime.stage_hour,
          stage_minute: inspectTime.stage_minute,
        },
      ],
    };
    console.log("Go to the next step", data);
    setInspectorLoading(true);
    try {
      assignInspectorsForFacility(data);
      saveWorkOrder(data);
      setInspectorLoading(false);
      // navigation.navigate("SelectUnassignedRooms", {
      //   facilityData: data,
      //   id,
      //   workOrderFacilityId,
      // });
      navigation.navigate("AdminWorkorderHome");
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };

  return loading ? (
    <ActivityIndicator
      color={colors.blue}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <ScrollView style={styles.container}>
      <Header
        label="Set Facility Timing"
        withAdd={false}
        withBack={true}
        onAdd={() => {
          console.log("Add something");
        }}
        navigation={navigation}
      />
      <MultipleSelect
        style={styles.select}
        options={supervisorOptions}
        onSelect={handleSelectInspector}
        label="Select Supervisors (Inspector or Cleaner)"
        placeHolder="Enter here"
        borderWidthValue={borderWidthValue}
        onClose={() => (borderWidthValue.value = withTiming(0))}
      />
      <Select
        style={styles.select}
        options={frequencyOptions}
        placeHolder="Enter here"
        label="Repeat"
        onSelect={handleSelectFrequency}
      />
      <DateInput
        label="Schedule Date"
        style={styles.input}
        onChange={onDateChange}
        setShowDate={setShow}
        date={date}
        showDate={show}
      />
      {presavedData ? (
        <StageDetails stages={presavedData.stages} />
      ) : (
        <>
          <DurationInput
            label="Enter Duration - Clean"
            onDurationChange={setCleanTime}
            style={styles.input}
            hourValue={formatHours(cleanTime.stage_hour)}
            minuteValue={formatMinutes(cleanTime.stage_minute)}
          />
          <DurationInput
            label="Enter Duration - Pre-Op"
            onDurationChange={setPreOpTime}
            style={styles.input}
            hourValue={formatHours(preOpTime.stage_hour)}
            minuteValue={formatMinutes(preOpTime.stage_minute)}
          />
          <DurationInput
            label="Enter Duration - Release"
            onDurationChange={setReleaseTime}
            style={styles.input}
            hourValue={formatHours(releaseTime.stage_hour)}
            minuteValue={formatMinutes(releaseTime.stage_minute)}
          />
          <DurationInput
            label="Enter Duration - Inspect"
            onDurationChange={setInspectTime}
            style={styles.input}
            hourValue={formatHours(inspectTime.stage_hour)}
            minuteValue={formatMinutes(inspectTime.stage_minute)}
          />
        </>
      )}

      <Button
        style={{ marginBottom: 25, marginTop: 10 }}
        label="Submit"
        isLoading={inspectorLoading}
        onPress={handleNextPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.04, // 4% of screen width
    height: "100%",
    backgroundColor: colors.white,
  },
  input: {
    paddingBottom: height * 0.02, // 2% of screen height
  },
  title: {
    fontSize: width < 360 ? 16 : 20, // Smaller font for smaller screens
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    color: colors.blue,
    paddingLeft: 10,
  },
  content: {
    fontSize: width < 360 ? 14 : 16,
    paddingLeft: 10,
    marginBottom: 3,
  },
  select: {},
  detailContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default SelectInspectorsWorkOrder;
