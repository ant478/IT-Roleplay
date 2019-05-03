import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import MouseFollowingPopup from '../../../MouseFollowingPopup';

interface ButtonsSectionProps {
  isDisplayed: boolean;
  isSaveButtonDisabled: boolean;
  onSaveClick: () => any;
  onCancelClick: () => any;
}

interface ButtonsSectionState {
  isCannotSavePopupDisplayed: boolean;
}

export default class NameSection extends React.Component<ButtonsSectionProps, ButtonsSectionState> {
  constructor(props: ButtonsSectionProps) {
    super(props);

    this.state = {
      isCannotSavePopupDisplayed: false,
    };
  }

  public shouldComponentUpdate(nextProps: ButtonsSectionProps): boolean {
    const isDisplayedStateChanged = nextProps.isDisplayed !== this.props.isDisplayed;
    const isSaveButtonDisabledStateChanged = nextProps.isSaveButtonDisabled !== this.props.isSaveButtonDisabled;

    return isDisplayedStateChanged || isSaveButtonDisabledStateChanged;
  }

  public toggleCannotSavePopup(): void {
    if (this.state.isCannotSavePopupDisplayed) {
      const popup = (
        <div className="character-profile__cannot-save-popup">
          {locale.getMessage('characterProfile.cannotSaveText')}
        </div>
      );

      MouseFollowingPopup.render(popup);
    } else {
      MouseFollowingPopup.hide();
    }
  }

  public onMouseEnterSaveButton = (): void => {
    this.setState({ isCannotSavePopupDisplayed: this.props.isSaveButtonDisabled }, () => this.toggleCannotSavePopup());
  }

  public onMouseLeaveSaveButton = (): void => {
    this.setState({ isCannotSavePopupDisplayed: false }, () => this.toggleCannotSavePopup());
  }

  public onSaveClick = (): void => {
    if (this.props.isSaveButtonDisabled) {
      return;
    }

    this.props.onSaveClick();
  }

  public render(): React.ReactNode {
    if (!this.props.isDisplayed) {
      return null;
    }

    const cancelButton = (
      <div key="cancel" className="character-profile__button character-profile__button_cancel" onClick={this.props.onCancelClick}>
        {locale.getMessage('characterProfile.cancelButtonText')}
      </div>
    );

    const saveButtonClasses = classNames('character-profile__button', 'character-profile__button_save', {
      'character-profile__button_disabled': this.props.isSaveButtonDisabled,
    });

    const saveButton = (
      <div
        key="save"
        className={saveButtonClasses}
        onClick={this.onSaveClick}
        onMouseEnter={this.onMouseEnterSaveButton}
        onMouseLeave={this.onMouseLeaveSaveButton}
      >
        {locale.getMessage('characterProfile.saveButtonText')}
      </div>
    );

    return (
      <div className="character-profile__buttons">
        {[cancelButton, saveButton]}
      </div>
    );
  }
}
