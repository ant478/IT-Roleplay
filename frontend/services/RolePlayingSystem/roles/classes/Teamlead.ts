import Role from './Role';
import Character from '../../Character';
import { RoleKey } from '../index';

export default class Teamlead extends Role {
  public static id = 2;
  public static key = 'Teamlead' as RoleKey;
  public static technologiesPointsCountForLevel = 1.5;
  public static perksPointsCountForLevel = 0.34;
  public static skillsPointsCountForLevel = 8;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
