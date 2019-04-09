import * as React from 'react';
import CharacterProfile from '../../components/CharacterProfile';
import characterService, { CharacterData } from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';

interface CharacterProps {
  match: {
    params: {
      characterId: number;
    };
  };
}

interface CharacterState {
  character: CharacterData | null;
  errors: any[];
  isLoading: boolean;
}

export default class CharacterPage extends React.Component<CharacterProps, CharacterState> {
  constructor(props: CharacterProps) {
    super(props);

    this.state = {
      character: null,
      errors: [],
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    document.title = locale.getMessage('pageTitle.home');

    try {
      const { match: { params: { characterId } } } = this.props;
      const character = await characterService.getCharacter(characterId);

      this.setState({ character });
      document.title = locale.getMessage('pageTitle.character', { characterName: character.name });
    } catch (error) {
      this.setState({ errors: [error] });
    }

    this.setState({ isLoading: false });
  }

  public renderCharacterProfile(): React.ReactNode {
    const { character } = this.state;

    if (character) {
      return <CharacterProfile character={character} />;
    }

    return null;
  }

  public render(): React.ReactNode {
    return (
      <div className="page character-page">
        <h1>Character page</h1>
        {this.renderCharacterProfile()}
      </div>
    );
  }
}
