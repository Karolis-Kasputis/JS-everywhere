import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import ButtonAsLink from './ButtonAsLink';
const FavoriteNote = props => {
  const [favorited, setFavorited] = useState(
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: props.noteId }
  });

  const toggle = () => {
    toggleFavorite();
    setFavorited(!favorited);
  };

  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink onClick={toggle}>Unfavorite</ButtonAsLink>
      ) : (
        <ButtonAsLink onClick={toggle}>Favorite</ButtonAsLink>
      )}
    </React.Fragment>
  );
};

export default FavoriteNote;
