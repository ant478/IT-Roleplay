import Character from '../Character';
import Communication from './classes/Communication';
import Debugging from './classes/Debugging';
import Discipline from './classes/Discipline';
import Documenting from './classes/Documenting';
import Planning from './classes/Planning';
import Programming from './classes/Programming';
import { getInstances, getIntegerData, IntegerDataProperty } from '../helpers/characterIntegerDataConverter';
import getDefaultInstances from '../helpers/defaultInstancesHelper';

export const skillClasses = [Communication, Debugging, Discipline, Documenting, Planning, Programming];
type SkillKeyName = 'communication' | 'debugging' | 'discipline' | 'documenting' | 'planning' | 'programming';

export const skillKeys: Record<SkillKeyName, SkillKey> = {
  communication: 'Communication',
  debugging: 'Debugging',
  discipline: 'Discipline',
  documenting: 'Documenting',
  planning: 'Planning',
  programming: 'Programming',
};

export const skillClassesWithKeys = skillClasses.reduce(
  (acc, Class) => ({ ...acc, [Class.key]: Class }),
  {} as Record<SkillKey, SkillClass>,
);

export type SkillKey = 'Communication' | 'Debugging' | 'Discipline' | 'Documenting' | 'Planning' | 'Programming';
export type Skill = Communication | Debugging | Discipline | Documenting | Planning | Programming;
export type Skills = Record<SkillKey, Skill>;
export type SkillClass = typeof skillClasses[0];

export function getSkills(character: Character, skillsData: IntegerDataProperty[]): Skills {
  return getInstances<Skills>(character, skillsData, skillClassesWithKeys);
}

export function getSkillsData(skills: Skills): IntegerDataProperty[] {
  return getIntegerData<Skills>(skills, skillClassesWithKeys);
}

export function getDefaultSkills(character: Character): Skills {
  return getDefaultInstances<Skills>(character, skillClassesWithKeys);
}
