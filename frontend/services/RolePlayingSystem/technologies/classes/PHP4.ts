import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PHP3 from './PHP3';
import expect from '../../helpers/requirementsHelper';

export default class PHP4 extends Technology {
  public static id = 72;
  public static key: TechnologyKey = 'PHP4';
  public static tags: TechnologyTag[] = ['PHP', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = PHP3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
