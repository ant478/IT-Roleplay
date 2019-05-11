import Character from '../../Character';
import Technology from './Technology';
import CSS1 from './CSS1';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class CSS2 extends Technology {
  public static id = 10;
  public static key: TechnologyKey = 'CSS2';
  public static tags: TechnologyTag[] = ['CSS', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = CSS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
