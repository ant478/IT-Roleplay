import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import SQLite2 from './SQLite2';
import expect from '../../helpers/requirementsHelper';

export default class SQLite3 extends Technology {
  public static id = 106;
  public static key: TechnologyKey = 'SQLite3';
  public static tags: TechnologyTag[] = ['SQLite', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = SQLite2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
