import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import SQLite1 from './SQLite1';
import expect from '../../helpers/requirementsHelper';

export default class SQLite2 extends Technology {
  public static id = 105;
  public static key: TechnologyKey = 'SQLite2';
  public static tags: TechnologyTag[] = ['SQLite', 'Backend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = SQLite1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
