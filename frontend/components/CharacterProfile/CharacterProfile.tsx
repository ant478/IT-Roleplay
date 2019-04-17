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

interface CharactersProfileProps {
  character: Character;
  onLevelUpStateUpdate: () => any;
  onSave: () => Promise<any>;
  onDelete: () => any;
}

interface CharacterProfileState {
  activeTabIndex: number;
  isLevelUpInProgress: boolean;
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
  render(): React.ReactNode;
}

export default class CharacterProfile extends React.Component<CharactersProfileProps, CharacterProfileState> {
  constructor(props: CharactersProfileProps) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      isLevelUpInProgress: this.getCharacterLevelUpState(),
      availablePoints: { ...props.character.availablePoints },
    };

    this.onTabTitleClick = this.onTabTitleClick.bind(this);
    this.onAvailablePointsUpdate = this.onAvailablePointsUpdate.bind(this);
    this.onLevelUpStateUpdate = this.onLevelUpStateUpdate.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.goToNextTab = this.goToNextTab.bind(this);
  }

  public goToNextTab(): void {
    this.setState({ activeTabIndex: this.state.activeTabIndex + 1 });
  }

  public onLevelUpStateUpdate(): void {
    const newLevelUpState = this.getCharacterLevelUpState();
    const isLevelUpJustStarted = !this.state.isLevelUpInProgress && newLevelUpState;

    this.setState({
      activeTabIndex: isLevelUpJustStarted ? this.getTabsConfig()[1].index : this.state.activeTabIndex,
      isLevelUpInProgress: newLevelUpState,
      availablePoints: { ...this.props.character.availablePoints },
    });

    this.props.onLevelUpStateUpdate();
  }

  public onAvailablePointsUpdate(): void {
    this.setState({ availablePoints: { ...this.props.character.availablePoints } });
  }

  public onTabTitleClick(tabIndex: number): void {
    this.setState({ activeTabIndex: tabIndex });
  }

  public onCancelButtonClick(): void {
    this.props.character.cancelLevelUp();
    this.props.onLevelUpStateUpdate();
    this.setState({
      activeTabIndex: 0,
      isLevelUpInProgress: this.getCharacterLevelUpState(),
      availablePoints: { ...this.props.character.availablePoints },
    });
  }

  public onSaveButtonClick(): void {
    if (!this.props.character.areAllPointsSpent()) {
      return;
    }

    this.props.character.finishLevelUp();
    this.props.onSave().then(() => {
      if (this.props.character.isExisting()) {
        this.setState({
          activeTabIndex: 0,
          isLevelUpInProgress: this.getCharacterLevelUpState(),
          availablePoints: { ...this.props.character.availablePoints },
        });
      }
    });
  }

  public getTabsConfig(): TabConfig[] {
    return [{
      index: 0,
      title: locale.getMessage('rolePlayingSystem.name.name'),
      availablePoints: null,
      render: () => {
        return (
          <NameAndAvatarTab
            character={this.props.character}
            onSave={this.props.onSave}
            onNext={this.goToNextTab}
            onLevelUpStateUpdate={this.onLevelUpStateUpdate}
            onDelete={this.props.onDelete}
          />
        );
      },
    }, {
      index: 1,
      title: locale.getMessage('rolePlayingSystem.roles.name'),
      availablePoints: this.state.availablePoints.roles,
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

  public renderTabTitlesList(): React.ReactNode {
    const tabsConfig = this.getTabsConfig();

    const tabsList = tabsConfig.map((tabConfig) => {
      const titleClasses = classNames('character-profile__tab-title', {
        'character-profile__tab-title_active': tabConfig.index === this.state.activeTabIndex,
      });

      const availablePoints = this.state.isLevelUpInProgress && tabConfig.availablePoints !== null ?
        (<span className="character-profile__tab-title-available-points">({Math.floor(tabConfig.availablePoints)})</span>) :
        null;

      return (
        <li key={tabConfig.index} className={titleClasses} onClick={this.onTabTitleClick.bind(this, tabConfig.index)}>
          <span className="character-profile__tab-title-text">{tabConfig.title}</span>
          {availablePoints}
        </li>
      );
    });

    return (
      <ul className="character-profile__tab-titles-list">
        {tabsList}
      </ul>
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
    const tabsConfig = this.getTabsConfig();

    if (!this.state.isLevelUpInProgress || this.state.activeTabIndex === tabsConfig[0].index) {
      return null;
    }

    const cancelButton = (
      <div key="cancel" className="character-profile__button character-profile__button_cancel" onClick={this.onCancelButtonClick}>
        {locale.getMessage('characterProfile.cancelButtonText')}
      </div>
    );

    const saveButtonClasses = classNames('character-profile__button', 'character-profile__button_save', {
      'character-profile__button_disabled': !this.props.character.areAllPointsSpent(),
    });

    const saveButton = (
      <div key="save" className={saveButtonClasses} onClick={this.onSaveButtonClick}>
        {locale.getMessage('characterProfile.saveButtonText')}
      </div>
    );

    const buttons = [cancelButton, saveButton];

    return (
      <div className="character-profile__buttons">
        {buttons}
      </div>
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

  protected getCharacterLevelUpState(): boolean {
    return this.props.character.isLevelUpAvailable() || this.props.character.isLevelUpInProgress();
  }
}
