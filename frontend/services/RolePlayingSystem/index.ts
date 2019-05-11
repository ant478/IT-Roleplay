import Character, { ExistingCharacter, NewCharacter } from './Character';
import { attributeClassesWithKeys, attributeClasses, AttributeClass, Attribute, AttributeKey, Attributes } from './attributes';
import { skillClassesWithKeys, skillClasses, SkillClass, Skill, SkillKey, Skills } from './skills';
import { roleClassesWithKeys, roleClasses, RoleClass, Role, RoleKey, Roles } from './roles';
import { technologyClassesWithKeys, technologyClasses, TechnologyClass, Technology, TechnologyKey, technologyGroups, TechnologyGroup, Technologies } from './technologies';
import { perkClassesWithKeys, perkClasses, PerkClass, Perk, PerkKey, Perks, PerkUsageTypeKey } from './perks';

export type AttributeClass = AttributeClass;
export type SkillClass = SkillClass;
export type RoleClass = RoleClass;
export type TechnologyClass = TechnologyClass;
export type PerkClass = PerkClass;

export type Attribute = Attribute;
export type Skill = Skill;
export type Role = Role;
export type Technology = Technology;
export type Perk = Perk;

export type AttributeKey = AttributeKey;
export type SkillKey = SkillKey;
export type RoleKey = RoleKey;
export type TechnologyKey = TechnologyKey;
export type PerkKey = PerkKey;

export type Attributes = Attributes;
export type Skills = Skills;
export type Roles = Roles;
export type Technologies = Technologies;
export type Perks = Perks;

export type TechnologyGroup = TechnologyGroup;
export type PerkUsageTypeKey = PerkUsageTypeKey;

export type NewCharacter = NewCharacter;
export type ExistingCharacter = ExistingCharacter;

export {
  Character,
  attributeClassesWithKeys,
  attributeClasses,
  skillClassesWithKeys,
  skillClasses,
  roleClassesWithKeys,
  roleClasses,
  technologyClassesWithKeys,
  technologyClasses,
  technologyGroups,
  perkClassesWithKeys,
  perkClasses,
};
