import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import PostgreSQL2 from './PostgreSQL2';
import expect from '../../helpers/requirementsHelper';

export default class PostgreSQL3 extends Technology {
  public static id = 95;
  public static key: TechnologyKey = 'PostgreSQL3';
  public static tags: TechnologyTag[] = ['PostgreSQL', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = PostgreSQL2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(5)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
