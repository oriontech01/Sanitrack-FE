import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
  Text
} from "react-native";
import useLocation from "../../../Hooks/useLocation";
import useLoading from "../../general_hooks/useLoading";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../../../util/colors";
import LocationListView from "./LocationListView";
import LocationMapView from "./LocationMapView";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: colors.blue }}
    labelStyle={{ color: "white" }}
  />
);

const Location = () => {
  const { allLocations, getLocation } = useLocation();
  const { loading, startLoading, stopLoading } = useLoading();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "map", title: "Map View" },
    { key: "list", title: "List View" },
  ]);

  useEffect(() => {
    const fetchLocations = async () => {
      startLoading();
      await getLocation();
      stopLoading();
    };
    fetchLocations();
  }, []);
  const RenderLocationMapView = () => {
    return (
      // <SafeAreaView>
      //   <LocationMapView locationData={allLocations} />
      // </SafeAreaView>
      <Text>Maps</Text>
    );
  };
  const RenderLocationListView = () => {
    return <LocationListView locationData={allLocations} />;
  };

  const renderScene = SceneMap({
    map: RenderLocationMapView,
    list: RenderLocationListView,
  });

  const layout = useWindowDimensions();

  return loading ? (
    <ActivityIndicator size={"large"} color={colors.blue} />
  ) : (
    // <SafeAreaView>
    //   <TabView
    //     navigationState={{ index, routes }}
    //     renderScene={renderScene}
    //     renderTabBar={renderTabBar}
    //     onIndexChange={setIndex}
    //     initialLayout={{ width: layout.width }}
    //   />
    // </SafeAreaView>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Location;
