import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript2 from './JavaScript2';

export default class AngularJS1 extends Technology {
  public static id = 39;
  public static key: TechnologyKey = 'AngularJS1';
  public static tags: TechnologyTag[] = ['JavaScript', 'AngularJS', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 0;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript2.key)
      .isMatch();
  }
}
