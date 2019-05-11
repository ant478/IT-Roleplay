import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Programming extends Skill {
  public static id = 4;
  public static key: SkillKey = 'Programming';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.intelligence];
  public static baseRoles = [roleClassesWithKeys[roleKeys.developer]];
}
