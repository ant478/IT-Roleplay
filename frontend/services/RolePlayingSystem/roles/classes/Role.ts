import Character from '../../Character';
import { RoleKey, RoleClass } from '../index';

const NEW_CHARACTER_ATTRIBUTES_POINTS_COUNT = 36;
const NEW_CHARACTER_PERKS_POINTS_COUNT = 3;

export default abstract class Role {
  public static id: number;
  public static key: RoleKey;
  public static attributesPointsCountForLevel = 0.25;
  public static technologiesPointsCountForLevel: number;
  public static perksPointsCountForLevel: number;
  public static skillsPointsCountForLevel: number;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return false;
  }

  public static addRoleToCharacter(character: Character): void {
    if (!character.isLevelUpInProgress()) {
      throw new Error('Level up is not in progress.');
    }

    const Class = this as RoleClass;

    if (!Class.isCharacterMatchRequirements(character)) {
      throw new Error(`Character ${character.name} does not match requirements of ${Class.key} role`);
    }

    if (character.roles[Class.key]) {
      throw new Error(`Character ${character.name} already has ${Class.key} role`);
    }

    character.roles[Class.key] = new Class(character);
  }

  public level: number;

  constructor(
    protected readonly owner: Character,
    level?: number,
  ) {
    this.level = level || 0;
  }

  public canBeUpped(): boolean {
    if (!this.owner.isLevelUpInProgress()) {
      return false;
    }

    if (this.owner.availablePoints.role < 1) {
      return false;
    }

    return true;
  }

  public up(): void {
    if (!this.canBeUpped()) {
      throw new Error('Role cannot be upped.');
    }

    const Class = this.constructor as RoleClass;
    const isCreatingCharacter = this.owner.getLevel() === 0;
    const coefficient = isCreatingCharacter ? 2 : 1;

    this.owner.availablePoints.role -= 1;
    this.owner.availablePoints.attributes += isCreatingCharacter ? NEW_CHARACTER_ATTRIBUTES_POINTS_COUNT : Class.attributesPointsCountForLevel;
    this.owner.availablePoints.skills += coefficient * Class.skillsPointsCountForLevel;
    this.owner.availablePoints.technologies += isCreatingCharacter ? 3 : Class.technologiesPointsCountForLevel;
    this.owner.availablePoints.perks += isCreatingCharacter ? NEW_CHARACTER_PERKS_POINTS_COUNT : Class.perksPointsCountForLevel;

    this.level += 1;
  }

  public getDataValue(): number {
    return this.level;
  }
}
