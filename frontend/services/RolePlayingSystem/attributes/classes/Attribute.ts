import Character from '../../Character';
import { AttributeKey, AttributeClass } from '../index';

export default abstract class Attribute {
  public static id: number;
  public static key: AttributeKey;
  public static defaultValue: number = 8;
  public value: number;

  constructor(
    protected readonly owner: Character,
    value?: number,
  ) {
    const Class = this.constructor as AttributeClass;

    this.value = value || Class.defaultValue;
  }

  public getKey(): AttributeKey {
    return (this.constructor as AttributeClass).key;
  }

  public canBeUpped(): boolean {
    if (!this.owner.isLevelUpInProgress()) {
      return false;
    }

    if (this.owner.availablePoints.attributes < this.getPrice()) {
      return false;
    }

    return true;
  }

  public up(): void {
    if (!this.canBeUpped()) {
      throw new Error('Attribute cannot be upped.');
    }

    this.owner.availablePoints.attributes -= this.getPrice();
    this.value += 1;
  }

  public canBeDowned(): boolean {
    if (!this.owner.isLevelUpInProgress()) {
      return false;
    }

    if (this.value === this.getBackupValue()) {
      return false;
    }

    return true;
  }

  public down(): void {
    if (!this.canBeDowned()) {
      throw new Error('Attribute cannot be downed.');
    }

    this.owner.availablePoints.attributes += this.getReversePrice();
    this.value -= 1;
  }

  public getModifier(): number {
    return this.getModifierForValue(this.value);
  }

  public getPrice(): number {
    if (this.owner.isNew()) {
      return Math.max(this.getModifier(), 1);
    }

    return 1;
  }

  public getReversePrice(): number {
    if (this.owner.isNew()) {
      return Math.max(this.getModifierForValue(this.value - 1), 1);
    }

    return 1;
  }

  public getBackupValue(): number {
    if (!this.owner.backup.isFilled()) {
      throw new Error('Backup is empty');
    }

    const currentAttributeId = (this.constructor as AttributeClass).id;

    return this.owner.backup.attributes.find(({ id }) => id === currentAttributeId)!.value;
  }

  public getCalculatedValue(): number {
    return this.getCleanValue();
  }

  public getCleanValue(): number {
    return this.value;
  }

  public getDataValue(): number {
    return this.getCleanValue();
  }

  private getModifierForValue(value: number): number {
    return Math.floor((value - 10) / 2);
  }
}
