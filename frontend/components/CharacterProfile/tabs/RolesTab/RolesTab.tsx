import * as React from 'react';
import { Character, RoleClass, roleClasses } from '../../../../services/RolePlayingSystem';
import locale from '../../../../services/LocalisationService';
import PropertyDescription from '../../components/PropertyDescription';
import RoleControl from '../../components/RoleControl';
import OrangeScrollbar from '../../../OrangeScrollbar';

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
      selectedRole: roleClasses[0],
    };
  }

  public onRoleSelect = (roleClass: RoleClass): void => {
    this.setState({ selectedRole: roleClass });
  }

  public onRoleUp = (roleClass: RoleClass): void => {
    this.props.character.levelUpInRole(roleClass);
    this.props.onAvailablePointsUpdate();
  }

  public onRoleDown = (): void => {
    this.props.character.cancelLevelUp();
    this.props.character.startLevelUp();
    this.props.onAvailablePointsUpdate();
  }

  public renderControl(roleClass: RoleClass): React.ReactNode {
    const character = this.props.character;
    const role = character.roles[roleClass.key];
    const canBeUpped = character.isLevelUpAvailable() && !!role && role.canBeUpped();
    const canBeAdded = character.isLevelUpAvailable() && !role && roleClass.canBeAddedToCharacter(character);
    const canBeDowned = character.isLevelUpRoleSelected() && character.currentLevelUpRole.key === roleClass.key;

    const flags = {
      canBeDowned,
      isJustAdded: canBeDowned,
      canBeUpped: canBeUpped || canBeAdded,
      isNotAvailable: (character.isLevelUpInProgress()) && !(canBeUpped || canBeAdded || canBeDowned),
    };

    return (
      <li key={roleClass.key} className="roles-tab__control">
        <RoleControl
          label={locale.getMessage(`rolePlayingSystem.roles.${roleClass.key}.name`)}
          value={role ? role.level : 0}
          onMouseEnter={this.onRoleSelect.bind(this, roleClass)}
          onDown={this.onRoleDown}
          onUp={this.onRoleUp.bind(this, roleClass)}
          flags={flags}
        />
      </li>
    );
  }

  public renderControlsSection(): React.ReactNode {
    return (
      <div className="roles-tab__controls">
        <OrangeScrollbar>
          <ul className="roles-tab__controls-list">
            {roleClasses.map(roleClass => this.renderControl(roleClass))}
          </ul>
        </OrangeScrollbar>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="roles-tab">
        {this.renderControlsSection()}
        <PropertyDescription messageKey={`rolePlayingSystem.roles.${this.state.selectedRole.key}.description`}/>
      </div>
    );
  }
}
