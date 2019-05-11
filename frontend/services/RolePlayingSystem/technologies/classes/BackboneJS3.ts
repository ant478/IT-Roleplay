import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript4 from './JavaScript4';
import BackboneJS2 from './BackboneJS2';

export default class BackboneJS3 extends Technology {
  public static id = 50;
  public static key: TechnologyKey = 'BackboneJS3';
  public static tags: TechnologyTag[] = ['JavaScript', 'BackboneJS', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = BackboneJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
