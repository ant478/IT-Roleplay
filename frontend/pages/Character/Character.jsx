import React from 'react';
import PropTypes from 'prop-types';
import CharacterProfile from '../../components/CharacterProfile';

export default class Character extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      character: null,
      // errors: [],
    };
  }

  componentDidMount() {
    const { match: { params: { characterId } } } = this.props;

    fetch(`/api/characters/${characterId}`) // TODO: move to CharactersService
      .then(response => response.json())
      .then(character => this.setState({ character }));
  }

  renderCharacterProfile() {
    const { character } = this.state;

    if (character) {
      return <CharacterProfile character={character} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        <h1>Character page</h1>
        { this.renderCharacterProfile() }
      </div>
    );
  }
}

Character.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      characterId: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
