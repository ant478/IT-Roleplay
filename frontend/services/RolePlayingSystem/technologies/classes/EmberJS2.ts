import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript3 from './JavaScript3';
import EmberJS1 from './EmberJS1';

export default class EmberJS2 extends Technology {
  public static id = 46;
  public static key: TechnologyKey = 'EmberJS2';
  public static tags: TechnologyTag[] = ['JavaScript', 'EmberJS', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = EmberJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
