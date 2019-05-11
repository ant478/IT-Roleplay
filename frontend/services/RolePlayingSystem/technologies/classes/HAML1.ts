import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import HTML2 from './HTML2';

export default class HAML1 extends Technology {
  public static id = 26;
  public static key: TechnologyKey = 'HAML1';
  public static tags: TechnologyTag[] = ['HTML', 'HAML', 'Frontend'];
  public static basePrice = 1;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Frontend';
  public static parent = null;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(HTML2.key)
      .isMatch();
  }
}
