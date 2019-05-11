import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Java1 from './Java1';
import expect from '../../helpers/requirementsHelper';

export default class Java2 extends Technology {
  public static id = 65;
  public static key: TechnologyKey = 'Java2';
  public static tags: TechnologyTag[] = ['Java', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Java1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
