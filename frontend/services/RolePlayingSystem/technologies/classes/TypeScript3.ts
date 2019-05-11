import Character from '../../Character';
import Technology from './Technology';
import TypeScript2 from './TypeScript2';
import JavaScript5 from './JavaScript5';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class TypeScript3 extends Technology {
  public static id = 17;
  public static key: TechnologyKey = 'TypeScript3';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'TypeScript'];
  public static basePrice = 3;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = TypeScript2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript5.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
