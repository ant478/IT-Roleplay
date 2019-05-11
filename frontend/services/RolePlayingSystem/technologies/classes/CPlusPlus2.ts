import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CPlusPlus1 from './CPlusPlus1';
import expect from '../../helpers/requirementsHelper';

export default class CPlusPlus2 extends Technology {
  public static id = 75;
  public static key: TechnologyKey = 'CPlusPlus2';
  public static tags: TechnologyTag[] = ['CPlusPlus', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CPlusPlus1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
