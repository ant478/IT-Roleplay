import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Java4 from './Java4';
import expect from '../../helpers/requirementsHelper';

export default class Java5 extends Technology {
  public static id = 68;
  public static key: TechnologyKey = 'Java5';
  public static tags: TechnologyTag[] = ['Java', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Java4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
