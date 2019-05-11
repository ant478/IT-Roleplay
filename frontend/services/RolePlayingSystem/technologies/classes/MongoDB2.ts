import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import MongoDB1 from './MongoDB1';
import expect from '../../helpers/requirementsHelper';

export default class MongoDB2 extends Technology {
  public static id = 102;
  public static key: TechnologyKey = 'MongoDB2';
  public static tags: TechnologyTag[] = ['MongoDB', 'Backend'];
  public static basePrice = 2;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'DBMS';
  public static parent = MongoDB1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
