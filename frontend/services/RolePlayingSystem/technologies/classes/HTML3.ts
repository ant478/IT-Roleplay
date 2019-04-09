import Character from '../../Character';
import Technology from './Technology';
import HTML2 from './HTML2';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class HTML3 extends Technology {
  public static id = 8;
  public static key = 'HTML3' as TechnologyKey;
  public static tags = ['HTML', 'Frontend'] as TechnologyTag[];
  public static basePrice = 3;
  public static complexityLevel = 3;
  public static group = 'Frontend' as TechnologyGroup;
  public static parent = HTML2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}