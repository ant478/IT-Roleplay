import Character from '../../Character';
import Technology from './Technology';
import ScalaJS2 from './ScalaJS2';
import JavaScript5 from './JavaScript5';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class ScalaJS3 extends Technology {
  public static id = 20;
  public static key: TechnologyKey = 'ScalaJS3';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'ScalaJS'];
  public static basePrice = 3;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = ScalaJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript5.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
