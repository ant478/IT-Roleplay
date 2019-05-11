import Character from '../../Character';
import Technology from './Technology';
import Dart1 from './Dart1';
import JavaScript4 from './JavaScript4';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class Dart2 extends Technology {
  public static id = 13;
  public static key: TechnologyKey = 'Dart2';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'Dart'];
  public static basePrice = 2;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = Dart1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
