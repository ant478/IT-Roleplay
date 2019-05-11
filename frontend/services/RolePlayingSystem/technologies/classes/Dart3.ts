import Character from '../../Character';
import Technology from './Technology';
import Dart2 from './Dart2';
import JavaScript5 from './JavaScript5';
import expect from '../../helpers/requirementsHelper';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';

export default class Dart3 extends Technology {
  public static id = 14;
  public static key: TechnologyKey = 'Dart3';
  public static tags: TechnologyTag[] = ['JavaScript', 'Frontend', 'Dart'];
  public static basePrice = 3;
  public static complexityLevel = 4;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = Dart2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript5.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
