import * as React from 'react';
import classNames from 'classnames';
import { Character, RoleClass, roleClassesWithKeys } from '../../../../services/RolePlayingSystem';
import locale from '../../../../services/LocalisationService';

interface RolesProps {
  character: Character;
  onAvailablePointsUpdate: () => any;
}

interface RolesState {
  selectedRole: RoleClass;
}

export default class RolesTab extends React.Component<RolesProps, RolesState> {
  constructor(props: RolesProps) {
    super(props);

    this.state = {
      selectedRole: Object.values(roleClassesWithKeys)[0],
    };

    this.onRoleSelect = this.onRoleSelect.bind(this);
    this.onRoleUp = this.onRoleUp.bind(this);
    this.onRoleDown = this.onRoleDown.bind(this);
  }

  public onRoleSelect(roleClass: RoleClass): void {
    this.setState({ selectedRole: roleClass });
  }

  public onRoleUp(roleClass: RoleClass): void {
    this.props.character.levelUpInRole(roleClass);
    this.props.onAvailablePointsUpdate();
  }

  public onRoleDown(): void {
    this.props.character.cancelLevelUp();
    this.props.character.startLevelUp();
    this.props.onAvailablePointsUpdate();
  }

  public renderControl(roleClass: RoleClass): React.ReactNode {
    const character = this.props.character;
    const role = character.roles[roleClass.key];
    const canBeUpped = character.isLevelUpAvailable() && !!role && role.canBeUpped();
    const canBeAdded = character.isLevelUpAvailable() && !role && roleClass.canBeAddedToCharacter(character);
    const canBeDowned = character.isLevelUpInProgress() && character.currentLevelUpRole.key === roleClass.key;

    const controlClasses = classNames('roles-tab__control', {
      'roles-tab__control_is-just-added': canBeDowned,
      'roles-tab__control_can-be-upped': canBeUpped || canBeAdded,
      'roles-tab__control_can-be-downed': canBeDowned,
      'roles-tab__control_not-available': character.isLevelUpAvailable() && !(canBeUpped || canBeAdded || canBeDowned),
      'roles-tab__control_selected': roleClass.key === this.state.selectedRole.key,
    });

    const controlLabel = locale.getMessage(`rolePlayingSystem.roles.${roleClass.key}.name`);

    return (
      <li key={roleClass.key} className={controlClasses} onMouseEnter={this.onRoleSelect.bind(this, roleClass)}>
        <span className="roles-tab__control-label">{controlLabel}</span>
        <div className="roles-tab__control-value-area">
          <div className="roles-tab__control-down" onClick={this.onRoleDown}/>
          <span className="roles-tab__control-value">{role ? role.level : 0}</span>
          <div className="roles-tab__control-up" onClick={this.onRoleUp.bind(this, roleClass)}/>
        </div>
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    const controls = Object.values(roleClassesWithKeys).map(roleClass =>
      this.renderControl(roleClass),
    );

    return (
      <div className="roles-tab__controls">
        <ul className="roles-tab__controls-list">
          {controls}
        </ul>
      </div>
    );
  }

  public renderDescriptionSection(): React.ReactNode {
    return (
      <div className="roles-tab__description">
        <div className="roles-tab__description-text-container">
          <div className="roles-tab__description-text">
            {locale.getMessage(`rolePlayingSystem.roles.${this.state.selectedRole.key}.description`)}
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="roles-tab">
        {this.renderControlsSection()}
        {this.renderDescriptionSection()}
      </div>
    );
  }
}
