import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PHP2 from './PHP2';
import expect from '../../helpers/requirementsHelper';

export default class PHP3 extends Technology {
  public static id = 71;
  public static key: TechnologyKey = 'PHP3';
  public static tags: TechnologyTag[] = ['PHP', 'Backend'];
  public static basePrice = 5;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = PHP2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
