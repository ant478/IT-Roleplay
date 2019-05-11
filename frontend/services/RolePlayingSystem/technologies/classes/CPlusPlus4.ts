import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CPlusPlus3 from './CPlusPlus3';
import expect from '../../helpers/requirementsHelper';

export default class CPlusPlus4 extends Technology {
  public static id = 77;
  public static key: TechnologyKey = 'CPlusPlus4';
  public static tags: TechnologyTag[] = ['CPlusPlus', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CPlusPlus3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
