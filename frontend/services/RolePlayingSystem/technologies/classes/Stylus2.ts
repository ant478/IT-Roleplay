import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import CSS3 from './CSS3';
import Stylus1 from './Stylus1';

export default class Stylus2 extends Technology {
  public static id = 33;
  public static key: TechnologyKey = 'Stylus2';
  public static tags: TechnologyTag[] = ['CSS', 'Stylus', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = Stylus1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(CSS3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
