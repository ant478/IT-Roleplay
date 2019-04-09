import Character from '../Character';
import Developer from './classes/Developer';
import Teamlead from './classes/Teamlead';
import Reviewer from './classes/Reviewer';
import SupportEngineer from './classes/SupportEngineer';
import { getInstances, getIntegerData, IntegerDataProperty } from '../helpers/characterIntegerDataConverter';

const RoleClasses = [Developer, Teamlead, Reviewer, SupportEngineer];
type RoleKeyName = 'developer' | 'teamlead' | 'reviewer' | 'supportEngineer';

export const roleKeys: Record<RoleKeyName, RoleKey> = {
  developer: 'Developer',
  teamlead: 'Teamlead',
  reviewer: 'Reviewer',
  supportEngineer: 'SupportEngineer',
};

export const roleClassesWithKeys = RoleClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<RoleKey, RoleClass>,
);

export type RoleKey = 'Developer' | 'Teamlead' | 'Reviewer' | 'SupportEngineer';
export type Role = Developer | Teamlead | Reviewer | SupportEngineer;
export type Roles = Record<RoleKey, Role | undefined>;
export type RoleClass = typeof RoleClasses[0];

export function getRoles(character: Character, classesData: IntegerDataProperty[]): Roles {
  return getInstances<Record<RoleKey, Role>>(character, classesData, roleClassesWithKeys);
}

export function getRolesData(classes: Roles): IntegerDataProperty[] {
  return getIntegerData<Record<RoleKey, Role>>(classes as Record<RoleKey, Role>, roleClassesWithKeys);
}
