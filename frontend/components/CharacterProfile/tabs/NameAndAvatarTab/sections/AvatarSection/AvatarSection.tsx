import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../../../services/LocalisationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface AvatarSectionProps {
  avatarUrl: string;
  isUploading: boolean;
  isEditable: boolean;
  onSelect: (image: File) => any;
}

export default class AvatarSection extends React.Component<AvatarSectionProps, {}> {
  private avatarInput = React.createRef<HTMLInputElement>();

  public shouldComponentUpdate(nextProps: AvatarSectionProps): boolean {
    const isEditableChanged = nextProps.isEditable !== this.props.isEditable;
    const isUploadingChanged = nextProps.isUploading !== this.props.isUploading;
    const isAvatarUrlChanged = nextProps.avatarUrl !== this.props.avatarUrl;

    return isEditableChanged || isUploadingChanged || isAvatarUrlChanged;
  }

  public onFileSelect = (): void => {
    const file = this.avatarInput.current!.files ?  this.avatarInput.current!.files[0] : null;

    if (!file) {
      return;
    }

    this.props.onSelect(file);
  }

  public onEdit = (): void => {
    this.avatarInput.current!.click();
  }

  public render(): React.ReactNode {
    const avatarClasses = classNames('name-and-avatar-tab__avatar', {
      'name-and-avatar-tab__avatar_editable': this.props.isEditable,
      'name-and-avatar-tab__avatar_is-loading': this.props.isUploading,
    });

    return (
      <div className={avatarClasses} data-loading-message={locale.getMessage('characterProfile.tabs.nameAndAvatar.uploadingAvatar')}>
        <img className="name-and-avatar-tab__avatar-img" src={this.props.avatarUrl}/>
        <i className="name-and-avatar-tab__avatar-edit-icon" onClick={this.onEdit}><FontAwesomeIcon icon={faEdit}/></i>
        <input className="name-and-avatar-tab__avatar-input" type="file" onChange={this.onFileSelect} ref={this.avatarInput} accept="image/*"/>
      </div>
    );
  }
}
