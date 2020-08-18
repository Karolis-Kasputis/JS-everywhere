import React, { useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import { useMutation, gql } from '@apollo/client';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      author {
        username
        id
      }
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
    }
  }
`;
const NewNote = props => {
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    },
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }]
  });

  useEffect(() => {
    document.title = 'Notedly - new note !';
  });

  return <NoteForm action={data} />;
};

export default NewNote;
