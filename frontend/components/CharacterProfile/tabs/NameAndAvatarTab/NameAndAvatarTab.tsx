import * as React from 'react';
import classNames from 'classnames';
import authService from '../../../../services/Api/AuthService';
import locale from '../../../../services/LocalisationService';
import { Character } from '../../../../services/RolePlayingSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import InputWithIcons from '../../../../components/InputWithIcons';

const DEFAULT_AVATAR_URL = 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg';

interface NameAndAvatarProps {
  character: Character;
  onLevelUpStateUpdate: () => any;
  onSave: () => Promise<any>;
  onDelete: () => any;
  onNext: () => any;
}

interface NameAndAvatarState {
  isEditingCharacterName: boolean;
  isEditingCharacterAvatarUrl: boolean;
}

export default class NameAndAvatarTab extends React.Component<NameAndAvatarProps, NameAndAvatarState> {

  constructor(props: NameAndAvatarProps) {
    super(props);

    this.state = {
      isEditingCharacterName: false,
      isEditingCharacterAvatarUrl: false,
    };

    this.onStartLevelUp = this.onStartLevelUp.bind(this);
    this.onCancelLevelUp = this.onCancelLevelUp.bind(this);
    this.onDeleteCharacter = this.onDeleteCharacter.bind(this);
    this.onNameEditClick = this.onNameEditClick.bind(this);
    this.onNameConfirmClick = this.onNameConfirmClick.bind(this);
    this.onNameCancelClick = this.onNameCancelClick.bind(this);
    this.onAvatarEditClick = this.onAvatarEditClick.bind(this);
    this.onAvatarConfirmClick = this.onAvatarConfirmClick.bind(this);
    this.onAvatarCancelClick = this.onAvatarCancelClick.bind(this);
  }

  public onStartLevelUp(): void {
    this.props.character.startLevelUp();
    this.props.onLevelUpStateUpdate();
  }

  public onCancelLevelUp(): void {
    this.props.character.cancelLevelUp();
    this.props.onLevelUpStateUpdate();
  }

  public onDeleteCharacter(): void {
    this.props.onDelete();
  }

  public onNameEditClick(): void {
    this.setState({ isEditingCharacterName: true });
  }

  public onNameConfirmClick(value: string): void {
    const character = this.props.character;
    if (!value || character.name === value) {
      this.setState({ isEditingCharacterName: false });
      return;
    }

    character.name = value;

    if (character.isNew()) {
      this.setState({ isEditingCharacterName: false });
      return;
    }

    this.props.onSave().then(() =>
      this.setState({ isEditingCharacterName: false }),
    );
  }

  public onNameCancelClick(): void {
    this.setState({ isEditingCharacterName: false });
  }

  public onAvatarEditClick(): void {
    this.setState({ isEditingCharacterAvatarUrl: true });
  }

  public onAvatarConfirmClick(value: string): void {
    const character = this.props.character;
    if (character.avatarUrl === value) {
      this.setState({ isEditingCharacterAvatarUrl: false });
      return;
    }

    character.avatarUrl = value || null;

    if (character.isNew()) {
      this.setState({ isEditingCharacterAvatarUrl: false });
      return;
    }

    this.props.onSave().then(() =>
      this.setState({ isEditingCharacterAvatarUrl: false }),
    );
  }

  public onAvatarCancelClick(): void {
    this.setState({ isEditingCharacterAvatarUrl: false });
  }

  public renderAvatarEditor(): React.ReactNode {
    return (
      <div className="name-and-avatar-tab__avatar">
        <div className="name-and-avatar-tab__avatar-input-wrapper">
          <InputWithIcons
            initialValue={this.props.character.avatarUrl || ''}
            labelText={locale.getMessage('characterProfile.tabs.nameAndAvatar.avatarEditLabel')}
            onConfirm={this.onAvatarConfirmClick}
            onCancel={this.onAvatarCancelClick}
            type={'url'}
          />
        </div>
      </div>
    );
  }

  public renderAvatar(): React.ReactNode {
    if (this.state.isEditingCharacterAvatarUrl) {
      return this.renderAvatarEditor();
    }

    const avatarClasses = classNames('name-and-avatar-tab__avatar', {
      'name-and-avatar-tab__avatar_editable': this.isCharacterBelongToCurrentUser(),
    });

    return (
      <div className={avatarClasses}>
        <img className="name-and-avatar-tab__avatar-img" src={this.props.character.avatarUrl || DEFAULT_AVATAR_URL}/>
        <i className="name-and-avatar-tab__avatar-edit-icon" onClick={this.onAvatarEditClick}><FontAwesomeIcon icon={faEdit}/></i>
      </div>
    );
  }

  public renderNameEditor(): React.ReactNode {
    return (
      <div className="name-and-avatar-tab__name">
        <div className="name-and-avatar-tab__name-input-wrapper">
          <InputWithIcons
            initialValue={this.props.character.name}
            onConfirm={this.onNameConfirmClick}
            onCancel={this.onNameCancelClick}
          />
        </div>
      </div>
    );
  }

  public renderName(): React.ReactNode {
    if (this.state.isEditingCharacterName) {
      return this.renderNameEditor();
    }

    const nameClasses = classNames('name-and-avatar-tab__name', {
      'name-and-avatar-tab__name_editable': this.isCharacterBelongToCurrentUser(),
    });

    return (
      <div className={nameClasses}>
        <span className="name-and-avatar-tab__name-text">{this.props.character.name}</span>
        <i className="name-and-avatar-tab__name-edit-icon" onClick={this.onNameEditClick}><FontAwesomeIcon icon={faEdit}/></i>
      </div>
    );
  }

  public getButtonsForExistingCharacter(): React.ReactNode[] {
    const buttons = [];

    if (!this.getCharacterLevelUpState()) {
      buttons.push(
        <div key="level-up" className="name-and-avatar-tab__button name-and-avatar-tab__button_level-up" onClick={this.onStartLevelUp}>
          {locale.getMessage('characterProfile.tabs.nameAndAvatar.levelUpButtonText')}
        </div>,
      );
    } else {
      buttons.push(
        <div key="cancel" className="name-and-avatar-tab__button name-and-avatar-tab__button_cancel" onClick={this.onCancelLevelUp}>
          {locale.getMessage('characterProfile.tabs.nameAndAvatar.cancelLevelUpButtonText')}
        </div>,
      );
    }

    buttons.push(
      <div key="delete" className="name-and-avatar-tab__button name-and-avatar-tab__button_delete" onClick={this.onDeleteCharacter}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.deleteButtonText')}
      </div>,
    );

    return buttons;
  }

  public getButtonsForNewCharacter(): React.ReactNode[] {
    const nextButton = (
      <div key="next" className="name-and-avatar-tab__button name-and-avatar-tab__button_next" onClick={this.props.onNext}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.nextTabButtonText')}
      </div>
    );

    const cancelButton = (
      <div key="cancel" className="name-and-avatar-tab__button name-and-avatar-tab__button_cancel" onClick={this.onCancelLevelUp}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.cancelNewCharacterButtonText')}
      </div>
    );

    return [nextButton, cancelButton];
  }

  public renderButtons(): React.ReactNode {
    if (!this.isCharacterBelongToCurrentUser()) {
      return [];
    }

    return (
      <div className="name-and-avatar-tab__buttons-wrapper">
        {this.props.character.isNew() ? this.getButtonsForNewCharacter() : this.getButtonsForExistingCharacter()}
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="name-and-avatar-tab">
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderButtons()}
      </div>
    );
  }

  protected isCharacterBelongToCurrentUser(): boolean {
    if (this.props.character.isNew()) {
      return true;
    }

    return authService.isAuthenticated() &&
      this.props.character.isExisting() &&
      authService.getCurrentUser().id === this.props.character.author.id;
  }

  protected getCharacterLevelUpState(): boolean {
    return this.props.character.isLevelUpInProgress() || this.props.character.isLevelUpAvailable();
  }
}
