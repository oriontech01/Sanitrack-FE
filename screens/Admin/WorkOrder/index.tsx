import { useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../../../util/colors";
import WorkOrders from "./WorkOrders";
import FacilityCleaningWorkOrder from "./Facility Work Order/FacilityCleaningWorkOrder";
import { useNavigation } from "@react-navigation/native";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.white }}
    style={{ backgroundColor: colors.blue }}
    labelStyle={{ color: colors.white }}
  />
);
export default function WorkOrderIndexPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "facilities", title: "Facilities" },
    { key: "rooms", title: "Rooms" },
  ]);
  const navigation = useNavigation();

  const RenderRoomsWorkOrder = () => {
    return <WorkOrders navigation={navigation} />;
  };
  const RenderFacilityWorkOrder = () => {
    return <FacilityCleaningWorkOrder navigation={navigation} />;
  };

  const renderScene = SceneMap({
    facilities: RenderFacilityWorkOrder,
    rooms: RenderRoomsWorkOrder,
  });

  const layout = useWindowDimensions();
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
