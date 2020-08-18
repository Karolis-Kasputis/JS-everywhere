import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import { DELETE_NOTE } from '../gql/mutation';
const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id: props.noteId },
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: () => {
      props.history.push('/mynotes');
    }
  });

  return <ButtonAsLink onClick={deleteNote}>Delete note</ButtonAsLink>;
};

export default withRouter(DeleteNote);
