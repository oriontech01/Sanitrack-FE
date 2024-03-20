import React, {useEffect} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../util/colors";
import { tableData } from "../../../util/mssTableData";
import useTask from "../hooks/useTask";

export default function MssTabularOverview() {
  const {mssData, getMSSTableData} =  useTask()
  useEffect(() => {
    const fetchMssTableData = async () => {
       await getMSSTableData()
    }  
    fetchMssTableData()
  }, [])
  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: colors.blue, fontWeight: "bold" }}>
          Master Sanitation Schedule
        </Text>
        <ScrollView horizontal style={styles.tableContainer}>
          <View>
            <View style={styles.tableHead}>
              <Text style={styles.headerText}>Room</Text>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Frequency (days)</Text>
              <Text style={styles.headerText}>Last Cleaned Date</Text>
              <Text style={styles.headerText}>Next due date</Text>
              <Text style={styles.headerText}>Past due</Text>
              <Text style={styles.headerText}>Assigned to</Text>
              <Text style={styles.headerText}>Item Status</Text>
              <Text style={styles.headerText}>Work order ID</Text>
              <Text style={styles.headerText}>Evidence Link</Text>
            </View>
            <ScrollView>
              {tableData.map((data, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.rowText}>{data.room}</Text>
                  <Text style={styles.rowText}>{data.item}</Text>
                  <Text style={styles.rowText}>{data.frequency}</Text>
                  <Text style={styles.rowText}>{data.lastCleaned}</Text>
                  <Text style={styles.rowText}>{data.nextDue}</Text>
                  <Text style={styles.rowText}>{data.pastDue}</Text>
                  <Text style={styles.rowText}>{data.assignedTo}</Text>
                  <Text style={styles.rowText}>{data.itemStatus}</Text>
                  <Text style={styles.rowText}>{data.workOrderId}</Text>
                  <Text style={styles.rowText}>{data.evidenceLink}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
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
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 10,
  },
  rowText: {
    width: 150,
    textAlign: "center",
    marginRight: 20,
  },
});
