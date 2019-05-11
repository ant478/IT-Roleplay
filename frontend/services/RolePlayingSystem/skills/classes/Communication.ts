import Skill from './Skill';
import { SkillKey } from '../index';
import { attributeClassesWithKeys, attributeKeys } from '../../attributes';
import { roleKeys, roleClassesWithKeys } from '../../roles';

export default class Communication extends Skill {
  public static id = 6;
  public static key: SkillKey = 'Communication';
  public static baseAttribute = attributeClassesWithKeys[attributeKeys.charisma];
  public static baseRoles = [
    roleClassesWithKeys[roleKeys.teamlead],
    roleClassesWithKeys[roleKeys.supportEngineer],
  ];
}
