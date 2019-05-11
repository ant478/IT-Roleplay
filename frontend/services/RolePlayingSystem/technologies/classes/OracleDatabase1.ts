import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class OracleDatabase1 extends Technology {
  public static id = 97;
  public static key: TechnologyKey = 'OracleDatabase1';
  public static tags: TechnologyTag[] = ['OracleDatabase', 'Backend'];
  public static basePrice = 1;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
