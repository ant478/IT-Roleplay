import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript4 from './JavaScript4';
import AngularJS2 from './AngularJS2';

export default class AngularJS3 extends Technology {
  public static id = 41;
  public static key: TechnologyKey = 'AngularJS3';
  public static tags: TechnologyTag[] = ['JavaScript', 'AngularJS', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = AngularJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
