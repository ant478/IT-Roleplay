import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS2 from './CSS2';

export default class Stylus1 extends Technology {
  public static id = 32;
  public static key: TechnologyKey = 'Stylus1';
  public static tags: TechnologyTag[] = ['CSS', 'Stylus', 'Frontend'];
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
