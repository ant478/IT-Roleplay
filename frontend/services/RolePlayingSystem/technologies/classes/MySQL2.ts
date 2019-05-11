import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import MySQL1 from './MySQL1';
import expect from '../../helpers/requirementsHelper';

export default class MySQL2 extends Technology {
  public static id = 90;
  public static key: TechnologyKey = 'MySQL2';
  public static tags: TechnologyTag[] = ['MySQL', 'Backend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = MySQL1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveMinLevel(3)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
