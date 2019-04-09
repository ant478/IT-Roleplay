import Character from '../../Character';
import Technology from './Technology';
import HTML1 from './HTML1';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class HTML2 extends Technology {
  public static id = 7;
  public static key = 'HTML2' as TechnologyKey;
  public static tags = ['HTML', 'Frontend'] as TechnologyTag[];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group = 'Frontend' as TechnologyGroup;
  public static parent = HTML1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
