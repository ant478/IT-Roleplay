import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript3 from './JavaScript3';
import BackboneJS1 from './BackboneJS1';

export default class BackboneJS2 extends Technology {
  public static id = 49;
  public static key: TechnologyKey = 'BackboneJS2';
  public static tags: TechnologyTag[] = ['JavaScript', 'BackboneJS', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = BackboneJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
