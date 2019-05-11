import Character from '../../Character';
import Technology from './Technology';
import JavaScript4 from './JavaScript4';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class JavaScript5 extends Technology {
  public static id = 5;
  public static key: TechnologyKey = 'JavaScript5';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend'];
  public static basePrice = 5;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = JavaScript4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
