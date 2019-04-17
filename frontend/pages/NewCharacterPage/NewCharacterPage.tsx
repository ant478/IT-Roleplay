import * as _ from 'lodash';
import * as React from 'react';
import CharacterProfile from '../../components/CharacterProfile';
import characterService from '../../services/Api/CharacterService';
import locale from '../../services/LocalisationService';
import { RouteComponentProps } from 'react-router-dom';
import { Character, NewCharacter } from '../../services/RolePlayingSystem';

interface CharacterState {
  character: NewCharacter | null;
  isLoading: boolean;
}

export default class NewCharacterPage extends React.Component<RouteComponentProps, CharacterState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      character: null,
      isLoading: true,
    };

    this.onCharacterSave = this.onCharacterSave.bind(this);
    this.onCancelCharacterCreating = this.onCancelCharacterCreating.bind(this);
  }

  public onCancelCharacterCreating(): void {
    this.props.history.push('/characters/');
  }

  public async onCharacterSave(): Promise<void> {
    this.setState({ isLoading: true });

    try {
      const createCharacterData = this.state.character!.toCreateCharacterData();
      const characterData = await characterService.createCharacter(createCharacterData);

      this.props.history.push(`/characters/${characterData.id}`);
    } catch (error) {
      throw error;
    }
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.newCharacter');

    const newCharacter = Character.createNew(locale.getMessage('newCharacterPage.defaultCharacterName'));
    newCharacter.startLevelUp();

    this.setState({
      character: newCharacter,
      isLoading: false,
    });
  }

  public renderContent(): React.ReactNode {
    if (!this.state.character) {
      return null;
    }

    return (
      <CharacterProfile
        character={this.state.character}
        onLevelUpStateUpdate={this.onCancelCharacterCreating}
        onSave={this.onCharacterSave}
        onDelete={_.noop}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page new-character-page">
        <h1 className="new-character-page__header">{locale.getMessage('newCharacterPage.header')}</h1>
        <div className="new-character-page__content-wrapper">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
