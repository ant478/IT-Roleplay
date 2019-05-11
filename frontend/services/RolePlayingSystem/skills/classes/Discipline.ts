import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Discipline extends Skill {
  public static id = 1;
  public static key: SkillKey = 'Discipline';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.strength];
  public static baseRoles = [
    roleClassesWithKeys[roleKeys.teamlead],
    roleClassesWithKeys[roleKeys.developer],
    roleClassesWithKeys[roleKeys.supportEngineer],
    roleClassesWithKeys[roleKeys.reviewer],
  ];
}
