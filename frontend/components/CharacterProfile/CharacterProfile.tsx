import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import locale from '../../services/LocalisationService';
import { Character } from '../../services/RolePlayingSystem';
import NameAndAvatarTab from './tabs/NameAndAvatarTab';
import AttributesTab from './tabs/AttributesTab';
import PerksTab from './tabs/PerksTab';
import RolesTab from './tabs/RolesTab';
import SkillsTab from './tabs/SkillsTab';
import TechnologiesTab from './tabs/TechnologiesTab';
import { getCharacterProfileAvatarUrl } from '../../services/CharacterAvatarService';
import ButtonsSection from './sections/ButtonsSection';
import avatarService from '../../services/Api/AvatarService';
import MainLoader from '../../components/MainLoader';
import CancelablePromise from '../../utils/CancelablePromise';

interface CharactersProfileProps {
  character: Character;
  isBelongToCurrentUser: boolean;
  onLevelUpStateUpdate: () => any;
  onSave: () => Promise<any>;
  onDelete: () => any;
  onCancel: () => any;
}

interface CharacterProfileState {
  avatarUrl: string;
  activeTabIndex: number;
  isLevelUpInProgress: boolean;
  isUploadingAvatar: boolean;
  availablePoints: {
    roles: number;
    attributes: number;
    skills: number;
    technologies: number;
    perks: number;
  };
}

interface TabConfig {
  index: number;
  title: string;
  availablePoints: number | null;
  areAvailablePointsVisibleBeforeLevelUp?: boolean;
  render(): React.ReactNode;
}

export default class CharacterProfile extends React.Component<CharactersProfileProps, CharacterProfileState> {
  private updatingAvatar: CancelablePromise<any> = new CancelablePromise(Promise.resolve());
  private savingCharacter: CancelablePromise<any> = new CancelablePromise(Promise.resolve());

  constructor(props: CharactersProfileProps) {
    super(props);

    this.state = {
      avatarUrl: getCharacterProfileAvatarUrl(props.character.avatarId),
      activeTabIndex: 0,
      isLevelUpInProgress: props.character.isLevelUpInProgress(),
      isUploadingAvatar: false,
      availablePoints: { ...props.character.availablePoints },
    };
  }

  public componentWillUnmount(): void {
    this.updatingAvatar.cancel();
    this.savingCharacter.cancel();
  }

  public shouldComponentUpdate(nextProps: CharactersProfileProps, nextState: CharacterProfileState): boolean {
    const isBelongToCurrentUserChanged = nextProps.isBelongToCurrentUser !== this.props.isBelongToCurrentUser;
    const isActiveTabIndexChanged = nextState.activeTabIndex !== this.state.activeTabIndex;
    const isLevelUpStateChanged = nextState.isLevelUpInProgress !== this.state.isLevelUpInProgress;
    const isUploadAvatarStateStateChanged = nextState.isUploadingAvatar !== this.state.isUploadingAvatar;
    const areAvailablePointsChanged = !_.isEqual(nextState.availablePoints, this.state.availablePoints);

    return isBelongToCurrentUserChanged || isActiveTabIndexChanged || isLevelUpStateChanged || isUploadAvatarStateStateChanged ||  areAvailablePointsChanged;
  }

  public componentWillReceiveProps(nextProps: CharactersProfileProps): void {
    if (!nextProps.isBelongToCurrentUser) {
      this.cancelAvatarUpload();
    }

    if (nextProps.character.isLevelUpInProgress() && !nextProps.isBelongToCurrentUser) {
      nextProps.character.cancelLevelUp();
      nextProps.onLevelUpStateUpdate();

      this.setState({
        isLevelUpInProgress: nextProps.character.isLevelUpInProgress(),
        availablePoints: { ...nextProps.character.availablePoints },
      });
    }
  }

  public goToNextTab = (): void => {
    this.setState({ activeTabIndex: this.state.activeTabIndex + 1 });
  }

  public onLevelUpStateUpdate = (): void => {
    const newLevelUpState = this.props.character.isLevelUpInProgress();
    const isLevelUpJustStarted = !this.state.isLevelUpInProgress && newLevelUpState;

    this.setState({
      activeTabIndex: isLevelUpJustStarted ? this.getTabsConfig()[1].index : this.state.activeTabIndex,
      isLevelUpInProgress: newLevelUpState,
      availablePoints: { ...this.props.character.availablePoints },
    });

    if (!isLevelUpJustStarted) {
      this.cancelAvatarUpload();
    }

    this.props.onLevelUpStateUpdate();
  }

  public onNameChanged = async (newName: string): Promise<void> => {
    this.props.character.name = newName;

    if (!this.state.isLevelUpInProgress) {
      this.savingCharacter = new CancelablePromise(this.props.onSave());

      await this.savingCharacter.promise();
    }
  }

  public async uploadAvatarAndUpdateAvatarId(image: File): Promise<void> {
    const avatarData = await avatarService.uploadAvatar(image);

    if (this.state.isUploadingAvatar) {
      this.props.character.avatarId = avatarData.id;
    }
  }

  public onAvatarUpload = async (image: File): Promise<void> => {
    const tmpAvatarUrl = URL.createObjectURL(image);

    this.setState({ avatarUrl: tmpAvatarUrl, isUploadingAvatar: true });

    this.updatingAvatar = new CancelablePromise(this.uploadAvatarAndUpdateAvatarId(image).catch(_.noop));

    try {
      await this.updatingAvatar.promise();

      if (!this.state.isLevelUpInProgress) {
        this.savingCharacter = new CancelablePromise(this.props.onSave());

        await this.savingCharacter.promise();
      }

      this.setState({ isUploadingAvatar: false });
    } catch (error) {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    }
  }

  public cancelAvatarUpload(): void {
    this.updatingAvatar .cancel();
    this.setState({
      avatarUrl: getCharacterProfileAvatarUrl(this.props.character.avatarId),
      isUploadingAvatar: false,
    });
  }

  public onAvailablePointsUpdate = (): void => {
    this.setState({ availablePoints: { ...this.props.character.availablePoints } });
  }

  public onTabTitleClick = (tabIndex: number): void => {
    this.setState({ activeTabIndex: tabIndex });
  }

  public onCancelButtonClick = (): void => {
    if (this.props.character.isNew()) {
      this.props.onCancel();
      return;
    }

    this.props.character.cancelLevelUp();
    this.cancelAvatarUpload();
    this.props.onLevelUpStateUpdate();
    this.props.onCancel();
    this.setState({
      activeTabIndex: 0,
      isLevelUpInProgress: this.props.character.isLevelUpInProgress(),
      availablePoints: { ...this.props.character.availablePoints },
    });
  }

  public onSaveButtonClick = async (): Promise<void> => {
    this.props.character.finishLevelUp();
    this.props.onLevelUpStateUpdate();

    try {
      await MainLoader.withLoader(async () => {
        await this.updatingAvatar.promise();

        this.savingCharacter = new CancelablePromise(this.props.onSave());
        await this.savingCharacter.promise();
      });

      if (this.props.character.isExisting()) {
        this.setState({
          activeTabIndex: 0,
          isLevelUpInProgress: this.props.character.isLevelUpInProgress(),
          availablePoints: { ...this.props.character.availablePoints },
        });
      }
    } catch (error) {
      if (!CancelablePromise.isPromiseCanceledError(error)) {
        throw error;
      }
    }
  }

  public renderAvailablePointsInTabTitle(tabConfig: TabConfig): React.ReactNode {
    if (!this.state.isLevelUpInProgress || tabConfig.availablePoints === null) {
      return;
    }

    const availablePoints = this.props.character.isLevelUpRoleSelected() || tabConfig.areAvailablePointsVisibleBeforeLevelUp ?
      Math.floor(tabConfig.availablePoints) :
      0;

    return (
      <span className="character-profile__tab-title-available-points">&nbsp;({availablePoints})</span>
    );
  }

  public renderTabTitlesList(): React.ReactNode {
    const tabsConfig = this.getTabsConfig();

    const tabs = tabsConfig.map((tabConfig) => {
      const titleClasses = classNames('character-profile__tab-title', {
        'character-profile__tab-title_active': tabConfig.index === this.state.activeTabIndex,
      });

      return (
        <li key={tabConfig.index} className={titleClasses} onClick={this.onTabTitleClick.bind(this, tabConfig.index)}>
          <span className="character-profile__tab-title-text">{tabConfig.title}</span>
          {this.renderAvailablePointsInTabTitle(tabConfig)}
        </li>
      );
    });

    return (
      <ul className="character-profile__tab-titles-list">{tabs}</ul>
    );
  }

  public renderActiveTab(): React.ReactNode {
    const activeTabConfig = this.getTabsConfig().find(({ index }) => this.state.activeTabIndex === index)!;

    return (
      <div className="character-profile__active-tab-wrapper">
        {activeTabConfig.render()}
      </div>
    );
  }

  public renderButtons(): React.ReactNode {
    return (
      <ButtonsSection
        isDisplayed={this.state.isLevelUpInProgress && this.state.activeTabIndex !== 0}
        isSaveButtonDisabled={!this.props.character.areAllPointsSpent()}
        onSaveClick={this.onSaveButtonClick}
        onCancelClick={this.onCancelButtonClick}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="character-profile">
        {this.renderTabTitlesList()}
        {this.renderActiveTab()}
        {this.renderButtons()}
      </div>
    );
  }

  private getTabsConfig(): TabConfig[] {
    return [{
      index: 0,
      title: locale.getMessage('rolePlayingSystem.name.name'),
      availablePoints: null,
      render: () => {
        return (
          <NameAndAvatarTab
            avatarUrl={this.state.avatarUrl}
            character={this.props.character}
            isBelongToCurrentUser={this.props.isBelongToCurrentUser}
            isAvatarUploading={this.state.isUploadingAvatar}
            onAvatarUpload={this.onAvatarUpload}
            onNameChanged={this.onNameChanged}
            onSave={this.props.onSave}
            onNext={this.goToNextTab}
            onLevelUpStateUpdate={this.onLevelUpStateUpdate}
            onDelete={this.props.onDelete}
            onCancel={this.onCancelButtonClick}
          />
        );
      },
    }, {
      index: 1,
      title: locale.getMessage('rolePlayingSystem.roles.name'),
      availablePoints: this.state.availablePoints.roles,
      areAvailablePointsVisibleBeforeLevelUp: true,
      render: () => {
        return (
          <RolesTab
            character={this.props.character}
            onAvailablePointsUpdate={this.onAvailablePointsUpdate}
          />
        );
      },
    }, {
      index: 2,
      title: locale.getMessage('rolePlayingSystem.attributes.name'),
      availablePoints: this.state.availablePoints.attributes,
      render: () => {
        return (
          <AttributesTab
            character={this.props.character}
            onAvailablePointsUpdate={this.onAvailablePointsUpdate}
          />
        );
      },
    }, {
      index: 3,
      title: locale.getMessage('rolePlayingSystem.skills.name'),
      availablePoints: this.state.availablePoints.skills,
      render: () => {
        return (
          <SkillsTab
            character={this.props.character}
            onAvailablePointsUpdate={this.onAvailablePointsUpdate}
          />
        );
      },
    }, {
      index: 4,
      title: locale.getMessage('rolePlayingSystem.technologies.name'),
      availablePoints: this.state.availablePoints.technologies,
      render: () => {
        return (
          <TechnologiesTab
            character={this.props.character}
            onAvailablePointsUpdate={this.onAvailablePointsUpdate}
          />
        );
      },
    }, {
      index: 5,
      title: locale.getMessage('rolePlayingSystem.perks.name'),
      availablePoints: this.state.availablePoints.perks,
      render: () => {
        return (
          <PerksTab
            character={this.props.character}
            onAvailablePointsUpdate={this.onAvailablePointsUpdate}
          />
        );
      },
    }];
  }
}
