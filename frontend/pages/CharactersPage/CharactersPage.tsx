import * as React from 'react';
import CharactersList from '../../components/CharactersList';
import characterService, { ShortCharacterData } from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';

interface CharactersState {
  characters: ShortCharacterData[];
  errors: any[];
  isLoading: boolean;
}

export default class CharactersPage extends React.Component<{}, CharactersState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      characters: [],
      errors: [],
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    document.title = locale.getMessage('pageTitle.home');

    try {
      const characters = await characterService.getCharacters();

      this.setState({ characters });
      document.title = locale.getMessage('pageTitle.characters');
    } catch (error) {
      this.setState({ errors: [error] });
    }

    this.setState({ isLoading: false });
  }

  public render(): React.ReactNode {
    const { characters } = this.state;

    return (
      <div className="page characters-page">
        <h1>Characters list page</h1>
        <CharactersList characters={characters} />
      </div>
    );
  }
}
