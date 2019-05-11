import Character from '../../Character';
import { TechnologyKey, TechnologyTag, TechnologyGroup, TechnologyClass } from '../index';

export default abstract class Technology {
  public static id: number;
  public static key: TechnologyKey;
  public static tags: TechnologyTag[];
  public static basePrice: number;
  public static complexityLevel: number;
  public static group: TechnologyGroup;
  public static parent: TechnologyClass | null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return false;
  }

  public static getPrice(_character: Character): number {
    return this.basePrice;
  }

  public static getReversePrice(_character: Character): number {
    return this.basePrice;
  }

  public static canBeAddedToCharacter(character: Character): boolean {
    if (!character.isLevelUpRoleSelected()) {
      return false;
    }

    if (!this.isCharacterMatchRequirements(character)) {
      return false;
    }

    if (character.availablePoints.technologies < this.getPrice(character)) {
      return false;
    }

    if (character.technologies[this.key]) {
      return false;
    }

    return true;
  }

  public static addToCharacter(character: Character): void {
    if (!this.canBeAddedToCharacter(character)) {
      throw new Error('Technology cannot be added to character.');
    }

    const Class = this as TechnologyClass;

    character.availablePoints.technologies -= this.getPrice(character);
    character.technologies[Class.key] = new Class(character);
  }

  public static canBeRemovedFromCharacter(character: Character): boolean {
    if (!character.isLevelUpRoleSelected()) {
      return false;
    }

    if (!character.technologies[this.key]) {
      return false;
    }

    if (character.backup.technologies.includes(this.id)) {
      return false;
    }

    return true;
  }

  public static removeFromCharacter(character: Character): void {
    if (!this.canBeRemovedFromCharacter(character)) {
      throw new Error('Technology cannot be removed from character.');
    }

    const Child = Object.values(character.technologies)
      .map(technology => technology.constructor as TechnologyClass)
      .find((Class) => {
        if (!Class.parent) {
          return false;
        }

        return Class.parent.key === this.key;
      });

    if (Child) {
      Child.removeFromCharacter(character);
    }

    character.availablePoints.technologies += this.getReversePrice(character);
    delete character.technologies[this.key];
  }

  constructor(protected readonly owner: Character) {}

  public getKey(): TechnologyKey {
    return (this.constructor as TechnologyClass).key;
  }
}
