import React from 'react';
import PropTypes from 'prop-types';

export default class CharactersList extends React.Component {
  render() {
    const { characters } = this.props;

    return (
      <div>{ JSON.stringify(characters) }</div>
    );
  }
}

CharactersList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};
