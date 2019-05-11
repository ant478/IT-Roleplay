import Character from '../../Character';
import Technology from './Technology';
import JavaScript3 from './JavaScript3';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class TypeScript1 extends Technology {
  public static id = 15;
  public static key: TechnologyKey = 'TypeScript1';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'TypeScript'];
  public static basePrice = 1;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .isMatch();
  }
}
