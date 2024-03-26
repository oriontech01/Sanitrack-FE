import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocations";
import Select from "../../../../components/general/Select";
import Button from "../../../../components/general/Button";
import Header from "../../components/Header";
import colors from "../../../../util/colors";

export default function AllFacilities({ navigation }) {
  const { getLocation, loading, allLocations } = useLocation();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (allLocations.length > 0) {
      const mappedLocations = allLocations.map((loc) => ({
        value: loc._id,
        label: `${loc.country}| ${loc.state} ${loc.city}`,
      }));
      setOptions(mappedLocations);
    }
  }, [allLocations]);

  return (
    <View style={styles.container}>
      <Header
        withBack={true}
        withAdd={false}
        onAdd={() => console.log("GGs")}
        navigation={navigation}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Select Facility</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <Select
            style={styles.select}
            label="Select Facility"
            onSelect={(val) => {
              console.log(val);
              setSelected(val.value);
            }}
            options={options}
          />
        )}
        <Button
          style={styles.button}
          onPress={() => {
            if (selected) {
              navigation.navigate("SelectInspectors", { id: selected });
            }
          }}
          label="Next"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20, // Adds padding on the sides
    paddingVertical: 10, // Adds a bit of vertical padding for spacing
    justifyContent: "center",
    flex: 1,
  },
  headerText: {
    color: colors.blue,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20, // Adds some space below the header text
    alignSelf: "center", // Centers the header text horizontally
  },
  select: {
    marginVertical: 20, // Adds some space above and below the select component
  },
  button: {
    marginTop: 10, // Adds some space above the button
  },
});
