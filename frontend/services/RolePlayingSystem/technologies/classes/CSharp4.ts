import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CSharp3 from './CSharp3';
import expect from '../../helpers/requirementsHelper';

export default class CSharp4 extends Technology {
  public static id = 82;
  public static key: TechnologyKey = 'CSharp4';
  public static tags: TechnologyTag[] = ['CSharp', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CSharp3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
