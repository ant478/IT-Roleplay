import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Planning extends Skill {
  public static id = 2;
  public static key: SkillKey = 'Planning';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.dexterity];
  public static baseRoles = [roleClassesWithKeys[roleKeys.teamlead]];
}
