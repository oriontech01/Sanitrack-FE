import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
  Text,
  View,
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
    { key: "list", title: "List View" },
    { key: "map", title: "Map View" },
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
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{paddingLeft: 35, fontSize: 20}}>Could not connect to google maps, please try again later</Text>
      </View>
    );
  };
  const RenderLocationListView = () => {
    return <LocationListView locationData={allLocations} />;
  };

  const renderScene = SceneMap({
    list: RenderLocationListView,
    map: RenderLocationMapView,
  });

  const layout = useWindowDimensions();

  return loading ? (
    <ActivityIndicator size={"small"} color={colors.blue} style={{flex: 1}}/>
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
