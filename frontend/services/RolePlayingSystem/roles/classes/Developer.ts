import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';

export default class Developer extends Role {
  public static id = 1;
  public static key = 'Developer' as RoleKey;
  public static technologiesPointsCountForLevel = 3;
  public static perksPointsCountForLevel = 0.34;
  public static skillsPointsCountForLevel = 4;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
