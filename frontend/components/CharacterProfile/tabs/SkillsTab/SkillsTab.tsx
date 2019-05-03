import * as React from 'react';
import locale from '../../../../services/LocalisationService';
import { SkillClass, Skill, Character, skillClasses } from '../../../../services/RolePlayingSystem';
import PropertyDescription from '../../components/PropertyDescription';
import IntegerPropertyControl from '../../components/IntegerPropertyControl';
import TabInfoSection from '../../components/TabInfoSection';
import OrangeScrollbar from '../../../OrangeScrollbar';

interface SkillsProps {
  character: Character;
  onAvailablePointsUpdate: () => any;
}

interface SkillsState {
  selectedSkill: SkillClass;
}

export default class SkillsTab extends React.Component<SkillsProps, SkillsState> {
  constructor(props: SkillsProps) {
    super(props);

    this.state = {
      selectedSkill: skillClasses[0],
    };
  }

  public onSkillSelect = (skillClass: SkillClass): void => {
    this.setState({ selectedSkill: skillClass });
  }

  public onSkillUp = (skill: Skill): void => {
    skill.up();
    this.props.onAvailablePointsUpdate();
  }

  public onSkillDown = (skill: Skill): void => {
    skill.down();
    this.props.onAvailablePointsUpdate();
  }

  public renderInfoSection(): React.ReactNode {
    const character = this.props.character;
    const isLevelUpInProgress = character.isLevelUpRoleSelected();
    const baseRoles = this.state.selectedSkill.baseRoles;
    const isRoleSkill = character.isLevelUpRoleSelected() ? baseRoles.some(({ key }) => key === character.currentLevelUpRole.key) : false;

    const roleAttachmentLabel = isRoleSkill ?
      locale.getMessage('rolePlayingSystem.skills.roleAttachedLabel') :
      locale.getMessage('rolePlayingSystem.skills.roleNotAttachedLabel');

    const props = {
      leftSectionLabel: locale.getMessage('characterProfile.tabs.skills.availablePointsLabel'),
      topRightSectionLabel: locale.getMessage('characterProfile.tabs.skills.priceLabel'),
      leftSectionValue: isLevelUpInProgress ? Math.floor(this.props.character.availablePoints.skills) : '-',
      topRightSectionValue: isLevelUpInProgress ? character.skills[this.state.selectedSkill.key].getPrice() : '-',
      bottomRightSectionValue: isLevelUpInProgress ? roleAttachmentLabel : '-',
    };

    return <TabInfoSection {...props}/>;
  }

  public renderControl(skillClass: SkillClass): React.ReactNode {
    const skill = this.props.character.skills[skillClass.key];
    const flags = {
      canBeUpped: skill.canBeUpped(),
      canBeDowned: skill.canBeDowned(),
    };

    return (
      <li key={skill.getKey()}  className="skills-tab__control">
        <IntegerPropertyControl
          label={locale.getMessage(`rolePlayingSystem.skills.${skill.getKey()}.name`)}
          value={skill.getCleanValue()}
          onMouseEnter={this.onSkillSelect.bind(this, skillClass)}
          onDown={this.onSkillDown.bind(this, skill)}
          onUp={this.onSkillUp.bind(this, skill)}
          flags={flags}
        />
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    return (
      <div className="skills-tab__controls">
        <OrangeScrollbar>
          <ul className="skills-tab__controls-list">
            {skillClasses.map(skillClass => this.renderControl(skillClass))}
          </ul>
        </OrangeScrollbar>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="skills-tab">
        {this.renderInfoSection()}
        <div className="skills-tab__controls-and-description-wrapper">
          {this.renderControlsSection()}
          <PropertyDescription messageKey={`rolePlayingSystem.skills.${this.state.selectedSkill.key}.description`}/>
        </div>
      </div>
    );
  }
}
