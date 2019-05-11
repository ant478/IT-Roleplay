import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import NodeJS2 from './NodeJS2';
import JavaScript4 from './JavaScript4';
import expect from '../../helpers/requirementsHelper';

export default class NodeJS3 extends Technology {
  public static id = 61;
  public static key: TechnologyKey = 'NodeJS3';
  public static tags: TechnologyTag[] = ['NodeJS', 'Backend'];
  public static basePrice = 4;
  public static complexityLevel = 2;
  public static group: TechnologyGroup = 'Backend';
  public static parent = NodeJS2;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript4.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
