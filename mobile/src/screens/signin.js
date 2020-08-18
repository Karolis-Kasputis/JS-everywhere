import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import UserForm from '../components/UserForm';
import Loading from '../components/Loading';
import { useMutation, gql } from '@apollo/client';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  const storeToken = token => {
    SecureStore.setItemAsync('token', token).then(
      props.navigation.navigate('App')
    );
  };
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      storeToken(data.signIn);
    }
  });
  console.log('singin', signIn);

  if (loading) return <Loading />;

  return (
    <React.Fragment>
      {error && <Text>Error signing in!</Text>}
      <UserForm
        action={signIn}
        formType="signIn"
        navigation={props.navigaton}
      />
      <Button
        title="Sub"
        onPress={() =>
          signIn({ variables: { email: 'karl@karl.com', password: 'karl!' } })
        }
      />
    </React.Fragment>
  );
};
SignIn.navigationOptions = {
  title: 'Sign in'
};
export default SignIn;
