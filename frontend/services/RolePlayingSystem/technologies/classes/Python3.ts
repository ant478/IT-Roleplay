import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Python2 from './Python2';
import expect from '../../helpers/requirementsHelper';

export default class Python3 extends Technology {
  public static id = 86;
  public static key: TechnologyKey = 'Python3';
  public static tags: TechnologyTag[] = ['Python', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Python2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
