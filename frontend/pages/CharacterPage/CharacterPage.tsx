import * as _ from 'lodash';
import * as React from 'react';
import CharacterProfile from '../../components/CharacterProfile';
import characterService from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps, match } from 'react-router-dom';
import { Character, ExistingCharacter } from '../../services/RolePlayingSystem';
import authService from '../../services/Api/AuthService';
import MainLoader from '../../components/MainLoader';
import imagePreloader from '../../utils/ImagePreloader';
import { getCharacterProfileAvatarUrl } from '../../services/CharacterAvatarService';
import PageHeader from '../../components/PageHeader';

interface MatchParams {
  characterId: string;
}

interface CharacterProps extends RouteComponentProps<MatchParams> {
  character: ExistingCharacter;
}

interface CharacterState {
  isLevelUpInProgress: boolean;
}

export default class CharacterPage extends React.Component<CharacterProps, CharacterState> {
  public static async preload(matchParams: match<MatchParams>): Promise<Partial<CharacterProps>> {
    const characterId = Number(matchParams.params.characterId);

    const character = await MainLoader.withLoader(async () => {
      const characterData = await characterService.getCharacter(characterId);
      const existingCharacter = Character.fromExisting(characterData);

      await imagePreloader.preloadImage(getCharacterProfileAvatarUrl(existingCharacter.avatarId), true);

      return existingCharacter;
    });

    return { character };
  }

  constructor(props: CharacterProps) {
    super(props);

    this.state = {
      isLevelUpInProgress: false,
    };
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.character', { characterName: this.props.character.name });
  }

  public onCharacterLevelUpStateUpdate = (): void => {
    this.setState({
      isLevelUpInProgress: this.props.character.isLevelUpInProgress(),
    });
  }

  public onCharacterSave = async (): Promise<void> => {
    const updateCharacterData = this.props.character.toUpdateCharacterData();

    if (this.props.character.avatarId) {
      imagePreloader.preloadImage(getCharacterProfileAvatarUrl(this.props.character.avatarId), true);
    }

    await MainLoader.withLoader(() =>
      characterService.updateCharacter(this.props.character.id, updateCharacterData),
    );
  }

  public onCharacterDelete = async (): Promise<void> => {
    await MainLoader.withLoader(() =>
      characterService.deleteCharacter(this.props.character.id),
    );

    this.props.history.push('/characters/');
  }

  public renderContent(): React.ReactNode {
    return (
      <CharacterProfile
        key={this.props.character.id}
        character={this.props.character}
        isBelongToCurrentUser={this.isCharacterBelongToCurrentUser()}
        onLevelUpStateUpdate={this.onCharacterLevelUpStateUpdate}
        onSave={this.onCharacterSave}
        onDelete={this.onCharacterDelete}
        onCancel={_.noop}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page character-page">
        <PageHeader message={this.getHeaderMessage()}/>
        <div className="character-page__content-wrapper">
          {this.renderContent()}
        </div>
      </div>
    );
  }

  private getHeaderMessage(): string {
    return this.state.isLevelUpInProgress ?
      locale.getMessage('characterPage.levelUpHeader', { level: this.getNewLevelNumber() }) :
      locale.getMessage('characterPage.header');
  }

  private getNewLevelNumber(): number {
    if (this.props.character.isLevelUpRoleSelected()) {
      return this.props.character.getLevel();
    }

    return this.props.character.getLevel() + 1;
  }

  private isCharacterBelongToCurrentUser(): boolean {
    return authService.isAuthenticated() && authService.getCurrentUser().id === this.props.character.author.id;
  }
}
