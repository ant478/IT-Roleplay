import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CPlusPlus2 from './CPlusPlus2';
import expect from '../../helpers/requirementsHelper';

export default class CPlusPlus3 extends Technology {
  public static id = 76;
  public static key: TechnologyKey = 'CPlusPlus3';
  public static tags: TechnologyTag[] = ['CPlusPlus', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CPlusPlus2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
