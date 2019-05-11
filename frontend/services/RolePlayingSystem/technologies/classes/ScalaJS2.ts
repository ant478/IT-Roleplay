import Character from '../../Character';
import Technology from './Technology';
import ScalaJS1 from './ScalaJS1';
import JavaScript4 from './JavaScript4';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class ScalaJS2 extends Technology {
  public static id = 19;
  public static key: TechnologyKey = 'ScalaJS2';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'ScalaJS'];
  public static basePrice = 2;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = ScalaJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
