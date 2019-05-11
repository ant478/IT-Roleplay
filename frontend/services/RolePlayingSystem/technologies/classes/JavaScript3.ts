import Character from '../../Character';
import Technology from './Technology';
import JavaScript2 from './JavaScript2';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class JavaScript3 extends Technology {
  public static id = 3;
  public static key: TechnologyKey = 'JavaScript3';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = JavaScript2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
