import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Python4 from './Python4';
import expect from '../../helpers/requirementsHelper';

export default class Python5 extends Technology {
  public static id = 88;
  public static key: TechnologyKey = 'Python5';
  public static tags: TechnologyTag[] = ['Python', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Python4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
