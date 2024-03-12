import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import useGetRequestDetail from './hooks/useGetReDetail';
import { ArrowLeftIcon } from '../../assets/svg/Index';
import colors from '../../util/colors';
import ItemList from '../Home/components/ItemList';
import FacilityList from '../Home/components/FacilityList';
import useGetDetail from './hooks/useGetDetail';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import useApprove from './hooks/useApprove';
import useReject from './hooks/useReject';

export default function RequestApproval({ navigation, route }) {
  const { id, requestId } = route.params;
  const { item, loadingItem } = useGetDetail(id, requestId);
  const [comments, setComment] = useState('');
  const [quantity, setQuantity] = useState(item ? item?.quantity : '');
  const { approve, approving } = useApprove();
  const { rejectRequest, rejecting } = useReject();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Request Approval</Text>
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
        {!loadingItem && (
          <>
            <ItemList
              item={item?.item_name}
              title={`${item?.quantity} (${item?.unit})`}
            />
            <View>
              <Text
                style={{
                  color: colors.blue,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Cleaners Comments
              </Text>

              <Text
                style={{
                  color: '#595959',
                }}>
                {item?.cleaner_reason}
              </Text>
            </View>
            <Text
              style={{
                color: '#999999',
                fontSize: 16,
                fontWeight: '600',
                marginTop: 40,
                marginBottom: 10,
              }}>
              Enter Comments Here
            </Text>

            <TextInput
              onChangeText={(e) => setComment(e)}
              value={comments}
              textAlignVertical="top"
              placeholder="Enter here"
              style={styles.input}
            />
            <Input
              onChange={(e) => setQuantity(e)}
              value={quantity}
              label="Enter Quantity"
              placeholder="Enter here"
            />

            <View style={styles.buttons}>
              <Button
                isLoading={approving}
                onPress={async () => {
                  const bodyData = {
                    inspectorAcceptData: {
                      cleaning_id: item.cleaning_id,
                      request_id: requestId,
                      inspector_comment: comments,
                      item_name: item.item_name,
                      quantity: quantity,
                      unit: item.unit,
                    },
                  };
                  const approved = await approve(bodyData, id);
                  if (approved) {
                    alert('Request Approved');
                    navigation.navigate('RequestHome');
                  }
                }}
                style={styles.button}
                label="Approve"
              />
              <Button
                onPress={async () => {
                  const bodyData = {
                    inspectorAcceptData: {
                      cleaning_id: item.cleaning_id,
                      request_id: requestId,
                      inspector_comment: comments,
                      item_name: item.item_name,
                      quantity: item.quantity,
                      unit: item.unit,
                    },
                  };
                  const approved = await rejectRequest(bodyData, id);
                  if (approved) {
                    alert('Request Denied');
                    navigation.navigate('RequestHome');
                  }
                }}
                isLoading={rejecting}
                fontStyle={{ color: '#6D0808' }}
                style={{ ...styles.button, backgroundColor: '#FFE0E0' }}
                label="Decline"
              />
            </View>
          </>
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
  input: {
    width: '100%',
    height: 127,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    color: '#999999',
    padding: 10,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '45%',
    height: 58,
  },
});
