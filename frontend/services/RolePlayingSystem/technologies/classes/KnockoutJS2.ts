import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript3 from './JavaScript3';
import KnockoutJS1 from './KnockoutJS1';

export default class KnockoutJS2 extends Technology {
  public static id = 52;
  public static key: TechnologyKey = 'KnockoutJS2';
  public static tags: TechnologyTag[] = ['JavaScript', 'KnockoutJS', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = KnockoutJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
