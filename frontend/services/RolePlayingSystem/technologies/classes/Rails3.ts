import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Rails2 from './Rails2';
import expect from '../../helpers/requirementsHelper';

export default class Rails3 extends Technology {
  public static id = 56;
  public static key: TechnologyKey = 'Rails3';
  public static tags: TechnologyTag[] = ['Rails', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Rails2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
