import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';
const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In - Notedle';
  });
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onComleted: data => {
      localStorage.setItem('token', data.SignIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });
  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>loading....</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};
export default SignIn;
