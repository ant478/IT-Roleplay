import * as React from 'react';
import { Character } from '../../../../services/RolePlayingSystem';
import ButtonsSection from './sections/ButtonsSection';
import EditableLabel from '../../components/EditableLabel';
import AvatarSection from './sections/AvatarSection';
import OrangeScrollbar from '../../../OrangeScrollbar';

interface NameAndAvatarProps {
  character: Character;
  avatarUrl: string;
  isBelongToCurrentUser: boolean;
  isAvatarUploading: boolean;
  onLevelUpStateUpdate: () => any;
  onAvatarUpload: (image: File) => any;
  onNameChanged: (newName: string) => any;
  onSave: () => Promise<any>;
  onDelete: () => any;
  onNext: () => any;
  onCancel: () => any;
}

interface NameAndAvatarState {
  name: string;
}

export default class NameAndAvatarTab extends React.Component<NameAndAvatarProps, NameAndAvatarState> {
  constructor(props: NameAndAvatarProps) {
    super(props);

    this.state = {
      name: props.character.name,
    };
  }

  public onNameChanged = (newName: string): void => {  // TODO refactor that
    if (!newName) {
      this.setState({ name: this.props.character.name });
      return;
    }

    if (!newName || this.props.character.name === newName) {
      return;
    }

    this.setState({ name: newName });
    this.props.onNameChanged(newName);
  }

  public onStartLevelUp = (): void => {
    this.props.character.startLevelUp();
    this.props.onLevelUpStateUpdate();
  }

  public renderAvatar(): React.ReactNode {
    return (
      <AvatarSection
        avatarUrl={this.props.avatarUrl}
        isUploading={this.props.isAvatarUploading}
        isEditable={this.props.isBelongToCurrentUser && !this.props.isAvatarUploading}
        onSelect={this.props.onAvatarUpload}
      />
    );
  }

  public renderName(): React.ReactNode {
    return (
      <div className="name-and-avatar-tab__name">
        <EditableLabel
          isEditable={this.props.isBelongToCurrentUser}
          initialValue={this.state.name}
          onConfirm={this.onNameChanged}
        />
      </div>
    );
  }

  public renderButtons(): React.ReactNode {
    return (
      <ButtonsSection
        isCharacterNew={this.props.character.isNew()}
        isLevelUpInProgress={this.props.character.isLevelUpInProgress()}
        isBelongToCurrentUser={this.props.isBelongToCurrentUser}
        onLevelUpClick={this.onStartLevelUp}
        onDeleteClick={this.props.onDelete}
        onNextClick={this.props.onNext}
        onCancelClick={this.props.onCancel}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="name-and-avatar-tab">
        <OrangeScrollbar>
          <div className="name-and-avatar-tab__wrapper">
            {this.renderAvatar()}
            {this.renderName()}
            {this.renderButtons()}
          </div>
        </OrangeScrollbar>
      </div>
    );
  }
}
