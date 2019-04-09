import * as _ from 'lodash';
import { CharacterData, CreateCharacterData, UpdateCharacterData, CharacterRoleplayData } from '../Api/CharacterService';
import { User } from '../Api/AuthService';
import { getAttributes, getDefaultAttributes, getAttributesData, Attributes } from './attributes';
import { getSkills, getDefaultSkills, getSkillsData, Skills } from './skills';
import { getRoles, getRolesData, Roles, RoleClass } from './roles';
import { getTechnologies, getTechnologiesData, Technologies } from './technologies';
import { getPerks, getPerksData, Perks } from './perks';
import CharacterBackupManager from './CharacterBackupManager';

export interface AvailablePoints {
  role: number;
  attributes: number;
  skills: number;
  technologies: number;
  perks: number;
}

const defaultAvailablePoints: AvailablePoints = {
  role: 0,
  attributes: 0,
  skills: 0,
  technologies: 0,
  perks: 0,
};

export default class Character {
  public static createNew(name: string, avatarUrl: string | null = null): Character {
    const newCharacter = new Character(null, name, avatarUrl, null);

    newCharacter.attributes = getDefaultAttributes(newCharacter);
    newCharacter.roles = {} as any as Roles;
    newCharacter.skills = getDefaultSkills(newCharacter);
    newCharacter.technologies = {} as any as Technologies;
    newCharacter.perks = {} as any as Perks;
    newCharacter.availablePoints = { ...defaultAvailablePoints };

    return newCharacter;
  }

  public static fromExisting(characterData: CharacterData): Character {
    const character = new Character(
      characterData.id,
      characterData.name,
      characterData.avatarUrl || null,
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

    return character;
  }

  /* base properties */
  public readonly id: number | null;
  public name: string;
  public avatarUrl: string | null;
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
  private _currentLevelUpRole: RoleClass | null = null;

  constructor(
    id: number | null,
    name: string,
    avatarUrl: string | null,
    author: User | null,
    timestamps?: { createdAt: Date, updatedAt: Date },
  ) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.author = author;
    this.backup = new CharacterBackupManager(this);

    if (timestamps) {
      this.createdAt = timestamps.createdAt;
      this.updatedAt = timestamps.updatedAt;
    } else {
      this.createdAt = this.updatedAt = new Date(Date.now());
    }
  }

  public isLevelUpInProgress(): boolean {
    return !!this._currentLevelUpRole;
  }

  public getCurrentLevelUpRole(): RoleClass | null {
    return this._currentLevelUpRole;
  }

  public isNew(): boolean {
    return !this.oldCharacterData;
  }

  public getLevel(): number {
    return _.sumBy(Object.values(this.roles), 'level') || 0;
  }

  public getMultiSkillCoefficient(_technologies: Technologies = this.technologies): number {
    return 1;
  }

  public startLevelUp(Role: RoleClass): void {
    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is already in progress.');
    }

    try {
      this.backup.make();
      this._currentLevelUpRole = Role;
      this.availablePoints.role = 1;

      if (!this.roles[Role.key]) {
        Role.addRoleToCharacter(this);
      }

      this.roles[Role.key]!.up();
    } catch (e) {
      this._currentLevelUpRole = null;
      this.backup.restore();

      throw e;
    }
  }

  public finishLevelUp(): void {
    if (!this.isLevelUpInProgress()) {
      throw new Error('No level up in progress.');
    }

    if (!this.areAllPointsSpent()) {
      throw new Error('Some available points need to be spent.');
    }

    this._currentLevelUpRole = null;
    this.backup.reset();
  }

  public cancelLevelUp(): void {
    if (!this.isLevelUpInProgress()) {
      throw new Error('No level up in progress.');
    }

    this._currentLevelUpRole = null;
    this.backup.restore();
  }

  public areAllPointsSpent(): boolean {
    const areRolePointsSpent = this.availablePoints.role === 0;
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
      avatarUrl: this.avatarUrl,
      data: this.getRoleplayData(),
    };
  }

  public toUpdateCharacterData(): UpdateCharacterData {
    if (this.isNew()) {
      throw new Error('New character can not be presented as UpdateCharacterData');
    }

    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is in progress.');
    }

    const updateData = {} as any as UpdateCharacterData;

    if (this.name !== this.oldCharacterData!.name) {
      updateData.name = this.name;
    }

    if (this.avatarUrl !== this.oldCharacterData!.avatarUrl) {
      updateData.avatarUrl = this.avatarUrl;
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
    if (this.isNew()) {
      throw new Error('New character can not be presented as CharacterData');
    }

    if (this.isLevelUpInProgress()) {
      throw new Error('Level up is in progress.');
    }

    return {
      id: this.id as number,
      name: this.name,
      avatarUrl: this.avatarUrl,
      author: this.author as User,
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