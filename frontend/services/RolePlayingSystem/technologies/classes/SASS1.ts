import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS2 from './CSS2';

export default class SASS1 extends Technology {
  public static id = 28;
  public static key: TechnologyKey = 'SASS1';
  public static tags: TechnologyTag[] = ['CSS', 'SASS', 'Frontend'];
  public static basePrice = 1;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(CSS2.key)
      .isMatch();
  }
}
