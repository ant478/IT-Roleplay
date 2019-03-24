import * as React from 'react';
import CharactersList from '../../components/CharactersList';
import charactersService, { CharacterShort } from '../../services/CharactersService';

interface CharactersState {
  characters: CharacterShort[];
  errors: any[];
  isLoading: boolean;
}

export default class Characters extends React.Component<{}, CharactersState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      characters: [],
      errors: [],
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const characters = await charactersService.getCharacters();

      this.setState({ characters });
    } catch (error) {
      this.setState({ errors: [error] });
    }

    this.setState({ isLoading: false });
  }

  public render(): React.ReactNode {
    const { characters } = this.state;

    return (
      <div>
        <h1>Characters list page</h1>
        <CharactersList characters={characters} />
      </div>
    );
  }
}
