import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS3 from './CSS3';
import SASS1 from './SASS1';

export default class SASS2 extends Technology {
  public static id = 29;
  public static key: TechnologyKey = 'SASS2';
  public static tags: TechnologyTag[] = ['CSS', 'SASS', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = SASS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(CSS3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
