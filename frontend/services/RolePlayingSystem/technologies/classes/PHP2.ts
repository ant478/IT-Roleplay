import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PHP1 from './PHP1';
import expect from '../../helpers/requirementsHelper';

export default class PHP2 extends Technology {
  public static id = 70;
  public static key: TechnologyKey = 'PHP2';
  public static tags: TechnologyTag[] = ['PHP', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = PHP1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
