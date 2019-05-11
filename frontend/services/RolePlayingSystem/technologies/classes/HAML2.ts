import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import HTML3 from './HTML3';
import HAML1 from './HAML1';

export default class HAML2 extends Technology {
  public static id = 27;
  public static key: TechnologyKey = 'HAML2';
  public static tags: TechnologyTag[] = ['HTML', 'HAML', 'Frontend'];
  public static basePrice = 2;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = HAML1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(HTML3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
