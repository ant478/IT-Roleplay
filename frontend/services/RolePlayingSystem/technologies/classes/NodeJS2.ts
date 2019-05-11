import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import NodeJS1 from './NodeJS1';
import JavaScript3 from './JavaScript3';
import expect from '../../helpers/requirementsHelper';

export default class NodeJS2 extends Technology {
  public static id = 60;
  public static key: TechnologyKey = 'NodeJS2';
  public static tags: TechnologyTag[] = ['NodeJS', 'Backend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'Backend';
  public static parent = NodeJS1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
