import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import OracleDatabase2 from './OracleDatabase2';
import expect from '../../helpers/requirementsHelper';

export default class OracleDatabase3 extends Technology {
  public static id = 99;
  public static key: TechnologyKey = 'OracleDatabase3';
  public static tags: TechnologyTag[] = ['OracleDatabase', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = OracleDatabase2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
