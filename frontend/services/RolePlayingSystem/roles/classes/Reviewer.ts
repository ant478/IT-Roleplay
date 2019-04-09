import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';

export default class Reviewer extends Role {
  public static id = 3;
  public static key = 'Reviewer' as RoleKey;
  public static technologiesPointsCountForLevel = 1;
  public static perksPointsCountForLevel = 0.75;
  public static skillsPointsCountForLevel = 4;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
