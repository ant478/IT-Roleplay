import * as _ from 'lodash';
import { CharacterData, CreateCharacterData, UpdateCharacterData, CharacterRoleplayData } from '../Api/CharacterService';
import { User } from '../Api/AuthService';
import { getAttributes, getDefaultAttributes, getAttributesData, Attributes } from './attributes';
import { getSkills, getDefaultSkills, getSkillsData, Skills } from './skills';
import { getRoles, getRolesData, Roles, RoleClass } from './roles';
import { getTechnologies, getTechnologiesData, Technologies } from './technologies';
import { getPerks, getPerksData, Perks } from './perks';
import CharacterBackupManager, { CharacterBackupManagerFilled } from './CharacterBackupManager';

export interface AvailablePoints {
  roles: number;
  attributes: number;
  skills: number;
  technologies: number;
  perks: number;
}

const defaultAvailablePoints: AvailablePoints = {
  roles: 0,
  attributes: 0,
  skills: 0,
  technologies: 0,
  perks: 0,
};

export interface NewCharacter extends Character {
  id: null;
  author: null;
  oldCharacterData: null;
}

export interface ExistingCharacter extends Character {
  id: number;
  author: User;
  oldCharacterData: CharacterData;
}

export interface CharacterWithSelectedLevelUpRole extends Character {
  backup: CharacterBackupManagerFilled;
  currentLevelUpRole: RoleClass;
}

export default class Character {
  public static createNew(name: string, avatarId: string | null = null): NewCharacter {
    const newCharacter = new Character(null, name, avatarId, null);

    newCharacter.attributes = getDefaultAttributes(newCharacter);
    newCharacter.roles = {} as any as Roles;
    newCharacter.skills = getDefaultSkills(newCharacter);
    newCharacter.technologies = {} as any as Technologies;
    newCharacter.perks = {} as any as Perks;
    newCharacter.availablePoints = { ...defaultAvailablePoints };

    return newCharacter as NewCharacter;
  }

  public static fromExisting(characterData: CharacterData): ExistingCharacter {
    const character = new Character(
      characterData.id,
      characterData.name,
      characterData.avatarId || null,
      characterData.author,
      {
        createdAt: new Date(characterData.createdAt),
        updatedAt: new Date(characterData.updatedAt),
      },
    );

    character.attributes = getAttributes(character, characterData.data.attributes);
    character.roles = getRoles(character, characterData.data.roles);
    character.skills = getSkills(character, characterData.data.skills);
    character.technologies = getTechnologies(character, characterData.data.technologies);
    character.perks = getPerks(character, characterData.data.perks);
    character.availablePoints = { ...characterData.data.availablePoints };
    character.oldCharacterData = characterData;

    return character as ExistingCharacter;
  }

  /* base properties */
  public readonly id: number | null;
  public name: string;
  public avatarId: string | null;
  public readonly author: User | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  /* roleplay properties */
  public attributes!: Attributes;
  public roles!: Roles;
  public skills!: Skills;
  public technologies!: Technologies;
  public perks!: Perks;
  public availablePoints!: AvailablePoints;
  public oldCharacterData: CharacterData | null = null;

  /* internal technical properties */
  public backup: CharacterBackupManager;
  public currentLevelUpRole: RoleClass | null = null;

  constructor(
    id: number | null,
    name: string,
    avatarId: string | null,
    author: User | null,
    timestamps?: { createdAt: Date, updatedAt: Date },
  ) {
    this.id = id;
    this.name = name;
    this.avatarId = avatarId;
    this.author = author;
    this.backup = new CharacterBackupManager(this);

    if (timestamps) {
      this.createdAt = timestamps.createdAt;
      this.updatedAt = timestamps.updatedAt;
    } else {
      this.createdAt = this.updatedAt = new Date(Date.now());
    }
  }

  public isLevelUpAvailable(): boolean {
    return this.availablePoints.roles >= 1;
  }

  public isLevelUpRoleSelected(): this is CharacterWithSelectedLevelUpRole {
    return !!this.currentLevelUpRole;
  }

  public isLevelUpInProgress(): boolean {
    return this.isLevelUpAvailable() || this.isLevelUpRoleSelected();
  }

  public isNew(): this is NewCharacter {
    return !this.oldCharacterData;
  }

  public isExisting(): this is ExistingCharacter {
    return !!this.oldCharacterData;
  }

  public getLevel(): number {
    return _.sumBy(Object.values(this.roles), 'level') || 0;
  }

  public startLevelUp(): void {
    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is already in progress.');
    }

    this.backup.make();
    this.availablePoints.roles = 1;
  }

  public levelUpInRole(Role: RoleClass): void {
    if (!this.isLevelUpAvailable()) {
      throw new Error('Level up is not available.');
    }

    if (this.isLevelUpRoleSelected()) {
      throw new Error('Level up is already in progress.');
    }

    try {
      this.currentLevelUpRole = Role;

      if (!this.roles[Role.key]) {
        Role.addRoleToCharacter(this);
      }

      this.roles[Role.key]!.up();
    } catch (e) {
      this.currentLevelUpRole = null;
      this.backup.restore();

      throw e;
    }
  }

  public finishLevelUp(): void {
    if (!this.isLevelUpRoleSelected()) {
      throw new Error('No level up in progress.');
    }

    if (!this.areAllPointsSpent()) {
      throw new Error('Some available points need to be spent.');
    }

    this.currentLevelUpRole = null!;
    this.backup.reset();
  }

  public cancelLevelUp(): void {
    if (!this.isLevelUpInProgress()) {
      throw new Error('No level up in progress.');
    }

    this.currentLevelUpRole = null;
    this.backup.restore();
  }

  public areAllPointsSpent(): boolean {
    const areRolePointsSpent = this.availablePoints.roles === 0;
    const areAttributesPointsSpent = Math.floor(this.availablePoints.attributes) === 0;
    const arePerksPointsSpent = Math.floor(this.availablePoints.perks) === 0;

    return areRolePointsSpent && areAttributesPointsSpent && arePerksPointsSpent;
  }

  public toCreateCharacterData(): CreateCharacterData {
    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is in progress.');
    }

    return {
      name: this.name,
      avatarId: this.avatarId,
      data: this.getRoleplayData(),
    };
  }

  public toUpdateCharacterData(): UpdateCharacterData {
    if (!this.isExisting()) {
      throw new Error('New character can not be presented as UpdateCharacterData');
    }

    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is in progress.');
    }

    const updateData = {} as any as UpdateCharacterData;

    if (this.name !== this.oldCharacterData.name) {
      updateData.name = this.name;
    }

    if (this.avatarId !== this.oldCharacterData.avatarId) {
      updateData.avatarId = this.avatarId;
    }

    const roleplayData = this.getRoleplayData();

    const dataDifference = Object.entries(roleplayData).reduce(
      (result, entry) => {
        const dataKey = entry[0] as keyof CharacterRoleplayData;
        const dataValue = entry[1];

        if (!_.isEqual(dataValue, this.oldCharacterData!.data[dataKey])) {
          result[dataKey] = dataValue;
        }

        return result;
      },
      {} as Partial<CharacterRoleplayData>,
    );

    if (!_.isEmpty(dataDifference)) {
      updateData.data = dataDifference;
    }

    return updateData;
  }

  public toCharacterData(): CharacterData {
    if (!this.isExisting()) {
      throw new Error('New character can not be presented as CharacterData');
    }

    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is in progress.');
    }

    return {
      id: this.id,
      name: this.name,
      avatarId: this.avatarId,
      author: this.author,
      data: this.getRoleplayData(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  private getRoleplayData(): CharacterRoleplayData {
    return {
      attributes: getAttributesData(this.attributes),
      roles: getRolesData(this.roles),
      skills: getSkillsData(this.skills),
      technologies: getTechnologiesData(this.technologies),
      perks: getPerksData(this.perks),
      availablePoints: { ...this.availablePoints },
    };
  }
}
