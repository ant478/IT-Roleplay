import Character from '../../Character';
import Technology from './Technology';
import HTML3 from './HTML3';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class HTML4 extends Technology {
  public static id = 116;
  public static key: TechnologyKey = 'HTML4';
  public static tags: TechnologyTag[] = ['HTML', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = HTML3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
