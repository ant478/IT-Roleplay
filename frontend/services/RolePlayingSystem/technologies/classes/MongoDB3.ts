import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import MongoDB2 from './MongoDB2';
import expect from '../../helpers/requirementsHelper';

export default class MongoDB3 extends Technology {
  public static id = 103;
  public static key: TechnologyKey = 'MongoDB3';
  public static tags: TechnologyTag[] = ['MongoDB', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = MongoDB2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
