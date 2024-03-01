import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useGetTaskSummary from '../hooks/useGetTaskSummary';

export default function InspectorSummary({ navigation, route }) {
  const { taskId } = route.params;
  const { summary } = useGetTaskSummary(taskId);
  return (
    <View>
      <Text>Summary</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
