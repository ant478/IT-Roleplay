import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript4 from './JavaScript4';
import KnockoutJS2 from './KnockoutJS2';

export default class KnockoutJS3 extends Technology {
  public static id = 53;
  public static key: TechnologyKey = 'KnockoutJS3';
  public static tags: TechnologyTag[] = ['JavaScript', 'KnockoutJS', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = KnockoutJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
