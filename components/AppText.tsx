import { StyleSheet, Text, TextProps, View } from 'react-native';
import React from 'react';
import colors from '../util/colors';

export default function AppText({ children, ...props }) {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.black,
    textTransform: 'capitalize',
  },
});
