import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Java3 from './Java3';
import expect from '../../helpers/requirementsHelper';

export default class Java4 extends Technology {
  public static id = 67;
  public static key: TechnologyKey = 'Java4';
  public static tags: TechnologyTag[] = ['Java', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Java3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
