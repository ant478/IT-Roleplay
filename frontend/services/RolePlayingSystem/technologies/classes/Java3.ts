import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Java2 from './Java2';
import expect from '../../helpers/requirementsHelper';

export default class Java3 extends Technology {
  public static id = 66;
  public static key: TechnologyKey = 'Java3';
  public static tags: TechnologyTag[] = ['Java', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Java2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
