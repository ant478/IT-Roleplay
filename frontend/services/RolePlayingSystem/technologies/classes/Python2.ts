import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Python1 from './Python1';
import expect from '../../helpers/requirementsHelper';

export default class Python2 extends Technology {
  public static id = 85;
  public static key: TechnologyKey = 'Python2';
  public static tags: TechnologyTag[] = ['Python', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Python1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
