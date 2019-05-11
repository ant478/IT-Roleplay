import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class Git1 extends Technology {
  public static id = 107;
  public static key: TechnologyKey = 'Git1';
  public static tags: TechnologyTag[] = ['Git'];
  public static basePrice = 1;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'VCS';
  public static parent = null;

  public static isCharacterMatchRequirements(_character: Character): boolean {
    return true;
  }
}
