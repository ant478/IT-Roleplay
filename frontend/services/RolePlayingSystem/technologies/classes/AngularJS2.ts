import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript3 from './JavaScript3';
import AngularJS1 from './AngularJS1';

export default class AngularJS2 extends Technology {
  public static id = 40;
  public static key: TechnologyKey = 'AngularJS2';
  public static tags: TechnologyTag[] = ['JavaScript', 'AngularJS', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = AngularJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
