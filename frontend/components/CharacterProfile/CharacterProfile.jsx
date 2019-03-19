import React from 'react';
import PropTypes from 'prop-types';

export default class CharacterProfile extends React.Component {
  render() {
    const { character } = this.props;

    return (
      <div>{ JSON.stringify(character) }</div>
    );
  }
}

CharacterProfile.propTypes = {
  character: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
