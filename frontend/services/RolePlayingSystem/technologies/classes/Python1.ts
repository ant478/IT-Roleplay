import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class Python1 extends Technology {
  public static id = 84;
  public static key: TechnologyKey = 'Python1';
  public static tags: TechnologyTag[] = ['Python', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'Backend';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
