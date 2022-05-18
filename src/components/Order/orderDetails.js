import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

const OrderDetails = ({ route }) => {
  const order = useMemo(() => {
    return route.params.order;
  }, [route.params.order]);

  console.log('order', order);

  const _renderItemsDetails = () => {
    return (
      <View>
        <Text>TEST</Text>
        <Text>TEST</Text>
        <Text>TEST</Text>
      </View>
    );
  };
  return (
    <View>
      <Text>Détails de la commande</Text>
      <Text>Commande numéro #{order.id}</Text>
      <Text>Adresse de la livraison : {order.address}</Text>
      {_renderItemsDetails()}
    </View>
  );
};

export default OrderDetails;
