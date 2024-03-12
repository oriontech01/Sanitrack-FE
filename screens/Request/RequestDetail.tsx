import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useGetRequestDetail from './hooks/useGetReDetail';
import { ArrowLeftIcon, LocationIcon } from '../../assets/svg/Index';
import colors from '../../util/colors';
import ItemList from '../Home/components/ItemList';
import FacilityList from '../Home/components/FacilityList';

export default function RequestDetail({ navigation, route }) {
  const { id } = route.params;
  const { item, loadingItem } = useGetRequestDetail(id);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Request Details</Text>
      </TouchableOpacity>

      <ScrollView>
        {loadingItem && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        {!loadingItem && item.length > 0 && (
          <>
            {item.map((data, index) => (
              <FacilityList
                key={index.toString()}
                detail={data.quantity}
                title={data.item_name}
                onPress={() => {
                  navigation.navigate('RequestApproval', {
                    id: id,
                    requestId: data._id,
                  });
                }}
              />
            ))}
          </>
        )}

        {!loadingItem && item.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              height: 400,
            }}>
            <LocationIcon />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              All items are approved
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  haeding: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 'auto',
  },

  topBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
