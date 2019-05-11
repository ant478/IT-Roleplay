import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import SVN2 from './SVN2';
import expect from '../../helpers/requirementsHelper';

export default class SVN3 extends Technology {
  public static id = 112;
  public static key: TechnologyKey = 'SVN3';
  public static tags: TechnologyTag[] = ['SVN'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'VCS';
  public static parent = SVN2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
