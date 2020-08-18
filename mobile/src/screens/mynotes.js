import React from 'react';
import { View, Text } from 'react-native';

const MyNotes = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My notes </Text>
    </View>
  );
};
MyNotes.navigationOptions = {
  title: 'My notes'
};
export default MyNotes;
