import React from 'react';
import { useQuery } from '@apollo/client';
import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';
const NotePage = props => {
  const id = props.match.params.id;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
  if (loading) return <p>loading...</p>;
  if (error) return <p>error!</p>;
  return <Note note={data.note} />;
};
export default NotePage;
