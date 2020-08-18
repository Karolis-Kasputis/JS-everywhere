import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';
const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);
  console.log('data', data);
  console.log('loading', loading);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    return <p>No notes yet...</p>;
  }
};
export default MyNotes;
