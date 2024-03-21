import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../util/colors';
import useTask from '../hooks/useTask';
import useLoading from '../../general_hooks/useLoading';
import useStaff from '../../../Hooks/useStaff';
import { ArrowRightIcon } from '../../../assets/svg/Index';

export default function MssTabularOverview() {
  const { mssData, getMSSTableData } = useTask();
  const { getAllStaffs, allStaffs } = useStaff();
  const { startLoading, stopLoading, loading } = useLoading();

  useEffect(() => {
    const fetchMssTableData = async () => {
      startLoading();
      await getMSSTableData();
      stopLoading();
    };
    fetchMssTableData();
  }, []); // Ensured stopLoading is called within the async function

  console.log('HLEP', mssData[0]);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, color: colors.blue, fontWeight: 'bold' }}>
        Master Sanitation Schedule
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.blue} />
      ) : (
        <ScrollView horizontal style={styles.tableContainer}>
          <View>
            <View style={styles.tableHead}>
              <Text style={styles.headerText}>Room</Text>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Frequency (days)</Text>
              <Text style={styles.headerText}>Last Cleaned Date</Text>
              <Text style={styles.headerText}>Next due date</Text>
              <Text style={styles.headerText}>Task Stage</Text>
              <Text style={styles.headerText}>Assigned to</Text>
              <Text style={styles.headerText}>Item Status</Text>
              <Text style={styles.headerText}>Work order ID</Text>
              <Text style={styles.headerText}>Evidence Link</Text>
              <Text style={styles.headerText}></Text>
            </View>
            <ScrollView>
              {mssData.map((data, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.rowText}>
                    {data.assigned_room ? data.assigned_room.roomName : 'N/A'}
                  </Text>
                  <Text style={styles.rowText}>{data.tasks[0].name}</Text>
                  <Text style={styles.rowText}>{data.times_approved}</Text>
                  <Text style={styles.rowText}>
                    {data.tasks[0].last_cleaned
                      ? data.tasks[0].last_cleaned.split('T')[0]
                      : 'N/A'}
                  </Text>
                  <Text style={styles.rowText}>
                    {data.tasks[0].scheduled_date
                      ? data.tasks[0].scheduled_date.split('T')[0]
                      : 'N/A'}
                  </Text>
                  {/* <Text style={styles.rowText}>{data.pastDue}</Text> */}
                  <Text style={styles.rowText}>{data.task_stage}</Text>
                  <Text style={styles.rowText}>Sanitation</Text>
                  <Text style={styles.rowText}>
                    {data.isSubmitted === true ? 'Online' : 'Offline'}
                  </Text>
                  <Text style={styles.rowText}>{data._id}</Text>
                  <Text
                    onPress={() => Linking.openURL('https://google.com')}
                    style={[
                      styles.rowText,
                      {
                        textDecorationLine: 'underline',
                        textDecorationColor: colors.blue,
                      },
                    ]}>
                    Evidence Link
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: '#000',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}>
                    <ArrowRightIcon />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    width: 150,
    textAlign: 'center',
    marginRight: 20,
  },
  tableRow: {
    flexDirection: 'row',
    textAlign: 'center',
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 10,
  },
  rowText: {
    width: 150,
    textAlign: 'center',
    marginRight: 20,
  },
});
