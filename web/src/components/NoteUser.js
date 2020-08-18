import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';
import { DELETE_NOTE } from '../gql/mutation';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';
const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <React.Fragment>
      Favorites: {props.note.favoriteCount}
      <br />
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
          <DeleteNote noteId={props.note.id} /> <br />
          <FavoriteNote noteId={props.note.id} me={data.me} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default NoteUser;
