import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Debugging extends Skill {
  public static id = 5;
  public static key: SkillKey = 'Debugging';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.wisdom];
  public static baseRoles = [
    roleClassesWithKeys[roleKeys.supportEngineer],
    roleClassesWithKeys[roleKeys.reviewer],
  ];
}
