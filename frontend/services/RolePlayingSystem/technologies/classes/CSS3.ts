import Character from '../../Character';
import Technology from './Technology';
import CSS2 from './CSS2';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class CSS3 extends Technology {
  public static id = 11;
  public static key = 'CSS3' as TechnologyKey;
  public static tags = ['CSS', 'Frontend'] as TechnologyTag[];
  public static basePrice = 3;
  public static complexityLevel = 3;
  public static group = 'Frontend' as TechnologyGroup;
  public static parent = CSS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
