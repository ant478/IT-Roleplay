import * as React from 'react';
import locale from '../../services/LocalisationService';
import { ShortCharacterData } from '../../services/Api/CharacterService';
import { roleClassesWithKeys, attributeClassesWithKeys } from '../../services/RolePlayingSystem';

interface CharactersListProps {
  characters: ShortCharacterData[];
  onCharacterClick: (characterId: number) => any;
}

const DEFAULT_AVATAR_URL = 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg';

export default class CharactersList extends React.Component<CharactersListProps, {}> {
  public renderNameAndAvatarSection(character: ShortCharacterData): React.ReactNode {
    return (
      <div className="characters-list__section characters-list__section_name-and-avatar">
        <div className="characters-list__character-avatar-wrapper">
          <img className="characters-list__character-avatar" src={character.avatarUrl || DEFAULT_AVATAR_URL} />
        </div>
        <span className="characters-list__character-name">{character.name}</span>
      </div>
    );
  }

  public renderRolesList(character: ShortCharacterData): React.ReactNode {
    const RoleClasses = Object.values(roleClassesWithKeys);
    const rolesList = character.data.roles.map(({ id, value }) => ({
      role: RoleClasses.find(Role => id === Role.id)!,
      level: value,
    }));

    return rolesList.map(({ role, level }) => {
      const roleName = locale.getMessage(`rolePlayingSystem.roles.${role.key}.name`);

      return (
        <li key={roleName} className="characters-list__property">
          <span className="characters-list__property-name">{roleName}</span>
          <span className="characters-list__property-value">{level}</span>
        </li>
      );
    });
  }

  public renderRolesSection(character: ShortCharacterData): React.ReactNode {
    return (
      <div className="characters-list__section characters-list__section_properties-list">
        <span className="characters-list__properties-list-header">
          {locale.getMessage('rolePlayingSystem.roles.name')}:
        </span>
        <ul className="characters-list__properties-list">
          {this.renderRolesList(character)}
        </ul>
      </div>
    );
  }

  public renderAttributesList(character: ShortCharacterData): React.ReactNode[] {
    const AttributeClasses = Object.values(attributeClassesWithKeys);
    const attributesList = character.data.attributes.map(({ id, value }) => ({
      value,
      attribute: AttributeClasses.find(Attribute => id === Attribute.id)!,
    }));

    return attributesList.map(({ attribute, value }) => {
      const attributeName = locale.getMessage(`rolePlayingSystem.attributes.${attribute.key}.name`);

      return (
        <li key={attributeName} className="characters-list__property">
          <span className="characters-list__property-name">{attributeName}</span>
          <span className="characters-list__property-value">{value}</span>
        </li>
      );
    });
  }

  public renderAttributesSection(character: ShortCharacterData): React.ReactNode {
    return (
      <div className="characters-list__section characters-list__section_properties-list">
        <span className="characters-list__properties-list-header">
          {locale.getMessage('rolePlayingSystem.attributes.name')}:
        </span>
        <ul className="characters-list__properties-list">
          {this.renderAttributesList(character)}
        </ul>
      </div>
    );
  }

  public renderCharacter(character: ShortCharacterData): React.ReactNode {
    return (
      <li key={character.id} className="characters-list__character" onClick={this.props.onCharacterClick.bind(this, character.id)}>
        {this.renderNameAndAvatarSection(character)}
        {this.renderRolesSection(character)}
        {this.renderAttributesSection(character)}
      </li>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="characters-list">
        <ul className="characters-list__list">
          {this.props.characters.map(character => this.renderCharacter(character))}
        </ul>
      </div>
    );
  }
}
