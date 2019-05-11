import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import SVN1 from './SVN1';
import expect from '../../helpers/requirementsHelper';

export default class SVN2 extends Technology {
  public static id = 111;
  public static key: TechnologyKey = 'SVN2';
  public static tags: TechnologyTag[] = ['SVN'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'VCS';
  public static parent = SVN1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
