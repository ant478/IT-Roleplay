import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Rails4 from './Rails4';
import expect from '../../helpers/requirementsHelper';

export default class Rails5 extends Technology {
  public static id = 58;
  public static key: TechnologyKey = 'Rails5';
  public static tags: TechnologyTag[] = ['Rails', 'Backend'];
  public static basePrice = 7;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Rails4;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(15)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
