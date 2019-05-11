import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class MySQL1 extends Technology {
  public static id = 89;
  public static key: TechnologyKey = 'MySQL1';
  public static tags: TechnologyTag[] = ['MySQL', 'Backend'];
  public static basePrice = 1;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
