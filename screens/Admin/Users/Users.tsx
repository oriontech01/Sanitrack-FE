import {
  useWindowDimensions,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../../../util/colors";
import useStaff from "../../../Hooks/useStaff";
import useLoading from "../../general_hooks/useLoading";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: colors.blue }}
    labelStyle={{ color: colors.white }}
  />
);

export default function Users() {
  const [index, setIndex] = useState(0);
  const { getAllCleaners, allCleaners, allInspectors, getAllInspectors } =
    useStaff();
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchUsers = async () => {
      startLoading();
      try {
        await getAllCleaners();
        await getAllInspectors();
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };

    fetchUsers();
  }, []);

  const [routes] = useState([
    { key: "cleaners", title: "Cleaners" },
    { key: "inspectors", title: "Inspectors" },
  ]);
  const RenderInspectorList = () => {
    return <UserList userData={allInspectors} />;
  };
  const RenderCleanerList = () => {
    return <UserList userData={allCleaners} />;
  };
  const renderScene = SceneMap({
    cleaners: RenderCleanerList,
    inspectors: RenderInspectorList,
  });

  const layout = useWindowDimensions();
  return (
    <>
      {loading ? (
        <ActivityIndicator size={"large"} color={colors.blue} />
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      )}
    </>
  );
}
