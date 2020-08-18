import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
const EditNote = props => {
  const id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userData } = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: { id },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading) return 'Loading...';
  if (error) return <p>Error! Note not found</p>;
  if (userData && userData.me.id !== data.note.author.id)
    return <p>No permission...</p>;
  return <NoteForm action={editNote} content={data.note.content} />;
};
export default EditNote;
