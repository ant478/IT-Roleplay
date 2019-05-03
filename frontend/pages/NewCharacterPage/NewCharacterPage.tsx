import * as _ from 'lodash';
import * as React from 'react';
import CharacterProfile from '../../components/CharacterProfile';
import characterService, { CharacterData } from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps, match } from 'react-router-dom';
import { Character, NewCharacter } from '../../services/RolePlayingSystem';
import MainLoader from '../../components/MainLoader';
import imagePreloader from '../../utils/ImagePreloader';
import { getCharacterProfileAvatarUrl } from '../../services/CharacterAvatarService';
import PageHeader from '../../components/PageHeader';

interface CharacterState {
  character: NewCharacter | null;
}

export default class NewCharacterPage extends React.PureComponent<RouteComponentProps, CharacterState> {
  public static async preload(_matchParams: match): Promise<{}> {
    return {};
  }

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      character: null,
    };
  }

  public onCancelCharacterCreating = (): void => {
    this.props.history.push('/characters/');
  }

  public async saveCharacterAndPreloadAvatar(): Promise<CharacterData> {
    const createCharacterData = this.state.character!.toCreateCharacterData();

    if (this.state.character!.avatarId) {
      await imagePreloader.preloadImage(getCharacterProfileAvatarUrl(this.state.character!.avatarId), true);
    }

    return characterService.createCharacter(createCharacterData);
  }

  public onCharacterSave = async (): Promise<void> => {
    const characterData = await MainLoader.withLoader(() =>
      this.saveCharacterAndPreloadAvatar(),
    );

    this.props.history.push(`/characters/${characterData.id}`);
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.newCharacter');

    const newCharacter = Character.createNew(locale.getMessage('newCharacterPage.defaultCharacterName'));
    newCharacter.startLevelUp();

    this.setState({
      character: newCharacter,
    });
  }

  public renderContent(): React.ReactNode {
    if (!this.state.character) {
      return null;
    }

    return (
      <CharacterProfile
        character={this.state.character}
        isBelongToCurrentUser={true}
        onCancel={this.onCancelCharacterCreating}
        onSave={this.onCharacterSave}
        onDelete={_.noop}
        onLevelUpStateUpdate={_.noop}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page new-character-page">
        <PageHeader message={locale.getMessage('newCharacterPage.header')}/>
        <div className="new-character-page__content-wrapper">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
