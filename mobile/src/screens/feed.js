import React from 'react';
import { View, Text, Button } from 'react-native';
import NoteFeed from '../components/NoteFeed';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import Loading from '../components/Loading';
const GET_NOTES = gql`
  query notes {
    notes {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;
const Feed = props => {
  const { loading, error, data } = useQuery(GET_NOTES);
  if (!data) return <Loading />;

  if (error) return <Text>Error!!!</Text>;

  return <NoteFeed navigation={props.navigation} notes={data.notes} />;
};
Feed.navigationOptions = {
  title: 'My feed.'
};
export default Feed;
