import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';
import locale from '../../../../services/LocalisationService';
import { ShortCharacterData } from '../../../../services/Api/CharacterService';
import { roleClasses, attributeClasses } from '../../../../services/RolePlayingSystem';
import { getCharactersListAvatarUrl } from '../../../../services/CharacterAvatarService';

interface CharacterSummaryProps {
  character: ShortCharacterData;
  onClick: (characterId: number) => any;
}

interface CharacterSummaryState {
  isClicked: boolean;
}

const BLINK_DELAY = 200;

export default class CharacterSummary extends React.Component<CharacterSummaryProps, CharacterSummaryState> {
  constructor(props: CharacterSummaryProps) {
    super(props);

    this.state = {
      isClicked: false,
    };
  }

  public shouldComponentUpdate(nextProps: CharacterSummaryProps, nextState: CharacterSummaryState): boolean {
    const isCharacterChanged = nextProps.character.id !== this.props.character.id;
    const isClickedStateChanged = nextState.isClicked !== this.state.isClicked;

    return isCharacterChanged || isClickedStateChanged;
  }

  public onClick = (): void => {
    this.setState({ isClicked: true }, () => _.delay(() => this.props.onClick(this.props.character.id), BLINK_DELAY));
  }

  public renderNameAndAvatarSection(): React.ReactNode {
    return (
      <div className="character-summary__section character-summary__section_name-and-avatar">
        <div className="character-summary__character-avatar-wrapper">
          <img className="character-summary__character-avatar" src={getCharactersListAvatarUrl(this.props.character.avatarId)} />
        </div>
        <span className="character-summary__character-name">{this.props.character.name}</span>
      </div>
    );
  }

  public renderRolesList(): React.ReactNode {
    return this.props.character.data.roles.map(({ id, value }) => {
      const role = roleClasses.find(Role => id === Role.id)!;
      const roleName = locale.getMessage(`rolePlayingSystem.roles.${role.key}.name`);

      return (
        <li key={roleName} className="character-summary__property">
          <span className="character-summary__property-name">{roleName}</span>
          <span className="character-summary__property-value">{value}</span>
        </li>
      );
    });
  }

  public renderRolesSection(): React.ReactNode {
    return (
      <div className="character-summary__section character-summary__section_properties-list">
        <span className="character-summary__properties-list-header">
          {locale.getMessage('rolePlayingSystem.roles.name')}:
        </span>
        <ul className="character-summary__properties-list">
          {this.renderRolesList()}
        </ul>
      </div>
    );
  }

  public renderAttributesList(): React.ReactNode[] {
    return this.props.character.data.attributes.map(({ id, value }) => {
      const attribute = attributeClasses.find(Attribute => id === Attribute.id)!;
      const attributeName = locale.getMessage(`rolePlayingSystem.attributes.${attribute.key}.name`);

      return (
        <li key={attributeName} className="character-summary__property">
          <span className="character-summary__property-name">{attributeName}</span>
          <span className="character-summary__property-value">{value}</span>
        </li>
      );
    });
  }

  public renderAttributesSection(): React.ReactNode {
    return (
      <div className="character-summary__section character-summary__section_properties-list">
        <span className="character-summary__properties-list-header">
          {locale.getMessage('rolePlayingSystem.attributes.name')}:
        </span>
        <ul className="character-summary__properties-list">
          {this.renderAttributesList()}
        </ul>
      </div>
    );
  }

  public render(): React.ReactNode {
    const characterClasses = classNames('character-summary', {
      'character-summary_clicked': this.state.isClicked,
    });

    return (
      <div className={characterClasses} onClick={this.onClick}>
        {this.renderNameAndAvatarSection()}
        {this.renderRolesSection()}
        {this.renderAttributesSection()}
      </div>
    );
  }
}
