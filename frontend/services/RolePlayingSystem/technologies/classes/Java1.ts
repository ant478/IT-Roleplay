import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class Java1 extends Technology {
  public static id = 64;
  public static key: TechnologyKey = 'Java1';
  public static tags: TechnologyTag[] = ['Java', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'Backend';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
