import * as React from 'react';
import locale from '../../../../../../services/LocalisationService';

interface ButtonsSectionProps {
  isCharacterNew: boolean;
  isLevelUpInProgress: boolean;
  isBelongToCurrentUser: boolean;
  onLevelUpClick: () => any;
  onDeleteClick: () => any;
  onNextClick: () => any;
  onCancelClick: () => any;
}

export default class ButtonsSection extends React.Component<ButtonsSectionProps, {}> {
  public shouldComponentUpdate(nextProps: ButtonsSectionProps): boolean {
    const isLevelUpStateChanged = nextProps.isLevelUpInProgress !== this.props.isLevelUpInProgress;
    const isBelongToCurrentUser = nextProps.isBelongToCurrentUser !== this.props.isBelongToCurrentUser;

    return isLevelUpStateChanged || isBelongToCurrentUser;
  }

  public getButtonsForExistingCharacter(): React.ReactNode[] {
    const buttons = [];

    if (!this.props.isLevelUpInProgress) {
      buttons.push(
        <div key="level-up" className="name-and-avatar-tab__button name-and-avatar-tab__button_level-up" onClick={this.props.onLevelUpClick}>
          {locale.getMessage('characterProfile.tabs.nameAndAvatar.levelUpButtonText')}
        </div>,
      );
    } else {
      buttons.push(
        <div key="cancel" className="name-and-avatar-tab__button name-and-avatar-tab__button_cancel" onClick={this.props.onCancelClick}>
          {locale.getMessage('characterProfile.tabs.nameAndAvatar.cancelLevelUpButtonText')}
        </div>,
      );
    }

    buttons.push(
      <div key="delete" className="name-and-avatar-tab__button name-and-avatar-tab__button_delete" onClick={this.props.onDeleteClick}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.deleteButtonText')}
      </div>,
    );

    return buttons;
  }

  public getButtonsForNewCharacter(): React.ReactNode[] {
    const nextButton = (
      <div key="next" className="name-and-avatar-tab__button name-and-avatar-tab__button_next" onClick={this.props.onNextClick}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.nextTabButtonText')}
      </div>
    );

    const cancelButton = (
      <div key="cancel" className="name-and-avatar-tab__button name-and-avatar-tab__button_cancel" onClick={this.props.onCancelClick}>
        {locale.getMessage('characterProfile.tabs.nameAndAvatar.cancelNewCharacterButtonText')}
      </div>
    );

    return [cancelButton, nextButton];
  }

  public render(): React.ReactNode {
    if (!this.props.isBelongToCurrentUser) {
      return [];
    }

    return (
      <div className="name-and-avatar-tab__buttons-wrapper">
        {this.props.isCharacterNew ? this.getButtonsForNewCharacter() : this.getButtonsForExistingCharacter()}
      </div>
    );
  }
}
