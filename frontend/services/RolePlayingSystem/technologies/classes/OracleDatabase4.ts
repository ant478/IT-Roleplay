import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import OracleDatabase3 from './OracleDatabase3';
import expect from '../../helpers/requirementsHelper';

export default class OracleDatabase4 extends Technology {
  public static id = 100;
  public static key: TechnologyKey = 'OracleDatabase4';
  public static tags: TechnologyTag[] = ['OracleDatabase', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = OracleDatabase3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
