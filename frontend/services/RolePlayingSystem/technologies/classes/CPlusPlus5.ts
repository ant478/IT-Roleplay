import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import CPlusPlus4 from './CPlusPlus4';
import expect from '../../helpers/requirementsHelper';

export default class CPlusPlus5 extends Technology {
  public static id = 78;
  public static key: TechnologyKey = 'CPlusPlus5';
  public static tags: TechnologyTag[] = ['CPlusPlus', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = CPlusPlus4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
