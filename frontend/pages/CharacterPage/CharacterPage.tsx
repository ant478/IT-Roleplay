import * as React from 'react';
import CharacterProfile from '../../components/CharacterProfile';
import characterService from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps } from 'react-router-dom';
import { Character, ExistingCharacter } from '../../services/RolePlayingSystem';

interface MatchParams {
  characterId: string;
}

interface CharacterProps extends RouteComponentProps<MatchParams> {}

interface CharacterState {
  isLevelUpInProgress: boolean;
  character: ExistingCharacter | null;
  isLoading: boolean;
}

export default class CharacterPage extends React.Component<CharacterProps, CharacterState> {
  constructor(props: CharacterProps) {
    super(props);

    this.state = {
      isLevelUpInProgress: false,
      character: null,
      isLoading: true,
    };

    this.onCharacterLevelUpStateUpdate = this.onCharacterLevelUpStateUpdate.bind(this);
    this.onCharacterSave = this.onCharacterSave.bind(this);
    this.onCharacterDelete = this.onCharacterDelete.bind(this);
  }

  public onCharacterLevelUpStateUpdate(): void {
    this.setState({
      isLevelUpInProgress: this.getCharacterLevelUpState(this.state.character!),
    });
  }

  public async onCharacterSave(): Promise<void> {
    this.setState({ isLoading: true });

    const updateCharacterData = this.state.character!.toUpdateCharacterData();
    const characterData = await characterService.updateCharacter(this.state.character!.id, updateCharacterData);
    const updatedCharacter = Character.fromExisting(characterData);

    this.setState({
      character: updatedCharacter,
      isLevelUpInProgress: this.getCharacterLevelUpState(updatedCharacter),
      isLoading: false,
    });
  }

  public async onCharacterDelete(): Promise<void> {
    this.setState({ isLoading: true });

    await characterService.deleteCharacter(this.state.character!.id);
    this.props.history.push('/characters/');
  }

  public async componentDidMount(): Promise<void> {
    document.title = locale.getMessage('pageTitle.home');

    const characterId = Number(this.props.match.params.characterId);
    const characterData = await characterService.getCharacter(characterId);
    const character = Character.fromExisting(characterData);

    this.setState({
      character,
      isLevelUpInProgress: this.getCharacterLevelUpState(character),
      isLoading: false,
    });

    document.title = locale.getMessage('pageTitle.character', { characterName: characterData.name });
  }

  public renderContent(): React.ReactNode {
    if (!this.state.character) {
      return null;
    }

    return (
      <CharacterProfile
        character={this.state.character}
        onLevelUpStateUpdate={this.onCharacterLevelUpStateUpdate}
        onSave={this.onCharacterSave}
        onDelete={this.onCharacterDelete}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page character-page">
        <h1 className="character-page__header">{this.getHeaderMessage()}</h1>
        <div className="character-page__content-wrapper">
          {this.renderContent()}
        </div>
      </div>
    );
  }

  private getHeaderMessage(): string {
    return this.state.isLevelUpInProgress ?
      locale.getMessage('characterPage.levelUpHeader') :
      locale.getMessage('characterPage.header');
  }

  private getCharacterLevelUpState(character: Character): boolean {
    return character.isLevelUpAvailable() || character.isLevelUpInProgress();
  }
}
