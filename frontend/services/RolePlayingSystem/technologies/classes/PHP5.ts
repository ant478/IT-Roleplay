import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PHP4 from './PHP4';
import expect from '../../helpers/requirementsHelper';

export default class PHP5 extends Technology {
  public static id = 73;
  public static key: TechnologyKey = 'PHP5';
  public static tags: TechnologyTag[] = ['PHP', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = PHP4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
