import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PostgreSQL3 from './PostgreSQL3';
import expect from '../../helpers/requirementsHelper';

export default class PostgreSQL4 extends Technology {
  public static id = 96;
  public static key: TechnologyKey = 'PostgreSQL4';
  public static tags: TechnologyTag[] = ['PostgreSQL', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 3;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = PostgreSQL3;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(9)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
