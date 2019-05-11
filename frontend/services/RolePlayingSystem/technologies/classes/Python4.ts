import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Python3 from './Python3';
import expect from '../../helpers/requirementsHelper';

export default class Python4 extends Technology {
  public static id = 87;
  public static key: TechnologyKey = 'Python4';
  public static tags: TechnologyTag[] = ['Python', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Python3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
