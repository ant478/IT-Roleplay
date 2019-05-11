import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import MySQL2 from './MySQL2';
import expect from '../../helpers/requirementsHelper';

export default class MySQL3 extends Technology {
  public static id = 91;
  public static key: TechnologyKey = 'MySQL3';
  public static tags: TechnologyTag[] = ['MySQL', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = MySQL2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
