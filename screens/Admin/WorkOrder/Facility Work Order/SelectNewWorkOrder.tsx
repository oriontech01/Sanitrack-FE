import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import FacilityList from "../../../Home/components/FacilityList";
import useLoading from "../../../general_hooks/useLoading";
import useTask from "../../hooks/useTask";


export default function SelectNewWorkOrder({ navigation }) {
  const { startLoading, stopLoading, loading } = useLoading();
  const { getPreSavedWorkOrders, preSavedWO } = useTask();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getPreSavedWorkOrders();
      stopLoading();
    };
    fetchData();
  }, []);

  console.log('Presaved', preSavedWO)
  return (
    <View style={{ padding: 20 }}>
      <Header
        label="Assign Facility Timer"
        withAdd={true}
        withBack={true}
        onAdd={() => {
          navigation.navigate("AllFacilities")
        }}
        navigation={navigation}
      />
      <Text style={{paddingLeft:10, paddingTop: 10}}>Select from existing timers.</Text>
      <View style={{flex: 1}}>
        {preSavedWO.map((template) => {
          return (
            <FacilityList
              key={template._id}
              title={`${template.facility_id.facility_name}`}
              detail={`${template.facility_id.country} - ${template.facility_id.state} -  ${template.facility_id.city}`}
              onPress={() => {
                navigation.navigate("SelectInspectors", {
                    id: template._id,
                    presavedData: template
                })
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
