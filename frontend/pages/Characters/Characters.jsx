import React from 'react';
import CharactersList from '../../components/CharactersList';

export default class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      characters: [],
      // errors: [],
    };
  }

  componentDidMount() {
    fetch('/api/characters') // TODO: move to CharactersService
      .then(response => response.json())
      .then(characters => this.setState({ characters }));
  }

  render() {
    const { characters } = this.state;

    return (
      <div>
        <h1>Characters list page</h1>
        <CharactersList characters={characters} />
      </div>
    );
  }
}
