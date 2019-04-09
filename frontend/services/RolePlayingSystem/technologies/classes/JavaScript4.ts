import Character from '../../Character';
import Technology from './Technology';
import JavaScript3 from './JavaScript3';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class JavaScript4 extends Technology {
  public static id = 4;
  public static key = 'JavaScript4' as TechnologyKey;
  public static tags = ['JavaScript', 'Frontend'] as TechnologyTag[];
  public static basePrice = 4;
  public static complexityLevel = 4;
  public static group = 'Frontend' as TechnologyGroup;
  public static parent = JavaScript3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
