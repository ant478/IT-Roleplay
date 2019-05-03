import Character from '../../Character';
import { PerkKey, PerkUsageTypeKey, PerkClass } from '../index';

export default abstract class Perk {
  public static id: number;
  public static key: PerkKey;
  public static complexityLevel: number;
  public static usageType: PerkUsageTypeKey;
  public static parent: PerkClass | null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return false;
  }

  public static isVisibleForCharacter(_character: Character): boolean {
    return true;
  }

  public static canBeAddedToCharacter(character: Character): boolean {
    if (!character.isLevelUpRoleSelected()) {
      return false;
    }

    if (!this.isCharacterMatchRequirements(character)) {
      return false;
    }

    if (character.availablePoints.perks < 1) {
      return false;
    }

    if (character.perks[this.key]) {
      return false;
    }

    return true;
  }

  public static addToCharacter(character: Character): void {
    if (!this.canBeAddedToCharacter(character)) {
      throw new Error('Perks cannot be added to character.');
    }

    const Class = this as PerkClass;

    character.perks[Class.key] = new Class(character);
    character.availablePoints.perks -= 1;
  }

  public static canBeRemovedFromCharacter(character: Character): boolean {
    if (!character.isLevelUpRoleSelected()) {
      return false;
    }

    if (!character.perks[this.key]) {
      return false;
    }

    if (character.backup.perks.includes(this.id)) {
      return false;
    }

    return true;
  }

  public static removeFromCharacter(character: Character): void {
    if (!this.canBeRemovedFromCharacter(character)) {
      throw new Error('Perk cannot be removed from character.');
    }

    const Child = Object.values(character.perks)
      .map(perk => perk.constructor as PerkClass)
      .find((Class) => {
        if (!Class.parent) {
          return false;
        }

        return Class.parent.key === this.key;
      });

    if (Child) {
      Child.removeFromCharacter(character);
    }

    delete character.perks[this.key];
    character.availablePoints.perks += 1;
  }

  constructor(protected readonly owner: Character) {}

  public getKey(): PerkKey {
    return (this.constructor as PerkClass).key;
  }
}
