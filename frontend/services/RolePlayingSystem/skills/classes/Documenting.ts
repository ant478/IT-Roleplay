import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Documenting extends Skill {
  public static id = 3;
  public static key: SkillKey = 'Documenting';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.endurance];
  public static baseRoles = [roleClassesWithKeys[roleKeys.supportEngineer]];
}
