import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class CSS1 extends Technology {
  public static id = 9;
  public static key = 'CSS1' as TechnologyKey;
  public static tags = ['CSS', 'Frontend'] as TechnologyTag[];
  public static basePrice = 1;
  public static complexityLevel = 1;
  public static group = 'Frontend' as TechnologyGroup;
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
