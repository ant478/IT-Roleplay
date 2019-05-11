import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS3 from './CSS3';
import LESS1 from './LESS1';

export default class LESS2 extends Technology {
  public static id = 31;
  public static key: TechnologyKey = 'LESS2';
  public static tags: TechnologyTag[] = ['CSS', 'LESS', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = LESS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(CSS3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
