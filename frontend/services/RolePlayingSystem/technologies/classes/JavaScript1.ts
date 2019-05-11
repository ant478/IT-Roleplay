import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class JavaScript1 extends Technology {
  public static id = 1;
  public static key: TechnologyKey = 'JavaScript1';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend'];
  public static basePrice = 1;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
