import Character from '../../Character';
import { SkillKey, SkillClass } from '../index';
import { AttributeClass } from '../../attributes';
import { RoleClass } from '../../roles';

export default abstract class Skill {
  public static id: number;
  public static key: SkillKey;
  public static baseAttribute: AttributeClass;
  public static baseRoles: RoleClass[];
  public value: number;

  constructor(
    protected readonly owner: Character,
    value?: number,
  ) {
    this.value = value || 0;
  }

  public getKey(): SkillKey {
    return (this.constructor as SkillClass).key;
  }

  public canBeUpped(): boolean {
    if (!this.owner.isLevelUpInProgress()) {
      return false;
    }

    if (this.value >= this.getMaxValue()) {
      return false;
    }

    if (this.owner.availablePoints.skills < this.getPrice()) {
      return false;
    }

    return true;
  }

  public up(): void {
    if (!this.canBeUpped()) {
      throw new Error('Skill cannot be upped.');
    }

    this.owner.availablePoints.skills -= this.getPrice();
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
      throw new Error('Skill cannot be downed.');
    }

    this.owner.availablePoints.skills += this.getPrice();
    this.value -= 1;
  }

  public getMaxValue(): number {
    if (!this.owner.isLevelUpInProgress()) {
      throw new Error('Max value can be calculated only when level up is in progress.');
    }

    const baseRoles = (this.constructor as SkillClass).baseRoles;
    const currentLevelUpRole = this.owner.currentLevelUpRole;
    const isRoleSkill = baseRoles.some(({ key }) => currentLevelUpRole.key === key);

    return isRoleSkill ? this.owner.getLevel() + 1 : Math.floor((this.owner.getLevel() + 1) / 2);
  }

  public getPrice(): number {
    if (!this.owner.isLevelUpInProgress()) {
      throw new Error('Skill price can be calculated only when level up is in progress.');
    }

    const baseRoles = (this.constructor as SkillClass).baseRoles;
    const currentLevelUpRole = this.owner.currentLevelUpRole;
    const isRoleSkill = baseRoles.some(({ key }) => currentLevelUpRole.key === key);

    return isRoleSkill ? 1 : 2;
  }

  public getBackupValue(): number {
    if (!this.owner.backup.isFilled()) {
      throw new Error('Backup is empty');
    }

    const currentSkillId = (this.constructor as AttributeClass).id;

    return this.owner.backup.skills.find(({ id }) => id === currentSkillId)!.value;
  }

  public getCalculatedValue(): number {
    const baseAttribute = (this.constructor as SkillClass).baseAttribute;

    return this.getCleanValue() + this.owner.attributes[baseAttribute.key].getModifier();
  }

  public getCleanValue(): number {
    return this.value;
  }

  public getDataValue(): number {
    return this.value;
  }
}
