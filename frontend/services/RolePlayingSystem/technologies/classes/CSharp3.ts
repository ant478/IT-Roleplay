import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CSharp2 from './CSharp2';
import expect from '../../helpers/requirementsHelper';

export default class CSharp3 extends Technology {
  public static id = 81;
  public static key: TechnologyKey = 'CSharp3';
  public static tags: TechnologyTag[] = ['CSharp', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CSharp2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
