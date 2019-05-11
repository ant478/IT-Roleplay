import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PostgreSQL1 from './PostgreSQL1';
import expect from '../../helpers/requirementsHelper';

export default class PostgreSQL2 extends Technology {
  public static id = 94;
  public static key: TechnologyKey = 'PostgreSQL2';
  public static tags: TechnologyTag[] = ['PostgreSQL', 'Backend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = PostgreSQL1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
