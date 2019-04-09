import * as React from 'react';
import CharactersList from '../../components/CharactersList';
import characterService, { ShortCharacterData } from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps } from 'react-router-dom';

interface CharactersState {
  characters: ShortCharacterData[];
  errors: any[];
  isLoading: boolean;
}

export default class CharactersPage extends React.Component<RouteComponentProps, CharactersState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      characters: [],
      errors: [],
      isLoading: true,
    };

    this.handleClickOnCharacter = this.handleClickOnCharacter.bind(this);
  }

  public handleClickOnCharacter(characterId: number): void {
    this.props.history.push(`/characters/${characterId}`);
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
        <h1 className="characters-page__header">{locale.getMessage('charactersPage.header')}</h1>
        <div className="characters-page__content-wrapper">
          <CharactersList characters={characters} onCharacterClick={this.handleClickOnCharacter}/>
        </div>
      </div>
    );
  }
}
