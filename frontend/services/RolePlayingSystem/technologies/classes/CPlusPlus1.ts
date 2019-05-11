import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class CPlusPlus1 extends Technology {
  public static id = 74;
  public static key: TechnologyKey = 'CPlusPlus1';
  public static tags: TechnologyTag[] = ['CPlusPlus', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'Backend';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
