import Character from '../../Character';
import Technology from './Technology';
import CoffeeScript1 from './CoffeeScript1';
import JavaScript4 from './JavaScript4';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class CoffeeScript2 extends Technology {
  public static id = 22;
  public static key: TechnologyKey = 'CoffeeScript2';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'CoffeeScript'];
  public static basePrice = 2;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = CoffeeScript1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
