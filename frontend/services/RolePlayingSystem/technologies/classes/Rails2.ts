import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import Rails1 from './Rails1';
import expect from '../../helpers/requirementsHelper';

export default class Rails2 extends Technology {
  public static id = 55;
  public static key: TechnologyKey = 'Rails2';
  public static tags: TechnologyTag[] = ['Rails', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = Rails1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
