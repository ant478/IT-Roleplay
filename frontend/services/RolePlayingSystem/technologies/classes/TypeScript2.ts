import Character from '../../Character';
import Technology from './Technology';
import TypeScript1 from './TypeScript1';
import JavaScript4 from './JavaScript4';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class TypeScript2 extends Technology {
  public static id = 16;
  public static key: TechnologyKey = 'TypeScript2';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'TypeScript'];
  public static basePrice = 2;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = TypeScript1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
