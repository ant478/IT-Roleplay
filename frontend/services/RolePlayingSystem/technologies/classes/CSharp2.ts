import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CSharp1 from './CSharp1';
import expect from '../../helpers/requirementsHelper';

export default class CSharp2 extends Technology {
  public static id = 80;
  public static key: TechnologyKey = 'CSharp2';
  public static tags: TechnologyTag[] = ['CSharp', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CSharp1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
