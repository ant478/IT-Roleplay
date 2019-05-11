import Character from '../../Character';
import Technology from './Technology';
import CSS3 from './CSS3';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';

export default class CSS4 extends Technology {
  public static id = 117;
  public static key: TechnologyKey = 'CSS4';
  public static tags: TechnologyTag[] = ['CSS', 'Frontend'];
  public static basePrice = 4;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = CSS3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
