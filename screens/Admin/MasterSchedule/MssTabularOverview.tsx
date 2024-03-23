import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from "react-native";
import colors from "../../../util/colors";
import useTask from "../hooks/useTask";
import useLoading from "../../general_hooks/useLoading";
import { ArrowRightIcon } from "../../../assets/svg/Index";
import MonthlyMissedCleaningsChart from "./MSSMissedMonthlyCleaningChart";
import { useNavigation } from "@react-navigation/native";
import { TableIcon } from "../../../assets/svg/Index";
import useMss from "../hooks/useMss";

export default function MssTabularOverview() {
  const { getMonthlyMissed, monthlyMissed } =
    useTask();
  const { startLoading, stopLoading, loading } = useLoading();
  const navigation = useNavigation();
  const [activeHeader, setActiveHeader] = useState(null);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const headerRefs = useRef([]);
  const  { mssData, getMSSTableData, currentPage, setCurrentPage, totalPages } = useMss()
  const sortingOptions = ["Ascending", "Descending"]; // Example sorting criteria

  useEffect(() => {
    const fetchMssTableData = async () => {
      startLoading();
      await getMonthlyMissed();
      stopLoading();
    };
    fetchMssTableData();
  }, []); // Ensured stopLoading is called within the async function
  
  console.log("HLEP", mssData[0]);
  const tableHeaders = [
    "Room",
    "Item",
    "Frequency (days)",
    "Last Cleaned Date",
    "Next due date",
    "Task Stage",
    "Assigned to",
    "Item Status",
    "Work order ID",
    "Evidence Link",
  ];
  const onIconPress = (index) => {
    setActiveHeader(index === activeHeader ? null : index); // Toggle visibility
    if (headerRefs.current[index]) {
      headerRefs.current[index].measure((fx, fy, width, height, px, py) => {
        setBoxPosition({ x: px, y: py + height }); // Position below the header
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.blue} />
      ) : (
        <MonthlyMissedCleaningsChart monthlyMissed={monthlyMissed} />
      )}
      <Text
        style={{
          fontSize: 18,
          color: colors.blue,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Tabular Overview
      </Text>
      <Text>This is an overview of rooms and their respective assets.</Text>
      {loading ? (
        <ActivityIndicator size="small" color={colors.blue} />
      ) : (
        <ScrollView horizontal style={styles.tableContainer}>
          <View>
            <View style={styles.tableHead}>
              {tableHeaders.map((header, index) => (
                <View
                  key={index}
                  ref={(el) => (headerRefs.current[index] = el)}
                >
                  <Text style={styles.headerText}>
                    {header}
                    <TouchableOpacity onPress={() => onIconPress(index)}>
                      <TableIcon />
                    </TouchableOpacity>
                  </Text>
                </View>
              ))}
            </View>
            {/* {activeHeader !== null && (
              <View
                style={[
                  styles.sortingOptionsBox,
                  { top: boxPosition.y, left: boxPosition.x },
                ]}
              >
                {sortingOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      console.log(
                        `Sort ${tableHeaders[activeHeader]} by ${option}`
                      )
                    }
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )} */}
            <ScrollView>
              {mssData.map((data, index) =>
                data.tasks.map((task, taskIndex) => (
                  <View key={`${index}-${taskIndex}`} style={styles.tableRow}>
                    <Text style={styles.rowText}>
                      {data.assigned_room ? data.assigned_room.roomName : "N/A"}
                    </Text>
                    <Text style={styles.rowText}>{task.name}</Text>
                    <Text style={styles.rowText}>{data.times_approved}</Text>
                    <Text style={styles.rowText}>
                      {task.last_cleaned
                        ? task.last_cleaned.split("T")[0]
                        : "N/A"}
                    </Text>
                    <Text style={styles.rowText}>
                      {task.scheduled_date
                        ? task.scheduled_date.split("T")[0]
                        : "N/A"}
                    </Text>
                    <Text style={styles.rowText}>{data.task_stage}</Text>
                    <Text style={styles.rowText}>Sanitation</Text>
                    <Text style={styles.rowText}>
                      {data.isSubmitted ? "Online" : "Offline"}
                    </Text>
                    <Text style={styles.rowText}>{data._id}</Text>
                    <Text
                      onPress={() => Linking.openURL("https://google.com")}
                      style={[
                        styles.rowText,
                        {
                          textDecorationLine: "underline",
                          textDecorationColor: colors.blue,
                        },
                      ]}
                    >
                      Evidence Link
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (data.assigned_room.roomName && data) {
                          navigation.navigate("RoomOverview", {
                            roomData: data,
                          });
                        } else null;
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#000",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                      }}
                    >
                      {/* Assuming you have an Icon component for ArrowRightIcon */}
                      <ArrowRightIcon />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </ScrollView>
      )}
      <View style={styles.paginationControls}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: colors.lightgray,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    width: 150,
    textAlign: "center",
    marginRight: 20,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 10,
  },
  rowText: {
    width: 150,
    textAlign: "center",
    marginRight: 20,
  },
  sortingOptionsBox: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    zIndex: 1000, // Make sure this is above other content
  },
  optionText: {
    paddingVertical: 5,
  },
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10
  },
  paginationText: {
    color: colors.blue
  }
});
