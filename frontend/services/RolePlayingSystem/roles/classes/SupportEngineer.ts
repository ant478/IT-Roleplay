import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';

export default class SupportEngineer extends Role {
  public static id = 4;
  public static key = 'SupportEngineer' as RoleKey;
  public static technologiesPointsCountForLevel = 1;
  public static perksPointsCountForLevel = 0.34;
  public static skillsPointsCountForLevel = 12;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return false;
  }
}
