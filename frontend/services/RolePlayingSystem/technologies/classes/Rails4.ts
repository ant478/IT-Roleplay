import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Rails3 from './Rails3';
import expect from '../../helpers/requirementsHelper';

export default class Rails4 extends Technology {
  public static id = 57;
  public static key: TechnologyKey = 'Rails4';
  public static tags: TechnologyTag[] = ['Rails', 'Backend'];
  public static basePrice = 6;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Rails3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
