import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import MySQL3 from './MySQL3';
import expect from '../../helpers/requirementsHelper';

export default class MySQL4 extends Technology {
  public static id = 92;
  public static key: TechnologyKey = 'MySQL4';
  public static tags: TechnologyTag[] = ['MySQL', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = MySQL3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
