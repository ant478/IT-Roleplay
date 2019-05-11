import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';

export default class Developer extends Role {
  public static id = 1;
  public static key: RoleKey = 'Developer';
  public static technologiesPointsCountForLevel = 3;
  public static perksPointsCountForLevel = 0.67;
  public static skillsPointsCountForLevel = 2;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
