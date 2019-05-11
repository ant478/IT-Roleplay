import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CSharp4 from './CSharp4';
import expect from '../../helpers/requirementsHelper';

export default class CSharp5 extends Technology {
  public static id = 83;
  public static key: TechnologyKey = 'CSharp5';
  public static tags: TechnologyTag[] = ['CSharp', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CSharp4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
