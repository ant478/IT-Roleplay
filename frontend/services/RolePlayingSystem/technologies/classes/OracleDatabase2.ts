import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import OracleDatabase1 from './OracleDatabase1';
import expect from '../../helpers/requirementsHelper';

export default class OracleDatabase2 extends Technology {
  public static id = 98;
  public static key: TechnologyKey = 'OracleDatabase2';
  public static tags: TechnologyTag[] = ['OracleDatabase', 'Backend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = OracleDatabase1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
