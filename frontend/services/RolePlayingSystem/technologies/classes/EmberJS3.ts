import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript4 from './JavaScript4';
import EmberJS2 from './EmberJS2';

export default class EmberJS3 extends Technology {
  public static id = 47;
  public static key: TechnologyKey = 'EmberJS3';
  public static tags: TechnologyTag[] = ['JavaScript', 'EmberJS', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = EmberJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
