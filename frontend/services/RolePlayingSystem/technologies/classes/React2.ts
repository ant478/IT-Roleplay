import Character from '../../Character';
import Technology from './Technology';
import { TechnologyGroup, TechnologyKey, TechnologyTag } from '../index';
import expect from '../../helpers/requirementsHelper';
import JavaScript3 from './JavaScript3';
import React1 from './React1';

export default class React2 extends Technology {
  public static id = 43;
  public static key: TechnologyKey = 'React2';
  public static tags: TechnologyTag[] = ['JavaScript', 'React', 'Frontend'];
  public static basePrice = 3;
  public static complexityLevel = 1;
  public static group: TechnologyGroup = 'FrontendFramework';
  public static parent = React1;

  public static isCharacterMatchRequirements(character: Character): boolean {
    return expect(character)
      .toHaveTechnology(JavaScript3.key)
      .toHaveTechnology(this.parent.key)
      .isMatch();
  }
}
