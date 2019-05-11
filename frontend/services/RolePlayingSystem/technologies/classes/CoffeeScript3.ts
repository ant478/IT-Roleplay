import Character from '../../Character';
import Technology from './Technology';
import CoffeeScript2 from './CoffeeScript2';
import JavaScript5 from './JavaScript5';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class CoffeeScript3 extends Technology {
  public static id = 23;
  public static key: TechnologyKey = 'CoffeeScript3';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'CoffeeScript'];
  public static basePrice = 3;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = CoffeeScript2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript5.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
