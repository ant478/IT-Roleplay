import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import { SkillClass, Skill, Character, skillClassesWithKeys } from '../../../../services/RolePlayingSystem';

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
      selectedSkill: Object.values(skillClassesWithKeys)[0],
    };

    this.onSkillSelect = this.onSkillSelect.bind(this);
    this.onSkillUp = this.onSkillUp.bind(this);
    this.onSkillDown = this.onSkillDown.bind(this);
  }

  public onSkillSelect(skillClass: SkillClass): void {
    this.setState({ selectedSkill: skillClass });
  }

  public onSkillUp(skill: Skill): void {
    skill.up();
    this.props.onAvailablePointsUpdate();
  }

  public onSkillDown(skill: Skill): void {
    skill.down();
    this.props.onAvailablePointsUpdate();
  }

  public renderAvailablePointsSection(): React.ReactNode {
    const character = this.props.character;
    const availablePointsLabel = locale.getMessage('characterProfile.tabs.skills.availablePointsLabel');
    const availablePoints = character.isLevelUpInProgress() ? Math.floor(character.availablePoints.skills) : '-';

    return (
      <div className="skills-tab__available-points">
        <span className="skills-tab__available-points-label">{availablePointsLabel}</span>
        <span className="skills-tab__available-points-value">{availablePoints}</span>
      </div>
    );
  }

  public renderPriceSection(): React.ReactNode {
    const character = this.props.character;
    const priceLabel = locale.getMessage('characterProfile.tabs.skills.priceLabel');
    const price = character.isLevelUpInProgress() ?
      character.skills[this.state.selectedSkill.key].getPrice() :
      '-';

    return (
      <div className="skills-tab__price">
        <span className="skills-tab__price-value">{price}</span>
        <span className="skills-tab__price-label">{priceLabel}</span>
      </div>
    );
  }

  public renderRoleAttachmentSection(): React.ReactNode {
    const character = this.props.character;
    const baseRoles = this.state.selectedSkill.baseRoles;
    const isRoleSkill = character.isLevelUpInProgress() ? baseRoles.some(({ key }) => key === character.currentLevelUpRole.key) : false;
    const roleAttachmentLabel = isRoleSkill ?
      locale.getMessage('rolePlayingSystem.skills.roleAttachedLabel') :
      locale.getMessage('rolePlayingSystem.skills.roleNotAttachedLabel');

    return (
      <div className="skills-tab__role-attachment">
        {character.isLevelUpInProgress() ? roleAttachmentLabel : '-'}
      </div>
    );
  }

  public renderInfoSection(): React.ReactNode {
    return (
      <div className="skills-tab__info">
        {this.renderAvailablePointsSection()}
        <div className="skills-tab__price-and-role-attachment-wrapper">
          {this.renderPriceSection()}
          {this.renderRoleAttachmentSection()}
        </div>
      </div>
    );
  }

  public renderControl(skillClass: SkillClass): React.ReactNode {
    const skill = this.props.character.skills[skillClass.key];
    const controlLabel = locale.getMessage(`rolePlayingSystem.skills.${skill.getKey()}.name`);
    const controlClasses = classNames('skills-tab__control', {
      'skills-tab__control_can-be-upped': skill.canBeUpped(),
      'skills-tab__control_can-be-downed': skill.canBeDowned(),
      'skills-tab__control_selected': skill.getKey() === this.state.selectedSkill.key,
    });

    return (
      <li key={skill.getKey()} className={controlClasses} onMouseEnter={this.onSkillSelect.bind(this, skillClass)}>
        <span className="skills-tab__control-label">{controlLabel}</span>
        <div className="skills-tab__control-value-area">
          <div className="skills-tab__control-down" onClick={this.onSkillDown.bind(this, skill)}/>
          <span className="skills-tab__control-value">{skill.getCleanValue()}</span>
          <div className="skills-tab__control-up" onClick={this.onSkillUp.bind(this, skill)}/>
        </div>
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    const controls = Object.values(skillClassesWithKeys).map(skillClass =>
      this.renderControl(skillClass),
    );

    return (
      <div className="skills-tab__controls">
        <ul className="skills-tab__controls-list">
          {controls}
        </ul>
      </div>
    );
  }

  public renderDescriptionSection(): React.ReactNode {
    return (
      <div className="skills-tab__description">
        <div className="skills-tab__description-text-container">
          <div className="skills-tab__description-text">
            {locale.getMessage(`rolePlayingSystem.skills.${this.state.selectedSkill.key}.description`)}
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="skills-tab">
        {this.renderInfoSection()}
        {this.renderControlsSection()}
        {this.renderDescriptionSection()}
      </div>
    );
  }
}
